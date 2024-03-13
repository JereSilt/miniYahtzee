import { useState } from 'react'
import React from 'react'
import { Text, View, Pressable } from 'react-native'
import Header from './Header'
import Footer from './Footer'
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS,
} from '../constants/Game'
import { Container, Row, Col} from "react-native-flex-grid"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import styles from '../style/style'

let board = []

export default Gameboard = () => {

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
  const [status, setStatus] = useState("Throw dices")
  const [gameEndStatus, setGameEndStatus] = useState(false)

  const [selectedDices, setSelectedDices] = 
    useState(new Array(NBR_OF_DICES).fill(false))
  const [diceSpots, setDiceSpots] =
    useState(new Array(NBR_OF_DICES).fill(0))


  const [selectedDicePoints, setSelectedDicePoints] =
    useState(new Array(MAX_SPOT).fill(false))
  const [dicePointsTotal, setDicePointsTotal] = 
    useState(new Array(MAX_SPOT).fill(0))

  const [playerName, setPlayerName] = useState("")  

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Col key={"row" + i}>
      <Pressable 
          key={"row" + i}
          onPress={() => selectDice(i)}
          >
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={50} 
          
          color={getDiceColor(i)}
          >
        </MaterialCommunityIcons>
      </Pressable>
      </Col>
    );
  }

  const pointsRow = []
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"pointsRow" + spot}>
        <Text key={"pointsRow" + spot}>{getSpotTotal(spot)}</Text>
      </Col>
    )
  }

  const pointsToSelectRow = []
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
    <Col key={"buttonsRow" + diceButton}>
      <Pressable key={"buttonsRow" + diceButton}
      onPress={() => selectDicePoints(diceButton)}
      >
        <MaterialCommunityIcons 
        key={"buttonsRow" + diceButton}
        name={"numeric-" + (diceButton + 1) + "-circle"}
        size={35}
        color={getDicePointsColor(diceButton)}
        >

        </MaterialCommunityIcons>
      </Pressable>
    </Col>
    )
  }

  function getDiceColor(i) {
    return selectedDices[i] ? "black" : "steelblue"
  }

  function getDicePointsColor(i) {
    return selectedDicePoints[i] ? "black" : "steelblue"
  }

  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  const selectDicePoints = (i) => {
    let selectedPoints = [...selectedDicePoints];
    let points = [...dicePointsTotal]
    selectedPoints[i] = true
    let nbrOfDices = 
      diceSpots.reduce(
        (total, x) => (x === (i + 1) ? total + 1 : total), 0)
    points[i] = nbrOfDices * (1 + i)
    setDicePointsTotal(points)
    setSelectedDicePoints(selectedPoints)
    return points[i]
  }


  const throwDices = () => {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
        board[i] = 'dice-' + randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
  }

  function getSpotTotal(i) {
    return dicePointsTotal[i]
  }

  return (
    <>
    <Header />
    <View >
      <Container>
        <Row>
          {row}
        </Row>
      </Container>
      <Text>Throws left: {nbrOfThrowsLeft}</Text>
      <Text>{status}</Text>
      <Pressable
        onPress={() => throwDices()}
      >
        <Text>Throw dices</Text>
      </Pressable>
      <Container>
        <Row>
          {pointsRow}
        </Row>
      </Container>
      <Container>
        <Row>
          {pointsToSelectRow}
        </Row>
      </Container>
    </View>
    <Footer />
    </>
  )
}