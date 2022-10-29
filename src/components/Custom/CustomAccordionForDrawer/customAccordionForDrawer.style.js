import { Box, styled } from "@mui/system";

export const NoteBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "start",
    '& p': {
        fontSize: "1rem",
        fontWeight: 500,
        color: theme.palette.primary.dark,
    },
    '& span': {
        fontSize: "0.8rem",
        color: '#fff',
        background: theme.palette.primary.dark,
        height: "1.5rem",
        width: "1.5rem",
        fontWeight: "bold",
        marginRight: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        flexShrink: 0,

    }
}));