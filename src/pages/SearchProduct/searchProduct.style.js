import { Box, styled } from '@mui/system';

export const SearchProductWrapper = styled('div')(({ theme }) => ({
   // background: theme.palette.primary.light,
   // padding: theme.spacing(2),
   borderRadius: theme.shape.borderRadius,
   // marginTop: theme.spacing(6),
   minHeight:'calc(100vh - 0)'
}));

export const Nav = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: theme.spacing(1),
}));

export const SearchArea = styled('div')(({ theme }) => ({
   marginTop: theme.spacing(2),
}));

export const FilterArea = styled('div')(({ theme }) => ({
   background: '#f3f3f3',
   padding: theme.spacing(3),
   borderRadius: theme.shape.borderRadius,
   overflowY: 'auto',
   height: 'calc(100vh - 400px)',
}));

export const ProductArea = styled('div')(({ theme }) => ({
   borderRadius: theme.shape.borderRadius,
   overflowY: 'auto',
   maxHeight: { sm: 'calc(100vh - 400px)' },
}));

export const NoResultBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '100%',
   minHeight: '300px',
   p: {
      fontSize: '1.8rem',
      color: '#828282',
   },
}));
