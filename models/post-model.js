"use strict";

import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    author: { type: String, require: true },
});

export const postModel = model('post', postSchema);