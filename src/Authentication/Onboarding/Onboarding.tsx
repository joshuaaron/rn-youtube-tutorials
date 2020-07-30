import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { multiply } from 'react-native-reanimated';
import { useValue, onScrollEvent, interpolateColor } from 'react-native-redash';
import { Slide, SLIDE_HEIGHT } from './Slide';
import { SubSlide } from './Subslide';

const { width } = Dimensions.get('window');

const BORDER_RADIUS = 75;
const slides = [
    {
        title: 'Relaxed',
        color: '#BFEAF5',
        subTitle: 'Find Your Outfits',
        desc: "Confused about your outfit? Don't worry! Find the best outfit here",
    },
    {
        title: 'Playful',
        color: '#BEECC4',
        subTitle: 'Hear it First, Wear it First',
        desc: 'Hating the clothes in your wardrobe? Explore hundreds of outfit ideas',
    },
    {
        title: 'Eccentric',
        color: '#FFE4D9',
        subTitle: 'Your Style, Your Way',
        desc: 'Create your individual & unique style and look amazing every day',
    },
    {
        title: 'Funky',
        color: '#FFDDDD',
        subTitle: 'Look Good, Feel Good',
        desc: 'Discover the latest trends in fashion and explore your personality',
    },
];

export const Onboarding = () => {
    const scroll = React.useRef<Animated.ScrollView>(null);
    const x = useValue(0);
    const onScroll = onScrollEvent({ x });
    const backgroundColor = interpolateColor(x, {
        inputRange: slides.map((_, i) => i * width),
        outputRange: slides.map((slide) => slide.color),
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, { backgroundColor }]}>
                <Animated.ScrollView
                    ref={scroll}
                    horizontal
                    snapToInterval={width}
                    decelerationRate='fast'
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    scrollEventThrottle={1}
                    {...{ onScroll }}
                >
                    {slides.map(({ title }, index) => (
                        <Slide key={index} {...{ label: title }} right={!!(index % 2)} />
                    ))}
                </Animated.ScrollView>
            </Animated.View>
            <View style={styles.footer}>
                <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor }} />
                <Animated.View
                    style={[
                        styles.footerContent,
                        {
                            width: width * slides.length - 1,
                            transform: [{ translateX: multiply(x, -1) }],
                        },
                    ]}
                >
                    {slides.map(({ subTitle, desc }, index) => (
                        <SubSlide
                            key={index}
                            {...{ subTitle, desc, x }}
                            last={index === slides.length - 1}
                            onPress={() => {
                                if (scroll.current) {
                                    scroll.current
                                        .getNode()
                                        .scrollTo({ x: width * (index + 1), animated: true });
                                }
                            }}
                        />
                    ))}
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    slider: {
        height: SLIDE_HEIGHT,
        backgroundColor: 'cyan',
        borderBottomRightRadius: BORDER_RADIUS,
    },
    footer: {
        flex: 1,
        // bor,
    },
    footerContent: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopLeftRadius: BORDER_RADIUS,
    },
});
