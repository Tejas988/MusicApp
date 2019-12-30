/*axios.get(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${this.state.term}&api_key=14976a871b29b5611ebdbd98c66b24ad&format=json`)
.then(response => this.setState({music:response.data.results.albummatches.album}))
.catch((error)=>{  
JSON: /2.0/?method=artist.search&artist=che
    this.setState({errormsg:''})
 });*/
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

export default class TagTopArtist extends Component {
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
      'https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=' +
        search +
        '&api_key=14976a871b29b5611ebdbd98c66b24ad&format=json',

       // `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${text}&api_key=577bc22e1d9e8ddc826719c1f0c246eb&format=json`,
    )
      .then(response => response.json())
      .then(response => {
        this.setState({
          Data: response.topartists.artist,
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
              source={{
                uri:
                  'https://www.freepnglogos.com/uploads/top-music-red-logo-png-0.png',
                  
              }}
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
                }}>
                {item.name}
              </Text>
              <Text style={{color: 'skyblue', fontSize: 15, flex: 1}}>
                Artist
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
          underlineColorAndroid="transparent"
            style={styles.inputStyle}
            placeholder=" Search Artists by Tag"
            placeholderTextColor="#F0EEEE"
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
