import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Platform,
    Dimensions,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Container, Card, CardItem, Body, Text } from 'native-base'
import moment from 'moment'
export default class PromotionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let { item } = this.props
        return (
            <Card style={styles.wrap}>
                <TouchableOpacity
                    style={styles.item}
                    activeOpacity={0.9}
                >
                    <View style={styles.title}>
                        <View style={{ flex: 2 }}>
                            <Image source={{ uri: item.partner.logo }} style={styles.logo} />
                        </View>
                        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">{item.partner.name}</Text>
                        <View style={styles.persent}>
                            <Text style={{ color: 'white', fontSize: 14 }}>-10%</Text>
                        </View>
                    </View>
                    <Image source={{ uri: item.images[0] }} style={styles.image} />
                    <View style={styles.bottom}>
                        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
                        <Text style={styles.date}>Áp dụng tới {moment(item.endDate).format('D/MM/YYYY')}</Text>
                    </View>
                </TouchableOpacity>
            </Card>
        );
    }
}
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    item: {

    },
    wrap: {
        width: width * 0.96,
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        // backgroundColor: 'pink'
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    name: {
        flex: 7,
        marginLeft: 5,
        marginRight: 5,
    },
    persent: {
        flex: 1.6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff7000",
        borderRadius: 3,
        height: 26,
    },
    image: {
        width: width * 0.96,
        height: width * 0.96 / 2,
        resizeMode: 'stretch'
    },
    bottom: {
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
    },
    description: {
        fontSize: 14
    },
    date: {
        color: '#7a7a7a',
        fontSize: 14,
        fontStyle: 'italic'
    }

})