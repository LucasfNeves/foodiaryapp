export function formatDecimal(value: string) {
    const match = value.replace(',', '.').match(/^\d{0,3}(\.\d{0,2})?/);
    if (!match) return value;

    return match?.[0] ?? '';
}
