import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { getBusStops } from '../actions';
import NearbyItem from './NearbyItem';
import Loading from './Loading';

class NearbyList extends Component {
  renderList() {
    if (this.props.check == 'here') {
      return this.props.nearby.map(stop => <NearbyItem stop={stop} key={stop.sid} />);
    } else {
      return <Loading />;
    }
  }

  render() {
    return <View>{this.renderList()}</View>;
  }
}

const styles = {};

const mapStateToProps = state => {
  return {
    nearby: state.bus.nb_data,
    check: state.bus.data_here,
  };
};

export default connect(
  mapStateToProps,
  { getBusStops },
)(NearbyList);
