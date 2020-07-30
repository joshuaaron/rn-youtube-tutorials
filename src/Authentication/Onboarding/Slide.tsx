import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

type Slideprops = {
    label: string;
    right?: boolean;
};

const { width, height } = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.61 * height;

export const Slide = ({ label, right }: Slideprops) => {
    const transform = [
        { translateY: (SLIDE_HEIGHT - 100) / 2 },
        { translateX: right ? width / 2 - 50 : -width / 2 + 50 },
        { rotate: right ? '-90deg' : '90deg' },
    ];
    return (
        <View style={styles.container}>
            <View style={[styles.textContainer, { transform }]}>
                <Text style={styles.title}>{label}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
    },
    textContainer: {
        height: 100,
        justifyContent: 'center',
    },
    title: {
        fontSize: 80,
        lineHeight: 80,
        fontFamily: 'Bold',
        color: 'white',
        textAlign: 'center',
    },
});
