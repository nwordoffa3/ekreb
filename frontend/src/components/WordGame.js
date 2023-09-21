import React, { useState } from 'react';
import {
    Button,
    Input,
    Box,
    Text,
    Flex,
    Checkbox,
    Stack,
    keyframes
} from '@chakra-ui/react';

import { FaGlasses, FaStopwatch } from 'react-icons/fa'
import GameInstance from './GameInstance';


export default function WordGame() {
    const [word, setWord] = useState('');
    const [scrambledWord, setScrambledWord] = useState('');
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [incorrectGuesses, setIncorrectGuesses] = useState([]);
    const [latestGuess, setLatestGuess] = useState('');
    const [completedGamesData, setCompletedGamesData] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);

    const [nextGame, setNextGame] = useState(false);
    const [isCorrectGuess, setIsCorrectGuess] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);
    const [gameMode, setGameMode] = useState('visible');
    const [guessLimit, setGuessLimit] = useState(5)

    const [isCorrectLen, setIsCorrectLen] = useState(true);
    const [isAllChars, setIsAllChars] = useState(true);
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);
    

    const [overallStartTime, setOverallStartTime] = useState(null);
    const [overallElapsedTime, setOverallElapsedTime] = useState(0);


    

    const slideDown = keyframes`
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
    `;

    const slideScreenDown = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(100vh);
    }
    `;


    const handleInputChange = (e) => {
        const inputVal = e.target.value

        if (inputVal != ""){
            setAlreadySubmitted(incorrectGuesses.includes(inputVal))
            setIsAllChars(/^[a-zA-Z]+$/.test(inputVal))
    
            console.log(word.length)
            setIsCorrectLen(inputVal.length === word.length)
        }
        setGuess(inputVal);
    }

    const handleGameModeChange = (mode) => {
        setGameMode(mode);
    };

    const handleSubmit = () => {
        setAttempts(prev => prev + 1);

        if (guess === word){
            setIsCorrectGuess(true);
            setNextGame(true);
            setCompletedGamesData(prev => [
                ...prev,
                    {
                        word,
                        attempts: attempts + 1,
                        incorrectGuesses
                    }
            ])
            console.log(completedGamesData.length)
        } else if (attempts >= guessLimit){
            setIsCorrectGuess(false);
            setNextGame(true);
            setGuess(word)
            setCompletedGamesData(prev => [
                ...prev,
                {
                    word,
                    attempts: attempts + 1,
                    incorrectGuesses
                }
            ]);
        } else {
            setLatestGuess(guess);
            setIncorrectGuesses(prevGuesses => [guess, ...prevGuesses]);
            setGuess('');
        }
    };

    const handleStartGame = () => {
        setGameStarted(true);
        fetchWord();
        if (gameMode === 'time'){
            setGuessLimit(100); // if you actually hit 100 guesses just log out for me
            setOverallStartTime(Date.now());
        }
    }

    const handleStartNextGame = () => {
        console.log(completedGamesData.length)
        fetchWord();
        setNextGame(false);
        setIsCorrectGuess(false);
        setAttempts(0);
        setIncorrectGuesses([]);
        setGuess('');
    }

    const handleGameEnd = () => {
        setGameEnd(true)

        if (gameMode === 'time'){
            const endTime = Date.now();
            setOverallElapsedTime((endTime - overallStartTime) / 1000);  
        }
        
    }
    const fetchWord = async () => {
        try {
            const response = await fetch('/word/visible');
            const data = await response.json();
            setWord(data.randomWord);
            setScrambledWord(data.scrambledWord);
            console.log(data.randomWord)
        } catch (error) {
            console.error("Error fetching the word:", error);
        }
    };

    return (
        <Box width={'100%'}>
            <Flex 
                direction={'column'} 
                align={'center'} 
                justify={'flex-start'} 
                height={'40vh'}
                width={'100%'}
                mb={'27vh'}>
                {gameStarted ? (
                    <GameInstance 
                        scrambledWord={scrambledWord} 
                        guess={guess} 
                        incorrectGuesses={incorrectGuesses} 
                        handleInputChange={handleInputChange} 
                        handleSubmit={handleSubmit} 
                        latestGuess={latestGuess} 
                        setLatestGuess={setLatestGuess}
                        slideDown={slideDown}
                        nextGame={nextGame}
                        isCorrectGuess={isCorrectGuess}
                        handleStartNextGame={handleStartNextGame}
                        isCorrectLen={isCorrectLen}
                        isAllChars={isAllChars}
                        alreadySubmitted={alreadySubmitted}
                        completedGamesData={completedGamesData}
                        handleGameEnd={handleGameEnd}
                    />
                ) : (
                    <>
                    <Flex alignItems={'center'} ml={'4vw'} mt={'3vh'}>
                        <Button onClick={handleStartGame} mr={5}>Start Game</Button>
                        <Stack>
                                <Checkbox 
                                    isChecked={gameMode === 'visible'}
                                    onChange={() => handleGameModeChange('visible')}
                                    _checked={{
                                        ".chakra-checkbox__control": {
                                            borderColor: "red.300",
                                            bg: "red.300"
                                        }
                                        }}>
                                    <Flex align={'center'}>
                                        <Text color={'red.300'} fontWeight={'bold'} mr={2}>
                                            Limited Guesses
                                        </Text>
                                        <FaGlasses color='#FC8181' />
                                    </Flex>
                                </Checkbox>
                            <Checkbox 
                                isChecked={gameMode === 'time'}
                                onChange={() => handleGameModeChange('time')} 
                                _checked={{
                                    ".chakra-checkbox__control": {
                                        borderColor: "teal.300",
                                        bg: "teal.300"
                                    }
                                    }}>
                                <Flex align={'center'}>
                                    <Text color={'teal.300'} fontWeight={'bold'} mr={2}>
                                        Timed
                                    </Text>
                                    <FaStopwatch color='#4FD1C5'/>
                                </Flex>
                            </Checkbox>
                        </Stack>
                    </Flex>
                    </>
                )}
            </Flex>
            {gameEnd && (
                <Box borderColor="black" borderWidth={2} p={5} ml={'25vw'}  borderRadius="lg" width={'50vw'} mt={'-15vh'} mb={'35vh'}>
                    <Text fontSize={'1.2em'} fontWeight={'bold'}>Game Stats:</Text>
                    <Text>Total guesses: {completedGamesData.reduce((acc, game) => acc + game.attempts, 0)}</Text>
                    {gameMode === 'visible' && (
                        <>
                        <Text fontWeight={'bold'}> Accuracy</Text>
                        <Flex>
                            {completedGamesData.map((game, index) => (
                                <Text key={index} ml={3}> <Text fontWeight={'bold'} mr={4}>Game {index + 1}:</Text>{((1 / (game.incorrectGuesses.length + 1)) * 100).toFixed(2)}%</Text>
                            ))}
                        </Flex>
                        </>
                    )}
                    {gameMode === 'time' && (
                        <Flex>
                            <Text mt={4}><Text fontWeight={'bold'}>Total Time:</Text> {overallElapsedTime.toFixed(2)} seconds</Text> 
                        </Flex>
                    )}
                    <Text fontSize={'1em'} mt={3} fontWeight={'bold'}>Wrong guesses per word:</Text>
                    {completedGamesData.map((game, index) => (
                        <Flex key={index} mt={2}>
                            <Text fontWeight={'bold'}>{game.word}:</Text>
                            {game.incorrectGuesses.map((guess, idx) => (
                                <Text key={idx} ml={3}>{guess}</Text>
                            
                            ))}
                        </Flex>
                    ))}
                </Box>
            )}
        </Box>
    );
}
