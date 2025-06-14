import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Strings } from '../../constants';
import { NavHeader } from '../../components/Header';

const CreateNoteScreen = () => {
    return (
        <LinearGradient 
            style={styles.container} 
            colors={Colors.primaryGradient} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
                <NavHeader title={Strings.CREATE_NOTE} showBackButton/>
        </LinearGradient>
    );
}
  

const styles = StyleSheet.create({
   container: { 
        flex: 1, 
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default CreateNoteScreen;