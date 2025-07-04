import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import { PRIMARY_BLACK } from '@styles/colors';

export const AddressInput = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto'
  }
}));

export const AddressIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  zIndex: '100',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const StyledAddressInputBase = styled(InputBase)(({ theme }) => ({
  color: PRIMARY_BLACK,
  backgroundColor: '#fff',
  width: '100%',
  border: `1px solid ${alpha(theme.palette.common.black, 0.23)}`,
  borderRadius: theme.shape.borderRadius,

  '& .MuiInputBase-input': {
    paddingLeft: '35px',
    lineHeight: '1',
    '&:focus': {
      borderColor: theme.palette.primary.main
    }
  }
}));
