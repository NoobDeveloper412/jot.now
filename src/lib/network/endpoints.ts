interface Endpoint<T> {
	url: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	requestType?: T;
}

interface RegisterRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface LoginRequest {
	email: string;
	password: string;
}

interface ForgotPasswordRequest {
	email: string;
}

interface ResetPasswordRequest {
	resetToken: string;
	newPassword: string;
}

interface CreateFolderRequest {
	folderName: string;
	icon?: string;
}

interface UpdateFolderRequest {
	folderName?: string;
	icon?: string;
}

interface AddVideoNoteRequest {
	name: string;
	videoLink: string;
	thumbnail?: string;
}

interface UpdateVideoNoteRequest {
	name?: string;
	videoLink?: string;
	thumbnail?: string;
}

interface AddJotRequest {
	timestamp: string;
	title: string;
	description?: string;
}

interface UpdateJotRequest {
	timestamp?: string;
	title?: string;
	description?: string;
}

// Dictionary Endpoints
const dictionaryEndpoints = {
	createDictionary: {
		url: '/api/dictionary/:userId',
		method: 'POST' // Create a new dictionary
	},
	getDictionaries: {
		url: '/api/dictionary/:userId',
		method: 'GET' // Get all dictionaries for a user
	},
	getDictionaryById: {
		url: '/api/dictionary/:dictionaryId',
		method: 'GET' // Get a single dictionary by ID
	},
	updateDictionary: {
		url: '/api/dictionary/:userId/:dictionaryId',
		method: 'PUT' // Update a dictionary by ID
	},
	deleteDictionary: {
		url: '/api/dictionary/:dictionaryId',
		method: 'DELETE' // Delete a dictionary by ID
	}
};

// Collection Endpoints
const collectionEndpoints = {
	addCollection: {
		url: '/api/dictionary/:dictionaryId/collections',
		method: 'POST' // Add a collection to a dictionary
	},
	updateCollection: {
		url: '/api/collections/:collectionId',
		method: 'PUT' // Update a collection by ID
	},
	deleteCollection: {
		url: '/api/collections/:collectionId',
		method: 'DELETE' // Delete a collection by ID
	}
};

// Word Endpoints
const wordEndpoints = {
	addWord: {
		url: '/api/dictionary/:dictionaryId/words',
		method: 'POST' // Add a word to a dictionary
	},
	updateWord: {
		url: '/api/words/:wordId',
		method: 'PUT' // Update a word by ID
	},
	deleteWord: {
		url: '/api/words/:wordId',
		method: 'DELETE' // Delete a word by ID
	}
};

// Define the URL map
export const urlMap: Record<string, Endpoint<unknown>> = {
	// Auth Endpoints
	register: {
		url: '/auth/register',
		method: 'POST',
		requestType: {} as RegisterRequest
	},
	login: {
		url: '/auth/login',
		method: 'POST',
		requestType: {} as LoginRequest
	},
	forgotPassword: {
		url: '/auth/forgot-password',
		method: 'POST',
		requestType: {} as ForgotPasswordRequest
	},
	resetPassword: {
		url: '/auth/reset-password',
		method: 'POST',
		requestType: {} as ResetPasswordRequest
	},

	getLibrary: {
		url: '/api/library/:userId',
		method: 'GET'
	},
	createFolder: {
		url: '/api/library/:userId/folders',
		method: 'POST',
		requestType: {} as CreateFolderRequest
	},
	getFolders: {
		url: '/api/library/:userId/folders',
		method: 'GET'
	},
	getFolderById: {
		url: '/api/library/:userId/folders/:folderId',
		method: 'POST'
	},
	updateFolder: {
		url: '/api/library/folders/:folderId',
		method: 'PUT',
		requestType: {} as UpdateFolderRequest
	},
	deleteFolder: {
		url: '/api/library/folders/:folderId',
		method: 'DELETE'
	},
	addVideoNote: {
		url: '/api/library/folders/:folderId/notes',
		method: 'POST',
		requestType: {} as AddVideoNoteRequest
	},
	updateVideoNote: {
		url: '/api/library/notes/:noteId',
		method: 'PUT',
		requestType: {} as UpdateVideoNoteRequest
	},
	deleteVideoNote: {
		url: '/api/library/notes/:noteId',
		method: 'DELETE'
	},
	addVideoJot: {
		url: '/api/library/notes/:noteId/jots',
		method: 'POST',
		requestType: {} as AddJotRequest
	},
	updateJot: {
		url: '/api/library/jots/:jotId',
		method: 'PUT',
		requestType: {} as UpdateJotRequest
	},
	deleteJot: {
		url: '/api/library/jots/:jotId',
		method: 'DELETE'
	},
	...dictionaryEndpoints
};
