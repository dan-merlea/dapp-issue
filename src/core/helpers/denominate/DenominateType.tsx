import React from 'react';
import { denominate } from './formatters';
import { TokenImage } from './PaymentView';

export interface DenominateType {
	value: string;
	token?: string;
	denomination?: number;
	showLastNonZeroDecimal?: boolean;
	showErd?: boolean;
	decimals?: number;
	bold?: boolean;
}

export const Denominate = ({
	value,
	token = 'EGLD',
	denomination = 18,
	showLastNonZeroDecimal = false,
	showErd = true,
	decimals,
	bold = false,
}: DenominateType) => {

	decimals = decimals ?? 3;

	const denominatedValue = denominate({
		input: value,
		denomination,
		decimals,
		showLastNonZeroDecimal,
	});

	return (
		<span data-testid="denominateComponent">
			<span className={bold ? 'text--strong text--header' : ''}>{denominatedValue}</span>
			{showErd && <span className="symbol">&nbsp;{TokenImage(token)}</span>}
		</span>
	);
};