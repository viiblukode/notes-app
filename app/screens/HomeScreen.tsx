import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Colors, Strings } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { IconHeader } from '../../components/Header';
import { getImage } from '../../constants/images';

const HomeScreen = () => {

    const navigation = useNavigation();
    const dummyNotesData = [
        {
            category: 'Work and study',
            icon: <Image source={getImage('pencil')} style={{width: 17, height: 17}} />,
            data: [
            'Overview of basic computer networking knowledge',
            'How to calculate float multiplication and division in JavaScript?',
            ],
        },
        {
            category: 'Life',
            icon: <Image source={getImage('serveFood')} style={{width: 17, height: 17}} />,
            data: ['Pan–fried chicken breast with vegetable salad'],
        },
        {
            category: 'Health and wellness',
            icon: <Image source={getImage('health')} style={{width: 17, height: 17}} />,
            data: ['Maintain sufficient daily water intake'],
        },
    ]
    return (
        <LinearGradient 
            style={styles.container} 
            colors={Colors.primaryGradient} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
                <View style={styles.header}>
                    <IconHeader 
                        title={Strings.HOME} 
                        imageName={'settings'}
                        onPressHandler={() => { navigation.navigate('Settings'); }} />
                </View>
                <View style={styles.subHeader}>
                    <Image source={getImage('clock')}/>
                    <Text style={styles.subHeaderText}>{Strings.RECENT_NOTES}</Text>
                </View>
                <FlatList 
                    data={dummyNotesData}
                    keyExtractor={(item) => item.category} 
                    renderItem={({ item }) => (
                        <View style={styles.categoryBlock}>
                            <View style={styles.categoryHeader}>
                                {item.icon}
                            <Text style={styles.categoryText}>{item.category}</Text>
                            </View>
                            {item.data.map((note, index) => (
                            <TouchableOpacity key={index} style={styles.noteItem}>
                                <Text style={styles.noteText}>{note}</Text>
                                <Ionicons name="chevron-forward" size={16} color="#FF9CF0" />
                            </TouchableOpacity>
                            ))}
                        </View>   
                    )} />

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
        marginBottom: 15,
    },
    subHeader: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 12,
    },
    subHeaderText: {
        fontWeight: '400',
        fontSize: 16,
        color: Colors.textPrimary,
        marginLeft: 9
    },
    categoryBlock: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  categoryText: {
    color: 'white',
    fontWeight: '600',
  },
  noteItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteText: {
    color: 'white',
    fontSize: 14,
    flex: 1,
    paddingRight: 8,
  },

});

export default HomeScreen;