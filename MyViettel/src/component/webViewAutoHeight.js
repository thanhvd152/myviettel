
import React, { Component } from 'react';
import {
    View,
    Dimensions,
    WebView,
} from 'react-native';

export default class MyWebView extends Component {
    state = {
        webViewHeight: Number
    };

    constructor(props) {
        super(props);
        this.state = {
            webViewHeight: null
        }

        this._onMessage = this._onMessage.bind(this);
    }

    _onMessage(e) {
        this.setState({
            webViewHeight: parseInt(e.nativeEvent.data)
        });
    }
    render() {
        const _w = this.props.width || Dimensions.get('window').width;
        const _h = this.state.webViewHeight;
        return (
            <WebView
                ref={(ref) => { this.webview = ref; }}
                injectedJavaScript={" setTimeout(function(){ window.postMessage( document.documentElement.clientHeight, '*'); },500); "}
                scrollEnabled={this.props.scrollEnabled || false}
                onMessage={this._onMessage}
                javaScriptEnabled={true}
                automaticallyAdjustContentInsets={true}
                {...this.props}
                style={[{ width: _w }, this.props.style, { height: _h }]}
            />
        )
    }
}
