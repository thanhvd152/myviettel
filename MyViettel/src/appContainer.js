import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import Home from './containers/home'
import ListPromotion from './component/listPromotion'

const RootContainer = StackNavigator({
    listPromotion: { screen: ListPromotion },
    home: { screen: Home },
}, {
        headerMode: 'none'
    })

export default class AppContainer extends Component {

    render() {
        return <RootContainer />
    }
}