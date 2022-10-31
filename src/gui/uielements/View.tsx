import React, { CSSProperties, ReactNode } from 'react';

const FLEX: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexBasis: 0,
};

const CENTER_FLEX: CSSProperties = {
    justifyContent: 'center',
};

const CENTER_TEXT: CSSProperties = {
    textAlign: 'center',
};

const COLUMN_FLEX: CSSProperties = {
    flexDirection: 'column',
};

const FULLSCREEN: CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
};

const BACKDROP: CSSProperties = {
    backgroundColor: 'rgba(0,0,0,0.5)',
};

const POPUP: CSSProperties = {
    position: 'fixed',
    padding: 16,
    zIndex: 1000,
}

const FLEX_EQUAL: CSSProperties = {
	flexGrow: '1',
    flexBasis: '0',
}

interface ViewProps {
    forwardRef?: React.Ref<HTMLDivElement>
	flex?: boolean
	center?: boolean
    textCenter?: boolean
	column?: boolean
	fullscreen?: boolean
	backdrop?: boolean
    popup?: boolean
    flexEqual?: boolean
	children: ReactNode
	style?: CSSProperties
    className?: string
	onMouseEnter?: () => void
	onMouseLeave?: () => void
	onClick?: () => void
}
interface ViewState {}

export default class View extends React.Component<ViewProps, ViewState> {

	render() {
		return (
			<div
                ref={this.props.forwardRef}
                className={this.props.className}
                style={{
                    ...(this.props.flex && FLEX),
                    ...(this.props.center && CENTER_FLEX),
                    ...(this.props.textCenter && CENTER_TEXT),
                    ...(this.props.column && COLUMN_FLEX),
                    ...(this.props.fullscreen && FULLSCREEN),
                    ...(this.props.backdrop && BACKDROP),
                    ...(this.props.popup && POPUP),
					...(this.props.flexEqual && FLEX_EQUAL),
                    ...this.props.style,
                }}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </div>
		);
	}
}