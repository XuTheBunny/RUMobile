import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setCampus, getBusStops, getAllClass } from '../actions';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Header from '../Components/Header';

class MoreScreen extends Component {
  state = {
    selectedIndex: 0,
  };

  componentDidMount() {
    if (this.props.campus == 'newBrunswick') {
      this.setState({
        selectedIndex: 0,
      });
    } else {
      this.setState({
        selectedIndex: 1,
      });
    }
    this.props.getAllClass(null, this.props.classSetting);
  }

  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }

  handleIndexChange = index => {
    campusIndex = ['newBrunswick', 'newark'];
    this.props.setCampus(campusIndex[index]);
    this.props.getBusStops('clean');
    this.props.getBusStops(campusIndex[index]);
    this.setState({
      selectedIndex: index,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.home}>
        <Header text={'More'} />
        <Text style={styles.titleText}>Rutgers Buses Campus</Text>
        <View style={styles.titleContainer}>
          <SegmentedControlTab
            values={['New Brunswick', 'Newark']}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
            activeTabStyle={styles.activeTabStyle}
            tabStyle={styles.tabStyle}
            tabTextStyle={styles.tabTextStyle}
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <ScrollView>
            <TouchableOpacity
              onPress={() => {
                Actions.subjects_screen();
              }}
            >
              <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
                <Image
                  style={styles.iconStyle}
                  source={require('../images/More/coursesicon.png')}
                />
                <View style={styles.listContainer}>
                  <Text style={styles.listText}>Classes</Text>
                  <EvilIcons name="chevron-right" size={30} color="rgb(138,138,143)" />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Actions.aboutMe_screen();
              }}
            >
              <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
                <Image style={styles.iconStyle} source={require('../images/More/abouticon.png')} />
                <View style={styles.listContainer}>
                  <Text style={styles.listText}>About</Text>
                  <EvilIcons name="chevron-right" size={30} color="rgb(138,138,143)" />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Actions.setting_screen();
              }}
            >
              <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
                <Image
                  style={styles.iconStyle}
                  source={require('../images/More/settingsicon.png')}
                />
                <View style={styles.listContainer}>
                  <Text style={styles.listText}>Settings</Text>
                  <EvilIcons name="chevron-right" size={30} color="rgb(138,138,143)" />
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  home: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 25,
  },
  titleText: {
    fontSize: 19,
    marginLeft: 16,
  },
  activeTabStyle: {
    backgroundColor: '#ed4545',
  },
  tabStyle: {
    borderColor: '#ed4545',
    height: 30,
  },
  tabTextStyle: {
    color: '#ed4545',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderBottomColor: 'rgb(235,235,235)',
    borderBottomWidth: 0.5,
    marginLeft: 17,
  },
  iconStyle: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginTop: 11,
    marginLeft: 2,
  },
  listText: {
    fontSize: 17,
  },
};

const mapStateToProps = state => {
  return {
    campus: state.bus.campus,
    classSetting: state.class.class_setting,
  };
};

export default connect(
  mapStateToProps,
  { setCampus, getBusStops, getAllClass },
)(MoreScreen);
