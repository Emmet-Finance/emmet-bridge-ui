
/**
 * Rounds a number to n digits after zero 0.00
 * @param num number to be rounded
 * @param digits decimals after period .00
 * @returns a rounded number
 */
export const roundTwoDigits = (num: number, digits:number) => {
    return parseFloat(num.toString()).toFixed(digits);
}

/**
 * Verifies whether a string is a valid EVM address
 * @param address verified EVM address
 * @returns true | false
 */
export const isValidEvmAddress = (address:string):boolean => {
    const pattern = /^0x[a-fA-F0-9]{40}$/y;
    if(pattern.test(address)){
        return true;
    }else{
        return false;
    }
}

/**
 * Checks whether an item is in an array
 * @param array a lookup array
 * @param item a non string item
 * @returns true | false
 */
export const includesNonString = (array: any[], item: any): boolean => {

    if (array.length === 0) {return false}

    for( const el of array){
        if(el === item){return true}
    }
    return false;
}