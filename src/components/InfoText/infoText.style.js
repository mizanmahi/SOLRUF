import { Box, styled } from "@mui/material";

export const Wrapper = styled(Box)((props) => {
    console.log(props)
    return ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 1,
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        width: '100%',
        margin: '0 auto',
        background: 'rgba(13,202,240, 0.08)',
        marginBottom: '0.5rem',
    })
})