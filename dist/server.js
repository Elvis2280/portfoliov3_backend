"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const proyectsRoutes_1 = __importDefault(require("./routes/proyectsRoutes"));
const tagsRoute_1 = __importDefault(require("./routes/tagsRoute"));
const blogRoute_1 = __importDefault(require("./routes/blogRoute"));
const messageRoute_1 = __importDefault(require("./routes/messageRoute"));
const prismaDisconnect_1 = require("./utils/midlware/prismaDisconnect");
//declares
dotenv_1.default.config(); // load .env variables
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const isDevelopement = process.env.DEVELOPMENT === 'DEVELOP';
const origin = isDevelopement ? 'http://localhost:3000' : 'https://erudev.page';
app.use(express_1.default.json()); // body parser
app.use(express_1.default.urlencoded({ extended: true })); // body parser
app.use((0, cors_1.default)({
    origin: origin,
    optionsSuccessStatus: 204,
    credentials: true,
})); // cors
app.use('/api/projects', proyectsRoutes_1.default);
app.use('/api/tags', tagsRoute_1.default);
app.use('/api/blog', blogRoute_1.default);
app.use('/api/message', messageRoute_1.default);
app.use(prismaDisconnect_1.closePrismaConnection); // close prisma connection
// server
app.listen(port, () => {
    console.log('listening at port' + process.env.PORT);
});
