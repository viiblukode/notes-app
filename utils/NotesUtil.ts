import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../constants/types';


const STORAGE_KEY = '@notes_list';

export const createNote = async ( note: Note): Promise<void> => {
    try {
        const noteJsonVal = JSON.stringify(note);
        await AsyncStorage.setItem(STORAGE_KEY, noteJsonVal);
    } catch (err) {
        console.log(`=== ~ createNote ~ err:`, err)
    }
}

export const getAllNotes = async (): Promise<Note[]> => {
    try {
        const notesData = await AsyncStorage.getItem(STORAGE_KEY);
        return notesData != null ? JSON.parse(notesData) : [];  //return empty array if got no data
    } catch (err) {
        console.log(`=== ~ getNotes ~ err:`, err);
        return [];
    }
}

export const getNotesByCategory = async (category: string): Promise<Note[]> => {
    const allNotes = await getAllNotes();
    return allNotes.filter((note: Note) => note.category === category);
}

export const deleteAllNotes = async (): Promise<boolean>=> {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, '');
        return true;
    } catch (err) {
        console.log(`=== ~ deleteAllNotes ~ err:`, err)
        return false;
    }
}