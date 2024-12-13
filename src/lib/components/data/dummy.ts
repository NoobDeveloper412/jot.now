import type { Dictionary } from '@/types/dictionary';

export const dummyDictionaries: Dictionary[] = [
	{
		id: 1,
		label: 'Khmer - English',
		collections: [
			{
				id: 1,
				label: 'Khmer 101 Collection',
				folders: [
					{
						id: 1,
						label: 'Folder 1',
						notes: [
							{
								id: 1,
								label: 'Note 1',
								jots: [
									{ id: 1, label: 'jotted something' },
									{ id: 2, label: 'jotted another thing' },
									{ id: 3, label: 'jotted a third thing' }
								],
								type: 'text'
							},
							{
								id: 2,
								label: 'Video Note 1',
								jots: [
									{ id: 1, label: 'jotted something', time: '0:42' },
									{ id: 2, label: 'jotted another thing', time: '2:19' },
									{ id: 3, label: 'jotted a third thing', time: '4:67' }
								],
								type: 'video'
							}
						]
					},
					{
						id: 2,
						label: 'Folder 2',
						notes: [
							{
								id: 1,
								label: 'Note 1',
								jots: [
									{ id: 1, label: 'basic Khmer vocab' },
									{ id: 2, label: 'common phrases' },
									{ id: 3, label: 'Khmer greetings' }
								],
								type: 'text'
							}
						]
					}
				]
			},
			{
				id: 2,
				label: 'Khmer Year 1',
				folders: [
					{
						id: 1,
						label: 'Audio Practice',
						notes: [
							{
								id: 1,
								label: 'Lesson 1',
								jots: [
									{ id: 1, label: 'listening practice 1', time: '0:20' },
									{ id: 2, label: 'listening practice 2', time: '1:45' }
								],
								type: 'audio'
							}
						]
					}
				]
			}
		]
	},
	{
		id: 2,
		label: 'English - Spanish',
		collections: [
			{
				id: 1,
				label: 'Spanish Basics',
				folders: [
					{
						id: 1,
						label: 'Beginner Words',
						notes: [
							{
								id: 1,
								label: 'Vocabulary 1',
								jots: [
									{ id: 1, label: 'Hello - Hola' },
									{ id: 2, label: 'Goodbye - Adiós' },
									{ id: 3, label: 'Please - Por favor' }
								],
								type: 'text'
							}
						]
					}
				]
			},
			{
				id: 2,
				label: 'Spanish Conversations',
				folders: [
					{
						id: 1,
						label: 'Daily Conversations',
						notes: [
							{
								id: 1,
								label: 'Note 1',
								jots: [
									{ id: 1, label: 'Ordering food' },
									{ id: 2, label: 'Asking for directions' }
								],
								type: 'text'
							}
						]
					}
				]
			}
		]
	},
	{
		id: 3,
		label: 'French - English',
		collections: [
			{
				id: 1,
				label: 'French Grammar',
				folders: [
					{
						id: 1,
						label: 'Verb Conjugations',
						notes: [
							{
								id: 1,
								label: 'Note 1',
								jots: [
									{ id: 1, label: 'être - to be' },
									{ id: 2, label: 'avoir - to have' },
									{ id: 3, label: 'aller - to go' }
								],
								type: 'text'
							}
						]
					}
				]
			}
		]
	}
];
