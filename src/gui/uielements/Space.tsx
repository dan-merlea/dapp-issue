import React from 'react';

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

interface SpaceProps {
	size: SizeNames
}
interface SpaceState {}

export default class Space extends React.Component<SpaceProps, SpaceState> {

	render() {
		return <div style={{ height: SIZES[this.props.size], minHeight: SIZES[this.props.size] }} />;
	}
}

