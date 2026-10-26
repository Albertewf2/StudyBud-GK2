//Denne fil indeholder studietimer

//Importerer React, useState og useEffect til at håndtere og opdatere data
import React, {useState, useEffect} from 'react'

//Importerer de komponenter fra React Native som bruges til at opbygge skærmen og håndtere brugerens handlinger
import { View, Text, Pressable, TextInput, Keyboard, Alert, ScrollView } from 'react-native'

//Henter styling fra den eksterne styling fil
import styles from '../Styles/styles'

//Opretter skærmen til studietimeren
const FifthScreen = () => {

    //Gemmer hvor mange minutter brugeren har valgt
    const [minutes, setMinutes] = useState(25)
    const [customMinutes, setCustomMinutes] = useState('')

    //Antal sekunder tilbage på timeren
    const [secondsLeft, setSecondsLeft] = useState(25*60)

    //Fortæller om timeren kører eller er på pause
    const [isRunning, setIsRunning] = useState(false)

    //Starter en nedtælling, når timeren er sat igang
    useEffect(() => {

        //Stopper funktionen hvis timeren ikke kører
        if (!isRunning) return

        //OPretter et interval, som kører hvert sekund
        const interval = setInterval(() => {

            //Opdaterer den resterende tid
            setSecondsLeft(prev => {

                //Stopper nedtællingen ved 0 sekunder
                if (prev <= 1) {
                    return 0
                }

                //Trækker ét sekund fra den resterende tid
                return prev - 1
            })
        }, 1000)

        //Fjerner intervallet, når timeren stoppes eller komponenten ryddes op
        return () => clearInterval(interval)
    }, [isRunning])

    //Kontrolerer om timeren er færdig
    useEffect(() => {

        //Tjekker om tiden = 0 og timeren stadig kører
        if (secondsLeft === 0 && isRunning) {

            //STopper timeren
            setIsRunning(false)

            //Viser en alert besked til brugeren 
            Alert.alert(
                'Timeren er færdig! 🎉'
            )
        }
    }, [secondsLeft, isRunning])

    //Returnerer indholdet, som skal vises på Studietimer siden
    return (
        //Gør det muligt at scrolle på siden
        <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            {/*Viser titel og beskrive af siden */}
            <Text style={styles.title}>
                Studietimer ⏰
            </Text>
            
            <Text style={styles.subtitle}>
                Vælg hvor længe timeren skal køre.

                Timeren kan bruges til at hjælpe med at fokusere.

                Når timeren er færdig, vises en alert ☑️ 
            </Text>

            {/*Opretter tre knapper med faste tidsintervaller */}
            <View style={styles.timerButtons}>

                {/*Knap til 15 minutter */}
                <Pressable
                    style={[styles.timerButton,minutes === 15 && styles.timerButtonSelected]}
                    onPress={() => {
                        setMinutes(15) 
                        setSecondsLeft(15*60)
                        setIsRunning(false)
                    }}
                >
                    <Text style={styles.timerButtonText}>
                        15 min.
                    </Text>
                </Pressable>

                {/*Knap til 25 minutter */}
                <Pressable
                    style={[styles.timerButton,minutes === 25 && styles.timerButtonSelected]}
                    onPress={() => {
                        setMinutes(25)
                        setSecondsLeft(25*60)
                        setIsRunning(false)
                    }}
                >
                    <Text style={styles.timerButtonText}>
                        25 min.
                    </Text>
                </Pressable>

                {/*Knap til 45 minutter */}
                <Pressable
                    style={[styles.timerButton,minutes === 45 && styles.timerButtonSelected]}
                    onPress={() => {
                        setMinutes(45)
                        setSecondsLeft(45*60)
                        setIsRunning(false)
                    }}
                >
                    <Text style={styles.timerButtonText}>
                        45 min.
                    </Text>
                </Pressable>
            </View>

            {/*Giver brugeren mulighed for selv at vælge antal minutter */}
            <View>

                {/*Opretter et tekstinput felt som brugeren kan indtaste i */}
                <TextInput
                    style={styles.taskInput}
                    placeholder="Vælg selv (0-60 min.)"
                    keyboardType='numeric'
                    onChangeText={setCustomMinutes}
                    maxLength={2}
                ></TextInput>

                {/*Opretter en knap til at vælge den indtastede tid */}
                <Pressable
                    style={styles.saveButton}
                    onPress={() => {

                        //Omdanner brugerens intastning til tal
                        const value = Number(customMinutes)

                        //Kontrollerer, at der er indtastet et heltal mellem 0-60
                        if (customMinutes.trim() != '' && Number.isInteger(value) && value >= 0 && value <=60) {
                            setMinutes(value)
                            setSecondsLeft(value*60)
                            setIsRunning(false)
                            Keyboard.dismiss()
                        }
                    }}
                >
                    <Text style={styles.saveButtonText}>
                        Vælg tid
                    </Text>
                </Pressable>
            </View>

            {/*Viser den resterende tid i min. og sek. */}
            <Text style={styles.timerDisplay}>
                <Text style={styles.timerText}>
                    {Math.floor(secondsLeft / 60)}: {String(secondsLeft % 60).padStart(2, '0')}
                </Text>
            </Text>

            {/*Opretter knapper til at starte, pause og nulstille timeren */}
            <View style={styles.timerButton}>

                {/*Starter timeren, hvis der er tid tilbage */}
                <Pressable
                    style={styles.timerControlButton}
                    onPress={() => {
                        if (secondsLeft > 0) {
                            setIsRunning(true)
                        }
                    }}
                >
                    <Text style={styles.timerControlText}>
                        Start
                    </Text>
                </Pressable>

                {/*Sætter timeren på pause */}
                <Pressable
                    style={styles.timerControlButton}
                    onPress={() => setIsRunning(false)}
                >
                    <Text style={styles.timerControlText}>
                        Pause
                    </Text>
                </Pressable>

                {/*Stopper timeren og nulstiller tiden */}
                <Pressable
                    style={styles.timerControlButton}
                    onPress={() => {
                        setIsRunning(false)
                        setSecondsLeft(minutes*60)
                    }}
                >
                    <Text style={styles.timerControlText}>
                        Nustil
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

//Gør det muligt at importere FifthScreen i App.js
export default FifthScreen