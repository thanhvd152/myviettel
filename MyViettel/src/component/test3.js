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
        this.nscrollY.addListener(Animated.event([{ value: this.scrollY }], { useNativeDriver: false }));
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


        return (
            <Container>


                <Animated.View style={{ backgroundColor: bgHeader, height: headerHeight, width: '100%' }} >

                </Animated.View>
                <Animated.View style={{ flexDirection: 'row', position: 'absolute', zIndex: 100, width: 100, height: 50, backgroundColor: 'blue', top: marginTop, right: marginRight }}  >

                </Animated.View>
                <ScrollView
                    ref='myref'
                    onScrollEndDrag={(event) => { if (event.nativeEvent.contentOffset.y > 150 && event.nativeEvent.contentOffset.y < 240) { this.refs.myref.scrollTo({ x: 0, y: 240, animated: true }) } if (event.nativeEvent.contentOffset.y < 150) { this.refs.myref.scrollTo({ x: 0, y: 0, animated: true }) } }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                        // { listener: (event, gestureState) => { if (event.nativeEvent.contentOffset.y > HEADER_MAX_HEIGHT / 2) { this.refs.myref.scrollTo({ x: 0, y: 200, animated: true }) } } }
                    )}
                >
                    <Animated.View style={{ backgroundColor: bgHeader, height: 200, width: '100%' }} >

                    </Animated.View>
                    <View style={{ backgroundColor: 'green', height: 1000, width: '100%' }} ></View>
                </ScrollView>
            </Container>
        );
    }
}