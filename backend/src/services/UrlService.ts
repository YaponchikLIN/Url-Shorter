import { Repository } from 'typeorm';
import { Url } from '../models/Url';
import { Click } from '../models/Click';
import { AppDataSource } from '../database';

export class UrlService {
    private urlRepository: Repository<Url>;
    private clickRepository: Repository<Click>;

    constructor() {
        this.urlRepository = AppDataSource.getRepository(Url);
        this.clickRepository = AppDataSource.getRepository(Click);
    }

    async createShortUrl(originalUrl: string, alias?: string, expiresAt?: Date):

        Promise<Url> {
        const shortCode = alias || this.generateShortCode();

        const existing = await this.urlRepository.findOne({ where: { shortCode } });
        if (existing) {
            throw new Error('Alias уже существует');
        }

        const url = this.urlRepository.create({
            originalUrl,
            shortCode,
            alias,
            expiresAt
        })

        return await this.urlRepository.save(url);
    }

    async getUrlByShortCode(shortCode: string):
        Promise<Url | null> {
        const url = await this.urlRepository.findOne({ where: { shortCode } });

        if (!url) return null;

        if (url.expiresAt && url.expiresAt < new Date()) {
            return null;
        }

        return url;
    }

    async recordClick(url: Url, ipAddress: string):
        Promise<void> {
        url.clickCount += 1;
        await this.urlRepository.save(url);

        const click = this.clickRepository.create({
            url,
            ipAddress
        });

        await this.clickRepository.save(click);
    }

    async getAnalytics(shortCode: string) {
        const url = await this.urlRepository.findOne({
            where: { shortCode },
            relations: ['clicks']
        });

        if (!url) return null;

        const recentClicks = await this.clickRepository.find({
            where: { url: { id: url.id } },
            order: { clickedAt: 'DESC' },
            take: 5
        })

        return {
            clickCount: url.clickCount,
            recentIPs: recentClicks.map(click => click.ipAddress)
        }
    }

    async deleteUrl(shortCode: string): Promise<boolean> {
        const result = await this.urlRepository.delete({ shortCode });
        return result.affected !== null && result.affected !== undefined && result.affected > 0;
    }

    private generateShortCode(): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}

