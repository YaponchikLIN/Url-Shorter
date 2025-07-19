import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppDataSource } from './database';
import { UrlController } from './controllers/UrlController';

const app = express();
const urlController = new UrlController();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.set('trust proxy', true);

app.post('/shorten', async (req: Request, res: Response) => {
    await urlController.shorten(req, res);
});

app.get('/info/:shortCode', async (req: Request, res: Response) => {
    await urlController.getInfo(req, res);
});

app.get('/urls', async (req: Request, res: Response) => {
    await urlController.getAllUrls(req, res);
});

app.get('/analytics/:shortCode', async (req: Request, res: Response) => {
    await urlController.getAnalytics(req, res);
});

app.delete('/delete/:shortCode', async (req: Request, res: Response) => {
    await urlController.deleteUrl(req, res);
});

app.get('/:shortCode', async (req: Request, res: Response) => {
    await urlController.redirect(req, res);
});

export default app;