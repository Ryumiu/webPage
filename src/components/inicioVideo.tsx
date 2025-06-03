import React from 'react';
import './inicioVideo.css';

const inicioVideo: React.FC = () => {
  return (
    <div id="inicio" className="inicio-container">
      <div className="inicio-content">
        <div className="video-container">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="inicio-video"
          >
            <source src="/src/assets/dogs.mp4" type="video/mp4" />
          </video>
        </div>
        </div>
        </div>
  );
};


export default inicioVideo;