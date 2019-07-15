import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { saveDeckTitle} from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
// import {NavigationAction, NavigationActions} from 'react-navigation'
import {white, purple,gray,red,black,lightGray} from '../utils/colors'
import Deck from './Deck'

class DeckDetail extends Component {

  state = {
  }
  static navigationOptions=({navigation})=>{
        const {id}=navigation.state.params
        return {
            title:id
        }

    }
    addCard=()=>{
      const {deck}=this.props
      this.props.navigation.navigate('AddCard',{id:deck.title})
    }
    handelStartQuiz=()=>{
      debugger;
      const {deck}=this.props
      this.props.navigation.navigate('Quiz',{id:deck.title})
    }
  
  render(){
      const {deck}=this.props
      return(
        <View style={styles.container}>
          <View style={{height:200}}>
            <Deck {...deck} />
          </View>
         
          <TouchableOpacity style={styles.btnAddCard} onPress={this.addCard}>
              <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStartQuiz} onPress={this.handelStartQuiz}>
              <Text style={{color:white}}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnText}>
              <Text style={{color:red}}>Delete Deck</Text>
          </TouchableOpacity>
       </View>
      )
    
  }
    
   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightGray,
    alignItems:'center',
    justifyContent:'flex-start'
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  btnAddCard: {
    backgroundColor: white,
    height: 45,
    width:200,
    borderRadius: 2,
    borderWidth:2,
    borderColor:black,
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  btnStartQuiz: {
    backgroundColor: black,
    height: 45,
    width:200,
    borderRadius: 2,
    borderWidth:2,
    borderColor:white,
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  btnText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop:20
  },
})

function mapStateToProps(state,{navigation}){
    debugger;
  const {id}=navigation.state.params
  return{
      deck:state[id]
  }
}

export default connect(
  mapStateToProps
)(DeckDetail)