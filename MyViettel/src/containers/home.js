import React, { Component } from 'react';
import { ScrollView, View, ImageBackground, Dimensions, Image, TouchableOpacity, FlatList, Platform, Modal, TextInput, Keyboard } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, ScrollableTab, Tab, TabHeading, Tabs } from 'native-base';
let widthSize = Dimensions.get('screen').width
import dataService from '../network/dataService'
import ListPromotion from '../component/listPromotion'
import { NavigationActions } from 'react-navigation'
import * as Animatable from 'react-native-animatable';
import SplashScreen from 'react-native-splash-screen'

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
        id: 5,
        name: 'Hàng không',
        icon: 'ios-jet'
    },

]
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 0,
            modalData: false,
            showbtClose: true,
            modalChangeData: false,
            idData: null,
            modalGift: false,
            cateSelect: 1,
            cuoc: 0
        }
    }

    componentWillMount() {
        SplashScreen.hide()
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    }
    componentWillUnmount() {
        this.keyboardWillShowSub.remove()
        this.keyboardWillHideSub.remove()
    }
    keyboardWillShow = event => {
        this.setState({
            showbtClose: false
        })
    }
    keyboardWillHide = event => {
        this.setState({
            showbtClose: true
        })
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
    active(id) {
        this.setState({ idData: id })
    }
    renderModalData() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalData}
                onRequestClose={() => { this.setState({ modalData: false }) }}>
                <Container style={{
                    backgroundColor: 'rgba(1,1,1,0.3)', justifyContent: 'center', alignItems: 'center',
                }}>
                    {this.state.showbtClose ?
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                                position: 'absolute', zIndex: 10, right: "2%", top: "15%",
                                backgroundColor: 'white', width: 35, height: 35, borderRadius: 17.5,
                                justifyContent: 'center', alignItems: 'center'
                            }}
                            onPress={() => this.setState({ modalData: false })}
                        >
                            <Icon type='Ionicons' name='md-close' style={{ color: '#9E9E9E', fontSize: 22 }} />
                        </TouchableOpacity> : null}
                    <Animatable.View animation="zoomIn" duration={300} iterationCount={1} direction="alternate" style={{ width: '90%', height: Dimensions.get('window').height * 0.65, backgroundColor: 'white', borderRadius: 15, overflow: 'hidden' }}>
                        <View style={{ padding: 12, backgroundColor: '#26918b' }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>ĐỔI ĐIỂM NHẬN CƯỚC</Text>
                        </View>
                        <View style={{ backgroundColor: '#45ada9', padding: 10 }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Điểm đổi cước của bạn</Text>
                            <Text style={{ textAlign: 'center', color: 'white', marginTop: 4, fontSize: 20 }}>400</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', marginTop: 5 }}>Số cước bạn nhận được</Text>
                            <Text style={{ textAlign: 'center', marginTop: 4, fontSize: 28, color: '#ff7000' }}>
                                {(Number(this.state.cuoc) * 20).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</Text>
                            <View style={{
                                flexDirection: 'row', borderWidth: 2, width: '85%',
                                alignItems: 'center', borderRadius: 5,
                                borderColor: '#60bbb7', marginTop: 18
                            }}>
                                <View style={{ flex: 8, paddingLeft: 5, paddingRight: 5, borderRightWidth: 2, borderColor: '#60bbb7' }}>
                                    <TextInput
                                        placeholder="Nhập điểm"
                                        underlineColorAndroid='transparent'
                                        keyboardType={'numeric'}
                                        onChangeText={(txt) => { this.setState({ cuoc: txt }) }}
                                    />
                                </View>
                                <View style={{ flex: 2.5, }}>
                                    <Text style={{ textAlign: 'center' }}>Điểm</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{ padding: 15, borderRadius: 25, backgroundColor: '#ff7000', width: '55%', alignSelf: 'center', marginTop: 20 }}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>ĐỔI ĐIỂM</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </Container>
            </Modal>
        )
    }
    renderModalChangeData() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalChangeData}
                onRequestClose={() => { this.setState({ modalChangeData: false }) }}>
                <Container style={{
                    backgroundColor: 'rgba(1,1,1,0.3)', justifyContent: 'center', alignItems: 'center',
                }}>
                    {this.state.showbtClose ?
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                                position: 'absolute', zIndex: 10, right: "2%", top: "15%",
                                backgroundColor: 'white', width: 35, height: 35, borderRadius: 17.5,
                                justifyContent: 'center', alignItems: 'center'
                            }}
                            onPress={() => this.setState({ modalChangeData: false })}
                        >
                            <Icon type='Ionicons' name='md-close' style={{ color: '#9E9E9E', fontSize: 22 }} />
                        </TouchableOpacity> : null}
                    <Animatable.View animation="zoomIn" duration={300} iterationCount={1} direction="alternate" style={{ width: '90%', height: Dimensions.get('window').height * 0.65, backgroundColor: 'white', borderRadius: 15, overflow: 'hidden' }}>
                        <View style={{ padding: 12, backgroundColor: '#26918b' }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>ĐỔI ĐIỂM NHẬN DATA</Text>
                        </View>
                        <View style={{ backgroundColor: '#45ada9', padding: 10 }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Điểm đổi data của bạn</Text>
                            <Text style={{ textAlign: 'center', color: 'white', marginTop: 4, fontSize: 20 }}>400</Text>
                        </View>
                        <View style={{}}>
                            <TouchableOpacity
                                activeOpacity={0.4}
                                style={{ padding: 15, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => this.active(1)}
                            >
                                <View style={{ flex: 7 }}>
                                    <Text style={{ color: '#45ada9', fontWeight: '600' }}>Gói PRI20</Text>
                                    <Text >1000 điểm = 300 MB</Text>
                                </View>
                                {this.state.idData == 1 ? <Icon type='Entypo' name='check' style={{ color: '#45ada9' }} /> : null}
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.4}
                                style={{ padding: 15, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => this.active(2)}
                            >
                                <View style={{ flex: 7 }}>
                                    <Text style={{ color: '#45ada9', fontWeight: '600' }}>Gói PRI90</Text>
                                    <Text >2000 điểm = 900 MB</Text>
                                </View>
                                {this.state.idData == 2 ? <Icon type='Entypo' name='check' style={{ color: '#45ada9' }} /> : null}
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{ padding: 15, borderRadius: 25, backgroundColor: '#ff7000', width: '55%', alignSelf: 'center', marginTop: 20 }}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>ĐỔI DATA</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </Container>
            </Modal>
        )
    }
    renderModalGift() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalGift}
                onRequestClose={() => { this.setState({ modalGift: false }) }}>
                <Container style={{
                    backgroundColor: 'rgba(1,1,1,0.3)', justifyContent: 'center', alignItems: 'center',
                }}>


                    <Animatable.View animation="zoomIn" duration={300} iterationCount={1} direction="alternate" style={{ width: '90%', backgroundColor: 'white', borderRadius: 15, overflow: 'hidden', paddingBottom: 30 }}>
                        <View style={{ padding: 12, backgroundColor: '#26918b' }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>ĐỔI ĐIỂM NHẬN QUÀ</Text>
                            {this.state.showbtClose ?
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{
                                        position: 'absolute', zIndex: 10, right: 0, top: 0,
                                        backgroundColor: 'white', width: 35, height: 35, borderRadius: 17.5,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}
                                    onPress={() => this.setState({ modalGift: false })}
                                >
                                    <Icon type='Ionicons' name='md-close' style={{ color: '#9E9E9E', fontSize: 22 }} />
                                </TouchableOpacity> : null}
                        </View>
                        <View style={{ backgroundColor: '#45ada9', padding: 10 }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Điểm đổi quà của bạn</Text>
                            <Text style={{ textAlign: 'center', color: 'white', marginTop: 4, fontSize: 20 }}>600</Text>
                        </View>
                        <View style={{ padding: 15 }}>
                            <Text style={{ fontWeight: '500', textAlign: 'center', marginTop: 10, color: '#26918b' }}>HÀNG NGÀN QUÀ TẶNG HẤP DẪN ĐANG CHỜ BẠN</Text>
                            <Text style={{ textAlign: 'center', marginTop: 8 }}>Vui lòng ấn ĐỔI ĐIỂM để chọn quà!</Text>
                        </View>
                        <Image source={require('../img/gift.jpg')} style={{ width: Dimensions.get('screen').height / 5, height: Dimensions.get('screen').height / 5, alignSelf: 'center', resizeMode: 'contain' }} />
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{ padding: 15, borderRadius: 25, backgroundColor: '#ff7000', width: '55%', alignSelf: 'center', marginTop: 20 }}
                            onPress={() => this.setState({ modalGift: false }, () => { this.props.navigation.navigate('tabExgift', { promotionType: 'gift,giftAnother,exchange', name: 'Quà tặng', tabIndex: 'exchange' }) })}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>ĐỔI ĐIỂM</Text>
                        </TouchableOpacity>
                    </Animatable.View>

                </Container>
            </Modal>
        )
    }
    render() {

        return (
            <Container style={{ backgroundColor: '#eeeeee' }}>
                {this.renderModalData()}
                {this.renderModalChangeData()}
                {this.renderModalGift()}
                <Header
                    androidStatusBarColor={'#007770'}
                    style={{ backgroundColor: '#00A79E', height: 0 }}>
                    <Left>
                        <Button onPress={() => { this.props.navigation.pop() }} transparent>
                            {/* <Icon name='md-arrow-back' /> */}
                        </Button>
                    </Left>
                    <Body>
                        {/* <Title>Quà tặng</Title> */}
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                // stickyHeaderIndices={[3]}
                >
                    <View style={{ backgroundColor: '#ffff', width: '100%', height: 200 }}>
                        <View style={{ width: '100%', height: '75%' }}>

                            <ImageBackground
                                style={{ width: '100%', height: '95%' }}
                                source={require('../img/bghead.png')} >
                                <View style={{ position: 'absolute', left: widthSize / 3.5, bottom: 15 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>Nguyễn Hồng Linh</Text>
                                    <Text style={{ color: '#fff', fontSize: 14 }} >Hội viên chưa đạt hạng</Text>
                                    <Text style={{ color: '#fff', fontSize: 14 }} >Chu kỳ: 01/01/2018 - 01/01/2019</Text>
                                </View>
                            </ImageBackground>
                            <View style={{ backgroundColor: 'green', width: widthSize / 5, height: widthSize / 5, position: 'absolute', bottom: 0, left: 15, borderRadius: widthSize / 5 / 2, overflow: 'hidden', borderColor: '#fff', borderWidth: 1 }}>
                                <Image
                                    style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
                                    source={require('../img/avatacm.jpg')}
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
                                <Text style={{ fontWeight: 'bold', color: '#00CC99', fontSize: 18 }} >1000</Text>

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
                                            onPress={() => this.setState({ modalData: true })}
                                        >
                                            <Image style={{ width: 50, height: 50 }} source={require('../img/dollar.png')} />
                                        </TouchableOpacity>
                                        <Text style={{ color: '#333333', fontSize: 13, marginTop: 5 }} >Đổi cước</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => this.setState({ modalChangeData: true })}
                                        >
                                            <Image style={{ width: 49, height: 49 }} source={require('../img/wifi.png')} />
                                        </TouchableOpacity>
                                        <Text style={{ color: '#333333', fontSize: 13, marginTop: 5 }} >Đổi data</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => this.setState({ modalGift: true })}
                                        >
                                            <Image style={{ width: 50, height: 50 }} source={require('../img/gift_ic.png')} />
                                        </TouchableOpacity>
                                        <Text style={{ color: '#333333', fontSize: 13, marginTop: 5 }} >Đổi quà</Text>
                                    </View>
                                </Body>

                            </CardItem>
                        </Card>
                    </View>


                    <View style={{ width: widthSize, backgroundColor: '#fff', marginBottom: 5 }}>
                        <CardItem  >
                            <Body>
                                <Text style={{ fontWeight: Platform.OS == 'ios' ? 'bold' : '500', color: '#111111' }}>
                                    <Icon style={{ fontSize: 23 }} type='MaterialCommunityIcons' name='fire' /> Voucher nổi bật
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
                                activeOpacity={0.8}
                                onPress={() => this.props.navigation.dispatch(NavigationActions.navigate({
                                    key: 'promotionDetail',
                                    routeName: 'promotionDetail',
                                    params: { id: item.id }
                                }))}
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

                                <Text numberOfLines={2} ellipsizeMode='tail' allowFontScaling={false} style={{ fontWeight: Platform.OS == 'ios' ? 'bold' : '500', fontSize: 13, marginTop: 5 }}>{item.name} </Text>


                            </TouchableOpacity>}
                        />
                    </View>

                    <View style={{ width: widthSize, backgroundColor: '#fff', marginBottom: 5 }}>
                        <CardItem  >
                            <Body>
                                <Text allowFontScaling={false} style={{ fontWeight: Platform.OS == 'ios' ? 'bold' : '500', color: '#111111' }}>
                                    <Icon style={{ fontSize: 23 }} name='md-pricetags' />  Ưu đãi dành cho bạn
                                </Text>
                            </Body>
                            <Right >
                                <Text
                                    onPress={() => {
                                        this.props.navigation.navigate('tabExgift', {
                                            promotionType: 'percent,stamp,billPoint',
                                            name: 'Ưu đãi',
                                            tabIndex: 'promotion'
                                        })
                                    }}
                                    style={{ textAlign: 'right', color: '#00A79E', height: 20 }}>Xem thêm <Icon style={{ fontSize: 14, color: '#00A79E' }} name='ios-arrow-forward' /> </Text>
                            </Right>
                        </CardItem>
                        <ListPromotion limit={3} category={this.state.cateSelect} promotionType={'percent,stamp,billPoint'} />
                    </View>


                    <View style={{ width: widthSize, backgroundColor: '#fff', marginBottom: 5 }}>
                        <CardItem  >
                            <Body>
                                <Text allowFontScaling={false} style={{ fontWeight: Platform.OS == 'ios' ? 'bold' : '500', color: '#111111' }}>
                                    <Icon style={{ fontSize: 23 }} type='MaterialCommunityIcons' name='gift' />  Quà tặng dành cho bạn
                                </Text>
                            </Body>
                            <Right >
                                <Text
                                    onPress={() => {
                                        this.props.navigation.navigate('tabExgift', {
                                            promotionType: 'gift,giftAnother,exchange',
                                            name: 'Quà tặng',
                                            tabIndex: 'exchange'
                                        })
                                    }}
                                    style={{ textAlign: 'right', color: '#00A79E', height: 20 }}>Xem thêm <Icon style={{ fontSize: 14, color: '#00A79E' }} name='ios-arrow-forward' /> </Text>
                            </Right>
                        </CardItem>
                        <ListPromotion limit={3} category={this.state.cateSelect} promotionType={'gift,giftAnother,exchange'} />
                    </View>

                </ScrollView>
            </Container >
        );
    }
}