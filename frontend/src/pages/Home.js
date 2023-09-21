import React from 'react'
import {
    Image, 
    Box,
    Text,
} from '@chakra-ui/react';

import { keyframes } from '@emotion/react';


import WordGame from '../components/WordGame';
import logo from '../assets/logo.png'

export default function Home() {
    const move = keyframes`
        0% { transform: translate(0, 0); }
        50% { transform: translate(-8px, 4px); }
        100% { transform: translate(0, 0);  }
    `;

  return (
    <Box>
        <Box animation={`${move} 4s infinite ease-in-out`}>
            <Image
                src={logo}
                width={'25vw'}
                mt={'0vh'}
                ml={'37.5vw'}
                pos={'relative'}/>
            </Box>
      <WordGame/>
      <Box 
            p={5}
            borderColor="black" borderWidth={2} 
            ml={'6em'} 
            width={'50vw'}
            borderRadius="lg" 
            boxShadow="lg"
            mt={'-8em'}
            mb={'6em'}
            pos={'relative'}
        >
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                How to Play
            </Text>
            <Text mb={2}>
                Welcome to ekreb, where your word-guessing skills are put to the test. Choose a mode and dive into the challenge of unscrambling 3 mysterious words. But with a twist of course.
            </Text>
            <Text fontWeight="bold" mb={2}>
                Modes:
            </Text>
            <Text>
                - <Text as="span" fontWeight="bold" color="red.300">Limited Guessses:</Text> The words are all jumbled up, but hold on! A letter is missing because it had to go fill out it's taxes but it got lost! The rest of the letters are terrified, so it's up to you and your detective skills to find the missing letter.
            </Text>
            <Text mb={2}>
                - <Text as="span" fontWeight="bold" color="teal.300">Timed:</Text> Tick-tock, tick-tock! The clock is ticking. You only have so much time to find the lost letter. It'll be embarrasing if I find it before you (no seriously I can't find it)
            </Text>
            <Text>
                You only get <Text as="span" fontWeight="bold">6 guesses</Text> for Limited Visibility, so make them count. And in Timed <Text as="span" fontWeight="bold">every second</Text> counts. Good luck soldier.
            </Text>
        </Box>
    </Box>
  )
}
