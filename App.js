import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import Constants from 'expo-constants'
import {white,purple} from './utils/colors'
import {FontAwesome , Ionicons} from '@expo/vector-icons'
import {createBottomTabNavigator ,createAppContainer , createStackNavigator} from 'react-navigation'
function CustomStatusBar({backgroundColor,...props}){
  return(
    <View style={{backgroundColor,height:Constants.StatusBarHeight}}>
     <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

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
      tabBarLabel:'Add Entry',
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
})
let MainTabs=createAppContainer(MainNavigator)

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
         {/* <CustomStatusBar backgroundColor={purple} barStyle='light-content'/> */}
         <MainTabs />
         
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
