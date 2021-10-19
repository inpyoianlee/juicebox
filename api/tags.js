const express = require('express');
const tagsRouter = express.Router();
const { client } = require('../db');

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

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
    res.send({
        tags
    });
});

module.exports = tagsRouter;