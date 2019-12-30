import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Artists from './screens/Artists';
import Albums from './screens/Albums';
import TagTopArtist from './screens/TagTopArstist';

import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';

import Tracks from './screens/Tracks';
const TabNavigator = createMaterialBottomTabNavigator({
  Tracks: {
    screen: Tracks,
    navigationOptions: {
      tabBarIcon: () => (
        <View>
          <Icon name={'music'} size={20} color="white"></Icon>
        </View>
      ),
      tabBarLabel: <Text style={{color:"yellow"}}>Track</Text>
    },
  },
  Albums: {
    screen: Albums,
    navigationOptions: {
      tabBarOptions: { activeTintColor:'red'},
      tabBarIcon: () => (
        <View>
          <Icon name={'book'} size={20} color="white"></Icon>
        </View>
      ),
      tabBarLabel: <Text style={{color:"yellow"}}>Album</Text>
    },
    
  },

  Artists: {
    screen: Artists,
    navigationOptions: {
      tabBarIcon: () => (
        <View>
          <Icon name={'group'} size={20} color="white"></Icon>
        </View>
      ),
      tabBarLabel:  <Text style={{color:"yellow"}}>Artists</Text>   },
  },

  TagTopArtist: {
    screen: TagTopArtist,
    navigationOptions: {
      tabBarIcon: () => (
        <View>
          <Icon name={'flash'} size={20} color="white"></Icon>
        </View>
      ),
      tabBarLabel:  <Text style={{color:"yellow"}}>Trending</Text>
    },
  },
},
{
  activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    
  barStyle: { backgroundColor: '#193366' },
});

const App = createAppContainer(TabNavigator);
export default App;
