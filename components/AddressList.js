import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, ListItem, Icon, Input } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const db = SQLite.openDatabase('addressdb.db');

export default function AddressList() {
  const [address, setAddress] = useState('');
  const [addressList, setAddressList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists addresslist (id integer primary key not null, address text);');
    }, null, updateList); 
  }, []);

  
  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into addresslist (address) values (?);', [address]);    
      }, null, updateList
    )
    setAddress("")
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from addresslist;', [], (_, { rows }) =>
      setAddressList(rows._array)
      ); 
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from addresslist where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  const navigateToMap = (item) => {
    navigation.navigate('MapScreen', { address: item.address });
  }


  return (
    <View style={styles.container}>
      
      <View style={styles.inputContainer}>
      <Input
      placeholder='Type your address' label='Place finder'
      onChangeText={address => setAddress(address)} value={address} 
      />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveItem}>
        <Icon name="save" color="#fff" size={20} />
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      

      <FlatList 
        style={styles.list}
        keyExtractor={item => item.id.toString()} 
        data={addressList} 
        renderItem={({item}) => (
          <TouchableOpacity 
            style={styles.itemContainer}
            onLongPress={() => deleteItem(item.id) } 
            onPress={() => navigateToMap(item)}>
            <Text style={styles.itemText}>{item.address}</Text>
            <Text >show on map </Text>
          </TouchableOpacity>
        )} 
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  saveButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 12,
    marginVertical: 16,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginTop: 15
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -30,
    marginBottom: -10,
    
  },
  textInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});