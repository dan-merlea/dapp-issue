import React, { CSSProperties } from 'react';
import { View } from 'gui/uielements';
import { isMobile } from 'react-device-detect';
import { useHover } from 'hooks';

const VIEW_HEIGHT = 56;

/**
 * Render the health of the player.
 */
export function Container(props: {
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    onHovered?: (hovered: boolean) => void;
    onClick?: () => void;
}) {
    const { children, className, style, onHovered, onClick } = props;
    const [ref, hovered] = useHover();

    React.useEffect(() => {
        if (onHovered) {
            onHovered(hovered);
        }
    }, [hovered, onHovered]);

    return (
        <View
            forwardRef={ref}
            className={className}
            style={{
                ...styles.container,
                ...(isMobile ? { padding: 8, minHeight: 0 } : {}),
                ...style,
            }}
            onClick={onClick}
        >
            {children}
        </View>
    );
}

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        minHeight: VIEW_HEIGHT,
    },
};
