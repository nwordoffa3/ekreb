import React from 'react';
import { Box, Flex, Input, Text, Button } from '@chakra-ui/react';

const GameInstance = ({ scrambledWord, guess, incorrectGuesses, handleInputChange, handleSubmit, latestGuess, setLatestGuess, slideDown, nextGame, isCorrectGuess, handleStartNextGame, isCorrectLen, isAllChars, alreadySubmitted, completedGamesData, handleGameEnd }) => {
    return (
        <Box p={'4'}>
            <Flex justifyContent={''} alignItems={'center'} mb={'3'} width={'95.1vw'}>
                <Flex flex={'1'} flexBasis={'50%'} justifyContent={'center'} alignItems={'center'}>
                    {scrambledWord.split("").map((char, index) => (
                    <Box 
                    key={index} 
                    width="2.5em"
                    height={'2.5em'}  // You can adjust this width to fit your design needs
                    display="inline-block" 
                    textAlign="center"
                    borderBottom="0.2em solid"
                    pb="1"
                    mr={2}
                    >
                        <Text fontSize="1.5em" fontWeight="bold">
                            {char}
                        </Text>
                    </Box>
                    ))}
                </Flex>
                <Flex flex="1" flexBasis={'50%'} flexDirection={'column'} alignItems={'flex-start'} paddingLeft={'5%'} pr={'10%'}>
                    
                    <Flex width={'100%'} alignItems={'flex-start'}>
                        <Input 
                            flex={'1'}
                            placeholder='Guess the word...'
                            value={guess}
                            onChange={handleInputChange}
                            bgColor={nextGame ? (isCorrectGuess ? 'green.300' : 'red.300') : 'white'}
                            fontWeight={'bold'}
                        />
                        {nextGame ? (
                           completedGamesData.length < 3 ? 
                           (<Button onClick={handleStartNextGame} width={'10vw'} fontSize={'1.2vw'} ml={3}>Next Game</Button>) 
                           :(<Button onClick={handleGameEnd}>Results</Button>
                           )
                        ): (
                            <Button 
                                onClick={handleSubmit} 
                                ml={3} width={'10vw'} 
                                fontSize={'1.2vw'} 
                                isDisabled={!isCorrectLen || !isAllChars || alreadySubmitted}>
                                    Submit Guess
                                    </Button>
                        )}
                    </Flex>
                    <Box pos={'relative'}>
                        <Flex pos={'absolute'} direction="column" justifyContent='flex-start' alignItems={'flex-start'} mt={2} left={'1.5vw'} width={'30vw'}>
                            {!isCorrectLen && <Text color="red.500" fontSize={'0.7em'}>Input size is not correct!</Text>}
                            {!isAllChars && <Text color="red.500" fontSize={'0.7em'}>Input should contain only characters!</Text>}
                            {alreadySubmitted && <Text color="red.500" fontSize={'0.7em'}>You can't use a word you already used!</Text>}
                            {incorrectGuesses.map((guess, index) => (
                                <Text 
                                    animation={`${guess === latestGuess ? slideDown : ''} 0.3s ease-in-out forwards`}
                                    key={index}
                                    mb={2}
                                    onAnimationEnd={() => setLatestGuess('')}
                                    textAlign="center"
                                    fontSize={'1em'}
                                    fontWeight={'bold'}
                                >
                                    {guess}
                                </Text>
                            ))} 
                        </Flex>
                    </Box>
                </Flex>
            </Flex>

        </Box>
    );
}

export default GameInstance;