"use strict";

import * as dotenv from "dotenv";

dotenv.config();

export default {
    "PORT": process.env.PORT,
    "MONGODB": process.env.MONGODB,
}