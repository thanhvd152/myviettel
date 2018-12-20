import React, { Component } from "react";
import { Animated, Dimensions, Platform, Text, TouchableOpacity, View, ImageBackground, Image, FlatList } from "react-native";
import { Body, Header, List, ListItem as Item, ScrollableTab, Tab, TabHeading, Tabs, Title, Card, CardItem, Right, Icon } from "native-base";
import ListPromotion from '../component/listPromotion'
import dataService from '../network/dataService';

let arr = [
    {
        id: 1,
        name: 'Ẩm Thực',
        icon: 'md-pizza'
    },
    {
        id: 2,
        name: 'Mua sắm',
        icon: 'ios-cart'
    },
    {
        id: 3,
        name: 'Sức khỏe',
        icon: 'ios-body'
    },
    {
        id: 4,
        name: 'Du lịch',
        icon: 'ios-car'
    },
    {
        id: 5,
        name: 'Giáo dục',
        icon: 'ios-book'
    },
    {
        id: 6,
        name: 'Hàng không',
        icon: 'ios-jet'
    },

]

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = 570;
const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = "#00A79E";
const FADED_THEME_COLOR = "#00A79E";
let widthSize = Dimensions.get('screen').width
export default class Home extends Component {

    constructor(props) {
        super(props)
        this.nScroll.addListener(Animated.event([{ value: this.scroll }], { useNativeDriver: false }));

        this.state = {
            tabSelect: 0,
            dataHot: []
        }
    }

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
    txtHead = this.scroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
        outputRange: ["transparent", "transparent", '#fff'],
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

    componentDidMount() {
        this.getDataHot()
    }


    async getDataHot() {
        let rs = await dataService.getListPromotions(0, 5, -1, 'percent,stamp,billPoint,giftPoint', 'new');
        console.log(rs, '???')
        this.setState({
            dataHot: rs.data,
        });
    }


    render() {
        console.log(this.nScroll)
        return (
            <View style={{ backgroundColor: '#dddddd' }}>
                <Animated.View style={{ position: "absolute", width: "100%", backgroundColor: this.headerBg, zIndex: 1 }}>
                    <Header
                        androidStatusBarColor={'#007770'}
                        style={{ backgroundColor: "transparent", margin: 0, height: 50 }} >
                        <Body>
                            <Animated.Text style={{ color: this.txtHead, fontWeight: 'bold', fontSize: 18 }}>
                                Ưu đãi - Tích điểm
                            </Animated.Text>
                        </Body>
                    </Header>
                </Animated.View>
                <Animated.ScrollView
                    scrollEventThrottle={5}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.nScroll } } }], { useNativeDriver: true })}
                    style={{ zIndex: 0 }}>
                    <Animated.View style={{
                        // transform: [{ translateY: Animated.multiply(this.nScroll, 0.65) }, { scale: this.imgScale }],

                    }}>
                        <Animated.View
                            style={{ height: IMAGE_HEIGHT, width: "100%" }}>
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
                                        <Text style={{ fontWeight: 'bold', color: '#00A79E', fontSize: 18 }} >770</Text>
                                    </View>
                                    <View style={{ flex: 2, }} >
                                        <Text style={{ fontSize: 12 }}>ĐIỂM QUY ĐỔI</Text>
                                        <Text style={{ fontWeight: 'bold', color: '#00A79E', fontSize: 18 }} >0</Text>

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
                            <View style={{ width: widthSize, backgroundColor: '#fff', height: 230 }}>
                                <CardItem  >
                                    <Body>
                                        <Text style={{ fontWeight: Platform.OS == 'ios' ? 'bold' : '500', color: '#111111' }}>
                                            Voucher nổi bật
                                </Text>
                                    </Body>
                                    <Right >
                                        {/* <Text onPress={() => { this.props.navigation.navigate('voucher') }} style={{ textAlign: 'right', color: '#00A79E', height: 20 }}>Xem thêm <Icon style={{ fontSize: 14, color: '#00A79E' }} name='ios-arrow-forward' /> </Text> */}
                                    </Right>
                                </CardItem>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.id + ''}
                                    style={{ alignSelf: 'center', }}
                                    horizontal={true}
                                    data={this.state.dataHot}
                                    renderItem={({ item }) => <TouchableOpacity
                                        onPress={() => { }}
                                        style={{
                                            width: widthSize / 1.5,
                                            padding: 10,
                                        }}
                                    >
                                        <View style={{ borderRadius: 10, overflow: 'hidden', }}>
                                            <Image
                                                style={{ height: widthSize / 3, borderRadius: 10, }}
                                                source={{ uri: (item.images ? item.images[0] : 'https://') }}
                                            />
                                        </View>

                                        <Text numberOfLines={2} ellipsizeMode='tail' allowFontScaling={false} style={{ fontWeight: Platform.OS == 'ios' ? 'bold' : '500', fontSize: 13 }}>{item.name} </Text>


                                    </TouchableOpacity>}
                                />
                            </View>
                        </Animated.View>

                    </Animated.View>


                    <Tabs
                        onChangeTab={(e, i) => { this.setState({ tabSelect: e.i }) }}
                        tabBarUnderlineStyle={{ borderBottomWidth: 2, borderBottomColor: '#00A79E', height: 2 }}
                        prerenderingSiblingsNumber={3}
                        renderTabBar={(props) => <Animated.View
                            style={{ transform: [{ translateY: this.tabY }], zIndex: 1, width: "100%", backgroundColor: "white", }}>
                            <ScrollableTab  {...props}
                                style={{ height: 40 }}
                                backgroundColor={'#fff'}
                            />
                        </Animated.View>}
                    >
                        {arr.map((item, index) => {
                            return (
                                <Tab key={item.id} tabStyle={{ backgroundColor: '#fff' }} heading={<TabHeading style={{ backgroundColor: '#fff' }}><Icon name={item.icon} style={{ color: this.state.tabSelect == index ? '#00A79E' : '#333333', fontSize: 20, marginRight: 10, }} /><Text style={{ color: this.state.tabSelect == index ? '#00A79E' : '#333333' }}>{item.name}</Text></TabHeading>}>

                                    <ListPromotion category={item.id} />

                                </Tab>
                            )
                        })}

                    </Tabs>
                </Animated.ScrollView>
            </View>
        )
    }
}