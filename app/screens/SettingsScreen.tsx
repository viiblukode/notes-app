import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors, Strings } from '../../constants';
import { NavHeader } from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { getImage } from '../../constants/images';

const SettingsScreen = () => {

    const settingsList = [
        {label: Strings.ONLNE_CUSTOMER, icon: 'headphones'},
        {label: Strings.USER_AGREEMENT, icon: 'paper'},
        {label: Strings.PRIVACY_POLICY, icon: 'book'},
        {label: Strings.ABOUT, icon: 'info'}
    ]

    return (
         <LinearGradient 
            style={styles.container} 
            colors={Colors.primaryGradient} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
                <NavHeader 
                    title={Strings.SETTINGS}
                    showBackButton
                />

                <ScrollView contentContainerStyle={styles.content}>
                    {settingsList.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.item}
                        onPress={() => {}}
                    >
                        <View style={styles.iconLabel}>
                            <Image source={getImage(item.icon)} />
                            <Text style={styles.itemLabel}>{item.label}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#c084fc" />
                    </TouchableOpacity>
                    ))}
                </ScrollView>

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
    content: {
        flex: 1,
    },
    item: {
        backgroundColor: '#2a003f',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 8,
        marginBottom: 16,
        height: 54,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemLabel: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 12,
    },
    deleteButton: {
        backgroundColor: '#ec4899',
        margin: 20,
        paddingVertical: 12,
        borderRadius: 999,
        alignItems: 'center',
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SettingsScreen;