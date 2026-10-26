//Importerer React og useState til at gemme det valgte semester
import React, {useState, useCallback} from 'react'

//Importerer komponenterne til profilsiden
import {View, Text, Button, ScrollView, Image} from 'react-native'

//Henter styling fra den fælles styles-fil
import styles from '../Styles/styles'

//Importerer AsyncStorage som bruges til at gemme og hente data lokalt i appen
import AsyncStorage from '@react-native-async-storage/async-storage'

//Importerer useFocusEffect, som bruges til at opdatere data, når brugeren åbner profilsiden
import { useFocusEffect } from '@react-navigation/native'

//Importerer ImagePicker, som giver brugeren mulighed for at vælge billeder fra galleriet eller tage et billede med kamera
import * as ImagePicker from 'expo-image-picker'

//Opretter komponenten, der viser brugerens studieprofil
const FourthScreen = () => {

    //Gemmer det valgte semester og starter på første semester
    const [semester, setSemester] = useState(1)

    //Gemmer brugerens navn, som hentes fra forsiden
    const [userName, setUserName] = useState('')

    //Gemmer brugerens billede
    const [profilImage, setProfileImage] = useState(null)

    //Opretter en fast liste over fag og deres antal opgaver
    const [subjects, setSubjects] = useState([])

    //Opdaterer oplysningerne, hver gang brugeren åbner profilsiden
    useFocusEffect(
        useCallback(() => {

            //Opretter en funktion, som hender brugerens gemte fag
            const loadSubjects = async () => {
                try {
                    //Henter fagene fra AsyncStorage
                    const storedSubjects = await AsyncStorage.getItem('subjects')

                    //HVis der findes gemte fag, omdannes de til et array
                    if (storedSubjects !== null) {
                        setSubjects(JSON.parse(storedSubjects))
                    }
                } catch (error) {
                    //Viser en fejlbesked hvis fagene ikke kan hentes
                    console.log('Fejl ved hentning af fag:', error)
                }
            }

            //Kalder funktionen som henter fagene
            loadSubjects()

            //Opretter en funktion som henter brugeren navn fra forsiden
            const loadName = async () => {
                try {
                    //Henter det gemte navn fra AsyncStorage
                    const savedName = await AsyncStorage.getItem('userName')

                    //Hvis det gemte navn findes, opdateres navnet på profilen
                    if (savedName !== null) {
                        setUserName(savedName)
                    }
                } catch (error) {
                    //Fejlbesked hvis navnet ikke kan hentes
                    console.log('Fejl ved hentning af navn:', error)
                }
            } 
            //Kalder funktionen som henter navnet
            loadName()

        }, [])
    )

    //Beregner det samlede antal opgaver, som endnu ikke er færdige
    const totalTasks = subjects.reduce((total, subject) => total + subject.tasks.filter(task => !task.completed).length,0)

    //Opretter en funktion, so giver brugeren mulighed for at vælge et profilbillede fra deres telefon
    const pickImage = async () => {

        //Åbner telefonens galleri
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], //Tillader kun billeder
            allowsEditing: true, //giver mulighed for at beskære billedet
            aspect: [1,1], //Billedet beskæres i et kvadratisk format
            quality: 1 //Højeste kvalitet
        })

        //Hvis brugeren har valgt et billede, opdateres profilbilledet
        if (!result.canceled) {
            setProfileImage(result.assets[0].uri)
        }
    }

    //Opretter en funktion som giver brugeren mulighed for at tage et profilbillede med kameret
    const takePhoto = async () => {
        try {
            //Beder om tilladelse til at bruge telefonens kamera
            const permission = await ImagePicker.requestCameraPermissionsAsync()

            //Hvis brugeren ikke tillader --> vises en besked
            if (!permission.granted) {
                alert('Du skal give adgang til kameraet for at uploade profilbillede')
                return
            }

            //Åbner telefonens kamera
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1,1],
                quality: 1
            })

            //Hvis brugeren har taget et billede, opdateres profillbiledet
            if (!result.canceled) {
                setProfileImage(result.assets[0].uri)
            }
        } catch (error) {
            //Fejlbesked hvis kameraet ikke virker
            console.log('Fejl ved brug af kamera:', error)
        }
    }

    //Returnerer det indhold, der skal vises på profilsiden
    return (
        <ScrollView style = {styles.container}>
            
            {/* Viser sidens titel og undertitel */}
            <Text style = {styles.title}>
                Oversigt over din profil
            </Text>

            {/* Viser en personlig velkomsthilsen hvis brugeren har indtastet sit navn */}
            <Text style = {styles.heading}>
                {userName ? `Hej ${userName}👋🏻!` : 'Velkommen'}
            </Text>

            {/* Brugerens profilbillede */}
            {profilImage && (
                <Image
                    source={{uri:profilImage}}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        alignSelf: 'center',
                        marginVertical: 15
                    }}
                ></Image>
            )}

            {/* Knap til at vælge et profilbillede fra telefonens galleri */}
            <Button
                title="Vælg profilbillede"
                onPress={pickImage}
            ></Button>

            {/* VKnap til at bruge kameraet for at tage et profilbillede */}
            <Button
                title='Tag et profilbillede'
                onPress={takePhoto}
            ></Button>

            {/* Mulighed for at slette profilbilledet */}
            {profilImage && (
                <Button
                    title='Slet profilbillede'
                    color="red"
                    onPress={() => setProfileImage(null)}
                ></Button>
            )}

            {/* Viser det valgte semester og en knap til at ændre semester tallet */}
            <View style = {styles.card}>
                <Text style = {styles.heading}>
                    Mit semester
                </Text>

                <Text style = {styles.text}>
                    Du går på {semester}.semester
                </Text>

                {/* Skifter til næste semester fra 1-6 og starter forfra efter 6  */}
                <Button
                    title = "Skift semester"
                    onPress={() =>
                        setSemester(semester === 6 ? 1 : semester + 1)}
                />
            </View>

            {/* Viser det samlede antal fag og manglende opgaver */}
            <View style = {styles.card}>
                <Text style = {styles.heading}>
                        Mit studieoverblik
                </Text>

                <Text style = {styles.text}>
                        Antal fag: {subjects.length}
                </Text>

                <Text style = {styles.text}>
                        Manglende opgaver: {totalTasks}
                </Text>
            </View>

            {/* Viser overskriften til listen over fag */}
            <Text style = {styles.heading}>
                Mine fag
            </Text>
            
            {/* Gennemgår faglisten over viser et kort for hvert fag */}
            {subjects.map((subject, index) => (
                <View key = {index} style = {styles.subjectCard}>
                    
                    {/* Viser fagets navn og antal manglende opgaver */}
                    <Text style = {styles.text}>
                        {subject.name}
                    </Text>

                    <Text>
                        Manglende opgaver: {subject.tasks.filter(task => !task.completed).length}
                    </Text>
                </View>
            ))}

        </ScrollView>
    )
}

//Gør det muligt at importere FourthScreen i App.js
export default FourthScreen