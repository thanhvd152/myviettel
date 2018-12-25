import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import Home from './containers/home'
import ListPromotion from './component/listPromotion'
import PromotionDetail from './component/promotionDetail'
import TabExgift from './containers/tabExgift'
import Test from './component/test'
import Test2 from './component/test2'
import Test3 from './component/test3'
const RootContainer = StackNavigator({
    home: { screen: Home },
    tabExgift: { screen: TabExgift },
    promotionDetail: { screen: PromotionDetail },
    // test: { screen: Test },
    // // test2: { screen: Test2 },
    // // test3: { screen: Test3 },

}, {
        headerMode: 'none'
    })

export default class AppContainer extends Component {

    render() {
        return <RootContainer />
    }
}