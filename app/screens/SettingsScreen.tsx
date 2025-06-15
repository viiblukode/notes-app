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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>{Strings.DELETE}</Text>
                        </TouchableOpacity>
                </View>

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
        borderRadius: 12,
        borderColor: Colors.textSecondaryLight,
        borderWidth: 1,
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
        color: Colors.textPrimary,
        fontSize: 16,
        marginLeft: 12,
    },
    buttonContainer: {
        height: 100,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.navBarBackground[1],
    },
    button: {
        backgroundColor: Colors.secondary,
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 25,
        marginHorizontal: 60,
    },
    buttonText: {
        color: Colors.textPrimary,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SettingsScreen;