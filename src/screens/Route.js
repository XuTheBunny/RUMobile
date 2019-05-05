import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, LayoutAnimation, StatusBar } from 'react-native';
import ClearHeader from '../Components/ClearHeader';
import BottomBar from '../Components/BottomBar';
import StopInRoute from '../Components/StopInRoute';
import Loading from '../Components/Loading';
import { getPrediction } from '../actions';
import { routeColor } from '../../route_color.json';

var color = 'rgb(142, 142, 147)';
var nearestId = '';

class Route extends Component {
  componentWillMount() {
    rid = [this.props.data.rid];
    sid = [];
    this.props.data.stops.forEach(function(element) {
      sid.push(element.sid);
    });
    this.props.getPrediction(rid, sid);
    duplicate = JSON.parse(JSON.stringify(this.props.data.stops));
    nearestId = duplicate.sort((a, b) =>
      a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0,
    )[0].sid;
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  resetColor() {
    color = 'rgb(142, 142, 147)';
  }

  isColor() {
    color = routeColor.find(obj => obj.rname == this.props.data.rname).rcolor;
  }

  singlePrediction(sid) {
    if (this.props.prediction.find(obj => obj.stop_id == sid)) {
      prediction_raw = this.props.prediction.find(obj => obj.stop_id == sid).arrivals;
      now = new Date();
      arrivalList = [];
      prediction_raw
        .sort((a, b) => (a.arrival_at > b.arrival_at ? 1 : b.arrival_at > a.arrival_at ? -1 : 0))
        .forEach(function(element) {
          arrival = new Date(element.arrival_at);
          diffMs = arrival - now;
          diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
          arrivalList.push(diffMins);
        });
      return arrivalList;
    } else {
      return [];
    }
  }

  renderPrediction() {
    if (this.props.hasPrediction == 'here') {
      return this.props.data.stops.map(stop => (
        <StopInRoute
          sname={stop.sname}
          distance={stop.distance}
          prediction={this.singlePrediction(stop.sid)}
          key={stop.sid}
          nearest={nearestId == stop.sid}
        />
      ));
    } else {
      return <Loading />;
    }
  }

  render() {
    this.resetColor();
    this.isColor();
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="light-content" />
        <View style={{ backgroundColor: color }}>
          <ClearHeader text={'Bus'} />
          <View style={styles.routeHeaderContainer}>
            <Text style={styles.routeHeaderTitle}>{this.props.data.rname}</Text>
            <TouchableOpacity>
              <View style={styles.routeMapButton}>
                <Text style={styles.routeMapText}>Map</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{ marginBottom: 75 }}>{this.renderPrediction()}</ScrollView>
        <BottomBar hs={true} bus={false} fs={true} ls={true} mr={true} />
      </View>
    );
  }
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  routeHeaderContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingBottom: 18,
  },
  routeHeaderTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'rgb(255, 255, 255)',
    paddingLeft: 14,
    paddingTop: 8,
    maxWidth: 240,
  },
  routeMapButton: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'rgb(255, 255, 255)',
    paddingHorizontal: 22,
  },
  routeMapText: {
    fontSize: 17,
    color: 'rgb(255, 255, 255)',
  },
};

const mapStateToProps = state => {
  return {
    prediction: state.bus.prediction,
    hasPrediction: state.bus.has_prediction,
  };
};

export default connect(
  mapStateToProps,
  { getPrediction },
)(Route);
