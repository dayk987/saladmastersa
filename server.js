// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://<daykto>:<$ub0kmuna>@cluster0.mongodb.net/saladmastersa?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Schemas
const Event = mongoose.model('Event', new mongoose.Schema({
  title: String,
  desc: String,
  date: String
}));

const Article = mongoose.model('Article', new mongoose.Schema({
  title: String,
  desc: String,
  link: String
}));

// GET routes
app.get('/events', async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});

app.get('/articles', async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

// POST routes (Admin adds new content)
app.post('/events', async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.json(newEvent);
});

app.post('/articles', async (req, res) => {
  const newArticle = new Article(req.body);
  await newArticle.save();
  res.json(newArticle);
});

// DELETE routes (Admin deletes content)
app.delete('/events/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.delete('/articles/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));
