import { env } from '@app/env';
import axios, { isAxiosError } from 'axios';

export abstract class Service {
    private static refreshTokenInterceptorId: number | undefined;

    protected static apiClient = axios.create({
        baseURL: env.API_URL,
    });

    static setAccessToken(acessToken: string) {
        this.apiClient.defaults.headers.common['Authorization'] =
            `Bearer ${acessToken}`;
    }

    static removeAccessToken() {
        delete this.apiClient.defaults.headers.common['Authorization'];
    }

    static removeRefreshTokenHandler() {
        if (this.refreshTokenInterceptorId !== undefined) {
            this.apiClient.interceptors.response.eject(
                this.refreshTokenInterceptorId,
            );
            this.refreshTokenInterceptorId = undefined;
        }
    }

    static setRefreshTokenHandler(refreshHandler: () => Promise<void>) {
        this.removeRefreshTokenHandler();

        this.refreshTokenInterceptorId =
            this.apiClient.interceptors.response.use(
                (response) => response,
                async (error) => {
                    if (
                        !isAxiosError(error) ||
                        error.response?.status !== 401 ||
                        !error.config ||
                        error.config.url === '/auth/refresh-token'
                    ) {
                        return Promise.reject(error);
                    }

                    await refreshHandler();

                    return this.apiClient(error.config);
                },
            );
    }
}
