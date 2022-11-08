import express from 'express';
import UserController from './app/controllers/UserController';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import Queue from './app/lib/Queue';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const  { router } = createBullBoard(Queue.queues.map(queue => new BullAdapter(queue.bull)));

app.use(express.json());
app.use('/admin/queues', router);
app.post('/users', UserController.store);

app.listen(3333, () => console.log('Server is running'));