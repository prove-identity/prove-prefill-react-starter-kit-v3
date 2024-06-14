import { useTheme } from '@mui/material/styles';

const Logo = () => {
    const theme = useTheme();

    const logoSrc = theme.palette.mode === 'dark' ? '/img/proveLogo-dark.svg' : '/img/proveLogo-light.svg';

    return (
        <>
            <img className="fadeIn" src={logoSrc} alt="Prove Logo" />
        </>
    );
}

export default Logo;
