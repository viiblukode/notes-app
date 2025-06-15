export interface Note {
    id: string;
    description: string;
    category: NoteCategory;
    dateCreated: string;
}

export enum NoteCategory {
    WorkAndStudy = 'Work and study',
    Life = 'Life',
    HealthAndWellness = 'Health and wellness'
}