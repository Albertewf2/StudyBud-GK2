//Importer StyleSheet til samle appens styling
import {StyleSheet} from 'react-native'

//Opretter de styles, som bruges på appens forskellige skærme
const styles = StyleSheet.create({
    
    //bestemmer skærmens baggrund, afstand til kanten og plads til indholdet
    container: {
        flex: 1,
        backgroundColor: '#EDF4FF',
        padding: 20
    },

    //Styler de store overskrifter på skærmene
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2455E8',
        marginBottom: 8
    },
    
    //Styler den korte beskrivelse under sidens titel
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 25
    },

    //Giver almindelige kort en hvid baggrund, indvendig afstand og runde hjørner
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        marginBottom: 15
    },

    //Styler mindre overskrifter inde på skærmene
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2455E8',
        marginBottom: 15
    },

    //Styler appens almindelige tekst
    text: {
        fontSize: 16,
        color: '#334155',
        marginBottom: 8
    },

    //Styler de kort, som viser hvert enkelt fag
    subjectCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10
    },

    //Styler fagets navn med større og fed tekst
    subjectTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2455E8'
    },

    //Tilføjer afstand og en streg over opgavelisten
    taskList: {
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingTop: 19
    },
    
    //Styler teksten for de enkelte opgaver
    task: {
        fontSize: 16,
        color: '#334155',
        marginBottom: 5,
        lineHeight: 24
    },

    //Styler den mindre tekst, der viser antallet af opgaver
    smallText: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 5
    },

    //placerer fagets navn og plus- eller minustegnet på samme række
    subjectRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    //gør plus- og minustegnet større
    plus: {
        fontSize: 26
    },

    //Styler skrivefeltet til nye fag og opgaver
    taskInput: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10
    },

    //Placerer opgavens tekst og sletteknappen på samme række
    taskRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },

    taskContainer: {
        marginBottom: 25,
        paddingBottom: 35,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        gap: 12
    },

    taskButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25,
        marginTop: 5
    },

    //Gør teksten på knapperne til at fjerne fag og opgaver røde
    removeButton: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 0
    },

    //Styler velkomstkortet på Forsiden
    welcomeCard: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20
    },

    //Styler overskriften i velkomstkortet
    welcomeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#183153',
        marginBottom: 15
    },

    //Styler skrivefeltet, hvor brugeren kan indtaste sit navn
    nameInput: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 20
    },

    //Styler velkomstteksten, som ændrer sig efter brugeren input
    welcomeText: {
        fontSize: 18,
        color: '#334155',
        marginBottom: 20
    },

    //Blå baggrund på Gem-knappen
    saveButton: {
        backgroundColor: '#2455E8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },

    //Hvis tekst på Gem-knappen
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },

    //Placerer Fjern Fag lige under antallet af opgaver
    removeSubjectButton: {
        alignSelf: 'flex-start',
        marginTop: 15,
        marginBottom: 10
    },

    //Bestemmer placering af knapperne til valg af tid
    timerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        gap: 10
    },

    //Styling af knapperne til valg af tid
    timerButton: {
        backgroundColor: '#2455E8',
        padding: 15,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center'
    },

    //Ændrer farven på den valgte timerknap
    timerButtonSelected: {
        backgroundColor: '#183153'
    },

    //Styling af teksten på timerknapperne
    timerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    //Styling af området hvor den resterende tid vises
    timerDisplay: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 25,
        width: '100%'
    },

    //Timerens nedtælling
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#2455E8',
        textAlign: 'center'
    },

    //Styling af knapperne til start, pause og nulstil
    timerControlButton: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#2455E8',
        borderRadius: 10,
        paddingVertical: 15,
        width: '30%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },

    //Styling af teksten på timerens kontrol
    timerControlText: {
        color: '#2455E8',
        fontSize: 16,
        fontWeight: 'bold'
    },

    //Styling af kortet, som viser den kommende eksamen
    examCard: {
        backgroundColor: '#2455E8',
        padding: 25,
        borderRadius: 15,
        marginBottom: 20
    },

    //Styling af underoverskriften på eksamenskortet
    examCardSubtitle: {
        color: '#DBEAFE',
        fontSize: 14,
        marginBottom: 10
    },

    //Eksamensoplysninger
    examCardTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },

    //Bestemmer placeringen af kortene til huskesedler, undervisere og eksamener
    noteGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTip: 10
    },

    //Fælles styling af notekortene
    noteCard: {
        width: '48%',
        minHeight: 150,
        borderRadius: 15,
        padding: 15,
        marginBottom: 15
    },

    //Baggrundsfarve til huskesedler 
    yellowCard:{
        backgroundColor: '#FFF0D8'
    },

    //Baggrundsfarve til undervisere seddel
    greenCard: {
        backgroundColor: '#DFF4EB'
    },

    //Baggrundsfarve til eksamen seddel
    purpleCard: {
        backgroundColor: '#EEE7FF'
    },

    //Styling af ikoner på notekortene
    noteIcon: {
        fontSize: 25,
        marginBottom: 15
    },

    //Styling af overskriften på notekortene
    noteTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 8
    },

    //Styling af beskrivelserne og oplysningerne på notekortene
    noteDescription: {
        fontSize: 13,
        color: '#555'
    }

})

//Gør det muligt at importere og bruge styles på de andre skærme
export default styles