//Denne side indeholder overblik-siden

//Importerer React samt useState og useEffect til at håndtere og opdatere data
import React, {useState, useEffect} from "react";

//Importerer de komponenter fra React Native, som bruges til at opbygge skærmen
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform} from 'react-native'

//Henter styling fra den eksterne styling-fil
import styles from "../Styles/styles";

//Importerer AsynAstorage, som bruges til at gemme og hente data lokalt i appen
import AsyncStorage from "@react-native-async-storage/async-storage";

//Opretter Overblik-siden
const ThirdScreen = () => {

    //Styrer om skrivefeltet til huskesedler skal vises
    const [showNoteInput, setShowNoteInput] = useState(false)
    
    //Gemmer teksten som brugeren skriver i huskesedlen
    const [noteText, setNoteText] = useState('')

    //Gemmer alle brugernes huskesedler i et array
    const [savedNotes, setSavedNotes] = useState([])
    
    //Styrer om skrivefelterne til underviser skal vises
    const [showTeacherInput, setShowTeacherInput] = useState(false)
    
    //Gemmer oplysninger om underviserens fag, navn og e-mail
    const [teacherSubject, setTeacherSubject] = useState('')
    const [teacherName, setTeacherName] = useState('')
    const [teacherEmail, setTeacherEmail] = useState('')

    //Gemmer alle brugernes undervisere i et array
    const [savedTeachers, setSavedTeachers] = useState([])

    //Styrer om skrivefelterne til eksamen skal vises
    const [showExamInput, setShowExamInput] = useState(false)

    //Gemmer oplysninger om eksamensfag, dato og eksamenstype
    const [examSubject, setExamSubject] = useState('')
    const [examDate, setExamDate] = useState('')
    const [examType, setExamType] = useState('')

    //Gemmer alle brugernes eksamener i et array
    const [savedExams, setSavedExams] = useState([])

    //OMdanner en dato fra tekstformatet DD-MM-ÅÅ til en JavaScript-dato
    const parseExamDate = (date) => {
        //Opdeler datoen i dag, måned og år og omdanner dem til tal
        const [day, month, year] = date.split('-').map(Number)

        //Opretter en dato. Der trækkes 1 fra måneden, da JS tæller fra 0. 
        return new Date(year, month - 1, day)
    }

    //Finder den nærmeste kommende eksamen
    const upcomingExam = savedExams.filter(exam => {

        //Henter dags dato
        const today = new Date()

        //Nulstiller klokkeslættet, så kun datoen sammenlignes
        today.setHours(0,0,0,0)

        //Beholder kun eksamener, der ligger i dag eller i fremtiden
        return parseExamDate(exam.date) >= today

    //Sorterer eksamenerne efter dato og vælger den nærmeste
    }).sort((a,b) => parseExamDate(a.date) - parseExamDate(b.date))[0]
    
        //Opretter en funktion, som gemmer data i AsyncStorage
        const saveData = async(key, data) => {
            try {
                //Omdanner data til tekst og gemmer dem med den angivne nøgle
                await AsyncStorage.setItem(key, JSON.stringify(data))

                //Returnerer true, hvis data er gemt
                return true
            } catch (error) {

                //Viser en fejl i konsollen, hvis data ikke kan gemmes
                console.log('Fejl ved geming:', error)

                //Returnerer false, hvis gamningen mislykkes
                return false
            }
        }
    
    //Henter brugerens gemte noter fra AsyncStorage, når skærmen indlæses
    useEffect(() => {
        const loadNotes = async () => {
            try {
                //Henter de tidligere gemte noter
                const storedNotes = await AsyncStorage.getItem('savedNotes')

                //Hvis der findes gemte noter, omdannes de til et array
                if (storedNotes !== null) {
                    setSavedNotes(JSON.parse(storedNotes))
                }
            } catch (error) {
                //Viser en fejl i konsollen, hvis noterne ikke kan hentes
                console.log('Fejl ved hentning af noter:', error)
            }
        }
        //Kalder funktionen, som henter noterne
        loadNotes()
    }, [])

    //Henter brugerens gemte undervisere fra AsyncStorage, når skærmen indlæses
    useEffect(() => {
        const loadTeachers = async () => {
            try {
                //Henter de tidligere gemte undervisere
                const storedTeachers = await AsyncStorage.getItem('savedTeachers')

                //Hvis der findes gemte undervisere, omdannes de til et array
                if (storedTeachers !== null) {
                    setSavedTeachers(JSON.parse(storedTeachers))
                }
            } catch (error) {
                //Viser en fejl i konsollen, hvis underviserne ikke kan hentes
                console.log('Fejl ved hentning af undervisere:', error)
            }
        }
        //Kalder funktionen, som henter underviserne
        loadTeachers()
    }, [])

    //Henter brugerens gemte eksamener fra AsynStorage, når skærmen indlæses
    useEffect(() => {
        const loadExams = async () => {
            try {
                //Henter de tidligere gemte eksamener
                const storedExams = await AsyncStorage.getItem('savedExams')

                //Hvis der findes gemte eksamener, omdannes de til et array
                if (storedExams !== null) {
                    setSavedExams(JSON.parse(storedExams))
                }
            } catch (error) {
                //Viser en fejl i konsollen, hvis eksamenerne ikke kan hentes
                console.log('Fejl ved hentning af eksamener:', error)
            }
        }
        //Kalder funktionen, som henter eksamenerne
        loadExams()
    }, [])

    //Opretter en funktion, som sletter et element fra en liste
    const deleteItem = async (key, items, index, setItems) => {

        //Opretter en ny liste uden det element, som brugeren vil slette
        const updatedItems = items.filter((item, i) => i !== index)

        //Gemmer den opdaterede liste i AsyncStorage
        const success = await saveData(key, updatedItems)

        //Hvis gemningen lykkes, opdateres listen på skærmen
        if (success) {
            setItems(updatedItems)
        }
        
    }

    //Returnerer indholdet, som skal vises på Noter-siden
    return (
        //Sørger for, at tastaturet ikke dækker skrivefelterne
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/*Går det muligt at scrolle på siden */}
            <ScrollView style={styles.container}>
                <Text style={styles.title}>
                    Noter
                </Text>

                <Text style={styles.subtitle}>
                    Her kan du tilføje og organisere evt. noter til dine fag
                </Text>
                
                {/*Viser den nærmeste kommende eksamen */}
                <View style={styles.examCard}>
                    <Text style={styles.examCardSubtitle}>
                        Kommende eksamen:
                    </Text>

                   <Text style={styles.examCardTitle}>
                    {/*Viser eksamensfag og dato, hvis der findes en kommende eksamen */}
                        {upcomingExam
                            ? `${upcomingExam.subject} - ${upcomingExam.date}`
                            : 'Ingen kommende eksamener'}
                    </Text>
                </View>

                <Text style={styles.heading}>
                    Mine Studienoter
                </Text>

                {/*Opretter et område til de forskellige notekort */}
                <View style={styles.noteGrid}>
            
                {/*Opretter et klikbart kort til huskesedler */}
                <TouchableOpacity 
                        style={[styles.noteCard, styles.yellowCard]}
                        onPress={() => {

                            //Åbner eller lukker skrivefeltet til huskesedler
                            setShowNoteInput(!showNoteInput)

                            //Lukker skrivefeltet til undervisere
                            setShowTeacherInput(false)
                        }}
                    >
                        <Text style={styles.noteIcon}>📝</Text>
                        <Text style={styles.noteTitle}>Huskeseddel</Text>

                        {/*Viser en standardtekst, hvis der ikke er gemt nogen huskesedler */}
                        {savedNotes.length === 0 ? (
                            <Text style={styles.noteDescription}>Vigtige ting du skal huske</Text>
                        ) : (

                            //Gennemgår og viser alle gemte huskesedler
                            savedNotes.map((note, index) => (
                                <View 
                                    key={index}
                                    style={{
                                        flexDirection:'row',
                                        alignItems: 'center',
                                        marginBottom: 8
                                    }}>
                                    
                                    {/*Viser teksten fra den gemte huskeseddel */}
                                    <Text style={[styles.noteDescription, {flex: 1}]}> ⭐️ {note}</Text>

                                    {/*Opretter en knap til at slette huskesedlen */}
                                    <TouchableOpacity
                                        onPress={(event) => {

                                            //Forhindrer, at et tryk også aktiverer det yderste kort
                                            event.stopPropagation()

                                            //sletter den valgte huskeseddel
                                            deleteItem('savedNotes', savedNotes, index, setSavedNotes)
                                        }}>
                                        
                                        <Text style={{fontSize: 16}}>❌</Text>
                                    </TouchableOpacity>

                                </View>
                            ))
                        )}
                    </TouchableOpacity>

                    {/*OOpretter et klikbart kort til underviserens kontaktoplysninger */}
                    <TouchableOpacity 
                        style={[styles.noteCard, styles.greenCard]}
                        onPress={() => {

                            //Åbner eller lukker skrivefelterne til undervisere
                            setShowTeacherInput(!showTeacherInput)

                            //Lukker skrievfeltet til huskesedler
                            setShowNoteInput(false)
                        }}
                    >
                        <Text style={styles.noteIcon}>📧</Text>
                        <Text style={styles.noteTitle}>Underviser</Text>

                        {/*Viser antallet af gemte undervisere */}
                        <Text style={styles.noteDescription}>
                            Antal undervisere: {savedTeachers.length}
                        </Text>

                        {/*Viser en standardtekst, hvis der ikke er gemt nogen undervisere */}
                        {savedTeachers.length === 0 ? (
                            <Text style={styles.noteDescription}>
                                Kontakoplysninger
                            </Text>
                        ) : (

                            //Gennemgår og viser alle gemte undervisere
                            savedTeachers.map((teacher, index) => (
                                <View key={index} style={{marginBottom: 10}}>

                                    {/*Viser underviserens fag */}
                                    <Text style={styles.noteDescription}>
                                        📓 {teacher.subject}
                                    </Text>

                                    {/*Viser underviserens navn */}
                                    <Text style={styles.noteDescription}>
                                        🏆 {teacher.name}
                                    </Text>

                                    {/*Viser underviserens e-mail */}
                                    <Text style={styles.noteDescription}>
                                        📨 {teacher.email}
                                    </Text>

                                    {/*Opretter en knap til at slette en underviser */}
                                    <TouchableOpacity
                                        onPress={(event) => {

                                            //Forhindrer at det yderste kort også bliver aktiveret
                                            event.stopPropagation()

                                            //Sletter den valgte underviser fra listen
                                            deleteItem('savedTeachers', savedTeachers, index, setSavedTeachers)
                                        }}>
                                        
                                        <Text style={{fontSize: 16}}>❌</Text>
                                    
                                    </TouchableOpacity>
                                </View>
                            ))
                        )}
                    </TouchableOpacity>

                    {/* Opretter et klikbart kort til eksamensoplysninger*/}
                    <TouchableOpacity 
                        style={[styles.noteCard, styles.purpleCard]}
                        onPress={() => {

                            //Åbner eller lukker skrivefelterne til eksamen
                            setShowExamInput(!showExamInput)

                            //Lukker skrivefelterne til huskesedler og undervisere
                            setShowNoteInput(false)
                            setShowTeacherInput(false)
                        }}
                    >
                        <Text style={styles.noteIcon}>🎓</Text>
                        <Text style={styles.noteTitle}>Eksamen</Text>

                        {/*Viser en standard tekst, hvis der ikke er gemt nogen eksamener */}
                        {savedExams.length === 0 ? (
                            <Text style={styles.noteDescription}>
                                Dato og eksamensinformation
                            </Text>
                        ) : (

                            //Gennemgår og viser alle gemte eksamener
                            savedExams.map((exam, index) => (
                                <View key={index} style={{marginBottom: 10}}>
                                    
                                    {/*Viser eksamensfaget */}
                                    <Text style={styles.noteDescription}>
                                        📚 {exam.subject}
                                    </Text>

                                    {/* Viser eksamensdatoen*/}
                                    <Text style={styles.noteDescription}>
                                        📅 {exam.date}
                                    </Text>

                                    {/* Viser eksamenstypen*/}
                                    <Text style={styles.noteDescription}>
                                        📝 {exam.type}
                                    </Text>

                                    {/*Opretter en knap til at slette en eksamen */}
                                    <TouchableOpacity
                                        onPress={(event) => {

                                            //Forhindrer, at det yderste kort også bliver aktiveret
                                            event.stopPropagation()

                                            //Sletter den valgte eksamen fra listen
                                            deleteItem('savedExams', savedExams, index, setSavedExams)
                                        }}>
                                        
                                        <Text style={{fontSize: 16}}>❌</Text>
                                    
                                    </TouchableOpacity>

                                </View>
                            ))
                        )}
                    </TouchableOpacity>
                </View>

                {/*Viser formularen til en ny huskeseddel, hvis showMeInput er true */}
                {showNoteInput && (
                    <View style={styles.card}>
                        <Text style={styles.heading}>Ny huskeseddel</Text>

                        {/*Opretter et skrivefelt, hvor brugeren kan skrive sin huskeseddel */}
                        <TextInput
                            style={styles.taskInput}
                            placeholder="Skriv din huskeseddel her..."
                            multiline={true}
                            value={noteText}
                            onChangeText={setNoteText}
                        ></TextInput>

                        {/*Opretter en knap til at gemme huskesedlen */}
                        <TouchableOpacity
                        style={styles.saveButton}
                        onPress={async () => {

                            //Kontrollerer, at brugeren har skrevet noget
                            if (noteText.trim() !== '') {

                                //Opretter en ny liste med de tidligere noter og den nye huskeseddel
                                const updatedNotes = [...savedNotes, noteText]

                                //Gemmer dne opdaterede liste i AsyncStorage
                                const sucess = await saveData('savedNotes', updatedNotes)

                                //Hvis gemningen lykkes, opdateres listen
                                if (sucess) {
                                    setSavedNotes(updatedNotes)

                                    //Gør skrivefeltet tomt
                                    setNoteText('')

                                    //Lukker formularen
                                    setShowNoteInput(false)
                                }
                            }
                        }}
                        >
                            <Text style={{color: 'white'}}>Gem huskeseddel</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/*Viser formularen til undervisere, hvis showTeacherInput er true */}
                {showTeacherInput && (
                    <View style={styles.card}>
                        <Text style={styles.heading}>Tilføj underviser</Text>

                        {/*Opretter et skrivefelt til underviserens fag */}
                        <TextInput
                            style={styles.taskInput}
                            placeholder="Fag (fx VØS)"
                            value={teacherSubject}
                            onChangeText={setTeacherSubject}
                        ></TextInput>

                        {/*Opretter et skrivefelt til underviserens navn */}
                        <TextInput
                            style={styles.taskInput}
                            placeholder="Underviserens navn"
                            value={teacherName}
                            onChangeText={setTeacherName}
                        ></TextInput>

                        {/*Opretter et skrivefelt til underviserens e-mail */}
                        <TextInput
                            style={styles.taskInput}
                            placeholder="Underviserens e-mail"
                            keyboardType="email-adress"
                            autoCapitalize="none"
                            value={teacherEmail}
                            onChangeText={setTeacherEmail}
                        ></TextInput>

                        {/*Opretter en knap til at gemme underviseren */}
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={async () => {

                                //Kontrollerer, at alle tre skrivefelter er udfyldt
                                if (
                                    teacherSubject.trim() !== '' && 
                                    teacherName.trim() !== '' &&
                                    teacherEmail.trim() !== ''
                                ) {
                                    //Opretter et objekt med underviserens oplysninger
                                    const newTeacher = {
                                        subject: teacherSubject,
                                        name: teacherName,
                                        email: teacherEmail
                                    }

                                    //Opretter en ny liste med de tidligere undervisere og den nye underviser
                                    const updatedTeachers = [...savedTeachers, newTeacher]

                                    try {
                                        //Omdanner listen til tekst og gemmer den i AsyncStorage
                                        await AsyncStorage.setItem('savedTeachers', JSON.stringify(updatedTeachers))

                                        //Opdaterer listen med undervisere på skærmen
                                        setSavedTeachers(updatedTeachers)

                                        //Tømmer skrivefelterne efter gemning
                                        setTeacherSubject('')
                                        setTeacherName('')
                                        setTeacherEmail('')

                                        //Lukker formularen
                                        setShowTeacherInput(false)
                                        
                                    } catch (error) {
                                        //Viser en fejl i konsollen, hvis underviseren ikke kan gemmes
                                        console.log('Fejl ved gemning af underviser:', error)
                                    }
                                }
                            }}
                        >
                            <Text style={{color: 'white'}}>Gem underviser</Text>
                        </TouchableOpacity>

                    </View>
                )}

                {/*Viser formularen til eksamen, hvis showExamInput er true */}
                {showExamInput && (
                    <View style={styles.card}>
                        <Text style={styles.heading}>Tilføj eksamen 🎓</Text>

                        {/*Opretter et skrivefelt til eksamensfaget */}
                        <TextInput
                            style={styles.taskInput}
                            placeholder="Fag (fx matematik)"
                            value={examSubject}
                            onChangeText={setExamSubject}
                        ></TextInput>

                        {/*Opretter et skrivefelt til eksamensdatoen */}
                        <TextInput
                            style={styles.taskInput}
                            placeholder="Eksamensdato (fx 21-12-2026)"
                            value={examDate}
                            onChangeText={setExamDate}
                        ></TextInput>

                        {/*Opretter et skrivefelt til eksamensformen */}
                        <TextInput
                            style={styles.taskInput}
                            placeholder="Eksamensform (fx mundtligt"
                            value={examType}
                            onChangeText={setExamType}
                        ></TextInput>

                        {/*Opretter en knap til at gemme eksamen */}
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={ async() => {

                                //Kontrollerer at alle tre skrivefelter er udfyldt
                                if (
                                    examSubject.trim() !== '' &&
                                    examDate.trim() !== '' &&                                        examType.trim() !== ''
                                ) {
                                    //Opretter et objekt med eksamensoplysningerne
                                    const newExam = {
                                        subject: examSubject,
                                        date: examDate,
                                        type: examType
                                    }

                                    //Opretter en ny liste med de tidligere eksamener og den nye eksamen
                                    const updatedExams = [...savedExams, newExam]

                                    try {
                                        //Omdanner listen til tekst og gemmer den i AsyncStorage
                                        await AsyncStorage.setItem('savedExams', JSON.stringify(updatedExams))

                                        //Opdaterer listen med eksamener på skærmen
                                        setSavedExams(updatedExams)
                                            
                                        //Tømmer skrivefelterne efter gemning
                                        setExamSubject('')
                                        setExamDate('')
                                        setExamType('')

                                        //Lukker formularen
                                        setShowExamInput(false)

                                    } catch (error) {
                                        //Viser en fejlbesked hvis noget er gået galt
                                        console.log('Fejl ved gemning af eksamen:', error)
                                    }
                                }
                            }}
                        >
                            <Text style={{color: 'white'}}>
                                Gem eksamen
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

//Gør det muligt at importere ThirdScreen i App.js
export default ThirdScreen