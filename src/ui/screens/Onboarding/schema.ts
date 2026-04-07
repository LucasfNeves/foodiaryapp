import { ActivityLevel } from '@app/types/ActivityLevel';
import { Gender } from '@app/types/Gender';
import { Goal } from '@app/types/Goal';
import z from 'zod';

export const onboardingSchema = z.object({
    goal: z.enum(Goal),
    gender: z.enum(Gender),
    birthDate: z.date(),
    height: z.string().min(1, { message: 'Informe a sua altura' }),
    weight: z.string().min(1, { message: 'Informe o seu peso' }),
    activityLevel: z.enum(ActivityLevel),
    account: z
        .object({
            name: z.string().min(1, { message: 'Informe seu nome' }),
            email: z.email({ message: 'Informe um email válido' }),
            password: z.string().min(8, {
                message: 'A senha deve conter no mínimo 8 caracteres',
            }),
            confirmPassword: z
                .string()
                .min(8, { message: 'Confirme a sua senha' }),
        })
        .refine((data) => data.password === data.confirmPassword, {
            error: 'As senhas não coincidem',
            path: ['confirmPassword'],
        }),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
