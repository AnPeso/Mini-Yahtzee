import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../style/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";
import Footer from "./Footer";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MAX_SPOT,
  SCOREBOARD_KEY,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS,
} from "../constants/Game";
import { Col, Row, Container } from "react-native-flex-grid";

let board = [];

export default function Gameboard({ navigation, route }) {
  const [status, setStatus] = useState('Throw dices');
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [gameEndStatus, setGameEndStatus] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [scores, setScores] = useState([]);
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
  const [bonusStatus, setBonusStatus] = useState('');


  useEffect(() => {
      if (playerName === '' && route.params?.player) {
          setPlayerName(route.params.player);
      }
  }, []);

  useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
          getScoreboardData();
      });
      return unsubscribe;
  }, [navigation]);

  const getScoreboardData = async () => {
      try {
          const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
          if (jsonValue !== null) {
              const tmpScores = JSON.parse(jsonValue);
              setScores(tmpScores);
          }  
      } catch (e) {       
          console.error("Error fetching scoreboard data: ", e);
      }
  };

  const savePlayerPoints = async () => {
    const newKey = scores.length + 1;
    const totalPoints = dicePointsTotal.reduce((total, num) => total + num, 0);
    let finalScore = totalPoints;

    // Lisää bonuspisteet, jos raja ylitetään
    if (totalPoints >= BONUS_POINTS_LIMIT) {
        finalScore += BONUS_POINTS;
    }

    const playerPoints = {
        key: newKey,
        name: playerName,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        points: finalScore // Tallenna lopullinen pistemäärä
    };

    try {
        const newScore = [...scores, playerPoints];
        const jsonValue = JSON.stringify(newScore);
        await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
        resetGame(); 
    } catch (e) {
        console.error("Error saving points", e);
    }
};



    const dicesRow = [];
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
        dicesRow.push(
            <Col key={"dice" + dice}>
                <Pressable onPress={() => chooseDice(dice)}>
                    <MaterialCommunityIcons
                        name={board[dice]}
                        size={50} 
                        color={getDiceColor(dice)}
                    />
                </Pressable>
            </Col>
        );
    }

    const pointsRow = [];
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        const total = getSpotTotal(spot);
        pointsRow.push(
            <Col key={"pointsRow" + spot}>
                <Text style={styles.pointRow}>{typeof total === "number" ? total : "Invalid data"}</Text>
            </Col>
        );
    }

    
    const pointsToSelectRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        pointsToSelectRow.push(
            <Col key={"buttonsRow" + diceButton}> 
                <Pressable onPress={() => chooseDicePoints(diceButton)}>
                    <MaterialCommunityIcons
                        name={"numeric-" + (diceButton + 1) + "-circle"}
                        size={35}
                        color={getDicePointsColor(diceButton)}
                    />
                </Pressable>
            </Col>
        );
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] ? '#2b0121' : '#a27899';
    }

    const chooseDice = (i) => {
        if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...selectedDices];
            dices[i] = !selectedDices[i];
            setSelectedDices(dices);
        } else {
            setStatus("You have to throw dices first");
        }
    }

    function getDiceColor(i) {
        return selectedDices[i] ? '#2d1229' : '#ab84a2';
    }

const throwDices = () => {
        if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points before the next throw');
            return;
        }
    
        let spots = [...diceSpots];
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
                board[i] = 'dice-' + randomNumber;
                spots[i] = randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
        setDiceSpots(spots);
        
         // Päivitä jäljellä olevat pisteet bonukseen
        const totalPoints = dicePointsTotal.reduce((total, num) => total + num, 0);
        if (totalPoints >= BONUS_POINTS_LIMIT) {
        setBonusStatus("Congratulations! You've earned bonus points!");
         } else {
        setBonusStatus(`You are ${BONUS_POINTS_LIMIT - totalPoints} points away from bonus.`);
         }

         // Päivitä status heiton jälkeen
         if (nbrOfThrowsLeft === 1) {
        setStatus('Select your points before the next throw');
        } else {
        setStatus('Throw dices');
        }
};

const chooseDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0) {
        let selected = [...selectedDices];
        let selectedPoints = [...selectedDicePoints];
        let points = [...dicePointsTotal];

        if (!selectedPoints[i]) {
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
            selectedPoints[i] = true;
            let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
            points[i] = nbrOfDices * (i + 1);
            setDicePointsTotal(points);
            setSelectedDicePoints(selectedPoints);
            setNbrOfThrowsLeft(NBR_OF_THROWS);

            
            const totalPoints = points.reduce((total, num) => total + num, 0);
        if (totalPoints >= BONUS_POINTS_LIMIT) {
                setBonusStatus("Congratulations! You've earned bonus points!");
            } else {
                setBonusStatus(`You are ${BONUS_POINTS_LIMIT - totalPoints} points away from bonus.`);
            }

        return points[i];
            } else {
            setStatus('You already selected points for ' + (i + 1));
             }
            } else {
            setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points.');
            }
}

function getSpotTotal(i) {
        return dicePointsTotal[i];
}

const allPointsSelected = () => {
        return selectedDicePoints.every(point => point);
};

const resetGame = () => {
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setStatus('Throw dices');
        setGameEndStatus(false);
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setDiceSpots(new Array(NBR_OF_DICES).fill(0));
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        setDicePointsTotal(new Array(MAX_SPOT).fill(0));
        setBonusStatus('');
};


return (
    <View style={styles.container}>
        <Header />
        <View>
            <Text style={styles.text}>Player: {playerName}</Text>
                <Container>
                    <Row>{dicesRow}</Row>
                </Container>
                <Text style={styles.text}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={styles.text}>{status}</Text>
                <View style={styles.buttonContainer}>
                <Pressable onPress={throwDices} style={styles.button}>
                    <Text style={styles.text}>THROW DICES</Text>
                </Pressable>
        </View>
                <Container>
                    <Row>{pointsRow}</Row>
                </Container>
                <Container>
                    <Row>{pointsToSelectRow}</Row>
                </Container>
                <Text style={styles.text}>{bonusStatus}</Text>
                
                {(() => {
                    const totalPoints = dicePointsTotal.reduce((total, points) => total + points, 0);
                    const finalScore = totalPoints >= BONUS_POINTS_LIMIT ? totalPoints + BONUS_POINTS : totalPoints;
    
                    return (
                        <Text style={styles.text}>Total Points: {finalScore}</Text>
                    );
                })()}
    
                {allPointsSelected() && (
                    <>
                        <Pressable onPress={resetGame} style={styles.button}>
                            <Text style={styles.text}>Start Again</Text>
                        </Pressable>
                    </>
                )}
                <Pressable onPress={savePlayerPoints} style={styles.button}>
                    <Text style={styles.text}>SAVE POINTS</Text>
                </Pressable>
            </View>
            <Footer />
        </View>
    );
}