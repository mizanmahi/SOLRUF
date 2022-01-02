import React, { useState } from 'react';
import video from '../webui/images/geographic-in.mp4';
import ReactPlayer from 'react-player';
import logo from '../webui/images/solar-pannel4.jpg';
import './video.css';
import { Modal } from 'react-bootstrap';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Video() {
   const [open, setOpen] = useState(false);

   function handleModal() {
      setOpen(!open);
   }

   return (
      <>
         <div className='sellarVideo' onClick={handleModal}>
            <img
               src={logo}
               alt=''
               style={{
                  border: '0px solid #ffba08',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  opacity: '0.7',
               }}
               width='250px'
               height='200px'
            />
            <YouTubeIcon className='youtubIcon' style={{ fontSize: '55px' }} />
         </div>

         <Modal
            show={open}
            style={{ backgroundColor: 'transparent' }}
            onHide={handleModal}
            onRequestClose={() => setOpen(false)}
         >
            <Modal.Body
               style={{
                  backgroundColor: 'black',
                  padding: '0px',
                  overflow: 'hidden',
               }}
               width='fitContent'
               height='100%'
            >
               <ReactPlayer
                  style={{ backgroundColor: 'transparent', overflow: 'hidden' }}
                  url={video}
                  width='fitContent'
                  height='auto'
                  onPlay
                  controls
               />
            </Modal.Body>
         </Modal>
      </>
   );
}

export default Video;
