import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView,TextInput,Dimensions } from 'react-native'
import { addCardToDeck} from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import {white, black, dimGray,lightGray} from '../utils/colors'
import {NavigationActions} from 'react-navigation'


class AddCard extends Component {
    //to render deck title and add card in header
    static navigationOptions=({navigation})=>{
        const {id}=navigation.state.params
        return {
            title:id +'       Add Card'
        }
    }
  state = {
      question:'',
      answer:''
  }
  handelQuestionChange=(question)=>{
    this.setState(()=>({question}))
  }
  handelAnswerChange=(answer)=>{
    this.setState(()=>({answer}))
  }
  handelSubmit=()=>{
    const {id}=this.props
    const {question,answer}=this.state
    if(question===''||answer==='')//check if question or answer is empty
    {
        alert('Please make sure to add question and answer before submit')
        return;
    }
    //save card in local storage
    addCardToDeck(id,question,answer)
    //call addCard redux actions
    this.props.dispatch(addCard(id,question,answer))
    //return to previous screen deck screen
    this.toBack()
    this.setState(()=>({question:'',answer:''}))
  }
  toBack=()=>{
    const {id}=this.props
    this.props.navigation.dispatch(NavigationActions.back(id))
  }
  
  render(){
      const {question,answer}=this.state
      return(
        <KeyboardAvoidingView style={styles.container}>
          <View>
            <TextInput style={styles.txt} placeholder='Question' value={question} onChangeText={this.handelQuestionChange}></TextInput>
            <TextInput style={styles.txt} placeholder='Answer' value={answer} onChangeText={this.handelAnswerChange}></TextInput>
          </View>
         
          <TouchableOpacity style={styles.btnSubmit} onPress={this.handelSubmit}>
              <Text style={{color:white,fontSize:18}}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
      margin:10,
      paddingLeft:10,
      fontSize:16

  }
})

function mapStateToProps(state,{navigation}){
    debugger;
  const {id}=navigation.state.params
  return{
      id
  }
}

export default connect(
  mapStateToProps
)(AddCard)