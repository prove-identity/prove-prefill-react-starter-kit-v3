import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useCustomTheme } from '../../contexts/ThemeProvider';

const ThemeToggle = () => {
    const { toggleTheme, mode } = useCustomTheme();
    return (
      <IconButton onClick={toggleTheme}>
        {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    );
  };

export default ThemeToggle;