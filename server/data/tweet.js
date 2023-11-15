import * as userRepository from './auth.js';
import { getTweets, useVirtualId } from '../database/database.js';
import Mongoose from 'mongoose';
import { Timestamp } from 'mongodb';

const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, require: true },
    userId: { type: String, require: true },
    name: { type: String, require: true },
    username: { type: String, require: true },
    url: String,
  },
  { Timestamp: true }
);

useVirtualId(tweetSchema);

const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getAll() {
  return Tweet.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function getById(id) {
  return Tweet.findById(id);
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = new Tweet({
    text,
    userId,
    name: name,
    username: username,
    url: url,
  });
  return tweet.save();
}

export async function update(id, text) {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function remove(id) {
  return Tweet.findByIdAndDelete(id);
}
