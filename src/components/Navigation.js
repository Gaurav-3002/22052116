import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';

const Navigation = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const getTabValue = () => {
        switch (currentPath) {
            case '/':
                return 0;
            case '/top-users':
                return 1;
            case '/trending':
                return 2;
            default:
                return 0;
        }
    };

    return (
        <Box sx={{ 
            width: '100%', 
            bgcolor: '#1e1e1e',
            borderBottom: 1,
            borderColor: 'divider'
        }}>
            <Tabs 
                value={getTabValue()} 
                textColor="inherit"
                sx={{
                    '& .MuiTab-root': {
                        color: '#ffffff',
                        '&.Mui-selected': {
                            color: '#2196f3'
                        }
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#2196f3'
                    }
                }}
            >
                <Tab label="FEED" component={Link} to="/" />
                <Tab label="TOP USERS" component={Link} to="/top-users" />
                <Tab label="TRENDING POSTS" component={Link} to="/trending" />
            </Tabs>
        </Box>
    );
};

export default Navigation; 