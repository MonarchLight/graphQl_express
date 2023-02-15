"use strict";

import express from "express";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";

import config from "./config.js";
import { schema } from './schema/schema.js'

mongoose.set('strictQuery', false);

const PORT = 3000;
const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

const start = async () => {
    try {
        await mongoose.connect(config.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => { console.log(`Server started in ${PORT}`) });
    } catch (error) {
        console.log(error);
    }
};

start();