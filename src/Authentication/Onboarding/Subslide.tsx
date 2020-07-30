import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../components/Button';

type SubSlideProps = {
    subTitle: string;
    desc: string;
    last?: boolean;
    onPress: () => void;
};

export const SubSlide = ({ subTitle, desc, last, onPress }: SubSlideProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.subTitle}>{subTitle}</Text>
            <Text style={styles.desc}>{desc}</Text>
            <Button
                label={last ? "Let's get started" : 'Next'}
                variant={last ? 'Primary' : 'Default'}
                {...{ onPress }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 44,
    },
    subTitle: {
        fontFamily: 'Semibold',
        fontSize: 24,
        lineHeight: 30,
        marginBottom: 12,
        textAlign: 'center',
        color: '#0C0D34',
    },
    desc: {
        fontFamily: 'Regular',
        color: '#0C0D34',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 40,
    },
});
