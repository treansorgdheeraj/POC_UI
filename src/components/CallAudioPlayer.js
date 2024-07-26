import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, List, ListItem, Typography, Slider, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

const CallAudioPlayer = ({ filteredData }) => {
  const [selectedCall, setSelectedCall] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleSelectCall = (callId) => {
    setSelectedCall(callId);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const updateTime = () => setCurrentTime(audio.currentTime);
      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadeddata', setAudioData);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadeddata', setAudioData);
      };
    }
  }, [selectedCall]);

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleSliderChange = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  return (
    <Box sx={{ marginBottom: '20px', padding: '20px', backgroundColor: '#ffecd1', borderRadius: '8px', boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ marginBottom: '10px', color: '#e74c3c' }}>Call Recordings</Typography>
      <List sx={{ width: '75%', marginBottom: '20px' }}>
        {filteredData.map((call, index) => (
          <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>{call['Call ID']}</Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#e74c3c', color: '#fff' }}
              onClick={() => handleSelectCall(call['Call ID'])}
            >
              Select
            </Button>
          </ListItem>
        ))}
      </List>
      {selectedCall && (
        <Box sx={{ padding: '10px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: 3, width: '75%' }}>
          <Typography variant="subtitle1" sx={{ color: '#e74c3c', marginBottom: '10px' }}>Playing Call: {selectedCall}</Typography>
          <audio ref={audioRef} controls src={`/call_recording/${selectedCall}.mp3`} style={{ display: 'none' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
            <IconButton onClick={handlePlayPause} sx={{ color: '#e74c3c' }}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={handleStop} sx={{ color: '#e74c3c' }}>
              <StopIcon />
            </IconButton>
          </Box>
          <Slider
            value={currentTime}
            max={duration}
            onChange={handleSliderChange}
            sx={{ color: '#e74c3c', marginTop: '10px' }}
          />
          <Typography variant="body2" sx={{ color: '#e74c3c', textAlign: 'center' }}>
            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CallAudioPlayer;
