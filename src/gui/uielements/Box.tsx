import React, { CSSProperties, ReactNode } from 'react';

const BOX: CSSProperties = {
    background: '#032C32',
    overflow: 'hidden',
};

const POPUP: CSSProperties = {
	maxHeight: '100%',
	width: 520,
	overflowY: 'scroll',
}

interface BoxProps {
	style?: CSSProperties
	popup?: boolean
	children: ReactNode
}
interface BoxState {}

export default class Box extends React.Component<BoxProps, BoxState> {

	render() {
		return (
			<div
				className="box"
				style={{
					...BOX,
					...(this.props.popup && POPUP),
					...this.props.style,
				}}
			>
				{this.props.children}
			</div>
		);
	}
}

