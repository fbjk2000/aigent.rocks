#!/usr/bin/env node
/**
 * Social Post Scheduler - aigent.rocks
 * =====================================
 * Schedule and manage social media posts across platforms using AI.
 *
 * Complexity: Advanced
 * Requirements: npm install openai node-cron express dotenv
 *
 * Usage:
 *   1. Copy .env.example to .env and fill in your credentials
 *   2. Run: node social_post_scheduler.js
 *   3. The server starts on port 3001 with a REST API for managing posts
 *
 * API Endpoints:
 *   POST /api/posts          - Create & schedule a new post
 *   GET  /api/posts           - List all scheduled posts
 *   DELETE /api/posts/:id     - Cancel a scheduled post
 *   POST /api/posts/generate  - Generate post content with AI
 *
 * Licence: MIT - Free for personal and commercial use with attribution to aigent.rocks
 */

const express = require('express');
const cron = require('node-cron');
const { OpenAI } = require('openai');
const crypto = require('crypto');

// ── Configuration ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-api-key-here';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const app = express();
app.use(express.json());

// ── In-memory store (swap for a database in production) ────────────────────
const scheduledPosts = new Map();
const postHistory = [];

// ── Platform Adapters (stubs – replace with real API integrations) ─────────
const platformAdapters = {
  twitter: async (content, options = {}) => {
    // Replace with real Twitter/X API v2 integration
    console.log(`[Twitter] Publishing: ${content.substring(0, 50)}...`);
    return { success: true, platform: 'twitter', postId: `tw_${Date.now()}` };
  },

  linkedin: async (content, options = {}) => {
    // Replace with real LinkedIn API integration
    console.log(`[LinkedIn] Publishing: ${content.substring(0, 50)}...`);
    return { success: true, platform: 'linkedin', postId: `li_${Date.now()}` };
  },

  instagram: async (content, options = {}) => {
    // Replace with real Instagram Graph API integration
    console.log(`[Instagram] Publishing: ${content.substring(0, 50)}...`);
    return { success: true, platform: 'instagram', postId: `ig_${Date.now()}` };
  },
};

// ── AI Content Generation ──────────────────────────────────────────────────
async function generatePostContent(topic, platform, tone = 'professional') {
  const platformLimits = {
    twitter: 280,
    linkedin: 1300,
    instagram: 2200,
  };

  const maxLength = platformLimits[platform] || 500;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a social media content expert. Create engaging ${platform} posts with a ${tone} tone. Include relevant hashtags. Keep within ${maxLength} characters.`,
      },
      {
        role: 'user',
        content: `Create a ${platform} post about: ${topic}`,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  return response.choices[0].message.content.trim();
}

// ── Schedule a Post ────────────────────────────────────────────────────────
function schedulePost(post) {
  const publishDate = new Date(post.scheduledFor);
  const now = new Date();

  if (publishDate <= now) {
    throw new Error('Scheduled time must be in the future');
  }

  // Create a cron expression for the exact time
  const cronExpr = `${publishDate.getMinutes()} ${publishDate.getHours()} ${publishDate.getDate()} ${publishDate.getMonth() + 1} *`;

  const task = cron.schedule(cronExpr, async () => {
    console.log(`\n⏰ Publishing post ${post.id} to ${post.platforms.join(', ')}...`);

    const results = [];
    for (const platform of post.platforms) {
      const adapter = platformAdapters[platform];
      if (adapter) {
        try {
          const result = await adapter(post.content, post.options);
          results.push(result);
        } catch (err) {
          results.push({ success: false, platform, error: err.message });
        }
      }
    }

    post.status = 'published';
    post.publishedAt = new Date().toISOString();
    post.results = results;
    postHistory.push(post);
    scheduledPosts.delete(post.id);

    console.log(`✅ Post ${post.id} published to ${results.length} platform(s)`);
    task.stop();
  });

  post.cronTask = task;
  scheduledPosts.set(post.id, post);
}

// ── API Routes ─────────────────────────────────────────────────────────────

// Create and schedule a post
app.post('/api/posts', async (req, res) => {
  try {
    const { content, platforms, scheduledFor, options } = req.body;

    if (!content || !platforms || !scheduledFor) {
      return res.status(400).json({
        error: 'Missing required fields: content, platforms, scheduledFor',
      });
    }

    const post = {
      id: crypto.randomUUID(),
      content,
      platforms,
      scheduledFor,
      options: options || {},
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };

    schedulePost(post);

    res.status(201).json({
      id: post.id,
      status: post.status,
      scheduledFor: post.scheduledFor,
      platforms: post.platforms,
      content: post.content,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List scheduled posts
app.get('/api/posts', (req, res) => {
  const posts = Array.from(scheduledPosts.values()).map((p) => ({
    id: p.id,
    content: p.content,
    platforms: p.platforms,
    scheduledFor: p.scheduledFor,
    status: p.status,
  }));

  res.json({ scheduled: posts, history: postHistory.slice(-50) });
});

// Cancel a scheduled post
app.delete('/api/posts/:id', (req, res) => {
  const post = scheduledPosts.get(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  post.cronTask?.stop();
  scheduledPosts.delete(req.params.id);
  res.json({ message: 'Post cancelled', id: req.params.id });
});

// Generate AI content
app.post('/api/posts/generate', async (req, res) => {
  try {
    const { topic, platform, tone } = req.body;

    if (!topic || !platform) {
      return res.status(400).json({ error: 'Missing required fields: topic, platform' });
    }

    const content = await generatePostContent(topic, platform, tone);
    res.json({ content, platform, topic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    scheduledCount: scheduledPosts.size,
    publishedCount: postHistory.length,
  });
});

// ── Start Server ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Social Post Scheduler - aigent.rocks`);
  console.log(`   Server running on http://localhost:${PORT}`);
  console.log(`\n   Endpoints:`);
  console.log(`   POST   /api/posts          - Schedule a post`);
  console.log(`   GET    /api/posts           - List posts`);
  console.log(`   DELETE /api/posts/:id       - Cancel a post`);
  console.log(`   POST   /api/posts/generate  - AI content generation`);
  console.log(`   GET    /api/health          - Health check\n`);
});
