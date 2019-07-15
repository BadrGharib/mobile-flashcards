import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform,FlatList, TouchableOpacity,Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks} from '../actions'
import MetricCard from './Deck'
import { AppLoading} from 'expo'
import {getDecks} from '../utils/api'
import Deck from './Deck';
import {white, purple, dimGray, gray} from '../utils/colors'

 class DeckList extends Component {
    // static defaultNavigationOptions = {
    //     title: 'Decks',
    //     headerStyle: {
    //         backgroundColor: purple,
    //     },
    //     headerTintColor: '#fff',
    //     headerTitleStyle: {
    //         fontWeight: 'bold',
    //     },
    //     };
  state = {
    ready: false,
  }
  componentDidMount () {
    const { dispatch } = this.props
    debugger;
    getDecks()
      .then((decks) => {
          debugger;
          return dispatch(receiveDecks(decks)
          )})
      .then(() => this.setState(() => ({ready: true})))
  }
  onDeckSelected=(item)=>{
      debugger;
      this.props.navigation.navigate('DeckDetail',{id:item.title})

  }
  renderItem=({item})=>{
      debugger;
    return (
       <View style={{
            borderBottomColor:gray,
            borderBottomWidth:1,
            width:Dimensions.get('window').width-20,
         }}>
          <TouchableOpacity 
            style={{marginTop:40,width:Dimensions.get('window').width-20,}} 
            key={item.title} 
            onPress={()=>this.onDeckSelected(item)}
          >
            <Deck   {...item}/>
        </TouchableOpacity>
      
       </View>
       
    )
  }
  render() {
      debugger;
   const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
        <View style={styles.center}>
          <FlatList data={Object.values(decks)} renderItem={this.renderItem}/>
        </View>
     
    )
  }
}

const styles = StyleSheet.create({
  center: {
     flex:1,
     alignItems:"center",
     justifyContent:"center"
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})


function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(DeckList)