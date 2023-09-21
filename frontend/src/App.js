import React, { useRef, useState } from 'react';
import { Button, ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import theme from './theme';

export default function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const startGame = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsStarted(true);
      }).catch(error => {
        console.error("Audio play failed:", error);
      });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isPlaying;
      setIsPlaying(!isPlaying);
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <audio ref={audioRef} loop>
        <source src="/8bit-stock.mp3" type='audio/mp3'/>
        Your browser does not support the audio Element
      </audio>
      {!isStarted ? (
        <Button onClick={startGame} mt={4} ml={4}>
          music? 
        </Button>
      ) : (
        <Button onClick={toggleMute} mt={4} ml={4}>  
          {!isPlaying ? "unmute" : "mute"}
        </Button>
      )}
      <Home/>
    </ChakraProvider>
  )
}
