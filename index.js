const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB: ", err);
});

const userSchema = new mongoose.Schema({
  username: String,
});

const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });
  await newUser.save();
  res.status(201).send(newUser);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
