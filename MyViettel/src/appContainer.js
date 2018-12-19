import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import Home from './containers/home'

const RootContainer = StackNavigator({
    home: {
        screen: Home
    }
}, {
        headerMode: 'none'
    })

export default class AppContainer extends Component {

    render() {
        return <RootContainer />
    }
}