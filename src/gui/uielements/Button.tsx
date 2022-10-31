import React, { CSSProperties, ReactNode } from 'react';
import { Inline } from '.';

const BUTTON_COLOR = '#6ac2e8';

const BUTTON: CSSProperties = {
    fontSize: 16,
    width: '100%'
};

const BUTTON_HOVERED: CSSProperties = {
    filter: 'brightness(90%)',
};

const BUTTON_REVERSED: CSSProperties = {
};

export default function Button(props: {
    type?: 'button' | 'submit' | 'reset';
    position?: 'single' | 'left' | 'center' | 'right';
    text?: string;
    children?: ReactNode;
    style?: CSSProperties;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    title?: string;
    reversed?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}): React.ReactElement {
    const { 
        type = 'button', position = 'single', text, children, 
        style, icon: Icon, title, reversed = false, 
        disabled = false, onClick 
    } = props;
    const [hovered, setHovered] = React.useState(false);

    return (
        <button
            type={type}
            disabled={disabled}
            className={[
                ...(reversed ? ['reversed'] : []),
                ...(position == 'left' ? ['group-button', 'left'] : []),
                ...(position == 'center' ? ['group-button', 'center'] : []),
                ...(position == 'right' ? ['group-button', 'right'] : []),
            ].join(' ')}
            style={{
                ...BUTTON,
                ...(hovered && BUTTON_HOVERED),
                ...(reversed && BUTTON_REVERSED),
                ...style,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            title={title}
            onClick={onClick}
        >
            {/* Icon */}
            {Icon && (
                <>
                    <Icon />
                    <Inline size="xxs" />
                </>
            )}

            {/* Content */}
            {text || children}
        </button>
    );
}
