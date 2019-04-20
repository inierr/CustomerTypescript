import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import * as routes from './routes';
import cors from 'cors';


dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();

app.use(express.json());

app.use(cors());

routes.register(app);
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});