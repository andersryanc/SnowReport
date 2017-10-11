/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'searching...',
      temp: { low: '---', high: '---' },
      bottom: { low: '---', high: '---' },
      mid: { low: '---', high: '---' },
      top: { low: '---', high: '---' },
      snowfallCM: '---',
    }
  }
  componentWillMount() {
    const q = 'government%20camp%20oregon'
    const key = 'a76b52cdf0a8407fa8e60237171010'
    const weathrUrl = `https://api.worldweatheronline.com/premium/v1/ski.ashx?key=${key}&q=${q}&num_of_days=2&includeLocation=yes&format=json`
    console.log({ weathrUrl })
    fetch(weathrUrl)
      .then(res => res.json())
      .then(({ data }) => {
        console.log({ data })
        const bottom = { low: data.weather[0].bottom[0].mintempF, high: data.weather[0].bottom[0].maxtempF }
        const mid = { low: data.weather[0].mid[0].mintempF, high: data.weather[0].mid[0].maxtempF }
        const top = { low: data.weather[0].top[0].mintempF, high: data.weather[0].top[0].maxtempF }

        this.setState({
          name: data.nearest_area[0].areaName[0].value,
          bottom, mid, top,
          temp: {
            low: Math.min(bottom.low, mid.low, top.low),
            high: Math.max(bottom.high, mid.high, top.high)
          },
          snowfallCM: data.weather[0].totalSnowfall_cm
        })
      })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.name}
        </Text>
        <Text style={styles.instructions}>
          temp (low / high): {this.state.temp.low} / {this.state.temp.high}
        </Text>
        {/* <Text style={styles.instructions}>
          bottom: {this.state.bottom.high} / {this.state.bottom.low}
        </Text>
        <Text style={styles.instructions}>
          mid: {this.state.mid.high} / {this.state.mid.low}
        </Text>
        <Text style={styles.instructions}>
          top: {this.state.top.high} / {this.state.top.low}
        </Text> */}
        <Text style={styles.instructions}>
          snowfallCM: {this.state.snowfallCM}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
