export interface Example {
	source: string;
	phonetics?: string;
	target: string;
}

export interface Definition {
	sourceDefinition: string;
	targetDefinition: string;
	examples?: Example[];
}

export interface DefinitionGroup {
	partOfSpeech: string;
	definitions: Definition[];
}

export interface Word {
	id: number;
	sourceWord: string;
	phonetics?: string;
	targetWord: string;
	level?: number;
	rootWord?: string;
	definitionsGroups?: DefinitionGroup[];
	audio?: string;
	image?: string;
}

export interface Folder {
	id: number;
	title: string;
	subtitle?: string;
	icon?: string;
	folderInfo?: string;
	words?: Word[];
	subfolders?: Folder[];
}

export interface Dictionary {
	id: number;
	label: string;
	sourceLanguage: string;
	sourcePhonetics?: string;
	targetLanguage: string;
	folders: Folder[];
	thumbnail?: string;
}
