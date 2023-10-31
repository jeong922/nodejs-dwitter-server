import * as tweetRepository from '../data/tweet.js';

export function getTweets(req, res, next) {
  const username = req.query.username;
  const data = username
    ? tweetRepository.getAllByUsername()
    : tweetRepository.getAll();

  res.status(200).json(data);
}

export function getTweet(req, res, next) {
  const id = req.params.id;
  const tweet = tweetRepository.getAllById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export function createTweet(req, res, next) {
  const { text, name, username } = req.body;
  const tweet = tweetRepository.create(text, name, username);
  res.status(201).json(tweet);
}

export function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweetRepository.update(id, text);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export function removeTweet(req, res, next) {
  const id = req.params.id;
  tweetRepository.remove(id);
  res.sendStatus(204);
}
