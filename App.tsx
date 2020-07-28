import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Animated,
    ImageSourcePropType,
} from 'react-native';
import { data, dataShape } from './data';

const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

type ItemProps = {
    imageUri: ImageSourcePropType;
    heading: string;
    index: number;
    scrollX: Animated.Value;
    description: string;
};

const Item = ({ imageUri, heading, description, scrollX, index }: ItemProps) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const inputRangeOpacity = [(index - 0.4) * width, index * width, (index + 0.4) * width]; // when image is .9 / .5 of its width, opacity should be 0.

    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
    });

    const translateXHeading = scrollX.interpolate({
        inputRange,
        outputRange: [width * 0.2, 0, -width * 0.2], // right number is when scrolling to the left (going forward). left number is when you're moving to the right
    });

    const translateXDescription = scrollX.interpolate({
        inputRange,
        outputRange: [width * 0.6, 0, -width * 0.6],
    });

    const opacity = scrollX.interpolate({
        inputRange: inputRangeOpacity,
        outputRange: [0, 1, 0],
    });

    return (
        <View style={styles.itemStyle}>
            <Animated.Image
                source={imageUri}
                style={[
                    styles.imageStyle,
                    {
                        transform: [{ scale }],
                    },
                ]}
            />
            <View style={styles.textContainer}>
                <Animated.Text
                    style={[
                        styles.heading,
                        { opacity, transform: [{ translateX: translateXHeading }] },
                    ]}
                >
                    {heading}
                </Animated.Text>
                <Animated.Text
                    style={[
                        styles.description,
                        { opacity, transform: [{ translateX: translateXDescription }] },
                    ]}
                >
                    {description}
                </Animated.Text>
            </View>
        </View>
    );
};
const Circle = ({ scrollX }: { scrollX: Animated.Value }) => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
            {data.map(({ color }, index) => {
                const inputRange = [(index - 0.55) * width, index * width, (index + 0.55) * width];
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0, 1, 0], // without clamp: [-2, -1, 0, 1, 0, -1, -2] etc
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0, 0.2, 0],
                });
                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.circle,
                            { backgroundColor: color, opacity, transform: [{ scale }] },
                        ]}
                    />
                );
            })}
        </View>
    );
};
const Ticker = ({ scrollX }: { scrollX: Animated.Value }) => {
    const inputRange = [-width, 0, width]; // prev, current, next
    const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
    });
    return (
        <View style={styles.tickerContainer}>
            <Animated.View style={{ transform: [{ translateY }] }}>
                {data.map(({ type }, i) => (
                    <Text key={i} style={styles.tickerText}>
                        {type}
                    </Text>
                ))}
            </Animated.View>
        </View>
    );
};

const Pagination = ({ scrollX }: { scrollX: Animated.Value }) => {
    const inputRange = [-width, 0, width];
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [-DOT_SIZE, 0, DOT_SIZE],
    });
    return (
        <View style={styles.pagination}>
            <Animated.View style={[styles.paginationIndicator, { transform: [{ translateX }] }]} />
            {data.map((item) => (
                <View style={styles.paginationDotContainer} key={item.key}>
                    <View style={[styles.paginationDot, { backgroundColor: item.color }]} />
                </View>
            ))}
        </View>
    );
};

export default function App() {
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <StatusBar style='auto' hidden />
            <Circle scrollX={scrollX} />
            <Animated.FlatList
                keyExtractor={(item: dataShape) => item.key}
                data={data}
                renderItem={({ item, index }: { item: dataShape; index: number }) => (
                    <Item {...item} index={index} scrollX={scrollX} />
                )}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: true,
                })}
                scrollEventThrottle={16}
            />
            <Image style={styles.logo} source={require('./assets/ue_black_logo.png')} />
            <Pagination scrollX={scrollX} />
            <Ticker scrollX={scrollX} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemStyle: {
        width,
        height,
        alignItems: 'center',
    },
    imageStyle: {
        width: width * 0.75,
        height: width * 0.75,
        resizeMode: 'contain',
        flex: 1,
    },
    textContainer: {
        alignItems: 'flex-start',
        alignSelf: 'flex-end',
        flex: 0.5,
    },
    heading: {
        color: '#444',
        textTransform: 'uppercase',
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: 5,
    },
    description: {
        color: '#ccc',
        fontWeight: '600',
        textAlign: 'left',
        width: width * 0.75,
        marginRight: 10,
        fontSize: 16,
        lineHeight: 16 * 1.5,
    },
    pagination: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        flexDirection: 'row',
        height: DOT_SIZE,
    },
    paginationDot: {
        width: DOT_SIZE * 0.3,
        height: DOT_SIZE * 0.3,
        borderRadius: DOT_SIZE * 0.15,
    },
    paginationDotContainer: {
        width: DOT_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationIndicator: {
        position: 'absolute',
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    logo: {
        opacity: 0.9,
        height: LOGO_HEIGHT,
        width: LOGO_WIDTH,
        resizeMode: 'contain',
        position: 'absolute',
        left: 10,
        bottom: 10,
        transform: [
            { translateX: -LOGO_WIDTH / 2 }, // -110px
            { translateY: -LOGO_HEIGHT / 2 }, // -20px
            { rotateZ: '-90deg' },
            { translateX: LOGO_WIDTH / 2 },
            { translateY: LOGO_HEIGHT / 2 },
        ],
    },
    tickerContainer: {
        position: 'absolute',
        left: 20,
        top: 40,
        overflow: 'hidden',
        height: TICKER_HEIGHT,
    },
    tickerText: {
        fontSize: TICKER_HEIGHT,
        lineHeight: TICKER_HEIGHT,
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontWeight: '800',
    },
    circleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        position: 'absolute',
        top: '15%',
    },
});
