import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, NoteCategory } from '../constants/types';


const STORAGE_KEY = '@notes_list';
let notesCache: Note[] | null = null;

export const createNote = async ( note: Note): Promise<boolean> => {
    try {
        const existingNotes = await getAllNotes();
        const updatedNotes = [...existingNotes, note];
        const noteJsonVal = JSON.stringify(updatedNotes);
        //save to asyncStorage
        await AsyncStorage.setItem(STORAGE_KEY, noteJsonVal);
        //updateCache when have new Note created 
        notesCache = updatedNotes;
        return true;
    } catch (err) {
        console.log(`=== ~ createNote ~ err:`, err);
        return false;
    }
}

export const getAllNotes = async (): Promise<Note[]> => {
    //check if cache is empty 
    if (notesCache) {
        console.log(`=== ~ getAllNotes ~ notesCache: Have cached data, returning cached data`, )
        return notesCache;
    }

    //if no cache data then query and store to cache
    try {
        const notesData = await AsyncStorage.getItem(STORAGE_KEY);
        const notes = notesData != null ? JSON.parse(notesData) : []; // set empty array if no data
        notesCache = notes  
        return notes;
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

export const clearCache = () => {
    console.log(`=== ~ clearCache ~ clearCache: clearing out cache data...`);
    notesCache = null;
    return true;
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
    if(grouped[note.category]) {
        grouped[note.category].push(note);
    }
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

  //return all notes by categories, sorted by lastCreated DESC 
  return Object.entries(grouped).map(([category, notes]) => ({
    category: category as NoteCategory,
    data: notes
      .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
  }));
}
