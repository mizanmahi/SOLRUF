import { Box, styled } from "@mui/system";

export const ProductCardWrapper = styled(Box)(({ theme, exclusive }) => ({
  background: '#ffffff',
  border: exclusive ? `3px solid ${theme.palette.primary.main}` : '1px solid #E5E5E5',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1.5),
  cursor: "pointer",
  position: "relative",
  maxWidth: "350px",
  width: "100%",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
}));

export const ButtonBox = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
});

export const NameBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
