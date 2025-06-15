import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SectionList } from 'react-native';
import { Colors, Strings } from '../../constants';
import { IconHeader } from '../../components/Header';
import { getImage } from '../../constants/images';
import { useIsFocused } from '@react-navigation/native';
import { Note, NoteCategory } from '../../constants/types';
import { getAllNotes, getLatestNotesByCategory } from '../../utils/NotesUtil';

const SummaryScreen = () => {

    const [notesData, setNotesData] = useState<Note[]>([]);
    const onFocus = useIsFocused();

    useEffect(() => {
        const loadData = async () => {
            const data = await getAllNotes();
            setNotesData(data);
        }
        loadData();
    }, [onFocus]);

    const filteredNotes = getLatestNotesByCategory(notesData);
    
    const getCategoryAvatar = (category: string) => {
        switch(category) {
            case NoteCategory.WorkAndStudy:
                return 'workStudyAvatar';
            case NoteCategory.Life:
                return 'homeAvatar';
            case NoteCategory.HealthAndWellness:
                return 'healthWellnessAvatar';
            default:
                return 'healthWellnessAvatar';
        }
    }

    return (
         <LinearGradient 
            style={styles.container} 
            colors={Colors.primaryGradient} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
                <View style={styles.header}>
                    <IconHeader 
                        title={Strings.HOME} 
                        imageName={'robot'}/>
                </View>
                <SectionList 
                    sections={filteredNotes}
                    keyExtractor={(item, index) => item.id ?? index.toString()}
                    renderSectionHeader={({section}) => (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Image
                                source={getImage(getCategoryAvatar(section.category))}
                                style={styles.avatar}
                                />
                                <Text style={styles.cardTitle}>{section.category}</Text>
                                <TouchableOpacity style={styles.detailButton}>
                                    <Text style={styles.detailText}>Detail</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    renderItem={({ section }) => (    
                        <View style={styles.recordSummaryView}>
                            <Text style={styles.recordText}>
                                This topic has a total of {section.data.length} records.
                            </Text>
                        </View> 
                    )}
                    renderSectionFooter={({ section }) => {
                        if(section.data.length === 0) {
                            return (
                                <View style={styles.recordSummaryView}>
                                    <Text style={styles.recordText}>
                                        This topic has a total of {section.data.length} records.
                                    </Text>
                                </View> 
                            );
                        }
                        return null;
                    }}
                />
        </LinearGradient>
    );
}


export const styles = StyleSheet.create({
  container: { 
        flex: 1, 
        paddingTop: 30,
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    card: {
        borderRadius: 20,
        padding: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    cardTitle: {
        flex: 1,
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailButton: {
        backgroundColor: Colors.secondary,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    detailText: {
        color: Colors.textPrimary,
        fontWeight: '600',
    },
    recordText: {
        marginVertical: 15,
        color: Colors.textSecondary,
        paddingHorizontal: 12,
    },
    recordSummaryView: {
        marginVertical: 5,
        borderRadius: 12,
        borderColor: Colors.textSecondaryLight,
        borderWidth: 1,
        height: 50,
    },
});

export default SummaryScreen;