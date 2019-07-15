import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {black,dimGray, red} from '../utils/colors'

export default function Deck ({ title , questions}) {
    debugger;
  return (
    <View style={styles.container}>
        <Text style={{fontSize: 30, textAlign: 'center' ,color:black}}>{title}</Text>
        <Text style={{fontSize: 18,textAlign: 'center', color: dimGray}}>{questions.length} cards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom:10
   // height:100,
   // backgroundColor:red
   // justifyContent:'center'
  },
})