import React, { Component } from 'react';
import {
    View, ActivityIndicator, Platform,
    FlatList, Dimensions
} from 'react-native';
import { Container, Text, Icon, Header, Left, Right, Button, Body, Title } from 'native-base';
import { TabViewAnimated, TabBar, SceneMap, TabViewPagerScroll } from 'react-native-tab-view';
import dataService from '../network/dataService'
import PromotionItem from '../component/promotionItem'
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
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skip: 0,
            limit: 15,
            dataProduct: [],
            stopLoad: false,
            loadding: true,
            refreshing: false,
            loadMore: false,
            runLoadMore: false,
        }
    }
    componentDidMount() {
        this.getDataProduct()
    }
    async getDataProduct() {
        this.setState({
            refreshing: true,
            dataProduct: [],
            loadding: true,
            stopLoad: false
        });
        let rs = await dataService.getListPromotions(this.state.skip, this.state.limit, this.props.category, 'percent,stamp,billPoint,giftPoint', 'new');
        this.setState({
            dataProduct: rs.data,
            loadding: false,
            refreshing: false,
            stopLoad: rs.data.length < 15 ? true : false
        });
    }
    isLoading = false;
    async loadMoreProduct() {
        if (this.state.stopLoad == false && !this.isLoading) {
            this.isLoading = true;
            this.setState({
                loadMore: true
            })
            let arrNew = await dataService.getListPromotions(this.state.dataProduct.length, this.state.limit, this.props.category, 'gift,giftAnother,exchange', 'new', null, null, null, null, null, 'exchange');
            this.state.dataProduct = this.state.dataProduct.concat(arrNew.data);
            this.setState({
                dataProduct: this.state.dataProduct,
                loadMore: false,
                stopLoad: arrNew.data.length < 15 ? true : false
            })
            this.isLoading = false
        }

    }
    render() {
        return (
            <Container style={{ backgroundColor: '#E6E6E6' }}>
                <FlatList
                    style={{ alignSelf: 'center', marginTop: 1.5 }}
                    extraData={this.state}
                    removeClippedSubviews={true}
                    showsVerticalScrollIndicator={false}
                    onRefresh={() => { this.getDataProduct() }}
                    refreshing={this.state.refreshing}
                    onEndReached={this.loadMoreProduct.bind(this)}
                    onEndReachedThreshold={0.5}
                    data={this.state.dataProduct}
                    renderItem={({ item, index }) =>
                        <PromotionItem item={item} />
                    }
                    keyExtractor={(item, index) => index + "index"}
                />
            </Container>
        )
    }

}
const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

export default class TabExgift extends Component {
    state = {
        index: 0,
        routes: [],
        renderScene: {},
        loadData: false
    }
    constructor(props) {
        super(props);
        let { renderScene, routes } = this.state;
        arr.map((item, index) => {
            routes.push({ key: index + '', name: item.name, icon: item.icon });
            renderScene[index + ''] = () => {
                return (<List category={item.id} />)
            }
        })
        console.log(renderScene)
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
                        <Title>Quà tặng</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
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