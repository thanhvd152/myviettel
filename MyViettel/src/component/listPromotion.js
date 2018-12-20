import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Platform,
    Dimensions,
    FlatList,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Container, Card, CardItem, Body, Text } from 'native-base';
import dataService from '../network/dataService';
import PromotionItem from './promotionItem';
export default class ListPromotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            skip: 0,
            limit: 5,
            stopLoad: false,
            loadding: true,
            loadMore: false,

        }
    }
    componentDidMount() {
        this.getData()
    }
    async getData() {
        let rs = await dataService.getListPromotions(this.state.skip, this.props.limit ? this.props.limit : this.state.limit, this.props.category, 'percent,stamp,billPoint,giftPoint', 'new');
        console.log(rs)
        this.setState({
            data: rs.data,
        });
    }
    render() {
        return <FlatList
            extraData={this.state}
            data={this.state.data}
            renderItem={({ item, index }) =>
                <PromotionItem item={item} />
            }
            keyExtractor={(item, index) => 'indexItem' + item.id}
        />
    }
}
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({

})