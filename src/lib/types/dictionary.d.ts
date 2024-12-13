export interface Jot {
	id: number;
	label: string;
	time?: string;
}

export interface Note {
	id: number;
	label: string;
	jots: Jot[];
	type: 'text' | 'video' | 'audio';
}

export interface Folder {
	id: number;
	label: string;
	notes: Note[];
}

export interface Collection {
	id: number;
	label: string;
	folders: Folder[];
}

export interface Dictionary {
	id: number;
	label: string;
	collections: Collection[];
}
