import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Strings } from '../../constants';
import { NavHeader } from '../../components/Header';
import { NoteCategory } from '../../constants/types'
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const CreateNoteScreen = () => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [noteContent, setNoteContent] = useState<string>('');
    const MAX_CHAR_LIMIT = 200;

    const dropDownOptions = Object.values(NoteCategory).map((value) => ({
        label: value,
        value
    }));

    return (
        <LinearGradient 
            style={styles.container} 
            colors={Colors.primaryGradient} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
            <NavHeader title={Strings.CREATE_NOTE} showBackButton/>
            <KeyboardAvoidingView
                style={styles.mainView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={60}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.dropdownContainer}>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedValue(value)}
                            value={selectedValue}
                            placeholder={{ label: Strings.CATEGORY_PLACEHOLDER, value: '' }}
                            items={dropDownOptions}
                            Icon={() => 
                                <Ionicons name={"chevron-down"} size={20} color={Colors.textPrimary} style={{marginVertical: 15}}/>
                            }
                            style={pickerStyle}
                        />
                    </View>

                    <View>
                        <TextInput
                            style={styles.noteInput}
                            placeholder="Please input note content"
                            placeholderTextColor="#ccc"
                            multiline
                            value={noteContent}
                            onChangeText={setNoteContent}
                            maxLength={MAX_CHAR_LIMIT}
                        />
                    </View>       
                </ScrollView>
                
            </KeyboardAvoidingView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>{Strings.SAVE}</Text>
                 </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}
  

const styles = StyleSheet.create({
   container: { 
        flex: 1, 
        paddingTop: 30,
    },
    mainView: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    dropdownContainer: {
        backgroundColor: Colors.primaryGradient[1],
        borderColor: Colors.textSecondaryLight,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'ios' ? 12 : 0,
        alignContent: 'center'
    },
    dropdownPicker: {
        fontSize: 14,
        fontWeight: 400,
        color: Colors.textPrimary,
        paddingVertical: 16,
        paddingLeft: 16,
        paddingRight: 50
    },
    charCount: {
        position: 'absolute',
        bottom: 8,
        right: 12,
        fontSize: 12,
        color: Colors.textSecondary,
    },
    noteInput: {
        backgroundColor: Colors.primaryGradient[1],
        height: 200,
        borderRadius: 15,
        borderColor: Colors.textSecondaryLight,
        borderWidth: 1,
        padding: 15,
        color: '#fff',
        textAlignVertical: 'top',
        marginBottom: 20,
        marginTop: 16
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
        marginHorizontal: 60
    },
    buttonText: {
        color: Colors.textPrimary,
        fontWeight: 'bold',
        fontSize: 16,
    },

});

const pickerStyle = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        fontWeight: 400,
        color: Colors.textPrimary,
        paddingVertical: 16,
        paddingLeft: 16,
        paddingRight: 50
    },
    inputAndroid: {
        fontSize: 14,
        fontWeight: 400,
        color: Colors.textPrimary,
        paddingVertical: 16,
        paddingLeft: 16,
        paddingRight: 50
    }
})

export default CreateNoteScreen;