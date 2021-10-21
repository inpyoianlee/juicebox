const express = require('express');
const tagsRouter = express.Router();
const { client, getPostsByTagName } = require('../db');

const getAllTags = async () => {
    try {
        const { rows } = await client.query(`
            SELECT * FROM tags;
        `)
        return rows;
    } catch (err) {
        console.error(err);
    }
}

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
    next();
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    // read the tagname from the params
    const tagName = req.params.tagName;
    try {
      // use our method to get posts by tag name from the db
      // send out an object to the client { posts: // the posts }
      const posts = await getPostsByTagName(tagName);
      res.send({post: posts});

    } catch ({ name, message }) {
      // forward the name and message to the error handler
      next({name, message});
    }
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
    res.send({
        tags
    });
});

module.exports = tagsRouter;