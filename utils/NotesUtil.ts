import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, NoteCategory } from '../constants/types';


const STORAGE_KEY = '@notes_list';

export const createNote = async ( note: Note): Promise<boolean> => {
    try {
        const existingNotes = await getAllNotes();
        const updatedNotes = [...existingNotes, note];
        const noteJsonVal = JSON.stringify(updatedNotes);
        await AsyncStorage.setItem(STORAGE_KEY, noteJsonVal);
        return true;
    } catch (err) {
        console.log(`=== ~ createNote ~ err:`, err);
        return false;
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
        await AsyncStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (err) {
        console.log(`=== ~ deleteAllNotes ~ err:`, err)
        return false;
    }
}

export const getLatestNotesByCategory = ( notes: Note[], filterLatest?: boolean ): {
  category: NoteCategory;
  data: Note[];
}[] => {
    const grouped: Record<NoteCategory, Note[]> = Object.values(NoteCategory).reduce((acc, category) => {
        acc[category] = [];
        return acc;
    }, {} as Record<NoteCategory, Note[]>);
  

  // Group notes
  notes.forEach((note: Note) => {
    // if (grouped[note.category]) {
      grouped[note.category].push(note);
    // }
  });

  if(filterLatest) {
    // Sort and take latest 3 per category
    return Object.entries(grouped).map(([category, notes]) => ({
        category: category as NoteCategory,
        data: notes
        .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
        .slice(0, 3),
    }));
  }

  return Object.entries(grouped).map(([category, notes]) => ({
    category: category as NoteCategory,
    data: notes
      .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
  }));
}
