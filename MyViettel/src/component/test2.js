import React, { Component } from "react";
import { Animated, Dimensions, Platform, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { Body, Header, List, ListItem as Item, ScrollableTab, Tab, TabHeading, Tabs, Title } from "native-base";
// import LinearGradient from "react-native-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = 250;
const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = "rgba(85,186,255, 1)";
const FADED_THEME_COLOR = "rgba(85,186,255, 0.8)";

export default class ParallaxDemo extends Component {
    nScroll = new Animated.Value(0);
    scroll = new Animated.Value(0);
    tabY = this.nScroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 20],
        outputRange: [0, 0, 20],
    });
    tabContent = (x, i) => <View style={{ height: this.state.height }}>
        <List onLayout={({ nativeEvent: { layout: { height } } }) => {
            this.heights[i] = height;
            if (this.state.activeTab === i) this.setState({ height })
        }}>
            {new Array(x).fill(null).map((_, i) => <Item key={i}><Text>Item {i}</Text></Item>)}
        </List></View>;
    heights = [500, 500];
    state = {
        activeTab: 0,
        height: 500,
        test: new Animated.Value(0)
    };
    componentDidMount() {
        Animated.spring(this.state.test, {
            toValue: 200,
            duration: 5000,
        }).start();
    }
    constructor(props) {
        super(props);
        this.nScroll.addListener(Animated.event([{ value: this.scroll }], { useNativeDriver: false }));
    }

    render() {
        const a = this.state.test.interpolate({
            inputRange: [0, 200],
            outputRange: [0, 1],
        })
        return (
            <View>
                {/* <Animated.View style={{ backgroundColor: 'pink', width: 100, height: 100, transform: [{ translateY: a }, { translateX: a }], }}>

                </Animated.View> */}
                {/* <Animated.View style={{ position: "absolute", width: "100%", backgroundColor: this.headerBg, zIndex: 1 }}>
                    <Header style={{ backgroundColor: "transparent" }} hasTabs>
                        <Body>
                            <Title>
                                <Animated.Text style={{ color: this.textColor, fontWeight: "bold" }}>
                                    Tab Parallax
                                </Animated.Text>
                            </Title>
                        </Body>
                    </Header>
                </Animated.View> */}
                <Animated.ScrollView
                    scrollEventThrottle={5}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.nScroll } } }], { useNativeDriver: true })}
                    style={{ zIndex: 0 }}>
                    <Animated.Image
                        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Moraine_Lake_17092005.jpg" }}
                        style={{ height: IMAGE_HEIGHT, width: "100%" }}>
                    </Animated.Image>
                    <Tabs
                        prerenderingSiblingsNumber={3}
                        onChangeTab={({ i }) => {
                            this.setState({ height: this.heights[i], activeTab: i })
                        }}
                        renderTabBar={(props) => <Animated.View
                            style={{ transform: [{ translateY: this.tabY }], zIndex: 1, width: "100%" }}>
                            <ScrollableTab  {...props}
                                style={{ height: 40 }}
                                backgroundColor={'#fff'}
                            />
                        </Animated.View>
                        }>
                        <Tab heading="Tab 1">
                            {this.tabContent(30, 0)}
                        </Tab>
                        <Tab heading="Tab 2">
                            {this.tabContent(15, 1)}
                        </Tab>
                    </Tabs>
                </Animated.ScrollView>
            </View>
        )
    }
}