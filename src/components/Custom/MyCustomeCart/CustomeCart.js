import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea, IconButton } from '@mui/material';
import Portfoliocart from '../../../media/Portfoliocart.png'
import {  Box, styled } from '@mui/system';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

const ButtonBox = styled(Box)(({ theme }) => {
    return {
       display: 'flex',
       justifyContent: 'space-around',
       alignItems: 'center',
       margin : '14px 0px'
    };
 });

const truncate = (str, max = 10) => {
  const array = str.trim().split(' ');
  const ellipsis = array.length > max ? '...' : '';
  return array.slice(0, max).join(' ') + ellipsis;
};

const CustomeCart = () => {

    const [pin,setPin] = React.useState(false)

    return (
        <React.Fragment>
            <Card sx={{ maxWidth: 345,borderRadius : '18px',boxShadow: '0 4px 8px 1.5px rgba(0,0,0,0.2)',margin:'4px'}}>
            <CardActionArea disableTouchRipple>
                <CardMedia
                component="img"
                height="250"
                image={Portfoliocart}
                alt="cart"
                className='img-fluid'
                />
                <CardContent sx={{py:0,pl:2.6}}>
                <Typography sx={{mt:0.9,display:'flex',justifyContent:'space-between'}}>
                    <span style={{
                        background: '#3FB500',
                            borderRadius : '5px',
                            padding: '2.4px 12px',
                            color : '#FFFFFF',
                            fontFamily : 'Inter',
                            fontSize : '16px',
                            fontWeight : '500',
                            height:'30px'
                        }}>
                        Commercial
                    </span>
                    <IconButton size='small' onClick={() => setPin(!pin)}>
                        {pin ? 
                        <PushPinIcon sx={{color : 'black'}} />
                        :
                        <PushPinOutlinedIcon />
                        }
                    </IconButton>
                </Typography>
                <Typography sx={{mt:1.7,color : '#000000',fontWeight : '700',fontSize : '22px',lineHeight:'26px'}}>
                    {truncate('LG Affordable Home Appliance Survey',4)}
                </Typography>

                <Typography sx={{mt:1.5,color : '#000000',fontWeight : '500',fontSize : '16px'}}>
                    Mumbai • 15kw
                </Typography>

                </CardContent>
            </CardActionArea>
            {/* <CardActions> */}
                <ButtonBox>

                <PrimaryButton
                  sx={{
                    px: 3.5,
                    py: 0.5,
                    background: "transparent",
                    border: "3px solid #4D4D4D",
                    borderRadius: "8px",
                    "&:hover": {
                      border: "3px solid transparent",
                    },
                  }}
                >
                  Edit
                </PrimaryButton>

                <PrimaryButton
                  sx={{
                    px: 3.5,
                    py: 0.5,
                    background: "transparent",
                    border: "3px solid #F20519",
                    color: '#F20519',
                    borderRadius: "8px",
                    "&:hover": {
                      border: "3px solid transparent",
                      background: '#F20519',
                      color: '#ffffff',
                    },
                  }}
                >
                  Delete
                </PrimaryButton>

                </ButtonBox>
            {/* </CardActions> */}
            </Card>
        </React.Fragment>
    )
}

export default CustomeCart;