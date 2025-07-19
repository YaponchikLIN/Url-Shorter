export interface ShortenRequest {
    originalUrl: string;
    alias?: string;
    expiresAt?: string;
}

export interface ShortenResponse {
    shortUrl: string;
    shortCode: string;
    originalUrl: string;
}

export interface UrlInfo {
    id: number;
    originalUrl: string;
    shortCode: string;
    alias?: string;
    createdAt: string;
    clickCount: number;
}

export interface Analytics {
    clickCount: number;
    recentIPs: string[];
    recentClicks: {
        ipAddress: string;
        clickedAt: string;
    }[];
}

