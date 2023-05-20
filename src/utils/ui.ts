
/**
 * Rounds a number to n digits after zero 0.00
 * @param num number to be rounded
 * @param digits decimals after period .00
 * @returns a rounded number
 */
export const roundTwoDigits = (num: number, digits:number) => {
    return parseFloat(num.toString()).toFixed(digits);
}