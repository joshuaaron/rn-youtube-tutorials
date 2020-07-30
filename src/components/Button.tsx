import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

type ButtonProps = {
    variant: 'Default' | 'Primary';
    label: string;
    onPress: () => void;
};

export const Button = ({ variant = 'Default', label, onPress }: ButtonProps) => {
    const backgroundColor = variant === 'Primary' ? '#2CB9B0' : 'rgba(12, 13, 52, 0.05)';
    const color = variant === 'Primary' ? 'white' : '#0C0D34';

    return (
        <RectButton style={[styles.container, { backgroundColor }]} {...{ onPress }}>
            <Text style={[styles.label, { color }]}>{label}</Text>
        </RectButton>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        width: 245,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Regular',
    },
});
