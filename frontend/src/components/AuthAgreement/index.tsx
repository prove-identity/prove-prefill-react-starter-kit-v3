import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AuthAgreement = () => {
    const { t } = useTranslation();

    return (
        <Box display="flex" alignItems="center">
            <Typography fontSize="1.2rem">
                {t('authAgreement.termsAndConditions1')}
                <Button 
                    color="primary" 
                    variant="text" 
                    href="https://www.prove.com/legal/overview#End-User-Terms-Conditions" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                        padding: 0,
                        minWidth: 'auto', 
                        lineHeight: 'inherit',
                        verticalAlign: 'baseline'
                    }}
                >
                    {t('authAgreement.termsAndConditions2')}
                </Button>
            </Typography>
        </Box>
    );
}

export default AuthAgreement;
