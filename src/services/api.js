const BASE_URL = 'http://20.244.56.144/evaluation-service';

// Cache for storing API responses
const cache = {
  users: null,
  userPosts: {},
  postComments: {},
  lastFetch: {}
};

// Cache duration in milliseconds (5 seconds)
const CACHE_DURATION = 5000;

// Helper function to check if cache is valid
const isCacheValid = (key) => {
  const lastFetch = cache.lastFetch[key];
  return lastFetch && (Date.now() - lastFetch < CACHE_DURATION);
};

// Helper function to update cache
const updateCache = (key, data) => {
  cache[key] = data;
  cache.lastFetch[key] = Date.now();
};

// Mock data for development
const mockUsers = {
    '1': 'Jack Anderson',
    '2': 'Rachel Young',
    '3': 'Paul Walker',
    '4': 'Edward Davis',
    '5': 'George Wilson'
};

const mockPosts = {
    '1': {
        userId: '1',
        title: 'Post about fish',
        body: 'This is a post about fish',
        timestamp: '4/2/2025, 7:58:35 PM'
    },
    '2': {
        userId: '2',
        title: 'Post about ant',
        body: 'This is a post about ant',
        timestamp: '4/2/2025, 7:54:38 PM'
    },
    '3': {
        userId: '3',
        title: 'Post about honey',
        body: 'This is a post about honey',
        timestamp: '4/2/2025, 7:43:20 PM'
    },
    '4': {
        userId: '4',
        title: 'Post about elephant',
        body: 'This is a post about elephant',
        timestamp: '4/2/2025, 7:42:21 PM'
    },
    '5': {
        userId: '5',
        title: 'Post about igloo',
        body: 'This is a post about igloo',
        timestamp: '4/2/2025, 7:37:21 PM'
    }
};

const mockComments = {
    '1': [
        { id: 1, text: 'Great post!', userId: '2' },
        { id: 2, text: 'Interesting!', userId: '3' }
    ],
    '2': [
        { id: 3, text: 'Nice!', userId: '4' }
    ]
};

// Use mock data in development, real API in production
const USE_MOCK_DATA = true;

export const getUsers = () => {
    return Promise.resolve(mockUsers);
};

export const getPosts = () => {
    return Promise.resolve(mockPosts);
};

export const getUserPosts = (userId) => {
    const userPosts = Object.entries(mockPosts)
        .filter(([_, post]) => post.userId === userId)
        .map(([id, post]) => ({ id, ...post }));
    return Promise.resolve(userPosts);
};

export const getPostComments = (postId) => {
    return Promise.resolve(mockComments[postId] || []);
};