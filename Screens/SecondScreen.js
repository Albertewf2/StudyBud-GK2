//Denne side indeholder opgave siden

//Importer React og useState til at gemme data, der kan ændre sig.
import React, {useState, useEffect} from 'react'

//Importer de komponenter, som opgavesiden bruger
import {View, Text, Pressable, ScrollView, TextInput, Button} from 'react-native'

//Henter styling fra den fælles styling fil
import styles from '../Styles/styles'

//Importer AsyncStorage som bruges til at gemme og hente data i appen
import AsyncStorage from '@react-native-async-storage/async-storage'

//Opretter komponenten som viser og håndterer brugerens fag og opgaver
const SecondScreen = () => {

    //Gemmer hvilket fag der er åbent, hvor null = ingen fag oprettet
    const [openSubject, setOpenSubject] = useState(null)

    //Gemmer navnet på det nye fag, som brugeren skriver i tekstfeltet
    const [newSubject, setNewSubject] = useState('')

    //Gemmer teksten til en ny opgave, som brugeren skriver i tekstfeltet
    const [inputValue, setInputValue] = useState('')

    //Gemer hvilken opgave brugeren er ved at redigere
    const [editingTaskId, setEditingTaskId] = useState(null)

    //Gemmer den nye tekst til opgaven
    const [editText, setEditText] = useState('')

    //Opretter en liste over fag, hvor hvert fag indeholder en liste med opgaver
    //Eksempel på data som kunne være i appen
    const [subjects, setSubjects] = useState([
        {
            name: 'Innovation og teknologi',
            tasks: [
                {
                    id: '6',
                    title: 'Læs pensum',
                    completed: false,
                    deadline: null
                },
                {
                    id: '2',
                    title: 'Lav godkendelsesopgave færdig',
                    completed: false,
                    deadline: null
                },
                {
                    id: '3',
                    title: 'Lav opgave 3-4',
                    completed: false,
                    deadline: null
                }
            ]
        },
        {
            name: 'VØS 5',
            tasks: [
                {
                    id: '4',
                    title: 'Læs kapitel 2-5',
                    completed: false,
                    deadline: null
                },
                {
                    id: '5',
                    title: 'Øv fremlæggelse',
                    completed: false,
                    deadline: null
                }
            ]
        }
    ])

    //Holder styr på, om fagene er blevet hentet fra AsyncStorage
    const [subjectsLoaded, setSubjectsLoaded] = useState(false)

    //Henter de gemte fag og opgaver fra AsyncStorage, når skærmen indlæses
    useEffect(() => {
        const loadSubjects = async () => {
            try {
                //Henter de tidligere gemte fag
                const storedSubjects = await AsyncStorage.getItem('subjects')

                //Hvis der findes gemte fag, omdannes de til et array
                if (storedSubjects !== null) {
                    setSubjects(JSON.parse(storedSubjects))
                }
            } catch (error) {
                //Viser en fejl besked i konsollen, hvis fagene ikke kan hentes korrekt
                console.log('Fejl ved hentning af fag:', error)
            }

            //VIser at indlæsningen af fagene er afsluttet
            setSubjectsLoaded(true)
        }

        loadSubjects()
    }, [])

    //Gemmer fag og opgaver i AsyncStorage, når der sker ændringer
    useEffect(() => {
        //Venter med at gemme indtil fagene er blevet hentet
        if (!subjectsLoaded) return 

        const saveSubjects = async () => {
            try {
                //OMdanner fagene til tekst og gemmer dem i AsyncStorage
                await AsyncStorage.setItem('subjects', JSON.stringify(subjects))
            } catch (error) {
                //Viser en fejl i konsollen, hvis fagene ikke kan gemmes
                console.log('Fejl ved gemning af fag:', error)
            }
        }

        saveSubjects()
    }, [subjects, subjectsLoaded])

    //Tilføjer en ny opgave til det fag, som brugeren har valgt.
    const addTask = (index) => {

        //Stopper funktionen, hvis skrivefeltet er tomt eller kun indeholder mellem
        if (inputValue.trim() === '') {
            return
        }

        //Opretter en ny opgave med et unikt ID, titel, status og deadline
        const newTask = {
            id: Date.now().toString(),
            title: inputValue.trim(),
            completed: false,
            deadline: null
        }

        //Opretter en kopi af den eksisterende list over fag
        const updatedSubjects = [...subjects]

        //Opdaterer det valgte fag med en ny opgaveliste, som indeholder den nye opgave
        updatedSubjects[index] = {
            ...updatedSubjects[index],
                tasks: [...updatedSubjects[index].tasks,newTask]
        }

        //Gemmer den opdaterede liste i state
        setSubjects(updatedSubjects)

        //Gør så skrivefeltet bliver tomt efter tilføjelsen
        setInputValue('')
    }

    //Fjerner en bestemt opgave fra et bestemt fag
    const removeTask = (subjectIndex, taskIndex) => {

        //Opretter en kopi af listen over fag
        const updatedSubjects = [...subjects]

        //Beholder alle opgaver undtagen den, hvis indeks er lig taskIndex
        updatedSubjects[subjectIndex] = {
            ... updatedSubjects[subjectIndex],
            tasks: updatedSubjects[subjectIndex].tasks.filter(
                (task, index) => index !==taskIndex
            )
        }

        //Gemmer listen med den fjernede opgave i state
        setSubjects(updatedSubjects)
    }

    //Ændrer om en opgave er færdig eller ikke færdig
    const toggleTask = (subjectIndex, taskIndex) => {

        //Opretter en kopi af faglisten
        const updatedSubjects = [...subjects]

        //Finder den valgte opgave
        const task = updatedSubjects[subjectIndex].tasks[taskIndex]

        //Ændrer opgavens status
        task.completed = !task.completed

        //Gemmer den opdaterede liste
        setSubjects(updatedSubjects)
    }

    //Gemmer ændringer i en eksisterende opgave
    const saveEdit = (subjectIndex, taskIndex) => {

        //Stopper hvis tekstfeltet er tomt
        if (editText.trim() === '') {
            return
        }

        //Opretter en kopi af faglisten
        const updatedSubjects = [...subjects]

        //Opretter en opdateret opgave med den nye titel
        updatedSubjects[subjectIndex] = {
            ...updatedSubjects[subjectIndex],
            tasks: updatedSubjects[subjectIndex].tasks.map((task, index) => 
                index === taskIndex
                    ? {...task, title: editText.trim()}
                    : task
            )
        }

        //Gemmer den opdaterede liste
        setSubjects(updatedSubjects)

        //Afslutter redigeringen
        setEditingTaskId(null)
        setEditText('')
    }

    //Opretter et nyt fag ud fra teksten i skrivefeltet
    const addSubject = () => {

        //Stopper funktionen, hvis brugeren ikke har skrevet et fagnavn
        if (newSubject.trim() === '') {
            return
        }

        //Opretter et fag med det indtastede navn og en tom opgaveliste
        const subject = {
            name: newSubject.trim(),
            tasks: []
        }

        //Tilføjer det nye fag til den ekisterende liste
        setSubjects([...subjects, subject])

        //Gør skrivefeltet tomt efter tilføjelsen
        setNewSubject('')
    }

    //Fjerner det valgte fag og alle opgaver, der hører til
    const removeSubject = (index) => {

        //Opretter en ny liste, som indeholder alle fag undtagen det valgte 
        const updatedSubjects = subjects.filter((subject, subjectIndex) => subjectIndex !== index)

        //Gemmer den nye liste over fag i state
        setSubjects(updatedSubjects)

        //Lukker et eventuelt åbent fag
        setOpenSubject(null)
    }

    //Returnerer det indhold, der skal vises på opgavesiden
    return (
        <ScrollView style = {styles.container}>

            {/* Viser sidens titel og en lille vejledning */}
            <Text style = {styles.title}>
                Mine opgaver
            </Text>

            <Text style = {styles.subtitle}>
                Vælg en af dine fag og tryk for at se dine manglende opgaver
            </Text>

            {/* Viser et kort hvor brugeren kan oprette et nyt fag */}
            <View style = {styles.card}>
                <Text style = {styles.heading}>
                    Tilføj et nyt fag
                </Text>

                {/* Gemmer den indtastede fagnavn i "newSubject" */}
                <TextInput 
                    style = {styles.taskInput}
                    placeholder = "Skriv fagets navn"
                    value = {newSubject}
                    onChangeText = {(txt) => setNewSubject(txt)}>
                </TextInput>

                {/* Kalder "addSubject" når brugeren trykker på knappen */}
                <Button
                    title = "Tilføj et fag"
                    color = 'black'
                    onPress = {addSubject}>
                
                </Button>
            </View>

            {/* Gennemgår faglisten og viser et kort for hvert fag */}
            {subjects.map((subject, index) => (
                <View key = {index} style = {styles.subjectCard}>

                    {/* Åbner eller lukker faget, når brugeren trykker på det */}
                    <Pressable
                        onPress = {() =>
                            setOpenSubject (openSubject === index ? null : index)
                    }
                >

                    {/* Viser fagets navn */}
                    <View style = {styles.subjectRow}>
                        <Text style = {styles.subjectTitle}>
                            {subject.name}
                        </Text>

                        {/* Viser et minus eller plus */}
                        <Text style = {styles.plus}>
                            {openSubject === index ? '-' : '+'}
                        </Text>
                    </View>

                    {/* Viser antallet af opgaver i det aktuelle fag */}
                    <Text style = {styles.smallText}>
                        {subject.tasks.length} opgaver
                    </Text>

                </Pressable>

                {/* Fjerner det aktuelle fag, når brugeren trykker på knappen */}
                <Pressable
                    style={styles.removeSubjectButton}
                    onPress = {() => removeSubject(index)}
                >
                    <Text style = {styles.removeButton}>
                        Fjern fag
                    </Text>
                </Pressable>
                
                {/* Viser kun opgaverne, hvis det aktuelle fag er åbent */}
                {openSubject === index && (
                    <View style = {styles.taskList}>

                        {/* Gennemgår opgavelisten og viser hver enkelt opgave */}
                        {subject.tasks.map((task, taskIndex) => (
                            <View key = {taskIndex} style = {styles.taskContainer}>

                                {/* Brugeren kan markere opgaven som færdig */}
                                <Pressable onPress={() => toggleTask(index, taskIndex)}>
                                    <Text style = {[styles.task, task.completed && {textDecorationLine: 'line-through'}]}>
                                        {task.completed ? '✅' : '⬜️'} {task.title}
                                    </Text>
                                </Pressable>

                                {/*Viser kun redigeringsfeltet for den valgte opgave */}
                                {editingTaskId === task.id && (
                                    <View>
                                        <TextInput
                                            style={styles.taskInput}
                                            value={editText}
                                            onChangeText={setEditText}
                                        ></TextInput>

                                        <Pressable
                                            style={styles.saveButton}
                                            onPress={() => saveEdit(index, taskIndex)}
                                        >
                                            <Text style={styles.saveButtonText}>
                                                Gem
                                            </Text>
                                        </Pressable>
                                    </View>
                                )}

                                {/*Gør det muligt at redigere en opgave */}
                                <View style={styles.taskButtons}>
                                    <Pressable
                                        onPress={() => {
                                            setEditingTaskId(task.id)
                                            setEditText(task.title)
                                        }}>

                                        <Text style={styles.smallText}>
                                            Rediger
                                        </Text>
                                    </Pressable>
                                

                                {/* Fjerner den valgte opgave fra det aktuelle fag */}
                                <Pressable onPress = {() => removeTask(index, taskIndex)}>
                                        <Text style = {styles.removeButton}>
                                            Slet opgave
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))}

                        {/* Gemmer teksten til en ny opgave i "inputValue" */}
                        <TextInput
                            style = {styles.taskInput}
                            placeholder = "Indsæt en ny opgave"
                            value = {inputValue}
                            onChangeText={(txt) => setInputValue(txt)}
                        />

                        {/* Tilføjer en ny opgave til det aktuelle fag */}
                        <Button
                            title="Tilføj en opgave"
                            color="#2455E8"
                            onPress={() => addTask(index)}
                        ></Button>

                    </View>
                )}

                </View>
            ))}

        </ScrollView>
    )
        
}

//Gør det muligt at importere SecondScreen i App.js
export default SecondScreen