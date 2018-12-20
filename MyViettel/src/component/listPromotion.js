import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Platform,
    Dimensions,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
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
            limit: 15,
            stopLoad: false,
            loadding: true,
            loadMore: false,

        }
    }
    componentDidMount() {
        this.getData()
    }

    async newLoad(nextProps) {
        this.setState({
            loadding: true
        })
        let rs = await dataService.getListPromotions(this.state.skip, nextProps.limit ? nextProps.limit : this.state.limit, nextProps.category, nextProps.promotionType, 'new');
        console.log(rs)
        this.setState({
            data: rs.data,
            loadding: false
        });
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.category != this.props.category) {
            this.newLoad(nextProps)
        }
    }
    async getData() {
        this.setState({
            loadding: true
        })
        let rs = await dataService.getListPromotions(this.state.skip, this.props.limit ? this.props.limit : this.state.limit, this.props.category, this.props.promotionType, 'new');
        console.log(rs)
        this.setState({
            data: rs.data,
            loadding: false
        });
    }
    render() {
        console.log(this.props.category, '777')
        return (
            <View>
                {this.state.loadding ? < View style={{ backgroundColor: 'gray', position: 'absolute', top: 15, zIndex: 1, alignSelf: 'center', borderRadius: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 7, paddingLeft: 10, paddingRight: 10 }} >
                    <ActivityIndicator color="#fff" />
                    <Text allowFontScaling={false} style={{ fontSize: 13, color: '#fff', marginLeft: 3 }}>Đang tải dữ liệu</Text>
                </View> : null}


                <FlatList
                    extraData={this.state}
                    data={this.state.data}
                    renderItem={({ item, index }) =>
                        <PromotionItem item={item} />
                    }
                    keyExtractor={(item, index) => 'indexItem' + item.id}
                />
            </View>)
    }
}
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({

})