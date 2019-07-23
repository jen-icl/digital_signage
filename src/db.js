const db = {
    'Irvine': {
        'name': 'Irvine, CA',
        'Lobby (Room)': {
            'Default (Board)': {
                'Welcome (Panel)': {
                    'type': 'text',
                    'title': 'Welcome to Escape Room Irvine',
                    'content': 'Two Rooms, Two Challenges. Enjoy the fun!',
                    'background-img': 'url'
                },
                'Activity List (Panel)': {
                    'type': 'list',
                    '1': {
                        'title': 'Back to the Future',
                        'image': 'url'
                    },
                    '2': {
                        'title': 'Jail Break',
                        'image': 'url'
                    }
                }
            },
            'Welcome Company (Board)': {
                'Welcome (Panel)': {
                    'type': 'text',
                    'title': 'Welcome (Company) to Escape Room',
                    'content': 'Two Rooms, Two Challenges. Enjoy the fun!',
                    'background-img': 'url'
                },
                'Back to the Future (Panel)': {
                    'type': 'activity',
                    'title': 'Back to the Future',
                    'desc': 'Travel through time to experience...',
                    'video': 'vid-url',
                    'image': 'url'
                },
                'Jail Break (Panel)': {
                    'type': 'activity',
                    'title': 'Jail Break',
                    'desc': 'Escape the bars...',
                    'video': 'vid-url',
                    'image': 'url'
                }
            }
        },
        'Classroom (Room)': {
            'Default (Board)': {
                'Activity List Panel': {
                    'type': 'list',
                    '1': {
                        'title': 'Back to the Future',
                        'image': 'url'
                    },
                    '2': {
                        'title': 'Jail Break',
                        'image': 'url'
                    }
                },
                'Back to the Future (Panel)': {
                    'type': 'activity',
                    'title': 'Back to the Future',
                    'desc': 'Travel through time to experience...',
                    'video': 'vid-url',
                    'image': 'url'
                },
                'Jail Break (Panel)': {
                    'type': 'activity',
                    'title': 'Jail Break',
                    'desc': 'Escape the bars...',
                    'video': 'vid-url',
                    'image': 'url'
                }
            }
        }
    },
    'Reno': {
        'name': 'Reno, CA',
        'Lobby (Room)': {
            'Default (Board)': {
                'Welcome (Panel)': {
                    'type': 'text',
                    'title': 'Welcome to Escape Room Reno',
                    'content': 'Three Rooms, Three Challenges. Enjoy the fun!',
                    'background-img': 'url'
                },
                'Activity List (Panel)': {
                    'type': 'list',
                    '1': {
                        'title': 'Back to the Future',
                        'image': 'url'
                    },
                    '2': {
                        'title': 'Jail Break',
                        'image': 'url'
                    }
                }
            },
            'Welcome Company (Board)': {
                'Welcome (Panel)': {
                    'type': 'text',
                    'title': 'Welcome to Escape Room',
                    'content': 'Two Rooms, Two Challenges. Enjoy the fun!',
                    'background-img': 'url'
                },
                'Back to the Future (Panel)': {
                    'type': 'activity',
                    'title': 'Back to the Future',
                    'desc': 'Travel through time to experience...',
                    'video': 'vid-url',
                    'image': 'url'
                },
                'Jail Break (Panel)': {
                    'type': 'activity',
                    'title': 'Jail Break',
                    'desc': 'Escape the bars...',
                    'video': 'vid-url',
                    'image': 'url'
                }
            }
        },
        'Classroom (Room)': {
            'Default (Board)': {
                'Activity List Panel': {
                    'type': 'list',
                    '1': {
                        'title': 'Back to the Future',
                        'image': 'url'
                    },
                    '2': {
                        'title': 'Jail Break',
                        'image': 'url'
                    }
                },
                'Back to the Future (Panel)': {
                    'type': 'activity',
                    'title': 'Back to the Future',
                    'desc': 'Travel through time to experience...',
                    'video': 'vid-url',
                    'image': 'url'
                },
                'Jail Break (Panel)': {
                    'type': 'activity',
                    'title': 'Jail Break',
                    'desc': 'Escape the bars...',
                    'video': 'vid-url',
                    'image': 'url'
                }
            }
        }
    }
}

export default db;
