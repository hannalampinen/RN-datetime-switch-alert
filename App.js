import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, Alert, Switch } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';


/* Ongelmia
- Kun vaihtaa päivämäärästä kellonaikaan, miten saisi vaihdettua 
päivämäärän näytämisen sijaan text-kohtaan kellonajan?
- Jos valittu päivämäärä on mennyt jo, niin kellonaikaa valitessa tulee silti alert 
- Yleistä hienosäätöä, mutta mutuen pelaa ihan ok!
- Kellonaika ei päivity?
*/

export default function App() {

  const [show, setShow] =  useState(false);  
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  //muuttuja switchille
  const [isEnabled, setIsEnabled] = useState(false);

  //Function fow showing alert
  // If date is before the current date, alert 'You are late!'
  const showAlert = () => {
    Alert.alert(
      'Alert',
      'You are late!',
    [
      {
        text: 'Ok',
        //onPress: () => { something? }
      }
    ]
    );
  }

  //Function for setting new date (onChange). 
  //You can check the date and initate the alert here also
  const setSelectedDate = (e, myDate)=>{
    setShow(false);
    const selectedDate = myDate || date;
    setDate(selectedDate);

    if (selectedDate < currentDate) {
      showAlert();
    } 
  };

  const toggleButton = () => {
    setShow(prevShow => !prevShow);
  }

  const toggleSwitch = () => setIsEnabled(prev => !prev)

  const switchMode = (isEnabled === true) ? 'time' : 'date';

  //You need DatePicker, button and textfield
  return (
    <View style={styles.container}>
      <Switch
      value={isEnabled}
      onChange={toggleSwitch}
      />
      <Text>
          {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
      </Text>
      <Text>

      </Text>
      <Button onPress={toggleButton} title={(isEnabled === true) ? 'Choose time' : 'Choose date'}/>
      {show && Platform.OS === 'ios' && (
      <DateTimePicker
        style={{width:200}}
        mode={switchMode}
        display={'default'}
        value={date} 
        onChange={setSelectedDate}
      />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});