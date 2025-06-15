export interface Note {
    id: string;
    description: string;
    category: string;
    dateCreated: Date;
}

export enum NoteCategory {
    WorkAndStudy = 'Work and study',
    Life = 'Life',
    HealthAndWellness = 'Health and wellness'
}