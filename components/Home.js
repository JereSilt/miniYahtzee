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

export default Home = (navigation) => {

    const [name, setName] = useState('')
    const [hasName, setHasName] = useState(false)

    const handleName = (value) => {
        if (value.trim().length > 0) {
            setHasName(true)
            Keyboard.dismiss()
        }
    }

  return (
    <View >
      <Text >
        Honme will be here...
      </Text>
    </View>
  )
}