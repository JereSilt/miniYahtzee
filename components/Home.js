import React from 'react'
import { Text, View, TextInput, Pressable, Keyboard } from 'react-native'
import styles from '../style/style'
import { useState } from 'react'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Header from './Header';
import Footer from './Footer';
import style from '../style/style';
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS,
} from '../constants/Game'

export default Home = ( {navigation} ) => {

    const [name, setName] = useState('')
    const [hasName, setHasName] = useState(false)

    const handleName = (value) => {
        if (value.trim().length > 0) {
            setHasName(true)
            Keyboard.dismiss()
        }
    }

    

  return (
    <>
      <Header />
      <View>
        <MaterialCommunityIcons
         name="information" 
         size={90} 
         color="steelblue" />
         {!hasName ?
          <> 
            <Text>For scoreboard enter your name!</Text>
            <TextInput
              onChangeText={setName}
              autoFocus={true}
              />
              <Pressable
              onPress={() => handleName(name)}>
              <Text>OK</Text>
              </Pressable>
            </>
          :
            <>
              <Text>Rules of the game</Text>
              <Text multiline="true">
                THE GAME: Upper section of the classic Yahtzee
                dice game. You have {NBR_OF_DICES} dices and
                for the every dice you have {NBR_OF_THROWS}
                throws. After each throw you can keep dices in
                order to get same dice spot counts as many as
                possible. In the end of the turn you must select
                your points from {MIN_SPOT} to {MAX_SPOT}.
                Game ends when all points have been selected.
                The order for selecting those is free.
                </Text>
                <Text>Good luck, {name}</Text>
                <Pressable
                onPress={() => navigation.navigate("Gameboard", {player: name})}>
                  <Text>Start game</Text>
                </Pressable>
              </>
            }
      </View>
      <Footer />
    </>
  )
}