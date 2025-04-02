import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Avatar, IconButton, Grid, CircularProgress } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import { getPosts, getUsers } from '../services/api';
import '../styles/global.css';

// Sample post images for development
const postImages = {
    'fish': 'https://source.unsplash.com/800x600/?fish',
    'ant': 'https://source.unsplash.com/800x600/?ant',
    'honey': 'https://source.unsplash.com/800x600/?honey',
    'elephant': 'https://source.unsplash.com/800x600/?elephant',
    'igloo': 'https://source.unsplash.com/800x600/?igloo'
};

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [postsData, usersData] = await Promise.all([
                    getPosts(),
                    getUsers()
                ]);

                // Transform posts data
                const transformedPosts = Object.entries(postsData).map(([id, post]) => ({
                    id,
                    author: usersData[post.userId] || `User ${post.userId}`,
                    title: post.title,
                    timestamp: post.timestamp,
                    avatar: `https://i.pravatar.cc/150?u=${post.userId}`
                }));

                setPosts(transformedPosts);
                setUsers(usersData);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <Typography color="error">{error}</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                {posts.map((post) => (
                    <Grid item xs={12} key={post.id}>
                        <Card 
                            sx={{ 
                                backgroundColor: '#1e1e1e',
                                borderRadius: '8px',
                                mb: 1
                            }}
                        >
                            <CardContent sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar 
                                        src={post.avatar}
                                        sx={{ width: 40, height: 40, mr: 2 }}
                                    >
                                        {post.author[0]}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 500 }}>
                                            {post.author}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                            {post.timestamp}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
                                    {post.title}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton size="small" sx={{ color: '#fff' }}>
                                            <FavoriteBorderIcon fontSize="small" />
                                        </IconButton>
                                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', ml: 1 }}>
                                            594
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton size="small" sx={{ color: '#fff' }}>
                                            <ChatBubbleOutlineIcon fontSize="small" />
                                        </IconButton>
                                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', ml: 1 }}>
                                            46
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton size="small" sx={{ color: '#fff' }}>
                                            <ShareIcon fontSize="small" />
                                        </IconButton>
                                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', ml: 1 }}>
                                            10
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Feed;