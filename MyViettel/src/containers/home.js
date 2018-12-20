import React, { Component } from 'react';
import { ScrollView, View, ImageBackground, Dimensions, Image, TouchableOpacity, FlatList, Platform } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, ScrollableTab, Tab, TabHeading, Tabs } from 'native-base';
let widthSize = Dimensions.get('screen').width
import dataService from '../network/dataService'
import ListPromotion from '../component/listPromotion'
let arr = [
    {
        id: 0,
        name: 'Ẩm Thực',
        icon: 'md-pizza'
    },
    {
        id: 1,
        name: 'Mua sắm',
        icon: 'ios-cart'
    },
    {
        id: 2,
        name: 'Sức khỏe',
        icon: 'ios-body'
    },
    {
        id: 3,
        name: 'Du lịch',
        icon: 'ios-car'
    },
    {
        id: 4,
        name: 'Giáo dục',
        icon: 'ios-book'
    },
    {
        id: 5,
        name: 'Hàng không',
        icon: 'ios-jet'
    },

]
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 0
        }
    }


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
        return (
            <Container style={{ backgroundColor: '#dddddd' }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[3]}
                >
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
                                            <Image style={{ width: 50, height: 50 }} source={require('../img/dollar.png')} />
                                        </TouchableOpacity>
                                        <Text style={{ color: '#333333', fontSize: 13, marginTop: 5 }} >Đổi cước</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                        >
                                            <Image style={{ width: 49, height: 49 }} source={require('../img/wifi.png')} />
                                        </TouchableOpacity>
                                        <Text style={{ color: '#333333', fontSize: 13, marginTop: 5 }} >Đổi cước</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                        >
                                            <Image style={{ width: 50, height: 50 }} source={require('../img/gift.png')} />
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


                    {/* <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 2, borderBottomColor: '#00CC99', height: 2 }} renderTabBar={() => <ScrollableTab style={{ height: 40 }} backgroundColor={'#fff'} />}>
                        {arr.map(item => {
                            return (
                                <Tab key={item.id} tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#fff' }} textStyle={{ color: '#333333' }} activeTextStyle={{ color: '#00CC99' }} heading={item.name}>
                                    <ListPromotion />
                                </Tab>
                            )
                        })}

                    </Tabs> */}
                    <View style={{ padding: 5, paddingLeft: 3, backgroundColor: '#dddddd', }}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            ref='RFList'
                            horizontal={true}
                            data={arr}
                            extraData={this.state}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => <TouchableOpacity
                                onPress={() => { this.setState({ activeTab: item.id }); this.refs.RFList.scrollToIndex({ animated: true, index, viewPocation: 10 }) }}
                                activeOpacity={1}
                                style={{ backgroundColor: (this.state.activeTab == item.id ? '#E76E26' : '#fff'), flexDirection: 'row', height: 35, padding: 5, marginLeft: 5, marginRight: 5, minWidth: widthSize / 4, justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}
                            >
                                <Icon style={{ fontSize: 15, marginRight: 5, color: this.state.activeTab == item.id ? '#fff' : null }} name={item.icon} />
                                <Text style={{ fontSize: 13, color: (this.state.activeTab == item.id ? '#fff' : '#333333') }} >{item.name}</Text>

                            </TouchableOpacity>}

                        />
                    </View>
                    <View>
                        <ListPromotion />
                    </View>



                </ScrollView>
            </Container >
        );
    }
}