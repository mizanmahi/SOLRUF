export const modalTopBackButtonStyle = { 
    width: '100%', 
    p: 1, 
    color: 'black', 
    bgcolor: '#D0D7D9', 
    textAlign: 'start', 
    fontWeight: 'bold', 
    display: `${window.innerWidth < 600 ? 'flex' : 'none'}`, 
    columnGap: 1, 
    cursor: 'pointer', 
    position: 'sticky', 
    top: '0' ,
    zIndex:100,
    alignItems:'center'
}