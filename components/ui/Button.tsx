import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { IconSymbol, IconSymbolName } from './IconSymbol';

interface ButtonProps {
    title: string;
    size?: 'small' | 'medium' | 'large';
    color?: string;
    textColor?: string;
    border?: string;
    icon?: IconSymbolName;
    onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, size = 'medium', color , icon, onPress , textColor = '#fff', border}) => {
    const getSizeStyle = (): { button: ViewStyle; text: TextStyle } => {
        switch (size) {
            case 'small':
                return { button: { padding: 8 }, text: { fontSize: 14 } };
            case 'large':
                return { button: { padding: 16 }, text: { fontSize: 18 } };
            default:
                return { button: { padding: 12 }, text: { fontSize: 16 } };
        }
    };

    const sizeStyle = getSizeStyle();

    return (
        <TouchableOpacity
            style={[styles.button, sizeStyle.button, { backgroundColor: color, borderWidth: border ? 1 : 0, borderColor: border }]}
            onPress={onPress}
        >
            <Text style={[styles.text, sizeStyle.text, { color: textColor }]}>{title}</Text>
            {icon && <IconSymbol name={icon} size={sizeStyle.text.fontSize} color={textColor} style={styles.icon} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 8,
        marginLeft: 8,
    },
});

export default Button;