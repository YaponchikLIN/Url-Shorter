import axios from 'axios';
import { ShortenRequest, ShortenResponse, UrlInfo, Analytics } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({ baseURL: API_BASE_URL });

export const urlApi = {
    shorten: async (data: ShortenRequest):
        Promise<ShortenResponse> => {
        const response = await api.post('/shorten', data);
        return response.data;
    },

    getInfo: async (shortCode: string): Promise<UrlInfo> => {
        const response = await api.get(`/info/${shortCode}`);
        return response.data;
    },

    getAnalytics: async (shortCode: string): Promise<Analytics> => {
        const response = await api.get(`/analytics/${shortCode}`);
        return response.data;
    },

    deleteUrl: async (shortCode: string): Promise<void> => {
        const response = await api.delete(`/delete/${shortCode}`);
        return response.data;
    },

    getAllUrls: async (): Promise<UrlInfo[]> => {
        const response = await api.get('/urls');
        return response.data;
    }
}