import axios from 'axios';
import { PREDICTION, PREDICTION_DATA_HERE } from './types';

export const getPrediction = (rid, sid) => {
  if (rid == 'clean') {
    return dispatch => {
      dispatch({ type: PREDICTION, payload: [] });
      dispatch({ type: PREDICTION_DATA_HERE, payload: 'no' });
    };
  }
  const agency_id = '1323';
  const base_url = 'https://transloc-api-1-2.p.rapidapi.com/';
  const prediction_url =
    base_url +
    'arrival-estimates.json?routes=' +
    rid.join('%2C') +
    '&stops=' +
    sid.join('%2C') +
    '&agencies=' +
    agency_id;
  return dispatch => {
    axios({
      method: 'get',
      url: prediction_url,
      headers: {
        Accept: 'application/json',
        'X-Mashape-Key': 'Pcl9MfLNF0mshcAni8CgyFuxVXTap1NA0RxjsnoxN4439f9hBq',
      },
    }).then(response => {
      prediction = response.data.data;
      dispatch({ type: PREDICTION, payload: prediction });
      dispatch({ type: PREDICTION_DATA_HERE, payload: 'here' });
    });
  };
};
