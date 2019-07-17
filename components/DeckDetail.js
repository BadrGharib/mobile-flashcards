import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {white,black,lightGray} from '../utils/colors'
import Deck from './Deck'

class DeckDetail extends Component {
  //show deck title in header
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
              <Text style={{fontSize:18}}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStartQuiz} onPress={this.handelStartQuiz}>
              <Text style={{color:white,fontSize:18}}>Start Quiz</Text>
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
  btnAddCard: {
    backgroundColor: white,
    height: 45,
    width:200,
    borderRadius: 2,
    borderWidth:2,
    borderColor:black,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    
  },
  btnStartQuiz: {
    backgroundColor: black,
    height: 45,
    width:200,
    borderRadius: 2,
    borderWidth:2,
    borderColor:white,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
})

function mapStateToProps(state,{navigation}){
    debugger;
  const {id}=navigation.state.params//get deck title from navigation
  return{
      deck:state[id]
  }
}

export default connect(
  mapStateToProps
)(DeckDetail)