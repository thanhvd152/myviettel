import React, { Component } from 'react';
import {
    View, ActivityIndicator, Platform,
    FlatList, Dimensions, TouchableOpacity
} from 'react-native';
import { Container, Text, Icon, Header, Left, Right, Button, Body, Title } from 'native-base';
import { TabViewAnimated, TabBar, SceneMap, TabViewPagerScroll } from 'react-native-tab-view';
import dataService from '../network/dataService'
import PromotionItem from '../component/promotionItem'
import List from './List'
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

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

export default class TabExgift extends Component {
    state = {
        index: 0,
        routes: [],
        renderScene: {},
        loadData: false,
        idFillter: 1
    }
    constructor(props) {
        super(props);
        let { params } = this.props.navigation.state
        let { renderScene, routes } = this.state;
        arr.map((item, index) => {
            routes.push({ key: item.id + '', name: item.name, icon: item.icon });
            renderScene[item.id + ''] = () => {
                return (<List promotionType={params && params.promotionType ? params.promotionType : 'null'} category={item.id} latitude={null} longitude={null} />)
            }
        })
    }
    changeData(lat, long) {
        let { params } = this.props.navigation.state
        let newSence = {}
        arr.map((item, index) => {
            newSence[item.id + ''] = () => {
                return (<List promotionType={params && params.promotionType ? params.promotionType : 'null'} category={item.id} latitude={lat} longitude={long} />)
            }
        })
        this._renderScene = SceneMap(newSence);
        this.setState({ renderScene: newSence })
    }
    _handleIndexChange = index => this.setState({ index });
    _renderScene = SceneMap(this.state.renderScene);
    _renderHeader = props => <TabBar
        pressOpacity={0.1}
        pressColor='#E76E26'
        scrollEnabled={true} {...props}
        tabStyle={{ flexDirection: 'row', }}
        style={{ backgroundColor: '#fff' }}
        indicatorStyle={{ borderBottomColor: '#E76E26', borderBottomWidth: 3 }}
        renderLabel={(payload) => {
            return <Text
                numberOfLines={1}
                ellipsizeMode='tail'
                style={{
                    color: payload.focused ? '#E76E26' : '#000000',
                    fontWeight: '700', fontSize: Platform.OS == 'ios' ? 12 : 13,
                    height: Platform.OS == 'ios' ? 16 : 20, marginTop: 5,
                    maxWidth: '90%'
                }}>{payload.route.name.toUpperCase()}</Text>
        }}
        renderIcon={(payload) => {
            return <Icon name={payload.route.icon} style={{ fontSize: 17, marginRight: 8, color: '#424242' }} />
        }}

    />;
    render() {
        let { params } = this.props.navigation.state

        return (
            <Container>
                <Header
                    androidStatusBarColor={'#007770'}
                    style={{ backgroundColor: '#00A79E' }}>
                    <Left>
                        <Button onPress={() => { this.props.navigation.pop() }} transparent>
                            <Icon name='md-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{params ? params.name : ''}</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <View style={{ flexDirection: 'row', backgroundColor: '#E6E6E6', padding: 8, paddingLeft: 15 }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row', padding: 10,
                            backgroundColor: this.state.idFillter == 1 ? '#E76E26' : "white",
                            justifyContent: 'center', alignItems: 'center',
                            borderRadius: 20, height: 35, minWidth: 120,
                        }}
                        onPress={() => this.setState({ idFillter: 1 }, () => this.changeData(null, null))}
                    >
                        <Icon
                            type='Ionicons'
                            name='ios-flash'
                            style={{
                                color: this.state.idFillter == 1 ? 'white' : null,
                                fontSize: 24, marginRight: 4
                            }} />
                        <Text style={{ color: this.state.idFillter == 1 ? 'white' : null, }}>Mới nhất</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row', padding: 10,
                            backgroundColor: this.state.idFillter == 2 ? '#E76E26' : "white",
                            justifyContent: 'center', alignItems: 'center',
                            borderRadius: 20, height: 35, minWidth: 120, marginLeft: 15
                        }}
                        onPress={() => this.setState({ idFillter: 2 }, () => this.changeData(21.0770734, 105.8194164))}
                    >
                        <Icon
                            type='Ionicons'
                            name='ios-car'
                            style={{
                                color: this.state.idFillter == 2 ? 'white' : null,
                                fontSize: 24, marginRight: 4
                            }} />
                        <Text style={{ color: this.state.idFillter == 2 ? 'white' : null, }}>Gần nhất</Text>
                    </TouchableOpacity>
                </View>
                <TabViewAnimated
                    style={{ flex: 1 }}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />
            </Container>
        );
    }
}