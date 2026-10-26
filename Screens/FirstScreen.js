//Denne fil indeholder forsiden.

//Jeg bruger React til at opbygge appens skærme
//useState er en React-funktion, der gør et muligt at gemme en værdi. Værdien kan ændres når brugeren anvender appen
import React, {useState, useEffect} from 'react'

//Importer de komponenter, der bruges på forsiden
import {Text, TextInput, View, Button, ScrollView} from 'react-native'

//Henter styling fra den eksterne styling-fil
import styles from '../Styles/styles'

//Importerer AsyncStorage som bruges til at gemme og hente data i appen
import AsyncStorage from '@react-native-async-storage/async-storage'

//Opretter forsiden og modtager navigation, så brugeren kan skifte skærm
const FirstScreen = ({navigation}) => {

    //Gemmer brugerens navn. Starter med et tomt skrivefelt. 
    const [inputValue, setInputValue] = useState("")

    //Henter brugerens gemte navn fra AsyncStorage, når forsiden åbnes
    useEffect(() => {
        const loadName = async () => {
            try {
                const savedName = await AsyncStorage.getItem('userName')

                //Hvis der er gemt et navn, vises det i tekstfeltet
                if (savedName !== null) {
                    setInputValue(savedName)
                }
            } catch (error) {
                //Viser en fejl i konsollen, hvis navnet ikke kan hentes
                console.log('Fejl ved hentning af navn:', error)
            }
        }
        loadName()
    }, [])

    //Returnerer det indhold, der skal vises på forsiden
    return (
        <ScrollView style = {styles.container}>

            {/* Viser appens navn og undertitel*/}
            <Text style = {styles.title}>
                StudyBud
            </Text>

            <Text style = {styles.subtitle}>
                Din personlige studieassistent
            </Text>

            {/* Samler velkomstteksten, skrivefeltet og knappen i et kort */}
            <View style = {styles.welcomeCard}>
                <Text style = {styles.welcomeTitle}>
                    Velkommen til StudyBud!
                </Text>

                <Text style = {styles.text}>
                    Før vi starter kan du indtaste dit navn 
                </Text>

                {/* Viser et skrivefelt og gemmer brugerens tekst i "inputValue" */}
                <TextInput 
                    style = {styles.nameInput}
                    placeholder = "Skriv dit navn her"
                    value = {inputValue}
                    onChangeText = {(txt) => setInputValue(txt)}
                />

                {/* Viser en standardtekst ved tomt input og ellers en personlig hilsen*/}
                <Text style = {styles.welcomeText}>
                    {inputValue.trim() === ''
                        ? 'Her kan du holde styr på dine fag og opgaver' //Tomt input
                        : `Hej ${inputValue}. Er du klar til at få styr på dine opgaver` //Personlig hilsen)
                    }
                </Text>

                {/* Navigerer til opgavesiden, når brugeren trykker på knappen*/}
                <Button
                    title = "Se mine opgaver"
                    color = "#2455E8"
                    onPress = {async () => {
                        try {
                            await AsyncStorage.setItem('userName', inputValue.trim())
                            navigation.navigate('Opgaver')
                        } catch (error) {
                            console.log('Fejl ved gemning af navn:', error)
                        }
                    }}
                ></Button>

            </View>

            {/* Viser en oversigt over appens vigtigeste funktioner*/}
            <View style = {styles.card}>
                <Text style = {styles.heading}>
                    Hvorfor bruge StudyBud?
                </Text>

                <Text style = {styles.text}>
                    - Få overblik over dine fag
                </Text>

                <Text style = {styles.text}>
                    - Få et overblik over opgaver: tilføj dem & fjerne dem
                </Text>

                <Text style = {styles.text}>
                    - Få et studieoverblik på din profilside
                </Text>

            </View>

        </ScrollView>
    )
}

//Gør det muligt at importere FirstScreen i App.js
export default FirstScreen