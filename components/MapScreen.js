import React, { useState, useEffect } from 'react';
import { View, Text,  Button, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function MapScreen({ route, navigation }) {
    const { address } = route.params;
    const [coordinates, setCoordinates] = useState({ lat: 0.0, lng: 0.0 });
    
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {      
            Alert.alert('No permission to get location')
            return;    
          }
          
          try {
            const response = await fetch(
              `https://www.mapquestapi.com/geocoding/v1/address?key={YOURKEY}&location=${address}`
            );
            const data = await response.json();
            setCoordinates(data.results[0].locations[0].latLng);
          } catch (error) {
            console.error('Error fetching location:', error);
          }
        })();
      }, [address]);
      
    
      return (
        <View style={styles.container}>
          <MapView
            style={{ flex: 1 }}
            region={{
                latitude: coordinates.lat,
                longitude: coordinates.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            >
            <Marker
                coordinate={{
                latitude: coordinates.lat,
                longitude: coordinates.lng,
                }}
                title={address}
            />
</MapView>


    
        </View>
      );
    };

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          
        },
        resultContainer: {
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F1F1F1',
          marginTop: 30,
          
        },
        resultText: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        inputContainer: {
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          padding: 30,
        },
        input: {
          width: '100%',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          padding: 10,
          
        },
        pickerContainer: {
          height: 60,
          marginTop: -20,
        },
        buttonContainer: {
          height: 90,
          alignItems: 'center',
          justifyContent: 'center',
         
          
          
        },
      });