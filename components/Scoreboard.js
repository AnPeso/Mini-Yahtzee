//Scoreboard.js
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { SCOREBOARD_KEY } from "../constants/Game";
import styles from '../style/style';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Scoreboard = ({ navigation }) => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        })
        return unsubscribe;
    }, [navigation]);

    const getScoreboardData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                const tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores);
                console.log("read succesful");
                console.log("number of scores: " + tmpScores.length);
            }
        }
        catch (e) {
            console.log('Read error' + e);
        }
    }

    const clearScoreboard = async () => {
        try{
            await AsyncStorage.removeItem(SCOREBOARD_KEY);
            setScores([]);
        }
        catch(e) {
            console.log('clear error ' + e);
        }
    }



    return(
        <>
        <Header />
        <View>
            <Text>Scoreboard will be here..</Text>
        </View>
        <Footer />
        </>
    )
}