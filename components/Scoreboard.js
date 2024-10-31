import { Text, View, FlatList, Button, Pressable } from "react-native";
import { useState, useEffect } from 'react';
import { SCOREBOARD_KEY, MAX_NBR_OF_SCOREBOARD_ROWS } from "../constants/Game";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../style/style";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Scoreboard = ({ navigation }) => {
    const [score, setScore] = useState([]);

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
                // Rajoita näkyvien rivien määrä 
                const limitedScores = tmpScores.slice(0, MAX_NBR_OF_SCOREBOARD_ROWS);
                setScore(limitedScores);    
            } else {
                setScore([]); 
            }  
        } catch (e) {
            console.error("Error fetching scoreboard data: ", e);
        }
    }
    

    const clearScoreboard = async () => {
        try {
            // Clear all AsyncStorage data
            await AsyncStorage.clear();
            setScore([]); 
        } catch (e) {
            console.error("Error clearing AsyncStorage: ", e);
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.text}>SCOREBOARD</Text>
            <View style={styles.scoreListContainer}>
                <FlatList
                    data={score}
                    renderItem={({ item }) => (
                        <View style={styles.scoreItem}>
                            <Text style={styles.scoreText}>{item.name} - {item.points} points</Text>
                            <Text style={styles.dateText}>{item.date} {item.time}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.key.toString()}
                />
                <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={clearScoreboard}>
                <Text style={styles.text}>Clear scoreboard</Text>
                </Pressable>
                </View>
            </View>
            <Footer />
        </View>
    )
}
