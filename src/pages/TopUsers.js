import React, { useState, useEffect } from 'react';
import { getUsers, getUserPosts } from '../services/api';
import { Container, Typography, CircularProgress, Avatar, Box, Grid, Card, CardContent, CardHeader } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import '../styles/global.css';

const TopUsers = () => {
    const [topUsers, setTopUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const users = await getUsers();
                const usersArray = Object.entries(users).map(([id, name]) => ({ id, name }));

                const postsData = await Promise.all(
                    usersArray.map(user => getUserPosts(user.id))
                );

                const usersWithStats = usersArray.map((user, index) => ({
                    ...user,
                    postCount: postsData[index].length,
                    likes: Math.floor(Math.random() * 5000),
                    followers: Math.floor(Math.random() * 10000),
                    avatar: `https://i.pravatar.cc/150?u=${user.id}`,
                    coverImage: `https://source.unsplash.com/800x200/?gradient,${index}`
                }));

                setTopUsers(
                    usersWithStats.sort((a, b) => b.postCount - a.postCount).slice(0, 5)
                );
                setError(null);
            } catch (err) {
                console.error('Error:', err);
                setError('Failed to load top users. Please try again later.');
            }
            setLoading(false);
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
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 2,
                    color: 'text.primary'
                }}>
                    <TrendingUpIcon sx={{ fontSize: 40 }} />
                    Top Active Users
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Our most engaged community members
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {topUsers.map((user, index) => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                        <Card className="user-card card-hover">
                            <Box 
                                sx={{ 
                                    height: 100, 
                                    backgroundImage: `url(${user.coverImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    position: 'relative'
                                }}
                            >
                                <Box 
                                    className="rank-badge"
                                    sx={{ 
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                    }}
                                >
                                    #{index + 1} Top User
                                </Box>
                            </Box>
                            <CardContent sx={{ pt: 0, pb: 2 }}>
                                <Box
                                    sx={{
                                        mt: -5,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    <Avatar
                                        src={user.avatar}
                                        sx={{ 
                                            width: 100,
                                            height: 100,
                                            border: '4px solid',
                                            borderColor: 'background.paper'
                                        }}
                                    >
                                        {user.name[0]}
                                    </Avatar>
                                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                                        {user.name}
                                    </Typography>
                                </Box>
                                <Box className="user-stats">
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" color="primary">
                                            {user.postCount}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Posts
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" color="primary">
                                            {user.likes.toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Likes
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" color="primary">
                                            {user.followers.toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Followers
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

export default TopUsers;