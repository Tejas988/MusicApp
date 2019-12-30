import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import Artists from './screens/Artists'



const navigator=createStackNavigator({
    Search: Artists
},
{
    initialRouteName:'Search',
    defaultNavigationOptions:{
        title : 'Albums'
    }
});

const Appcontainer=createAppContainer(navigator);

export default App=()=>{
    return <Appcontainer/>;
}