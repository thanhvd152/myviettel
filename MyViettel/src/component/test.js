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
const HEADER_MAX_HEIGHT = 350
const HEADER_MIN_HEIGHT = 60
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
const arr = [
    {
        id: 0,
        name: 'Ẩm Thực'
    },
    {
        id: 1,
        name: 'Mua sắm'
    },
    {
        id: 2,
        name: 'Sức khỏe'
    },
    {
        id: 3,
        name: 'Du lịch'
    },
    {
        id: 4,
        name: 'Giáo dục'
    },
    {
        id: 5,
        name: 'Hàng không'
    },

]
export default class ScrollableHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
        };
    }
    _renderScrollViewContent() {
        const data = Array.from({ length: 30 });
        return (
            <View style={styles.scrollViewContent}>
                {data.map((_, i) =>
                    <View key={i} style={styles.row}>
                        <Text>{i}</Text>
                    </View>
                )}
            </View>
        );
    }

    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });
        const marginTop = this.state.scrollY.interpolate({
            inputRange: [0, 210],
            outputRange: [210, -33.5],
            extrapolate: 'clamp',
        });
        const marginRight = this.state.scrollY.interpolate({
            inputRange: [0, 210],
            outputRange: [0, -90],
            extrapolate: 'clamp',
        });
        const widthWrap = this.state.scrollY.interpolate({
            inputRange: [0, widthSize],
            outputRange: [widthSize, widthSize * 0.6],
            extrapolate: 'clamp',
        });
        const scale = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0.5],
            extrapolate: 'clamp',
        });
        return (
            <View style={styles.fill}>
                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                        )
                    }
                >
                    <View style={styles.scrollViewContent}>
                        <Tabs
                            tabBarUnderlineStyle={{ borderBottomWidth: 2, borderBottomColor: '#00CC99', height: 2 }}
                            prerenderingSiblingsNumber={3}
                            renderTabBar={(props) =>
                                <ScrollableTab  {...props}
                                    style={{ height: 40 }}
                                    backgroundColor={'#fff'}
                                />
                            }
                        >
                            {arr.map(item => {
                                return (
                                    <Tab key={item.id} tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#fff' }} textStyle={{ color: '#333333' }} activeTextStyle={{ color: '#00CC99' }} heading={item.name}>
                                        <ListPromotion />
                                    </Tab>
                                )
                            })}
                        </Tabs>
                    </View>
                </ScrollView>
                <Animated.View style={[styles.header, { height: headerHeight }]}>
                    <View style={{ backgroundColor: '#ffff', width: '100%', height: 200 }}>
                        <View style={{ width: '100%', height: '75%' }}>
                            <ImageBackground
                                style={{ width: '100%', height: '95%' }}
                                source={{ uri: 'http://dantri4.vcmedia.vn/tI0YUx18mEaF5kMsGHJ/Image/2011/12/Green-Field-8_b0d52.jpg' }} >
                                <View style={{ position: 'absolute', left: widthSize / 3.5, bottom: 15 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>Nguyễn Hồng Linh</Text>
                                    <Text style={{ color: '#fff', fontSize: 14 }} >Hội viên chưa đạt hạng</Text>
                                    <Text style={{ color: '#fff', fontSize: 14 }} >Chu kỳ: 01/01/2018 - 01/01/2019</Text>
                                </View>
                            </ImageBackground>
                            <View style={{ backgroundColor: 'green', width: widthSize / 5, height: widthSize / 5, position: 'absolute', bottom: 0, left: 15, borderRadius: widthSize / 5 / 2, overflow: 'hidden', borderColor: '#fff', borderWidth: 1 }}>
                                <Image
                                    style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
                                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQylIxEFeXd1ScQ7kvyxSwT8CxtcbZ_l3jPuz2voRkZE95WaUt0oA' }}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', height: '25%' }}>
                            <View style={{ flex: 1.5, }} >
                                <Image
                                    style={{ width: '50%', height: 40, resizeMode: 'stretch', alignSelf: 'center' }}
                                    source={{ uri: 'https://www.pngarts.com/files/3/VIP-Transparent.png' }}
                                />
                            </View>
                            <View style={{ flex: 2, }} >
                                <Text style={{ fontSize: 12 }}>ĐIỂM XẾP HẠNG</Text>
                                <Text style={{ fontWeight: 'bold', color: '#00CC99', fontSize: 18 }} >770</Text>
                            </View>
                            <View style={{ flex: 2, }} >
                                <Text style={{ fontSize: 12 }}>ĐIỂM QUY ĐỔI</Text>
                                <Text style={{ fontWeight: 'bold', color: '#00CC99', fontSize: 18 }} >0</Text>

                            </View>
                        </View>

                    </View>

                    <Animated.View
                        style={{
                            width: widthSize,
                            padding: 5,
                            position: 'absolute',
                            top: marginTop,
                            right: marginRight,
                            transform: [{ scale: scale }]
                        }}
                    >
                        <Card style={{ borderRadius: 8 }}>
                            <CardItem style={{ borderRadius: 8 }}>
                                <Body style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                        >
                                            <Image style={{ width: 60, height: 60 }} source={require('../img/dollar.png')} />
                                        </TouchableOpacity>
                                        <Text style={{ color: '#333333', fontSize: 13, marginTop: 5 }} >Đổi cước</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                        >
                                            <Image style={{ width: 60, height: 60 }} source={require('../img/wifi.png')} />
                                        </TouchableOpacity>
                                        <Text style={{ color: '#333333', fontSize: 13, marginTop: 5 }} >Đổi cước</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                        >
                                            <Image style={{ width: 60, height: 60 }} source={require('../img/gift.png')} />
                                        </TouchableOpacity>
                                        <Text style={{ color: '#333333', fontSize: 13, marginTop: 5 }} >Đổi cước</Text>
                                    </View>
                                </Body>

                            </CardItem>
                        </Card>
                    </Animated.View>
                </Animated.View>
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#03A9F4',
        overflow: 'hidden',
    },
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },
});