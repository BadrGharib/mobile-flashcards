import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView,TextInput,Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { addCardToDeck} from '../utils/api'
import { connect } from 'react-redux'
import { addDeck,addCard } from '../actions'
import {white, purple,black, dimGray,red,green,lightGray} from '../utils/colors'
import {NavigationActions} from 'react-navigation'
import { AppLoading} from 'expo'
import {clearLocalNotification,setLocalNotification} from '../utils/helper'



class Quiz extends Component {
    static navigationOptions=({navigation})=>{
        const {id}=navigation.state.params
        return {
            title:'Quiz'
        }

    }
  state = {
      showAnswer:false,
      count:0,
      loading:false,
      countTrueAnswer:0
  }
  componentDidMount(){
    debugger;
    const{deck}=this.props
    const count=deck.questions.length
    this.setState(()=>({count,loading:true}))
    
  }
  
//   handelQuestionChange=(question)=>{
//     this.setState(()=>({question}))
//   }
//   handelAnswerChange=(answer)=>{
//     this.setState(()=>({answer}))
//   }
//   handelSubmit=()=>{
//       debugger;
//     const {id}=this.props
//     const {question,answer}=this.state
//     addCardToDeck(id,question,answer)
//     this.props.dispatch(addCard(id,question,answer))
//     this.toBack()
//   }
 
  handelToggleQA=()=>{
      this.setState((currentState)=>({showAnswer:!currentState.showAnswer}))
  }
  handelCorect=()=>{
      debugger;
    this.setState((currentState)=>({
        count:currentState.count-1,
        countTrueAnswer:currentState.countTrueAnswer+1,
        showAnswer:false
    }))
    debugger;
    this.setNextNotification()
  }
  handelInCorrect=()=>{
      debugger;
    this.setState((currentState)=>({
        count:currentState.count-1,
        showAnswer:false
    }))
    debugger;
    this.setNextNotification()
   
  }
  setNextNotification=()=>{
      debugger;
      const {count}=this.state
      if(count-1===0)
      {
        clearLocalNotification()
        .then(()=>{
            debugger;
            setLocalNotification()
            } )
      }
   
  }
  handelRestartQuiz=()=>{
    const {deck}=this.props
    const totalCount=deck.questions.length
      this.setState(()=>({
        showAnswer:false,
        count:totalCount,
        countTrueAnswer:0
      }))

  }
  handelBackToDeck=()=>{
    debugger;
    const {deck}=this.props
    this.props.navigation.dispatch(NavigationActions.back(deck.title))
   }
  
  render(){
      debugger;
      //if()
      const {count,loading,countTrueAnswer,showAnswer}=this.state
      if(!loading)
          return <AppLoading/>;
      const {deck}=this.props
      const totalCount=deck.questions.length
      if(totalCount === 0)
      {
          return <View style={styles.center}>
              <Text style={{fontSize:30,textAlign:'center'}}>Sorry, you can't start a quiz because there are no cards in the deck</Text>
          </View>
      }
      if(count === 0)
      {

         
        return ( 
          <View style={styles.container}>
              <View>
                <Text style={{fontSize:36}}>Your Score :</Text>
                {
                    countTrueAnswer===0
                    ?
                    <Text  style={{fontSize:36}}> 0%</Text>
                    :
                    <Text style={{fontSize:36}}>{Math.round(countTrueAnswer*100/totalCount)}%</Text>
                }
              </View>
              <View>
              <TouchableOpacity style={styles.btnRestartQuiz} onPress={this.handelRestartQuiz}>
                    <Text style={{color:white,fontSize:18}}>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnGoBack} onPress={this.handelBackToDeck}>
                <Text style={{fontSize:18}}>Back to Deck</Text>
                </TouchableOpacity>
                
              </View>
             
          </View>
        )
         
      }
debugger;
      return(
          
        <View style={styles.container}>
          <Text style={{alignSelf:'flex-start',marginLeft:15,fontSize:22}}>{count}/{totalCount}</Text>
          <View>
          <Text  style={{fontSize:36}}>
             {
               showAnswer===true
               ?
               deck.questions[count-1].answer
               :
               deck.questions[count-1].question
             }
          </Text>
          <TouchableOpacity style={styles.btnText} onPress={this.handelToggleQA}>
              <Text style={{color:red,fontSize:18,textAlign:'center'}}>
                {
                showAnswer===true
                ?
                'Question'
                :
                'Answer'
                }
              </Text>
          </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.btnCorrect} onPress={this.handelCorect}>
                <Text style={{color:white,fontSize:18}}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnInCorrect} onPress={this.handelInCorrect}>
                <Text style={{color:white,fontSize:18}}>Incorrect</Text>
            </TouchableOpacity>
          </View>
         
        </View>
      )
    
  }
    
   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:'space-around',
    backgroundColor: lightGray,
  },
  btnCorrect: {
    backgroundColor: green,
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
  btnInCorrect: {
    backgroundColor: red,
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
  btnGoBack: {
    backgroundColor: white,
    height: 45,
    width:200,
    borderRadius: 2,
    borderWidth:2,
    borderColor:black,
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    
  },
  btnRestartQuiz: {
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
  center:{
      flex:1,
      justifyContent:"center",
      alignItems:'center'
  }
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