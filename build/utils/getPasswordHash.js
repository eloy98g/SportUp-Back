"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const getPasswordHash = (password) => {
    const passwordHash = (0, crypto_1.createHash)("md5").update(password).digest("hex");
    return passwordHash;
};
exports.default = getPasswordHash;
