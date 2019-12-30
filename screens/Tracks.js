import React,{Component} from 'react';
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
      Data : [0],
      search: "",
      id : "b",
      display_flat_list: false

    };
  }


  performSearch({search}) {
    fetch('http://ws.audioscrobbler.com/2.0/?method=track.search&track='+search+'&api_key=0c0e5f11eaf86c12feb243c90d08004b&format=json&format=json')
    .then((response) => response.json()) 
    .then(response => {
        this.setState ({
          Data : response.results.trackmatches.track, 
          
        })    
    })
    .catch((error) =>
    {
      console.log(error)

    })

  }


  handleChange(search) 
  {
    this.setState({search});
    this.performSearch({search});

  }

 renderItem = ({item}) => {
    return(
      
      <TouchableOpacity
        onPress = {() => Linking.openURL(item.url)}>
      
        <View style = {{color:"black",flexDirection:"row",marginLeft:5,marginVertical:8}}> 
          <View style={{flex:1}}>
            <Image style = {{ width:60 , height:60, padding:2}}
            source = {{uri: 'http://clipart-library.com/images/kT85re8ac.jpg' }} />
          </View>
     
          <View  style={{flex:5}}>
            <View style={{flexDirection:"column"}} >
              <Text style = {{color:"white",fontSize:22,flex:2,fontWeight:"bold", fontFamily: "Algerian",}}>
                  {item.name} 
              </Text>
              <Text style = {{color:"yellow",fontSize:16,flex:1, fontFamily: "Algerian",}} >
              {item.artist}
              </Text>
             </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render()
  {
    return(
      <View style = {styles.container}>
          <View>
          <TextInput style = {styles.inputStyle}
          placeholder = " Search Track"
          placeholderTextColor = "#FFFFFF"
          onChangeText={(search) => {
            if(search=='')
            { this.setState({display_flat_list:false});}
             else
             this.setState({display_flat_list:true})  
            this.handleChange(search)}}
          />

      
        {  (this.state.display_flat_list) ?<FlatList 
            data = {this.state.Data}
            keyExtractor = {(item,id) => id}
            renderItem = {this.renderItem}
          />:null }
          
          </View>
          </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
      flex: 2,
      flexDirection:"column",
      alignItems: "stretch",
      backgroundColor: "#000000",
  
  },

  inputStyle: {
    marginTop : 15,
    marginLeft: 8,
    marginRight: 8,
    marginBottom :15,
    height: 50,
    alignSelf: "stretch",
    justifyContent: "center",
    borderWidth: 2,
    marginHorizontal: 25,
    fontSize: 22,
    borderColor: "pink",
    color:"#FFFFFF",


    
},

});