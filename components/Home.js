//Home.js
import React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, Pressable, Keyboard } from "react-native";
import MaterialCommunityIcons from'@expo/vector-icons/MaterialCommunityIcons';
import Header from "./Header";
import Footer from "./Footer";
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT } from '../constants/Game';
import styles from '../style/style';
import style from '../style/style';

const Home = ({ navigation }) => {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0){
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    return(
        <View style={styles.container}>
        <Header />
        <View>
            <MaterialCommunityIcons name="information" size={70} padding={5} margin={5} color="#ab84a2" />
            {!hasPlayerName ? 
            <>
            <Text style={styles.text}> For scoreboard enter your name...</Text>
            <View style={styles.inputContainer}>
            <TextInput style={style.Textinput} onChangeText={setPlayerName} autoFocus={true}/>
            </View>
            <View style={styles.buttonContainer}>
            <Pressable
                style={styles.button}
                onPress={() => handlePlayerName(playerName)}>
                <Text style={styles.text}>OK</Text>
            </Pressable>
            </View>
            </>
            :
            <>
            <Text style={style.text}>Rules of the game</Text>
            <Text multiline="true" style={style.gameinfo}>THE GAME: {'\n'} Upper section of the classic Yahtzee
            dice game. You have {NBR_OF_DICES} dices and
            for the every dice you have {NBR_OF_THROWS} throws. After each throw you can keep dices in
            order to get same dice spot counts as many as
            possible. {'\n'} In the end of the turn you must select
            your points from {MIN_SPOT} to {MAX_SPOT}.
            Game ends when all points have been selected.
            The order for selecting those is free. {'\n'} {'\n'}
            POINTS: After each turn game calculates the sum
            for the dices you selected. Only the dices having
            the same spot count are calculated. Inside the
            game you can not select same points from
            {MIN_SPOT} to {MAX_SPOT} again. {'\n'}{'\n'}
            GOAL: To get points as much as possible.
            {BONUS_POINTS_LIMIT} points is the limit of
            getting bonus which gives you {BONUS_POINTS}
            points more.
            </Text>
            <Text style={styles.text}> Good luck, {playerName}</Text>
            <View style={styles.buttonContainer}>
            <Pressable style={styles.button}
                onPress={() => navigation.navigate('Gameboard', 
                {player: playerName})}>
                <Text style={style.text}>PLAY</Text>
            </Pressable>
            </View>
            </> 
            }
        </View>
        <Footer />
        </View>
    );
};

export default Home;