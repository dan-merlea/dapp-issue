import React, { ReactNode } from 'react';

const SIZES = {
    thin: 4,
    xxs: 8,
    xs: 16,
    s: 24,
    m: 32,
    l: 48,
    xl: 64,
    xxl: 96,
    giant: 128,
};

type SizeNames = 'thin' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'giant';

interface InlineProps {
    size: SizeNames
    children?: ReactNode
}
interface InlineState {}

export default class Inline extends React.Component<InlineProps, InlineState> {
	render() {
		return <span style={{ width: SIZES[this.props.size], minWidth: SIZES[this.props.size] }}>{this.props.children}</span>
	}
}
