import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLang, SupportedLangs } from '../../contexts/LangProvider';

const LangToggle = () => {
    const { changeLang } = useLang();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: React.MouseEvent<any>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (lang?: SupportedLangs) => {
        if (lang) {
            changeLang(lang);
        }
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <LanguageIcon />
            </IconButton>
            <Menu
                id="language-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleClose()}
            >
                <MenuItem onClick={() => handleClose('en')}>English</MenuItem>
                <MenuItem onClick={() => handleClose('es')}>Español</MenuItem>
            </Menu>
        </>
    );
};

export default LangToggle;
