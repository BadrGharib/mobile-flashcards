import React, { Component } from 'react'
import { View, StyleSheet,FlatList, TouchableOpacity,Dimensions,Animated} from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks} from '../actions'
import { AppLoading} from 'expo'
import {getDecks} from '../utils/api'
import Deck from './Deck';
import {gray,lightGray} from '../utils/colors'

 class DeckList extends Component {
  state = {
    ready: false,
    opacity:new Animated.Value(1),
    selected:''
  }
  componentDidMount () {
    const { dispatch } = this.props
    getDecks()//get decks from local storage
      .then((decks) => {
          return dispatch(receiveDecks(decks)//call receiveDecks action
          )})
      .then(() => this.setState(() => ({ready: true})))//set ready to true to hide loading 
  }
  onDeckSelected=(item)=>{
    this.setState(()=>({selected:item.title}))
      const {opacity}=this.state
      Animated.timing(opacity,{toValue:0,duration:1000}).start()//start opacity anaimation
     this.props.navigation.navigate('DeckDetail',{id:item.title})
     Animated.timing(opacity,{toValue:1,duration:1000}).start()//return opacity back to 1

  }
  //render item in flatList
  renderItem=({item})=>{
      const {opacity,selected}=this.state
    return (
       <View style={styles.containerRenderItem} >
          <TouchableOpacity 
            style={{marginTop:40,width:Dimensions.get('window').width-20}} 
            onPress={()=>this.onDeckSelected(item)}>
              <Animated.View  style={selected===item.title &&{opacity}}>
                <Deck   {...item} />
              </Animated.View>
        </TouchableOpacity>
       </View>
    )
  }
  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {//Show loading 
      return <AppLoading />
    }

    return (
        <View style={styles.center}>
          <FlatList 
           data={Object.values(decks)} 
           renderItem={this.renderItem}
           keyExtractor={(item, index) => index.toString()}
           />
        </View>
     
    )
  }
}

const styles = StyleSheet.create({
  center: {
     flex:1,
     alignItems:"center",
     justifyContent:"center",
     backgroundColor:lightGray
  },
  containerRenderItem:{
    borderBottomColor:gray,
    borderBottomWidth:1,
    width:Dimensions.get('window').width-20,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
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