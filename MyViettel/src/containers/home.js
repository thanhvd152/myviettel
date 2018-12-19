import React, { Component } from "react";
import {
    Animated, Dimensions, Platform, Text,
    TouchableOpacity, View, ImageBackground, Image,
    Modal
} from "react-native";
import { Body, Header, List, ListItem as Item, ScrollableTab, Tab, TabHeading, Tabs, Title, Card, CardItem } from "native-base";
import ListPromotion from '../component/listPromotion'
let arr = [
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

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = 330;
const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = "#00CC99";
const FADED_THEME_COLOR = "#00CC99";
let widthSize = Dimensions.get('screen').width
export default class Home extends Component {
    nScroll = new Animated.Value(0);
    scroll = new Animated.Value(0);
    textColor = this.scroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
        outputRange: [THEME_COLOR, FADED_THEME_COLOR, "white"],
        extrapolate: "clamp"
    });
    tabY = this.nScroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
        outputRange: [0, 0, 1]
    });
    headerBg = this.scroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
        outputRange: ["transparent", "transparent", THEME_COLOR],
        extrapolate: "clamp"
    });
    imgScale = this.nScroll.interpolate({
        inputRange: [-25, 0],
        outputRange: [1.1, 1],
        extrapolateRight: "clamp"
    });
    imgOpacity = this.nScroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT],
        outputRange: [1, 0],
    });



    constructor(props) {
        super(props);
        this.nScroll.addListener(Animated.event([{ value: this.scroll }], { useNativeDriver: false }));
    }

    render() {
        return (
            <View style={{ backgroundColor: '#dddddd' }}>
                <Animated.View style={{ position: "absolute", width: "100%", backgroundColor: this.headerBg, zIndex: 1 }}>
                    <Header
                        androidStatusBarColor={'#007770'}
                        style={{ backgroundColor: "transparent", margin: 0, height: 50 }} >
                        <Body>
                            <Title>

                            </Title>
                        </Body>
                    </Header>
                </Animated.View>
                <Animated.ScrollView
                    scrollEventThrottle={5}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.nScroll } } }], { useNativeDriver: true })}
                    style={{ zIndex: 0 }}>
                    <Animated.View style={{
                        transform: [{ translateY: Animated.multiply(this.nScroll, 0.65) }, { scale: this.imgScale }],

                    }}>
                        <Animated.View
                            style={{ height: IMAGE_HEIGHT, width: "100%", opacity: this.imgOpacity }}>
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

                            <View style={{ width: widthSize, padding: 5 }}>
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
                            </View>
                        </Animated.View>
                    </Animated.View>
                    <Tabs
                        tabBarUnderlineStyle={{ borderBottomWidth: 2, borderBottomColor: '#00CC99', height: 2 }}
                        prerenderingSiblingsNumber={3}
                        renderTabBar={(props) => <Animated.View
                            style={{ transform: [{ translateY: this.tabY }], zIndex: 1, width: "100%", backgroundColor: "white", }}>
                            <ScrollableTab  {...props}
                                style={{ height: 40 }}
                                backgroundColor={'#fff'}
                            />
                        </Animated.View>}
                    >
                        {arr.map(item => {
                            return (
                                <Tab key={item.id} tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#fff' }} textStyle={{ color: '#333333' }} activeTextStyle={{ color: '#00CC99' }} heading={item.name}>

                                    <ListPromotion />

                                </Tab>
                            )
                        })}

                    </Tabs>
                </Animated.ScrollView>
            </View>
        )
    }
}