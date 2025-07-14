const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Root route shows users + posts
app.get('/', async (req, res) => {
  try {
    const [usersRes, postsRes] = await Promise.all([
      axios.get('https://jsonplaceholder.typicode.com/users'),
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10'),
    ]);

    res.json({
      message: '✅ API is running. Combined data below:',
      users: usersRes.data,
      posts: postsRes.data,
    });
  } catch (error) {
    console.error('Error fetching data for root route:', error.message);
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
});

// Users route
app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Posts route
app.get('/api/posts', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Start server and log all routes
app.listen(PORT, () => {
  console.log(`✅ Server running at:
http://localhost:${PORT}
http://localhost:${PORT}/api/posts
http://localhost:${PORT}/api/users`);
});
