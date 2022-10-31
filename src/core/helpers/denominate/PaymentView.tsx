import React from 'react';

export const TokenImage = (identifier: string) => {
	if (identifier == 'EGLD' || identifier == undefined) {
		return <img src="/images/egld.svg" width="16" height="16" alt="EGLD" />
	} else if (identifier == 'KRO-df97ec') {
		return <img src={`/images/${identifier}.gif`} width="16" height="16" title={identifier} alt={identifier} />
	} else { 
		return <img src={`/images/${identifier}.webp`} width="16" height="16" title={identifier} alt={identifier} />
	}
}

export const PaymentView = ({
	value,
	token = 'EGLD',
	bold = false
}: {
	value: string;
	token?: string;
	bold?: boolean;
}) => {
	
	return (
		<span data-testid="denominateComponent">
			<span className={bold ? 'h3 mb-0' : ''}>{value}</span>
			<span className="symbol">&nbsp;{TokenImage(token)}</span>
		</span>
	);
};
