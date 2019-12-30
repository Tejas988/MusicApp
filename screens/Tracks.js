import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

export default class Tracks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [0],
      search: '',
      id: 'b',
      display_flat_list: false,
    };
  }

  performSearch({search}) {
    fetch(
      'https://ws.audioscrobbler.com/2.0/?method=album.search&album=' +
        search +
        '&api_key=14976a871b29b5611ebdbd98c66b24ad&format=json',
    )
      .then(response => response.json())
      .then(response => {
        this.setState({
          Data: response.results.albummatches.album.splice(0,16),
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(search) {
    this.setState({search});
    this.performSearch({search});
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        <View
          style={{
            color: 'black',
            flexDirection: 'row',
            marginLeft: 5,
            marginVertical: 8,
          }}>
          <View style={{flex: 1}}>
            <Image
              style={{width: 60, height: 60, padding: 2}}
              source={{uri: 'http://clipart-library.com/images/kT85re8ac.jpg'}}
            />
          </View>

          <View style={{flex: 5}}>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  flex: 2,
                  fontWeight: 'bold',
                  fontFamily: 'Algerian',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  color: 'yellow',
                  fontSize: 16,
                  flex: 1,
                  fontFamily: 'Algerian',
                }}>
                {item.artist}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
          underlineColorAndroid={"black"}
          
            style={styles.inputStyle}
            placeholder=" Search Track"
            placeholderTextColor="#FFFFFF"
            onChangeText={search => {
              if (search == '') {
                this.setState({display_flat_list: false});
              } else this.setState({display_flat_list: true});
              this.handleChange(search);
            }}
          />

          {this.state.display_flat_list ? (
            <FlatList
              data={this.state.Data}
              keyExtractor={(item, id) => id}
              renderItem={this.renderItem}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 2,
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: '#000000',
    },
  
    inputStyle: {
      marginVertical: 16,
      marginHorizontal: 20,
      paddingLeft:20,
      height: 55,
      paddingHorizontal: 25,
      alignSelf: 'stretch',
      borderWidth: 2,
      fontSize: 23,
      borderColor: 'pink',
      borderRadius: 28,
      color: '#FFFFFF',
    },
  });
  
