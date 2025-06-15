import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Strings } from '../../constants';
import { NavHeader } from '../../components/Header';
import { Note, NoteCategory } from '../../constants/types'
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import moment from 'moment';
import { createNote } from '../../utils/NotesUtil';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const CreateNoteScreen = () => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [noteContent, setNoteContent] = useState<string>('');
    const MAX_CHAR_LIMIT = 200;
    const navigator = useNavigation();
    const pickerRef = useRef<any>(null);
    const isIos = Platform.OS === 'ios';

    const dropDownOptions = Object.values(NoteCategory).map((value) => ({
        label: value,
        value
    }));

    const onSaveNote = async () => {
        const newNote: Note = {
            id:  uuid.v4(),
            description: noteContent,
            category: selectedValue as NoteCategory,
            dateCreated: moment().toISOString()
        }

        //save to async
        const saveStatus = await createNote(newNote);
        if(saveStatus) {
            Toast.show({
                type: 'success', 
                text1: Strings.SAVE_SUCCESS, 
                text2: Strings.SAVE_SUCCESS_MESSAGE
            });
            //clear state
            setSelectedValue('');
            setNoteContent('');
            navigator.goBack();
        } else {
             Toast.show({
                type: 'error', 
                text1: Strings.SAVE_FAILED, 
                text2: Strings.SAVE_FAILED_MESSAGE
            });
        }
    };

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
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled" >
                    <View style={styles.dropdownContainer}>
                        <RNPickerSelect
                            ref={pickerRef}
                            onValueChange={(value) => setSelectedValue(value)}
                            value={selectedValue}
                            placeholder={{ label: Strings.CATEGORY_PLACEHOLDER, value: null }}
                            items={dropDownOptions}
                            Icon={() => 
                                <Ionicons 
                                    name={"chevron-down"} 
                                    size={20} 
                                    color={Colors.textPrimary} 
                                    style={{marginVertical: isIos ? 9 : 17}}
                                />
                            }
                            style={pickerStyle}
                            useNativeAndroidPickerStyle={false}
                            />
                        </View>
                        {isIos && (
                            <TouchableOpacity 
                                style={StyleSheet.absoluteFillObject} 
                                activeOpacity={1} 
                                onPress={() => {
                                    if (isIos) {
                                        pickerRef.current?.togglePicker?.();
                                    }}}>  
                            </TouchableOpacity>
                        )}
                    <View>
                        <TextInput
                            style={styles.noteInput}
                            placeholder="Please input note content"
                            placeholderTextColor={Colors.textSecondary}
                            multiline
                            value={noteContent}
                            onChangeText={setNoteContent}
                            maxLength={MAX_CHAR_LIMIT}
                        />
                    </View>       
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={onSaveNote}>
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
        alignContent: 'center',
        height: 60,
    },
    dropDownPlaceholder: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    dropdownPicker: {
        fontSize: 14,
        fontWeight: 400,
        color: Colors.textPrimary,
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
        paddingVertical: 10,
        paddingLeft: 16,
        paddingRight: 50,
    },
    inputAndroid: {
        fontSize: 14,
        fontWeight: 400,
        color: Colors.textPrimary,
        paddingVertical: 16,
        paddingLeft: 16,
        paddingRight: 50,
        height: 60,
    }
})

export default CreateNoteScreen;