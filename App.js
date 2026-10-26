//Importerer navigation, så appen kan skifte mellem skærme
import { NavigationContainer } from '@react-navigation/native';

//Importerer navigation med faner nederst på skærmen
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//Importerer appens fem skærme
import FirstScreen from './Screens/FirstScreen';
import SecondScreen from './Screens/SecondScreen';
import ThirdScreen from './Screens/ThirdScreen';
import FourthScreen from './Screens/FourthScreen';
import FifthScreen from './Screens/FifthScreen';

//Opretter den navigator, som styrer fanerne nederst i appen
const Tab = createBottomTabNavigator();

//Opretter appens hovedkomponent
export default function App() {
    return (
        <NavigationContainer>

            {/* Opretter en menu med faner nederst op skærmen */}
            <Tab.Navigator>

                {/* Forbinder fanen Forside med FirstScreen */}
                <Tab.Screen name="Forside" component={FirstScreen} />

                {/* Forbinder fanen Opgaver med SecondScreen */}
                <Tab.Screen name="Opgaver" component={SecondScreen} />

                {/* Forbinder fanen Overblik med ThirdScreen */}
                <Tab.Screen name="Noter" component={ThirdScreen} />

                {/* Forbinder fanen Information med FourthScreen */}
                <Tab.Screen name="Min profil" component={FourthScreen} />

                {/*Forbinder fanen Studietimer med FifthScreen */}
                <Tab.Screen name="Studietimer" component={FifthScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}



