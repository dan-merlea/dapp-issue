import React, { CSSProperties } from 'react';

export type TextType = 'title' | 'body' | 'alt'

const TEXT: CSSProperties = {};

interface TextProps {
	children: React.ReactNode
	type: TextType
	center?: boolean
	style?: CSSProperties
}

export function Text(props: TextProps): React.ReactElement {	
	
	return (
		<p
			style={{
				...TEXT,
				...props.style,
				...(props.center && styles.center),
				...(props.type == 'title' && styles.sectionTitle),
				...(props.type == 'alt' && styles.sectionAlt),
				...(props.type == 'body' && styles.sectionBody),
			}}
		>
			{props.children}
		</p>
	);
}

const styles: { [key: string]: CSSProperties } = {
    sectionTitle: {
        color: '#F3F3F3',
        fontSize: 18,
    },
    sectionAlt: {
        color: '#D5D5D5',
    },
    sectionBody: {
        color: '#EEEEEE',
    },
	center: {
        textAlign: 'center',
    },
};
