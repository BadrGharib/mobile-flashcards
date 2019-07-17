import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView,TextInput,Dimensions } from 'react-native'
import { saveDeckTitle} from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import {white,black, dimGray, lightGray} from '../utils/colors'



class AddDeck extends Component {
  //show Add Deck in header
    static navigationOptions=()=>{
        return {
            title:'Add Deck'
        }

    }
  state = {
      title:'',
     
  }
  handelTitleChange=(title)=>{
    this.setState(()=>({title}))
  }
  handelSubmit=()=>{
    const {title}=this.state
    if(title==='')
    {
        alert('Please make sure to add deck title before submit')
        return;
    }
    saveDeckTitle(title)//save deck to local storage
    this.props.dispatch(addDeck(title))
    //navigate to DeckDetail screen
    this.props.navigation.navigate('DeckDetail',{id:title})
    this.setState(()=>({title:''}))
    
  }
  
  render(){
      const {title}=this.state
      return(
        <KeyboardAvoidingView style={styles.container}>
          <View>
            <Text style={{fontSize:36,margin:15,textAlign:'center'}}>What is the title of your new deck?</Text>
            <TextInput style={styles.txt} placeholder='Deck Title' value={title} onChangeText={this.handelTitleChange}></TextInput>
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

export default connect()(AddDeck)