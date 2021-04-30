const _ = require("lodash");
const User = require('../models/user')

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((obj) => {
    return obj.likes;
  });

  const reducer = (sum, item) => {
    return sum + item;
  };

  return blogs.length === 0 ? 0 : likes.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  } else if (blogs.length === 1) {
    return {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes,
    };
  } else {
    const reducer = (acc, cur) => {
      if (cur.likes > acc.likes) {
        return { title: cur.title, author: cur.author, likes: cur.likes };
      }
      return acc;
    };
    return blogs.reduce(reducer, blogs[0]);
  }
};

const mostBlogs = (blogs) => {
  const mostBlogs = _.chain(blogs)
    .countBy("author")
    .toPairs()
    .maxBy(_.last)
    .value();
  return blogs.length === 0
    ? null
    : { author: mostBlogs[0], blogs: mostBlogs[1] };
};

const mostLikes = (blogs) => {
  const mostLikes = _.chain(blogs)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, "likes"),
    }))
    .maxBy("likes")
    .value();
  return blogs.length === 0 ? null : mostLikes;
};

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb
};
