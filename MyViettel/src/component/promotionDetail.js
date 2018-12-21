import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    Linking,
    Platform,
    FlatList
} from 'react-native';
import { Container, Text, Header, Right, Body, Left, Title, Button, Icon } from 'native-base'
import QRCode from 'react-native-qrcode';
import dataService from '../network/dataService'
import WebView from './webViewAutoHeight'
import moment from 'moment'
const customStyle = `<style>* {max-width: 98%;}
 image{width:100% !important; height: auto !important;} 
 body {
     font-family: ${Platform.OS == 'ios' ? 'Helvetica Neue' : 'roboto'};
     font-size:${Platform.OS == 'ios' ? '95%' : '90%'};
     text-align: justify;
     color:gray;
     -webkit-touch-callout: none;
    -webkit-user-select: none; 
    -moz-user-select: none;    
    -ms-user-select: none;     
    -o-user-select: none;
    user-select: none;
    }
 h1 {color: red;}

 </style>` +
    `<meta name="viewport" content="initial-scale=1, maximum-scale=1" >`;
export default class PromotionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            arrCode: [],
            recievedCode: false
        }
    }
    componentDidMount() {
        this.getData()
    }
    async getData() {
        let rs = await dataService.getPromotionInfo(this.props.navigation.state.params.id);
        this.setState({
            dataSource: rs.data,
            arrCode: rs.data.codes
        })
        console.log(rs)
    }
    renderButtonGetcode(promotion) {
        if (this.state.arrCode.length >= 1) return null
        if (this.state.recievedCode) {
            return (
                <View style={styles.loadCode}>
                    <ActivityIndicator size="large" color='#2c958e' />
                    <Text style={{ color: '#757575', }}> Vui lòng đợi...</Text>
                </View>
            )
        }
        let txtBtn = (this.state.arrCode.length == 0) ? promotion.button : promotion.buttonMore
        return (
            <TouchableOpacity
                style={styles.btGet}
                onPress={() => { this.getCode(promotion) }}
            >
                <Text allowFontScaling={false} style={styles.textBt}>
                    {txtBtn}
                </Text>
            </TouchableOpacity>
        )
    }
    async getCode() {
        this.setState({ recievedCode: true });
        let rs = await dataService.getCode(12638, 1);
        this.state.arrCode.push({ code: rs.data.code });
        this.setState({ arrCode: this.state.arrCode, recievedCode: false })
    }
    render() {
        if (!this.state.dataSource) {
            return (
                <Container style={{ backgroundColor: '#EEEEEE' }}>
                    <ActivityIndicator size='large' color='#2c958e' style={{ marginTop: 20 }} />
                </Container>
            )
        }
        let { partner, promotion, shops } = this.state.dataSource
        return (
            <Container style={{ backgroundColor: 'white' }} >
                <Header style={{ backgroundColor: '#2c958e' }} androidStatusBarColor="#2c958e">
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: 'transparent', marginLeft: 5 }}
                            activeOpacity={1}
                            onPress={() => this.props.navigation.pop()}
                        >
                            <Icon type="Ionicons" name="md-arrow-back" style={{ color: 'white' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ flex: 8, alignItems: 'center' }}>
                        <Title style={{ textAlign: 'center' }}>Chi tiết</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <ScrollView>
                    <Image source={{ uri: promotion.images[0] }} style={styles.imagePro} />
                    <View style={styles.title}>
                        <Image source={{ uri: partner.logo }} style={styles.logo} />
                        <View >
                            <Text style={styles.name}>{partner.name}</Text>
                            <Text style={styles.shortDescription}>{promotion.name}</Text>
                        </View>
                    </View>
                    <View style={{
                        width: width,
                        height: 5,
                        backgroundColor: '#eeeeee',
                    }} />
                    {this.state.arrCode.length != 0 ?
                        <View style={{ padding: 10 }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#757575' }}>
                                SỬ DỤNG ƯU ĐÃI TẠI CỬA HÀNG
                            </Text>
                            <Text style={{ textAlign: 'center', color: '#757575' }}>
                                Cung cấp mã ưu đãi cho nhân viên cửa hàng
                            </Text>
                        </View> : null}
                    <FlatList
                        extraData={this.state}
                        data={this.state.arrCode}
                        renderItem={({ item, index }) =>
                            <View style={styles.wrapQrcode} >
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={{ marginLeft: 10 }}
                                    >
                                        <QRCode
                                            value={item.code}
                                            size={Dimensions.get('window').width * 0.2}
                                            bgColor='rgba(66,66,66 ,0.8)'
                                        />
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            width: '70%',
                                        }}
                                    >
                                        <Text style={{ color: 'black', color: '#757575', }}>MÃ E-VOUCHER</Text>
                                        <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 5 }}>
                                            {
                                                item.code.split('').map((el, index) => {
                                                    return <Text key={index} style={{ color: '#757575', paddingHorizontal: 2, fontSize: 15, fontWeight: 'bold' }}>{el}</Text>
                                                })
                                            }
                                        </View>
                                        <Text style={{ marginTop: 6, color: '#757575' }}>Áp dụng tới {moment(item.endDate).format('DD/MM/Y')}</Text>
                                    </View>
                                </View>
                            </View>
                        }
                        keyExtractor={(item, index) => index + "indexCode"}
                    />
                    {this.renderButtonGetcode(promotion)}
                    <View style={[styles.detail, { borderTopWidth: 1, borderColor: '#EEEEEE' }]}>
                        <Text style={{ color: '#757575', fontWeight: 'bold' }}>THÔNG TIN ƯU ĐÃI</Text>
                        {promotion.html ?
                            <WebView
                                source={{ html: customStyle + promotion.html }}
                                startInLoadingState={true}
                                allowUniversalAccessFromFileURLs={true}
                            /> :
                            <Text
                                style={{ marginBottom: 10, lineHeight: 22, color: '#757575', }}
                            >
                                {promotion.description}
                            </Text>
                        }
                        <View style={styles.dateOfpromotion}>
                            <Icon type='FontAwesome' name='calendar-check-o'
                                style={{
                                    fontSize: 18,
                                    marginRight: 10,
                                }}
                            />
                            <Text style={{ color: '#757575', }}>
                                Áp dụng từ ngày
                                {" " + moment(promotion.startDate).format('DD/M/Y') + ' '}
                                đến ngày {" " + moment(promotion.endDate).format('DD/M/Y')}
                            </Text>
                        </View>
                        <View style={{ marginTop: 8 }}>
                            <Text style={{ color: '#757575', }}>Danh sách cửa hàng</Text>
                            <FlatList
                                data={shops}
                                renderItem={({ item }) =>
                                    <View style={{ padding: 13, borderColor: '#dadada', borderTopWidth: 1, }}  >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon name='ios-pin' style={{ fontSize: 20, marginRight: 5, color: '#2c958e' }} />
                                            <Text style={{ fontWeight: 'bold', color: '#757575' }}>
                                                {item.name}
                                            </Text>
                                        </View>
                                        <Text style={{ color: '#757575', }}>
                                            {item.address}
                                        </Text>
                                        {item.phone ?
                                            <Text style={{ color: '#757575', }}>
                                                {'Số điện thoại' + ": " + item.phone}
                                            </Text> : null}
                                    </View>
                                }
                                keyExtractor={(item, index) => index + "index"}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => {
                                Linking.openURL('tel:' + (promotion.hotline ? promotion.hotline : '02473009996'))
                            }}
                            style={{ marginBottom: 15, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}
                        >
                            <Image style={{ width: 40, height: 40 }} source={require('../img/l3-support-icon.png')} />
                            <View>
                                <Text style={{ marginLeft: 10, color: '#757575', }}>Hỗ trợ</Text>
                                <Text style={{ fontSize: 16, color: '#6495ed', textAlign: 'center', marginLeft: 10 }}>
                                    {promotion.hotline ? promotion.hotline : ' 024 7300 9996'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>

        );
    }
}
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    imagePro: {
        width: width,
        height: width / 2,
        resizeMode: 'stretch'
    },
    title: {
        flexDirection: 'row',
        padding: 5,
        width: width,
        backgroundColor: 'white'
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'stretch',
        marginRight: 5,
    },
    name: {
        width: width * 20.25 / 25.40,
        color: "#2c958e",
        fontWeight: '500',
        fontSize: 18
    },
    shortDescription: {
        width: width * 20.25 / 25.40,
        color: '#757575',
        fontSize: 15,
        lineHeight: 20
    },
    detail: {
        paddingLeft: 8,
        width: width,
        paddingTop: 10,
        backgroundColor: 'white',
    },
    dateOfpromotion: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 8
    },
    wrapQrcode: {
        backgroundColor: 'white',
        padding: 8,
        borderTopWidth: 1,
        borderColor: '#EEEEEE',
        width: width,
    },
    loadCode: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 9.95 / 25.4,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 10,

    },
    btGet: {
        minWidth: width * 0.4,
        height: 45,
        padding: 15,
        backgroundColor: '#E76E26',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22.5,
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    textBt: {
        color: 'white',
        textAlign: 'center'
    },
})