import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// Background Video URL
const BACKGROUND_VIDEO_URL = '/2023_09_24_22_20_IMG_2541.MOV';

// Radio stream URL
const RADIO_STREAM_URL = 'https://2.mystreaming.net/uber/bollywoodlove/icecast.audio';

// Styled Components
const AppWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background: black;
  overflow: hidden;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100vh;
  transform: translate(-50%, -50%);
  object-fit: contain;
  background: black;
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    background: #d3d3d3;
  }
`;

const VolumeSlider = styled.input`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  cursor: pointer;
`;

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume at 50%
  const audioRef = useRef(new Audio(RADIO_STREAM_URL));

  const handlePlay = () => {
    const audio = audioRef.current;
    audio.volume = volume;
    audio.play();
    setIsPlaying(true);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      audio.pause();
    };
  }, []);

  return (
    <AppWrapper>
      <BackgroundVideo
        src={BACKGROUND_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
      />
      {!isPlaying && (
        <PlayButton onClick={handlePlay}>Play Radio</PlayButton>
      )}
      {isPlaying && (
        <VolumeSlider
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      )}
    </AppWrapper>
  );
}

export default App;
