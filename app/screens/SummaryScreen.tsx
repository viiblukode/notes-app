import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors, Strings } from '../../constants';
import { IconHeader } from '../../components/Header';
import { getImage } from '../../constants/images';

const SummaryScreen = () => {

    const dummyData = [
        {
            id: '1',
            title: 'Work and study',
            records: 50,
            avatar: 'workStudyAvatar', 
        },
        {
            id: '2',
            title: 'Home life',
            records: 12,
            avatar: 'homeAvatar', 
        },
        {
            id: '3',
            title: 'Health and wellness',
            records: 30,
            avatar: 'healthWellnessAvatar', 
        },
    ];

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
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {dummyData.map((data) => (
                    <View key={data.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                        <Image source={getImage(data.avatar)} style={styles.avatar} />
                        <Text style={styles.cardTitle}>{data.title}</Text>
                        <TouchableOpacity style={styles.detailButton}>
                            <Text style={styles.detailText}>Detail</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.recordSummaryView}>
                            <Text style={styles.recordText}>
                                This topic has a total of {data.records} records.
                            </Text>
                        </View> 
                    </View>
                    ))}
                </ScrollView>
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
        marginBottom: 20,
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
        marginVertical: 10,
        color: Colors.textSecondary,
        paddingHorizontal: 10
    },
    recordSummaryView: {
        marginTop: 10,
        borderRadius: 12,
        borderColor: Colors.textSecondaryLight,
        borderWidth: 1,
    }
});

export default SummaryScreen;