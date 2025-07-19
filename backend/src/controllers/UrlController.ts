import { Request, Response } from 'express';
import { UrlService } from '../services/UrlService';

export class UrlController {
    private urlService: UrlService;

    constructor() {
        this.urlService = new UrlService();
    }

    async shorten(req: Request, res: Response) {
        try {
            const { originalUrl, alias, expiresAt } = req.body;

            if (!originalUrl) {
                return res.status(400).json({ error: 'originalUrl обязателен' });
            }

            const url = await this.urlService.createShortUrl(
                originalUrl,
                alias,
                expiresAt ? new Date(expiresAt) : undefined
            );

            res.json({
                shortUrl: `${req.protocol}://${req.get('host')}/${url.shortCode}`,
                shortCode: url.shortCode,
                originalUrl: url.originalUrl
            }
            )

        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' });
        }
    }

    async redirect(req: Request, res: Response) {
        try {
            const { shortCode } = req.params;
            const url = await this.urlService.getUrlByShortCode(shortCode);

            if (!url) {
                return res.status(404).json({ error: 'Ссылка не найдена' });
            }

            const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
            await this.urlService.recordClick(url, clientIP);

            res.redirect(url.originalUrl);

        } catch (error) {
            res.status(400).json({ error: 'Внутренняя ошибка сервера' })
        }
    }

    async getInfo(req: Request, res: Response) {
        try {
            const { shortCode } = req.params;
            const url = await this.urlService.getUrlByShortCode(shortCode);

            if (!url) {
                return res.status(404).json({ error: 'Ссылка не найдена' });
            }

            res.json({ originalUrl: url.originalUrl, createdAt: url.createdAt, clickCount: url.clickCount });

        } catch (error) {
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }

    async getAnalytics(req: Request, res: Response) {
        try {
            const { shortCode } = req.params;
            const analytics = await this.urlService.getAnalytics(shortCode);

            if (!analytics) {
                return res.status(404).json({ error: 'Ссылка не найдена' });
            }

            res.json(analytics);
        } catch (error) {
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }

    async deleteUrl(req: Request, res: Response) {
        try {
            const { shortCode } = req.params;
            const deleted = await this.urlService.deleteUrl(shortCode);

            if (!deleted) {
                return res.status(404).json({ error: 'Ссылка не найдена' });
            }

            res.json({ messge: 'Ссылка удалена' });
        } catch (error) {
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
}