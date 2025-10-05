/**
 * Converts a number into Indian currency format.
 * Falls back to 0 if input is null/undefined.
 *
 * @param amount - The numeric value to convert.
 * @returns A formatted INR currency string.
 */
export function convertToCurrency(amount?: number | null): string {
    const safeAmount = amount ?? 0; // fallback to 0
    return safeAmount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
    });
}
