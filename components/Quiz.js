import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView,TextInput,Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { addCardToDeck} from '../utils/api'
import { connect } from 'react-redux'
import { addDeck,addCard } from '../actions'
import {white, purple,black, dimGray,red} from '../utils/colors'
import {NavigationActions} from 'react-navigation'
import { AppLoading} from 'expo'


class Quiz extends Component {
    static navigationOptions=({navigation})=>{
        const {id}=navigation.state.params
        return {
            title:'Quiz'
        }

    }
  state = {
      answer:false,
      count:0,
      loading:false
  }
  componentDidMount(){
    debugger;
    const{deck}=this.props
    const count=deck.questions.length
    this.setState(()=>({count,loading:true}))
    
  }
  
  handelQuestionChange=(question)=>{
    this.setState(()=>({question}))
  }
  handelAnswerChange=(answer)=>{
    this.setState(()=>({answer}))
  }
  handelSubmit=()=>{
      debugger;
    const {id}=this.props
    const {question,answer}=this.state
    addCardToDeck(id,question,answer)
    this.props.dispatch(addCard(id,question,answer))
    this.toBack()
  }
  toBack=()=>{
      debugger;
    const {id}=this.props
    this.props.navigation.dispatch(NavigationActions.back(id))
  }
  
  render(){
      debugger;
      //if()
      const {count,loading}=this.state
      if(!loading)
          return <AppLoading/>;
      const {deck}=this.props
      const totalCount=deck.questions.length

      return(
        <View style={styles.container}>
          <Text style={{alignSelf:'flex-start'}}>{count}/{totalCount}</Text>
          <View>
          <Text >{deck.questions[count-1].question}</Text>
          <TouchableOpacity style={styles.btnText}>
              <Text style={{color:red}}>Answer</Text>
          </TouchableOpacity>
          </View>
         
          <TouchableOpacity style={styles.btnSubmit} onPress={this.handelSubmit}>
              <Text style={{color:white}}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSubmit} onPress={this.handelSubmit}>
              <Text style={{color:white}}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      )
    
  }
    
   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:'space-around'
  },
  btnSubmit: {
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
  txt:{
      borderColor:dimGray,
      borderWidth:1,
      width:Dimensions.get('window').width-20,
      height:40,
      margin:10

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
)(Quiz)