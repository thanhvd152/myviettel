import React, { Component } from 'react';
import { Container, Button, Text } from 'native-base';
import { ScrollView, View, Animated } from 'react-native'
const HEADER_MAX_HEIGHT = 200
const HEADER_MIN_HEIGHT = 50
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
export default class GeneralExample extends Component {
    nscrollY = new Animated.Value(0)
    scrollY = new Animated.Value(0)

    constructor(props) {
        super(props)
        this.scrollY.addListener(Animated.event([{ value: this.nscrollY }], { useNativeDriver: false }));

    }

    render() {

        const headerHeight = this.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });

        const bgHeader = this.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: ['red', '#fff'],
            extrapolate: 'clamp',
        });

        // const bgIm = this.scrollY.interpolate({
        //     inputRange: [0, HEADER_SCROLL_DISTANCE],
        //     outputRange: ['red', '#fff'],
        //     extrapolate: 'clamp',
        // });



        const scale = this.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0.3],
            extrapolate: 'extrapolateRight',
        });
        const tabY = this.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 1000],
            extrapolate: 'clamp',
        });
        const marginTop = this.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MIN_HEIGHT, 0],
            extrapolate: 'clamp',
        });

        const marginRight = this.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [100, 0],
            extrapolate: 'clamp',
        });

        const tranY = this.scrollY.interpolate({
            inputRange: [0, 60],
            outputRange: [0, -60],
            extrapolateRight: 'clamp'

        });
        const tranYY = this.scrollY.interpolate({
            inputRange: [0, 60, 61],
            outputRange: [0, 0, 1],


        });


        return (
            <Container>


                {/* <Animated.View style={{ backgroundColor: bgHeader, height: headerHeight, width: '100%' }} >

                </Animated.View>
                <Animated.View style={{ flexDirection: 'row', position: 'absolute', zIndex: 100, width: 100, height: 50, backgroundColor: 'blue', top: marginTop, right: marginRight }}  >

                </Animated.View> */}

                <Animated.View style={{ height: headerHeight, backgroundColor: 'blue', position: 'absolute', zIndex: 1, height: 60, width: '100%', transform: [{ translateY: tranY }] }} >

                </Animated.View>
                <Animated.ScrollView
                    style={{ paddingTop: 60 }}
                    ref='myref'
                    // onScrollEndDrag={(event) => { if (event.nativeEvent.contentOffset.y > 150 && event.nativeEvent.contentOffset.y < 240) { this.refs.myref.scrollTo({ x: 0, y: 240, animated: true }) } if (event.nativeEvent.contentOffset.y < 150) { this.refs.myref.scrollTo({ x: 0, y: 0, animated: true }) } }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.scrollY } } }], { useNativeDriver: true }, { listener: (event) => { } }

                    )}
                >
                    <Text>aaaaa</Text>
                    <View style={{ backgroundColor: 'green', height: 1000, width: '100%' }} >
                        <Animated.View style={{ backgroundColor: 'red', width: '100%', height: 40, transform: [{ translateY: tranYY }] }} ></Animated.View>
                    </View>
                </Animated.ScrollView>
            </Container>
        );
    }
}