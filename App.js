import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import Constants from 'expo-constants'
import {white,purple} from './utils/colors'
import {FontAwesome , Ionicons} from '@expo/vector-icons'
import {createBottomTabNavigator ,createAppContainer , createStackNavigator} from 'react-navigation'
import {setLocalNotification} from './utils/helper'

const Tabs=createBottomTabNavigator({
  DeckList:{
    screen:DeckList,
    navigationOptions:{
      tabBarLabel:'Decks',
      tabBarIcon:({tintColor})=><Ionicons name='ios-bookmarks' size={30} color={tintColor}/>,
      
    }
  },
  AddDeck:{
    screen:AddDeck,
    navigationOptions:{
      tabBarLabel:'Add Deck',
      tabBarIcon:({tintColor})=><Ionicons name='ios-add-circle' size={30} color={tintColor}/>,
     
    }
  }
},{
  defaultNavigationOptions:{
    // header:null
  
  }
},{
  tabBarOptions:{
   activeTintColor:purple,
   style:{
     height:56,
     backgroundColor:purple,
     shadowColor:'rgba(0,0,0,0.24)',
     shadowOffest:{
       width:0,
       height:3
     },
     shadowRadius:6,
     shadowOpacity:1
   }
  }
})

const MainNavigator=createStackNavigator({
 Home:{
   screen:Tabs,
   navigationOptions:{
    headerTintColor:white,
    headerStyle:{
      backgroundColor:purple,
    }
  }
 }
 ,
 DeckDetail:{
   screen:DeckDetail,
   navigationOptions:{
     headerTintColor:white,
     headerStyle:{
       backgroundColor:purple,
     }
   }
 }
 ,
 AddCard:{
  screen:AddCard,
  navigationOptions:{
    headerTintColor:white,
    headerStyle:{
      backgroundColor:purple,
    }
  }
}
,
 Quiz:{
  screen:Quiz,
  navigationOptions:{
    headerTintColor:white,
    headerStyle:{
      backgroundColor:purple,
    }
  }
}
})
let MainTabs=createAppContainer(MainNavigator)

export default class App extends React.Component {
  componentDidMount(){
    debugger;
    setLocalNotification()
  }
  render()
  {
    return (
      <Provider store={createStore(reducer)}>
          
           <MainTabs />
           
        </Provider>
    );
  }
 
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
