import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet,Dimensions } from 'react-native'
import { connect } from 'react-redux'
import {white,black, dimGray,red,green,lightGray} from '../utils/colors'
import {NavigationActions} from 'react-navigation'
import { AppLoading} from 'expo'
import {clearLocalNotification,setLocalNotification} from '../utils/helper'



class Quiz extends Component {
    //show Quiz header
    static navigationOptions=({navigation})=>{
        const {id}=navigation.state.params
        return {
            title:'Quiz'
        }

    }
  state = {
      showAnswer:false,//toggle between answer and question button
      count:0,//number of remaining questions
      loading:false,
      countTrueAnswer:0//count of true answer
  }
  componentDidMount(){
    debugger;
    const{deck}=this.props
    const count=deck.questions.length
    this.setState(()=>({count,loading:true}))
    
  }
  //toggle between question and answer button
  handelToggleQA=()=>{
      this.setState((currentState)=>({showAnswer:!currentState.showAnswer}))
  }
  handelCorect=()=>{
    this.setState((currentState)=>({
        count:currentState.count-1,
        countTrueAnswer:currentState.countTrueAnswer+1,
        showAnswer:false
    }))
    if(this.state.count-1===0)
    {
      this.setNextNotification()
    }
  }
  handelInCorrect=()=>{
    this.setState((currentState)=>({
        count:currentState.count-1,
        showAnswer:false
    }))
    if(this.state.count-1===0)
    {
      this.setNextNotification()
    }
   
  }
  setNextNotification=()=>{//set next notification time
      const {count}=this.state
      clearLocalNotification()
        .then(()=>{
            setLocalNotification()
            } )
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
    const {deck}=this.props
    this.props.navigation.dispatch(NavigationActions.back(deck.title))
   }
  
  render(){
      
      const {count,loading,countTrueAnswer,showAnswer}=this.state
      if(!loading)
          return <AppLoading/>;
      const {deck}=this.props
      const totalCount=deck.questions.length
      if(totalCount === 0)// check if the dec have no cards
      {
          return <View style={styles.center}>
              <Text style={{fontSize:30,textAlign:'center'}}>Sorry, you can't start a quiz because there are no cards in the deck</Text>
          </View>
      }
      if(count === 0)//check if this the last question to show the score
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
      return(
        <View style={styles.container}>
          <Text style={{alignSelf:'flex-start',marginLeft:15,fontSize:22}}>{count}/{totalCount}</Text>
          <View>
            <Text  style={{fontSize:36}}>
                {
                showAnswer===true//show question or answer titles
                ?
                deck.questions[count-1].answer
                :
                deck.questions[count-1].question
                }
            </Text>
            <TouchableOpacity style={styles.btnText} onPress={this.handelToggleQA}>
                <Text style={{color:red,fontSize:18,textAlign:'center'}}>
                    {
                    showAnswer===true//show question or answer button
                    ?
                    ' Show Question'
                    :
                    'Show Answer'
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
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