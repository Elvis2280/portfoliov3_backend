"use strict";
const multer = require('multer');
const memoryStorage = multer.memoryStorage();
module.exports = multer({
    storage: memoryStorage,
    limits: { fileSize: 10000000, fieldSize: 10000000 },
});
