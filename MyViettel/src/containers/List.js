import React, { Component } from 'react';
import {
    View, ActivityIndicator, Platform,
    FlatList, Dimensions, TouchableOpacity
} from 'react-native';
import { Container, Text, Icon, Header, Left, Right, Button, Body, Title } from 'native-base';
import { TabViewAnimated, TabBar, SceneMap, TabViewPagerScroll } from 'react-native-tab-view';
import dataService from '../network/dataService'
import PromotionItem from '../component/promotionItem'
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skip: 0,
            limit: 10,
            dataProduct: [],
            stopLoad: false,
            loadding: true,
            refreshing: false,
            loadMore: false,
            runLoadMore: false,
            latitude: this.props.latitude,
            longitude: this.props.longitude
        }
    }
    componentDidMount() {
        this.getDataProduct()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.latitude != this.state.latitude ||
            nextProps.longitude != this.state.longitude
        ) {
            this.setState({
                latitude: nextProps.latitude,
                longitude: this.state.longitude
            }, this.getDataProduct())
        }
    }
    async getDataProduct() {
        this.setState({
            refreshing: true,
            dataProduct: [],
            loadding: true,
            stopLoad: false
        });
        let rs = await dataService.getListPromotions(
            this.state.skip, this.state.limit, this.props.category, (this.props.promotionType ? this.props.promotionType : 'gift,giftAnother,exchange'), this.state.latitude ? "location" : 'new', null, this.state.latitude, this.state.longitude, null, null);
        this.setState({
            dataProduct: rs.data,
            loadding: false,
            refreshing: false,
            stopLoad: rs.data.length < this.state.limit ? true : false
        });
    }
    isLoading = false;
    async loadMoreProduct() {
        if (this.state.stopLoad == false && !this.isLoading) {
            this.isLoading = true;
            this.setState({
                loadMore: true
            })
            let arrNew = await dataService.getListPromotions(this.state.dataProduct.length, this.state.limit, this.props.category, (this.props.promotionType ? this.props.promotionType : 'gift,giftAnother,exchange'), this.state.latitude ? "location" : 'new', null, this.state.latitude, this.state.longitude, null, null);
            this.state.dataProduct = this.state.dataProduct.concat(arrNew.data);
            this.setState({
                dataProduct: this.state.dataProduct,
                loadMore: false,
                stopLoad: arrNew.data.length < this.state.limit ? true : false
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
                    ListEmptyComponent={
                        this.state.dataProduct.length == 0 && this.state.stopLoad ? <Text>Chưa có ưu đãi trong mục này</Text> : <Text style={{ height: 30, width: 150 }}> </Text>
                    }
                    ListFooterComponent={
                        !this.state.stopLoad ? <ActivityIndicator size="large" color="#2c958e" style={{ alignSelf: 'center', paddingBottom: 15 }} /> : null
                    }
                    renderItem={({ item, index }) =>
                        <PromotionItem item={item} />
                    }
                    keyExtractor={(item, index) => index + "index"}
                />
            </Container>
        )
    }

}