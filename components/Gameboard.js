// import { useState, useEffect } from "react";
// import { ScrollView, View, Text, Pressable } from "react-native";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import styles from "../style/style";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Header from "./Header";
// import Footer from "./Footer";
// import {
//   NBR_OF_DICES,
//   NBR_OF_THROWS,
//   MAX_SPOT,
//   SCOREBOARD_KEY,
//   MIN_SPOT,
//   BONUS_POINTS_LIMIT,
//   BONUS_POINTS,
// } from "../constants/Game";
// import { Col, Row, Container } from "react-native-flex-grid";

// let board = [];

// export default function Gameboard ({ navigation, route }) {

//     const [status, setStatus] = useState('Throw dices');
//     const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
//     const [gameEndStatus, setGameEndStatus] = useState(false);
//     const [playerName, setPlayerName] = useState('');
//     const [scores, setScores] = useState([]);


// // mitkä arpakuutioista ovat valittuina?
//     const [selectedDices, setSelectedDices] = 
//         useState(new Array(NBR_OF_DICES).fill(false));
        
    
// // arpakuutioiden silmäluvut  
//         const [diceSpots, setDiceSpots] = 
//     useState(new Array(NBR_OF_DICES).fill(0));
    
// // mitkä arpakuutioiden silmäluvuista on valittu pisteisiin
//     const [selectedDicePoints, setSelectedDicePoints] = 
//     useState(new Array(MAX_SPOT).fill(false));

// // valittujen arpakuutioiden kokonaispistemäärät
//     const [dicePointsTotal, setDicePointsTotal] =
//     useState(new Array(MAX_SPOT).fill(0));


//     useEffect(() => {
//         if (playerName ==='' && route.params?.player) {
//             setPlayerName(route.params.player);
//         }
//     }, []);
//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', () => {
//             getScoreboardData();
//         })
//         return unsubscribe;
//     }, [navigation]);

//     const getScoreboardData = async() => {
//         try {
//             const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
//             if (jsonValue !== null) {
//                 const tmpScores = JSON.parse(jsonValue);
//                 setScores(tmpScores);
//                 console.log("gameboard read succesful");
//                 console.log("gameboard number of scores: " + tmpScores.length);
//             }
//         }
//         catch (e) {
//             console.log('Read error' + e);
//         }
//     }

//     const savePlayerPoints = async () => {
//         const newKey = scores.length + 1; 
//         const playerPoints = {
//             key: newKey,
//             name: playerName,
//             date: new Date().toLocaleDateString(),
//             time: new Date().toLocaleTimeString(),
//             points: dicePointsTotal.reduce((a, b) => a + b, 0)
//         };
    
//         try {
//             const newScore = [...scores, playerPoints];
//             const jsonValue = JSON.stringify(newScore);
//             await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
//             console.log('Gameboard save successful:', jsonValue);
//         } catch (e) {
//             console.log('Gameboard save error:', e);
//         }
//     }
    

//     // this useEffect is for reading scoreboard from AsynsStorage when user is  navigating back to screen (look at the assignment istructions) 
//     // trigger here navigation for useEffect

//     // this useEffect is for handling the gameflow so the game does not stop too early or does not continue after it should not
//     // trigger here is nbrOfThrowsLeft as a trigger is to avoid "one step behind" problem

//   const dicesRow = [];
//   for (let dice = 0; dice < NBR_OF_DICES; dice++) {
//     dicesRow.push(
//         <Col key={"dice" + dice}>
//       <Pressable 
//           key={"dice" + dice}
//           onPress={() => chooseDice(dice)}
//           >
//         <MaterialCommunityIcons
//           name={board[dice]}
//           key={"dice" + dice}
//           size={50} 
//           color={getDiceColor(dice)}
//           >
//         </MaterialCommunityIcons>
//       </Pressable>
//       </Col>
//     );
//   }


//   // Tässä luodaan pisterivi

// const pointsRow = [];
// for (let spot = 0; spot < MAX_SPOT; spot++) {
//   pointsRow.push(
//     <Col key={"pointsRow" + spot}>
//       <Text key={"pointsRow" + spot}>{getSpotTotal (spot)}
      
//       </Text>
//     </Col>
//   );
// }

//   //tässä luodaan rivi, joka kertoo onko pisteet jo valittu silmäluvulle

// const pointsToSelectRow = [];
// for(let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
//   pointsToSelectRow.push(
//     <Col key={"buttonsRow" + diceButton}> 
//       <Pressable
//         key={"buttonsRow" + diceButton}
//         onPress={() => chooseDicePoints(diceButton)}>

//         <MaterialCommunityIcons
//         name={"numeric-" + (diceButton + 1) + "-circle"}
//         key={"buttonsrow"+ diceButton}
//         size={35}
//         color={getDicePointsColor(diceButton)}
//         >

//         </MaterialCommunityIcons>
//       </Pressable>
//     </Col>
//   );
// }

//   function getDicePointsColor(i) {
//     return selectedDicePoints[i] ? "black" : "steelblue";
//   }

//   const chooseDice = (i) => {
//     if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus){
//     let dices = [...selectedDices];
//     dices[i] = selectedDices[i] ? false : true;
//     setSelectedDices(dices);
//   }
//    else {
//     setStatus("You have to throw dices first");
//    }
// }

// function getDiceColor(i) {
//   return selectedDices[i] ? "#741f8c" : "#e9b3fc";
// }

// const throwDices = () => {

//   if (nbrOfThrowsLeft === 0) {

//     setStatus('Select your points before the next throw');
//     return;
//   }

//   let spots = [...diceSpots];
//   for (let i = 0; i < NBR_OF_DICES; i++) {
//     if (!selectedDices[i]) {
//       let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
//       board[i] = 'dice-' + randomNumber;
//       spots[i] = randomNumber;
//     }
//   }
//   setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
//   setDiceSpots(spots);
// }

// const chooseDicePoints = (i) => {
// //very first version
// if (nbrOfThrowsLeft === 0) {
//   let selected = [...selectedDices];
//   let selectedPoints = [...selectedDicePoints];
//   let points = [...dicePointsTotal];
//   if(!selectedPoints[i]) {
//     setSelectedDices(new Array(NBR_OF_DICES).fill(false));
//     selectedPoints[i] = true;
//     let nbrOfDices = 
//       diceSpots.reduce
//       ((total, x) => (x === (i+1) ? total + 1 : total), 0);
//     points[i] = nbrOfDices * (i+1);
//     setDicePointsTotal(points);
//     setSelectedDicePoints(selectedPoints);
//     setNbrOfThrowsLeft(NBR_OF_THROWS);
//     return points[i];
//   }
//   else {
//     setStatus('You already selected points for ' + (i+1));
//   }
// }
// else {
//   setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points.')
// }
// }

// function getSpotTotal(i) {
// return dicePointsTotal[i];
// }

// const allPointsSelected = () => {
// return selectedDicePoints.every((point) => point);
// };


// const resetGame = () => {
// setNbrOfThrowsLeft(NBR_OF_THROWS);
// setStatus('Throw dices');
// setGameEndStatus(false);
// setSelectedDices(new Array(NBR_OF_DICES).fill(false));
// setDiceSpots(new Array(NBR_OF_DICES).fill(0));
// setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
// setDicePointsTotal(new Array(MAX_SPOT).fill(0));
// };

// return (
// <>
//     <Header/>
//     <View>
//         <Container>
//             <Row>{dicesRow}</Row>
//         </Container>
//         <Text style={styles.text}>
//           Throws left: {nbrOfThrowsLeft}
//         </Text>
//         <Text style={styles.text}>{status}</Text>
//         <Pressable
//             onPress={() => throwDices()} style={styles.button}>
//             <Text style={styles.text}>THROW DICES</Text>
//         </Pressable>
//         <Container>
//             <Row>{pointsRow}</Row>
//         </Container>
//         <Container>
//             <Row>{pointsToSelectRow}</Row>
//         </Container>
//         <Text style={styles.text}>Player: {playerName}</Text>
//         <Text style={styles.text}>Total Points: {dicePointsTotal.reduce((total, points) => total + points, 0)}</Text>
//          {/* Näytä Start Again ja Save Points painikkeet, jos kaikki pisteet on valittu */}
//          {allPointsSelected() && (
//           <>
//             <Pressable onPress={resetGame}>
//               <Text style={styles.button}>Start Again</Text>
//             </Pressable>
//             <Pressable onPress={savePlayerPoints}>
//               <Text style={styles.button}>SAVE POINTS</Text>
//             </Pressable>
//           </>
//         )}
//     </View>
//     <Footer/>
//   </>
// )
// }
import { useState, useEffect } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
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

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', getScoreboardData);
        return unsubscribe;
    }, [navigation]);

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                const tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores);
                console.log("Gameboard read successful");
                console.log("Number of scores: " + tmpScores.length);
            }
        } catch (e) {
            console.log('Read error: ' + e);
        }
    }

    const savePlayerPoints = async () => {
        const newKey = scores.length + 1;
        const playerPoints = {
            key: newKey,
            name: playerName,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            points: dicePointsTotal.reduce((a, b) => a + b, 0)
        };
        console.log('Saving points:', playerPoints); // Lisää tämä

        try {
            const newScore = [...scores, playerPoints];
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
            console.log('Gameboard save successful:', jsonValue);
        } catch (e) {
            console.log('Gameboard save error:', e);
        }
    }


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
                <Text>{typeof total === "number" ? total : "Invalid data"}</Text>
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
        return selectedDicePoints[i] ? "black" : "steelblue";
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
        return selectedDices[i] ? "#741f8c" : "#e9b3fc";
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
    }

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
    };

    return (
        <>
            <Header />
            <View>
                <Container>
                    <Row>{dicesRow}</Row>
                </Container>
                <Text style={styles.text}>
                    Throws left: {nbrOfThrowsLeft}
                </Text>
                <Text style={styles.text}>{status}</Text>
                <Pressable onPress={throwDices} style={styles.button}>
                    <Text style={styles.text}>THROW DICES</Text>
                </Pressable>
                <Container>
                    <Row>{pointsRow}</Row>
                </Container>
                <Container>
                    <Row>{pointsToSelectRow}</Row>
                </Container>
                <Text style={styles.text}>Player: {playerName}</Text>
                <Text style={styles.text}>Total Points: {dicePointsTotal.reduce((total, points) => total + points, 0)}</Text>
                {allPointsSelected() && (
                    <>
                        <Pressable onPress={resetGame}>
                            <Text style={styles.button}>Start Again</Text>
                        </Pressable>
                        {/* <Pressable onPress={savePlayerPoints}>
                            <Text style={styles.button}>SAVE POINTS</Text>
                        </Pressable> */}
                    </>
                )}
                <Pressable onPress={savePlayerPoints}>
                            <Text style={styles.button}>SAVE POINTS</Text>
                        </Pressable>
            </View>
            <Footer />
        </>
    );
}
