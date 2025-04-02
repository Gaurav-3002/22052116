import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Feed from './pages/Feed';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';
import Navigation from './components/Navigation';
import './styles/global.css';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <div style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Feed />} />
                        <Route path="/top-users" element={<TopUsers />} />
                        <Route path="/trending" element={<TrendingPosts />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;