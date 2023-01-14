import express from "express";

import {Auth} from './middlewares/index.js';

const app = express();
const port = 3002;

app.use(express.json());

app.use(Auth);

app.get('/', (req, res) => {
    try {
        res.json(
            {message:"started"}
        );
    } catch(error) {
        res.status(400).json({
            error : "services is broken"
        });
    }
});

app.listen(port, () => {
    console.log(`app started at port : ${port}`)
});