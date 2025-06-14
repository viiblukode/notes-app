import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Strings } from '../../constants';

const SummaryScreen = () => {


    return (
         <LinearGradient 
            style={styles.container} 
            colors={Colors.primaryGradient} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{Strings.SUMMARY}</Text>
                </View>
        </LinearGradient>
    );
}


export const styles = StyleSheet.create({
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

export default SummaryScreen;