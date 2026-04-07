import { env } from '@app/env';
import axios from 'axios';

export abstract class Service {
    protected static apiClient = axios.create({
        baseURL: env.API_URL,
    });
}
