import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { Colors, Strings } from '../../constants';
import { NavHeader } from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { getImage } from '../../constants/images';
import { clearCache } from '../../utils/NotesUtil';
import { useModal } from '../../components/ModalHandler';
import Toast from 'react-native-toast-message';
import * as WebBrowser from 'expo-web-browser';


const SettingsScreen = () => {
    const { showModal } = useModal();

    // data Array to load settings options with iconName and dummy url to redirect via in app browser
    const settingsList = [
        {label: Strings.ONLNE_CUSTOMER, icon: 'headphones', url: 'https://google.com'},
        {label: Strings.USER_AGREEMENT, icon: 'paper', url: 'https://google.com'},
        {label: Strings.PRIVACY_POLICY, icon: 'book', url: 'https://google.com'},
        {label: Strings.ABOUT, icon: 'info', url: 'https://google.com'}
    ];

    const deleteNotesHandler = async () => {
        showModal({
            title: Strings.DELETE,
            message: Strings.DELETE_PROMPT,
            confirmText: Strings.PROMPT_CONFIRM,
            cancelText: Strings.PROMPT_CANCEL,
            onCancel: () => {
                console.log(`=== ~ deleteNotesHandler ~ onCancel: Delete action cancelled!`)
            },
            onConfirm: () => {
                const status = clearCache();
                if(status) {
                    Toast.show({
                        type: 'success', 
                        text1: Strings.DELETE_SUCCESS, 
                        text2: Strings.DELETE_CONFIRMATION
                    })
                }
            }
        })
    };

    const handleInAppBrowser = async (url: string) => {
        try {
            const result = await WebBrowser.openBrowserAsync(url);
            console.log(`=== ~ handleInAppBrowser ~ result:`, result);
        } catch (error) {
            console.warn('Error opening URL:', error);
        }
    }

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
                        onPress={ () => handleInAppBrowser(item.url)}
                    >
                        <View style={styles.iconLabel}>
                            <Image source={getImage(item.icon)} />
                            <Text style={styles.itemLabel}>{item.label}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={Colors.homeChevron} />
                    </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={deleteNotesHandler}>
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