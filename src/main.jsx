import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, colors } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.grey[300]
    },
    background: {
      default: '#808080'
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
		<CssBaseline/>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
