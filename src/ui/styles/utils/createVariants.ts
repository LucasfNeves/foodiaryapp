import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type Style = ViewStyle | TextStyle | ImageStyle;

type Variant = {
    [variantName: string]: {
        [variant: string]: Style;
    };
};

interface ICreateVariants<TVariants extends Variant> {
    base?: Style;
    variants: TVariants;
    defaultVariants?: {
        [K in keyof TVariants]?: keyof TVariants[K];
    };
}

export function createVariants<TVariants extends Variant>({
    base = {},
    variants,
    defaultVariants,
}: ICreateVariants<TVariants>) {
    return (selectedVariants?: {
        [K in keyof TVariants]?: keyof TVariants[K];
    }) => {
        let styles = { ...base };

        for (const [variant, variantStyles] of Object.entries(variants)) {
            const variantName =
                selectedVariants?.[variant as keyof TVariants] ??
                defaultVariants?.[variant as keyof TVariants];
            const selectedVariantSyles =
                variantStyles[variantName as keyof typeof variantStyles];

            styles = {
                ...styles,
                ...selectedVariantSyles,
            };
        }
        return styles;
    };
}

export type VariantProps<T extends ReturnType<typeof createVariants>> =
    Parameters<T>[0];
