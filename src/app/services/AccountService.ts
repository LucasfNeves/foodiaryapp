import { Gender } from '@app/types/Gender';
import { Service } from './Service';

export class AccountService extends Service {
    static async getMe(): Promise<AccountService.GetMeResponse> {
        const { data } =
            await this.apiClient.post<AccountService.GetMeResponse>('/me');
        return {
            ...data,
            profile: {
                ...data.profile,
                birthDate: new Date(data.profile.birthDate),
            },
        };
    }
}

export namespace AccountService {
    export type GetMeResponse = {
        profile: {
            name: string;
            birthDate: Date;
            gender: Gender;
            height: number;
            weight: number;
        };

        goal: {
            calories: number;
            proteins: number;
            carbohydrates: number;
            fats: number;
        };
    };
}
