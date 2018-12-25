import React, { Component } from 'react';
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Platform,
    TouchableOpacity, ImageBackground,
} from 'react-native';
import { Body, Header, List, ListItem as Item, ScrollableTab, Tab, TabHeading, Tabs, Title, Card, CardItem } from "native-base";
import ListPromotion from './listPromotion'
let widthSize = Dimensions.get('screen').width
const heightTop = 50;
export default class ScrollableHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
        };
    }
    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, heightTop],
            outputRange: [heightTop, 0],
        });
        const headerTranslate = Animated.diffClamp(this.state.scrollY, 0, 50)
            .interpolate({
                inputRange: [0, 6, 10],
                outputRange: [0, 0, -10]
            });


        return (
            <View style={styles.fill}>
                <Animated.View style={[styles.header, { height: 50, transform: [{ translateY: headerTranslate }] }]}>

                </Animated.View>

                < ScrollView
                    style={{ paddingTop: heightTop, backgroundColor: 'red' }}
                    scrollEventThrottle={16}

                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
                                listener: (e) => {
                                    console.log(e.nativeEvent.contentOffset.y)
                                }
                            }
                        )
                    }
                >
                    <View style={{ width: '100%', height: 1500 }}>

                    </View>
                </ScrollView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {

        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#03A9F4',
        overflow: 'hidden',
        width: '100%'
    },

});