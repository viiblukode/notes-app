import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SectionList } from 'react-native';
import { Colors, Strings } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { IconHeader } from '../../components/Header';
import { getImage } from '../../constants/images';
import { truncateText } from '../../utils/StringUtil';
import { Note, NoteCategory } from '../../constants/types';
import { getAllNotes, getLatestNotesByCategory } from '../../utils/NotesUtil';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [notesData, setNotesData] = useState<Note[]>([]);
    const onFocus = useIsFocused();

    useEffect(() => {
        const loadData = async () => {
            const data = await getAllNotes();
            setNotesData(data);
        }
        loadData();
    }, [onFocus]);
    
    const filteredNotes = getLatestNotesByCategory(notesData, true).filter(section => section.data.length > 0); //to only dislay note category that has data

    const getCategoryIcon = (category: string) => {
        switch(category) {
            case NoteCategory.HealthAndWellness:
                return 'pencil';
            case NoteCategory.Life:
                return 'serveFood';
            case NoteCategory.WorkAndStudy:
                return 'health';
            default:
                return 'pencil'
        }
    };

    const navigateToSettings = () => {
        navigation.navigate('Settings');
    };

    const renderListData = ( data:{
        category: NoteCategory;
        data: Note[];
    }[]) => {
        if (data.length === 0) {
            return (
                <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>{Strings.NO_DATA}</Text>
            </View>
            )
        }

        return (
            <SectionList 
                sections={filteredNotes}
                keyExtractor={(item, index) => item.id ?? index.toString()}
                renderSectionHeader={({section}) => (
                    <View style={styles.categoryBlock}>
                        <View style={styles.categoryHeader}>
                            <Image
                            source={getImage(getCategoryIcon(section.category))}
                            style={{ width: 17, height: 17 }}
                            />
                            <Text style={styles.categoryText}>{section.category}</Text>
                        </View>
                    </View>
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.noteItem}>
                        <Text style={styles.noteText}>{truncateText(item.description)}</Text>
                        <Ionicons name="chevron-forward" size={16} color={Colors.homeChevron} />
                    </TouchableOpacity>
                )}
                contentContainerStyle={{
                    paddingBottom: 100,
                    paddingTop: 0,
                    flexGrow: 1,
                    justifyContent:'flex-start'
                }}   
            />
        );
    }

    return (
        <LinearGradient 
            style={styles.container} 
            colors={Colors.primaryGradient} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.header}>
                    <IconHeader 
                        title={Strings.HOME} 
                        imageName={'settings'}
                        onPressHandler={navigateToSettings} />
                    </View>
                    <View style={styles.subHeader}>
                        <Image source={getImage('clock')}/>
                        <Text style={styles.subHeaderText}>{Strings.RECENT_NOTES}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        {renderListData(filteredNotes)}
                    </View>
                    
                </SafeAreaView>
        </LinearGradient>
    );
}
    

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingTop: 30,
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
        marginBottom: 20
    },
    subHeaderText: {
        fontWeight: '400',
        fontSize: 16,
        color: Colors.textSecondary,
        marginLeft: 9
    },
    categoryBlock: {
        marginBottom: 15,
        marginTop: 5
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
        height: 60,
        padding: 12,
        borderRadius: 12,
        borderColor: Colors.textSecondaryLight,
        borderWidth: 1,
        marginBottom: 10,
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
    placeholderContainer: {
        height: 50,
        borderRadius: 12,
        borderColor: Colors.textSecondaryLight,
        borderWidth: 1,
    },
        placeholderText: {
        color: Colors.textSecondary,
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 12,
    },

});

export default HomeScreen;