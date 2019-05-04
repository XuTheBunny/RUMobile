import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getBusStops } from '../actions';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';

class BottomBar extends Component {
  //Methods Handling Navigation

  onHomePress() {
    Actions.home_screen();
  }

  onBusPress() {
    this.props.getBusStops('clean');
    Actions.stop_screen();
  }

  onFoodPress() {
    Actions.food_screen();
  }

  onLinksPress() {
    Actions.links_screen();
  }

  onMorePress() {
    Actions.more_screen();
  }

  //Methods Handling whether or not a specific button is active

  hsButton() {
    if (this.props.hs == true) {
      return (
        <View>
          <TouchableWithoutFeedback onPress={this.onHomePress.bind(this)}>
            <View style={styles.navbarItemStyle}>
              <Image
                style={{ width: 25, height: 22, marginBottom: 2 }}
                source={require('../images/TabBar/TodayUnselected.jpg')}
              />
              <Text style={styles.navbarFontStyle}>Today</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
    return (
      <View>
        <TouchableWithoutFeedback>
          <View style={styles.navbarItemStyle}>
            <Image
              style={{ width: 25, height: 22, marginBottom: 2 }}
              source={require('../images/TabBar/TodaySelected.jpg')}
            />
            <Text style={{ ...styles.navbarFontStyle, color: '#ed4545' }}>Today</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  busButton() {
    if (this.props.bus == true) {
      return (
        <View>
          <TouchableWithoutFeedback onPress={this.onBusPress.bind(this)}>
            <View style={styles.navbarItemStyle}>
              <Image
                style={{ width: 22, height: 22, marginBottom: 2 }}
                source={require('../images/TabBar/BusUnselected.jpg')}
              />
              <Text style={styles.navbarFontStyle}>Bus</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }

    return (
      <View>
        <TouchableWithoutFeedback>
          <View style={styles.navbarItemStyle}>
            <Image
              style={{ width: 22, height: 22, marginBottom: 2 }}
              source={require('../images/TabBar/BusSelected.jpg')}
            />
            <Text style={{ ...styles.navbarFontStyle, color: '#ed4545' }}>Bus</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  fsButton() {
    if (this.props.fs == true) {
      return (
        <View>
          <TouchableWithoutFeedback onPress={this.onFoodPress.bind(this)}>
            <View style={styles.navbarItemStyle}>
              <Image
                style={{ width: 22, height: 22, marginBottom: 2 }}
                source={require('../images/TabBar/FoodUnselected.jpg')}
              />
              <Text style={styles.navbarFontStyle}>Food</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
    return (
      <View>
        <TouchableWithoutFeedback>
          <View style={styles.navbarItemStyle}>
            <Image
              style={{ width: 22, height: 22, marginBottom: 2 }}
              source={require('../images/TabBar/FoodSelected.jpg')}
            />
            <Text style={{ ...styles.navbarFontStyle, color: '#ed4545' }}>Food</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  lsButton() {
    if (this.props.ls == true) {
      return (
        <View>
          <TouchableWithoutFeedback onPress={this.onLinksPress.bind(this)}>
            <View style={styles.navbarItemStyle}>
              <Image
                style={{ width: 22, height: 22, marginBottom: 2 }}
                source={require('../images/TabBar/LinksUnselected.jpg')}
              />
              <Text style={styles.navbarFontStyle}>Links</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
    return (
      <View>
        <TouchableWithoutFeedback>
          <View style={styles.navbarItemStyle}>
            <Image
              style={{ width: 22, height: 22, marginBottom: 2 }}
              source={require('../images/TabBar/LinksSelected.png')}
            />
            <Text style={{ ...styles.navbarFontStyle, color: '#ed4545' }}>Links</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  mrButton() {
    if (this.props.mr == true) {
      return (
        <View>
          <TouchableWithoutFeedback onPress={this.onMorePress.bind(this)}>
            <View style={styles.navbarItemStyle}>
              <Image
                style={{ width: 22, height: 6, marginBottom: 7, marginTop: 8 }}
                source={require('../images/TabBar/MoreUnselected.jpg')}
              />
              <Text style={styles.navbarFontStyle}>More</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
    return (
      <View>
        <TouchableWithoutFeedback>
          <View style={styles.navbarItemStyle}>
            <Image
              style={{ width: 22, height: 6, marginBottom: 7, marginTop: 8 }}
              source={require('../images/TabBar/MoreSelected.png')}
            />
            <Text style={{ ...styles.navbarFontStyle, color: '#ed4545' }}>More</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.navbar}>
        {this.hsButton()}
        {this.busButton()}
        {this.fsButton()}
        {this.lsButton()}
        {this.mrButton()}
      </View>
    );
  }
}

const styles = {
  home: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  navbar: {
    width: '100%',
    height: 75,
    backgroundColor: 'rgb(255, 255, 255)',
    borderColor: 'rgb(229, 229, 234)',
    borderWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    paddingBottom: 20,
  },
  navbarFontStyle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'rgb(142, 142, 147)',
    fontFamily: 'system font',
    bottom: -3,
  },
  navbarItemStyle: {
    alignItems: 'center',
  },
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { getBusStops },
)(BottomBar);
