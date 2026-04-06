import z from 'zod';

export const sigInSchema = z.object({
    email: z.email({ message: 'Informe um e-mail válido' }),
    password: z
        .string()
        .min(8, { message: 'A senha deve conter no mínimo 8 caracteres' }),
});

export type SignInSchema = z.infer<typeof sigInSchema>;
