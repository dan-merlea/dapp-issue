import React, { CSSProperties, SyntheticEvent } from 'react';

const INPUT: CSSProperties = {
    fontSize: 16,
    borderRadius: 8,
    height: 48,
    paddingLeft: 8,
    paddingRight: 8,
    outline: 'none',
    border: '1px solid #efefef',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '100%',
};

interface InputProps {
	value?: string;
	placeholder?: string;
	maxLength?: number;
	style?: CSSProperties;
	onChange?: (event: SyntheticEvent) => void;
}
interface InputState {}

export default class Input extends React.Component<InputProps, InputState> {

	render() {
		return (
			<input
                type="text"
                value={this.props.value}
                style={{
                    ...INPUT,
                    ...this.props.style,
                }}
                maxLength={this.props.maxLength}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
            />
		);
	}
}

