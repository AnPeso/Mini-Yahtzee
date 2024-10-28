// import { useState, useEffect } from "react";
// import { Pressable, Text, View } from "react-native";
// import Header from "./Header";
// import Footer from "./Footer";
// import { SCOREBOARD_KEY } from "../constants/Game";
// import styles from '../style/style';
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Scoreboard = ({ navigation }) => {
//     const [scores, setScores] = useState([]);

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', getScoreboardData);
//         return unsubscribe;
//     }, [navigation]);

//     const getScoreboardData = async () => {
//         try {
//             const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
//             if (jsonValue !== null) {
//                 const tmpScores = JSON.parse(jsonValue);
//                 console.log("Temporary Scores:", tmpScores);
//                 if (Array.isArray(tmpScores) && tmpScores.every(score => score.name && score.date && score.time && score.points)) {
//                     setScores(tmpScores);
//                     console.log("Read successful");
//                     console.log("Number of scores: " + tmpScores.length);
//                 } else {
//                     console.error("Expected tmpScores to be an array of valid score objects, but got:", tmpScores);
//                 }
//             }
//         } catch (e) {
//             console.log('Read error: ' + e);
//         }
//     }

//     const clearScoreboard = async () => {
//         try {
//             await AsyncStorage.removeItem(SCOREBOARD_KEY);
//             setScores([]);
//         } catch (e) {
//             console.log('Clear error: ' + e);
//         }
//     }

//     return (
//         <>
//             <Header />
//             <View>
//                 <Text style={styles.heading}>Scoreboard</Text>
//                 {scores.length > 0 ? (
//                     scores.map((score, index) => (
//                         <View key={index} style={styles.scoreRow}>
//                             <Text>{score.name} - {score.date} {score.time}: {score.points} points</Text>
//                         </View>
//                     ))
//                 ) : (
//                     <Text>No scores yet</Text>
//                 )}
//                 <Pressable onPress={clearScoreboard}>
//                     <Text>Clear Scores</Text>
//                 </Pressable>
//             </View>
//             <Footer />
//         </>
//     );
// };

// export default Scoreboard;
import { useState, useEffect } from "react";
import { DeviceEventEmitter, Pressable, Text, View } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { MAX_NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from "../constants/Game";
import styles from '../style/style';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Scoreboard = ({ navigation }) => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const getScoreboardData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
                if (jsonValue !== null) {
                    let tmpScores = JSON.parse(jsonValue);
                    tmpScores.sort((a, b) => b.points - a.points); // Muutettu 'sum' -> 'points'
                    tmpScores = tmpScores.slice(0, MAX_NBR_OF_SCOREBOARD_ROWS);
                    setScores(tmpScores); // Poistettu {} ympäriltä
                }
            } catch (error) {
                console.error("Failed to fetch scores", error);
            }
        };

        getScoreboardData();

        // Listen for scoreboard updates
        const subscription = DeviceEventEmitter.addListener('scoreboardUpdated', getScoreboardData);
        return () => subscription.remove();
    }, []);

    // Clear scoreboard data from storage
    const clearScoreboard = async () => {
        try {
            await AsyncStorage.removeItem(SCOREBOARD_KEY); 
            setScores([]);
        } catch (error) {
            console.error("Error resetting the scoreboard:", error);
        }
    };
    console.log("Scores:", scores); // Tämä näyttää scores-tilan sisällön

    return (
        <>
            <Header />
            <View>
                <Text style={styles.heading}>Scoreboard</Text>
                {scores.length > 0 ? (
    scores.map((score, index) => (
        <View key={index} style={styles.scoreRow}>
            <Text>{score.name} - {score.date} {score.time}: 
                {typeof score.points === 'object' ? 
                    JSON.stringify(score.points) : 
                    score.points} points
            </Text>
        </View>
                    ))
                ) : (
                    <Text>No scores yet</Text>
                )}
                <Pressable onPress={clearScoreboard}>
                    <Text>Clear Scores</Text>
                </Pressable>
            </View>
            <Footer />
        </>
    );
};

export default Scoreboard;

