import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { red, orange, blue, lightPurp, pink, white } from './colors'
import {Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY='flashCard:notifications'

export function clearLocalNotification(){
  return  AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(()=>{
        debugger;
        Notifications.cancelAllScheduledNotificationsAsync()
    })
    .catch((e)=>{
        debugger;
        console.log(e)
    })
  
  }
  export function createNotification(){
    return{
      title:'Start your quiz!',
      body:"don't forget to take your quiz",
      ios:{
        sound:true
      },
      android:{
        sound:true,
        priority:'high',
        sticky:false,
        vibrate:true,
      }
    }
  
  }
  export function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data)=>{
      if(data===null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({status})=>{
          if(status==='granted'){
            Notifications.cancelAllScheduledNotificationsAsync()
            let tomorrow=new Date()
            tomorrow.setDate(tomorrow.getDate()+1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)
            debugger;
            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time:tomorrow,
                repeat:'day'
              }
            )
            
            AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
          }
        })
      }
    })
  
  }