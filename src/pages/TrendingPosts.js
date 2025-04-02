import React, { useState, useEffect } from 'react';
import { getPosts, getPostComments } from '../services/api';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Box, Card, CardContent, CardHeader, Grid, Chip, IconButton, Tooltip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';

const TrendingPosts = () => {
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await getPosts();
                const postsArray = Object.entries(posts).map(([id, post]) => ({ id, ...post }));

                const commentsData = await Promise.all(
                    postsArray.map(post => getPostComments(post.id))
                );

                const postsWithComments = postsArray.map((post, index) => ({
                    ...post,
                    commentCount: commentsData[index].length
                }));

                setTrendingPosts(
                    postsWithComments.sort((a, b) => b.commentCount - a.commentCount).slice(0, 5)
                );
            } catch (error) {
                console.error('Error:', error);
            }
            setLoading(false);
        };

        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 2,
                    color: 'primary.main',
                    fontWeight: 'bold'
                }}>
                    <TrendingUpIcon sx={{ fontSize: 40 }} />
                    Trending Posts
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Most discussed and engaging content from our community
                </Typography>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {trendingPosts.map((post, index) => (
                        <Grid item xs={12} key={post.id}>
                            <Card 
                                elevation={3} 
                                sx={{ 
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)'
                                    }
                                }}
                            >
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography variant="h6" component="div">
                                                {post.title}
                                            </Typography>
                                            <Chip 
                                                label={`#${index + 1} Trending`} 
                                                color="primary" 
                                                size="small"
                                                sx={{ ml: 1 }}
                                            />
                                        </Box>
                                    }
                                    subheader={`Posted by ${post.userId}`}
                                />
                                <CardContent>
                                    <Typography variant="body1" paragraph>
                                        {post.body}
                                    </Typography>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: 2,
                                        mt: 2
                                    }}>
                                        <Tooltip title="Comments">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CommentIcon color="primary" />
                                                <Typography variant="body2" color="text.secondary">
                                                    {post.commentCount}
                                                </Typography>
                                            </Box>
                                        </Tooltip>
                                        <Tooltip title="Likes">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <FavoriteIcon color="error" />
                                                <Typography variant="body2" color="text.secondary">
                                                    {Math.floor(Math.random() * 1000)}
                                                </Typography>
                                            </Box>
                                        </Tooltip>
                                        <Tooltip title="Shares">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <ShareIcon color="action" />
                                                <Typography variant="body2" color="text.secondary">
                                                    {Math.floor(Math.random() * 100)}
                                                </Typography>
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default TrendingPosts;