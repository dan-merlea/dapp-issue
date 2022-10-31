import { Types } from '@krogan/common';
import React, { CSSProperties } from 'react';

const COMP_STYLE: CSSProperties = {
    fontSize: 16,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    border: '1px solid #efefef',
    boxSizing: 'border-box',
};

const COMP_STYLE_SELECTED: CSSProperties = {
    background: '#aaaaaa',
	border: '1px solid red',
};

interface NftCheckboxProps {
	nft: Types.ESDTToken;
	style?: CSSProperties;
	selected?: boolean;
	onClick: (nft: Types.ESDTToken) => void;
}

export const NftCheckbox = ({
	nft,
	style,
	selected,
	onClick,
}: NftCheckboxProps): React.ReactElement => {

	return (
		<div
			style={selected ? {
				...COMP_STYLE,
				...style,
				...COMP_STYLE_SELECTED,
			} : {
				...COMP_STYLE,
				...style,
			}} 
			onClick={() => {
				onClick(nft)
			}}
		>
			<img src={nft.url} style={{ maxWidth: '100%'}} alt={`${nft.collection} #${nft.nonce}`} />
			<p>{nft.name}</p>
			<p>{selected ? 'Selected' : 'Not selected'}</p>
		</div>
	)
}

