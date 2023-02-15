"use strict";

import { Schema, model } from 'mongoose';

const authorSchema = new Schema({
    name: { type: String, require: true },
});

export const authorModel = model('author', authorSchema);