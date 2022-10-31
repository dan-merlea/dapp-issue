import React, { CSSProperties } from 'react';

const IMAGE: CSSProperties = {
	maxWidth: '100%',
};

interface ImageProps {
	style?: CSSProperties
	src: string
}

export function Image(props: ImageProps): React.ReactElement {	
	
	return (
		<img
			src={props.src}
			style={{
				...IMAGE,
				...props.style,
			}}
		/>
	);
}
