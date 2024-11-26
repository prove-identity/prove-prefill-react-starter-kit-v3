import { CssBaseline } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeProvider';
import { LangProvider } from './contexts/LangProvider';
import './index.css';
import './tools/i18n';
import { AuthProvider } from './contexts/AuthProvider';
import { DeviceProvider } from './contexts/DeviceProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider>
    <BrowserRouter>
      <LangProvider>
        <AuthProvider>
          <DeviceProvider>
            <CssBaseline />
            <App />
          </DeviceProvider>
        </AuthProvider>
      </LangProvider>
    </BrowserRouter>
  </ThemeProvider>
);