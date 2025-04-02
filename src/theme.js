import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2196f3',
        },
        background: {
            default: '#000000',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                },
            },
        },
    },
});

export default theme; 