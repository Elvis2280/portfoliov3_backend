//imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import projectRouter from './routes/proyectsRoutes';
import tagRouter from './routes/tagsRoute';
import blogRouter from './routes/blogRoute';
import messageRouter from './routes/messageRoute';
import { closePrismaConnection } from './utils/midlware/prismaDisconnect';

//declares
dotenv.config(); // load .env variables
const app = express();
const port = process.env.PORT || 8080;
const isDevelopement = process.env.DEVELOPMENT === 'DEVELOP';
const origin = isDevelopement ? 'http://localhost:3000' : 'https://erudev.page';

app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: true })); // body parser

app.use(
  cors({
    origin: origin,
    optionsSuccessStatus: 204,
    credentials: true,
  }),
); // cors

app.use('/api/projects', projectRouter);
app.use('/api/tags', tagRouter);
app.use('/api/blog', blogRouter);
app.use('/api/message', messageRouter);
app.use(closePrismaConnection); // close prisma connection

// server
app.listen(port, () => {
  console.log('listening at port' + process.env.PORT);
});
