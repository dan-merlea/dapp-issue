import BigNumber from 'bignumber.js';

/**
 * Adding x amount of decimals
 * @param input amount
 * @param paramDenomination default is 18
 * @returns nominated value
 */
export const nominate = (input: string, paramDenomination?: number) => {
	const parts = input.toString().replace(',', '.').split('.');
	const denomination = paramDenomination !== undefined ? paramDenomination : 18;

	if (parts[1]) {
		// remove trailing zeros
		while (parts[1].substring(parts[1].length - 1) === '0' && parts[1].length > 1) {
			parts[1] = parts[1].substring(0, parts[1].length - 1);
		}
		parts[1] = parts[1].slice(0, Math.min(parts[1].length, 18))
	}

	let count = parts[1] ? denomination - parts[1].length : denomination;
	count = count < 0 ? 0 : count;
	let transformed = parts.join('') + '0'.repeat(count);

	// remove beginning zeros
	while (transformed.substring(0, 1) === '0' && transformed.length > 1) {
		transformed = transformed.substring(1);
	}

	return transformed;
}

/**
 * Used for egld & esdt & meta
 * @param value amount of token
 * @returns nominated amount
 */
export const nominateValToHex = (value: string, denomination: number = 18) => {
	let val = value && value.length > 0 ? new BigNumber(nominate(value, denomination)).toString(16) : '0';

	if (val.length % 2 !== 0) {
		val = '0' + val;
	}

	return val;
};

/**
 * Used for u32 & u64
 * @param value a number
 * @returns nominated decimal
 */
export const nominateNumberToHex = (value: string) => {
	let val = value && value.length > 0 ? new BigNumber(value).toString(16) : '0';

	if (val.length % 2 !== 0) {
		val = '0' + val;
	}

	return val;
};

/**
 * Used for strings
 * @param value a string
 * @returns nominated string
 */
export const nominateStringToHex = (value: string) => {
    let hex, i;
    let result = "";
    for (i = 0; i < value.length; i++) {
        hex = value.charCodeAt(i).toString(16);
        result += (hex).slice(-4);
    }

    return result
}