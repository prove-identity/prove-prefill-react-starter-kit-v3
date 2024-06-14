import { Button, styled } from '@mui/material';

const ProveButton = styled(Button)(({ theme }) => ({
  width: '100%',
  alignSelf: 'flex-end',
  paddingTop: '1.2rem',
  paddingBottom: '1.2rem',
  fontSize: '1.4rem',
  borderRadius: '10px',
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300],
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400],
  },
}));

export default ProveButton;
