const levelOneText = `Buck did not read the newspapers, or he would have known that trouble was brewing, not alone for himself, but for every tidewater dog, strong of muscle and with warm, long hair, from Puget Sound to San Diego. Because men, groping in the Arctic darkness, had found a yellow metal, and because steamship and transportation companies were booming the find, thousands of men were rushing into the Northland. These men wanted dogs, and the dogs they furry coats to protect them from the frost.`;
const levelTwoText = `The quick brown fox jumps over the lazy dog. A journey of a thousand miles begins with a single step. Better late than never. Actions speak louder than words. Practice makes perfect.`;
const levelThreeText = `An early bird catches the worm. Every cloud has a silver lining. A picture is worth a thousand words. The grass is always greener on the other side of the fence. Absence makes the heart grow fonder.`;
const levelFourText = `The early bird catches the worm. A journey of a thousand miles begins with a single step. Better late than never. Actions speak louder than words. Practice makes perfect.`;
const levelFiveText = `To be, or not to be, that is the question. All that glitters is not gold. The pen is mightier than the sword. A rose by any other name would smell as sweet. The only thing we have to fear is fear itself.`;

const splittedLevelOneText = levelOneText.split(' ');
const splittedLevelTwoText = levelTwoText.split(' ');
const splittedLevelThreeText = levelThreeText.split(' ');
const splittedLevelFourText = levelFourText.split(' ');
const splittedLevelFiveText = levelFiveText.split(' ');

const game = document.querySelector('.game');
const startGameBtn = document.querySelector('.btn');
const textElement = document.querySelector('.text');
const inputElement = document.querySelector('.input');
const wordElement = document.querySelector('.word');

const scoreElement = document.querySelector('.score');
const timeLeftElement = document.querySelector('.time-left');
const wpmElement = document.querySelector('.wpm');

const gameEndedElement = document.querySelector('.game-ended');
const gameEndedBtn = document.querySelector('.game-ended-btn');

const correctWordsElement = document.querySelector('.correct-words');
const incorrectWordsElement = document.querySelector('.incorrect-words');
const finalScoreElement = document.querySelector('.final-score');
const finalWpmElement = document.querySelector('.final-wpm');
const finalAccuracyElement = document.querySelector('.final-accuracy'); // New element for accuracy

const currentLevelElement = document.querySelector('.current-level'); // Select level label element
const keyPressSound = new Audio('click.mp3'); // Adjust the path as necessary

let current = 0;
let score = 0;
let correctWordsCount = 0;
let incorrectWordsCount = 0;
let timeLeft = 60;

const timeLength = 60;
let interval;
let level = 1;

let levelOneCorrectCount = 0; // Track correct words for Level 1
let levelFiveCorrectCount = 0; // Track correct words for Level 5


let levelTwoCorrectCount = 0;
let levelThreeCorrectCount = 0; // Track correct counts for level 3
let levelFourCorrectCount = 0;  // Track correct counts for level 4

startGameBtn.addEventListener('click', startGame);
inputElement.addEventListener('keyup', handleKeyup);
gameEndedBtn.addEventListener('click', () => window.location.reload());


function startGame() {
    startGameBtn.classList.add('hidden');
    game.classList.remove('hidden');
    inputElement.focus();
    currentLevelElement.innerText = 'Level 1'; // Initialize level label
    wordElement.innerText = getNextWordOrPair();
    setTime();

}

function startInterval() {
    timeLeft--;
    timeLeftElement.innerText = timeLeft;

    const passedTime = timeLength - timeLeft;
    wpmElement.innerText = (score / (passedTime / 60)).toFixed(2);

    if (timeLeft === 0) {
        endGame();
    }
}

function setTime() {
    interval = setInterval(startInterval, 1000);
}


function createSpanElement(typedText, background) {
    const span = document.createElement('span');
    span.innerText = typedText;
    span.classList.add(background);
    textElement.appendChild(span);
}



function handleKeyup(e) {
    // Play the key press sound
    keyPressSound.currentTime = 0; // Reset sound to start
    keyPressSound.play(); // Play sound

    if (e.code === 'Enter') {
        // Create an element to display the result of the current word
        const resultElement = document.createElement('div');
        resultElement.classList.add('word-result');

        // Check if the input is correct or incorrect
        if (inputElement.value === wordElement.innerText) {
            // If correct, show the word in green
            resultElement.style.color = 'green';
            resultElement.innerText = wordElement.innerText;
            correctWordsCount++;
            score++;
            scoreElement.innerText = score;
        } else {
            // If incorrect, show the incorrect input in red and correct word
            resultElement.style.color = 'red';
            resultElement.innerHTML = `Incorrect: <strong>${inputElement.value}</strong> | Correct: ${wordElement.innerText}`;
            incorrectWordsCount++;
        }

        // Append the result to the text box to show the result
        textElement.appendChild(resultElement);

        // Clear the word after 0.5 seconds and get a new word
        setTimeout(() => {
            resultElement.remove();  // Remove the previous word
            inputElement.value = ''; // Clear the input field
            wordElement.innerText = getNextWordOrPair(); // Display the next word
        }, 500);  // 0.5 second delay to show feedback before hiding
        
        // Check the current level and progress
        if (level === 1) {
            if (correctWordsCount >= 5) {
                levelUpToTwo();
            }
        } else if (level === 2) {
            levelTwoCorrectCount++;
            if (levelTwoCorrectCount >= 5) {
                levelUpToThree();
            }
        } else if (level === 3) {
            levelThreeCorrectCount++;
            if (levelThreeCorrectCount >= 5) {
                levelUpToFour();
            }
        } else if (level === 4) {
            levelFourCorrectCount++;
            if (levelFourCorrectCount >= 5) {
                levelUpToFive();
            }
        }
    }
}


function getNextWordOrPair() {
    if (level === 1) {
        return splittedLevelOneText[current++];
    } else if (level === 2) {
        const pair = `${splittedLevelTwoText[current]} ${splittedLevelTwoText[current + 1]}`;
        current += 2;
        return pair;
    } else if (level === 3) {
        const triplet = `${splittedLevelThreeText[current]} ${splittedLevelThreeText[current + 1]} ${splittedLevelThreeText[current + 2]}`;
        current += 3;
        return triplet;
    } else if (level === 4) {
        const quad = `${splittedLevelFourText[current]} ${splittedLevelFourText[current + 1]} ${splittedLevelFourText[current + 2]} ${splittedLevelFourText[current + 3]}`;
        current += 4;
        return quad;
    } else {
        const quint = `${splittedLevelFiveText[current]} ${splittedLevelFiveText[current + 1]} ${splittedLevelFiveText[current + 2]} ${splittedLevelFiveText[current + 3]} ${splittedLevelFiveText[current + 4]}`;
        current += 5;
        return quint;
    }
}

function levelUpToFive() {
    level = 5;
    current = 0;
    levelFourCorrectCount = 0;
    currentLevelElement.innerText = 'Level 5';
    
    showLevelCompletionMessage(4);

    setTimeout(() => {
        wordElement.innerText = getNextWordOrPair();
        inputElement.focus();
    }, 5000);
}

function showLevelCompletionMessage(level) {
    // Clear the current word and input
    wordElement.innerText = '';
    inputElement.value = '';

    // Create a message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('level-completion-message');
    messageElement.innerText = `Level ${level} Completed!`;

    // Append the message to the game area
    game.appendChild(messageElement);

    // Remove the message after 2 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 2000);
}

function updateLevelLabel() {
    currentLevelElement.innerText = level; // Update the level label text
}

function endGame() {
    // Hide the game input section and show the game-ended section
    document.querySelector('.input-section').classList.add('hidden');
    gameEndedElement.classList.remove('hidden');
    
    // Clear the text display
    textElement.innerHTML = '';

    // Stop the timer
    clearInterval(interval);

    // Hide WPM, score, time left, and level label elements
    wpmElement.parentElement.classList.add('hidden');
    scoreElement.parentElement.classList.add('hidden');
    timeLeftElement.parentElement.classList.add('hidden');
    currentLevelElement.classList.add('hidden'); 

    // Calculate accuracy
    const totalWords = correctWordsCount + incorrectWordsCount;
    const accuracy = totalWords > 0 ? ((correctWordsCount / totalWords) * 100).toFixed(2) : 0;

    // Display final results
    
    incorrectWordsElement.innerText = `Incorrect words: ${incorrectWordsCount}`;
    finalScoreElement.innerText = `Final Score: ${score}`;
    finalWpmElement.innerText = `WPM: ${(score / (timeLength / 60)).toFixed(2)}`;
    finalAccuracyElement.innerText = `Accuracy: ${accuracy}%`;


}

// ---------------------------------------------------------------------------------------------
// some changes

let overlayElement = document.createElement('div'); // Create overlay for level completion
overlayElement.classList.add('overlay');  // Add class for styling

// Create buttons for next level and restart
let nextLevelButton = document.createElement('button');
nextLevelButton.innerText = 'Next Level';
nextLevelButton.classList.add('btn', 'next-level-btn');

let restartLevelButton = document.createElement('button');
restartLevelButton.innerText = 'Restart Level';
restartLevelButton.classList.add('btn', 'restart-level-btn');



// Add both buttons to the overlay
overlayElement.appendChild(nextLevelButton);
overlayElement.appendChild(restartLevelButton);

document.body.appendChild(overlayElement); // Add overlay to the document

// Function to reset timer and start the next level
function resetTimerAndStartLevel() {
    clearInterval(interval);  // Stop the previous interval
    timeLeft = 60;  // Reset the time to 60 (or your chosen start time)
    timeLeftElement.innerText = timeLeft;  // Update the time display on screen
    setTime();  // Start the new timer
}

// Modify the `levelUpToTwo` function as an example to show full-screen message and reset timer
function levelUpToTwo() {
    level = 2;
    current = 0;
    correctWordsCount = 0;  // Reset correct words count for new level
    updateLevelLabel();

    // Trigger the level completion message for Level 1
    levelCompleted(1);
}

// Repeat this function or logic for level transitions
function levelUpToThree() {
    level = 3;
    current = 0;
    correctWordsCount = 0;  // Reset correct words count for new level
    updateLevelLabel();

    // Trigger the level completion message for Level 2
    levelCompleted(2);
}

// Modify the `levelUpToFour` function as an example to show full-screen message and reset timer
function levelUpToFour() {
    level = 4;
    current = 0;
    correctWordsCount = 0;  // Reset correct words count for new level
    updateLevelLabel();

    // Trigger the level completion message for Level 1
    levelCompleted(3);
}

// Modify the `levelUpToFive` function as an example to show full-screen message and reset timer
function levelUpToFive() {
    level = 5;
    current = 0;
    correctWordsCount = 0;  // Reset correct words count for new level
    updateLevelLabel();

    // Trigger the level completion message for Level 1
    levelCompleted(4);
}

// Function to show the full-screen overlay
function showLevelCompletionOverlay(message) {
    overlayElement.style.display = 'flex';  // Display the overlay
    overlayElement.innerHTML = `<h2>${message}</h2>`;  // Add the completion message
    overlayElement.appendChild(nextLevelButton);  // Append the next level button
    overlayElement.appendChild(restartLevelButton);  // Append the restart level button
}

// Hide the overlay
function hideLevelCompletionOverlay() {
    overlayElement.style.display = 'none';  // Hide the overlay
}

// Function to transition between levels
function levelCompleted(currentLevel) {
    const nextLevel = currentLevel + 1;
    showLevelCompletion(currentLevel, nextLevel);  // Call the generic function
}

function showLevelCompletion(levelNumber, nextLevelNumber) {
    // Display overlay message
    showLevelCompletionOverlay(`Level ${levelNumber} Completed!`);

    // Event listener for moving to the next level
    // Event listener for moving to the next level
nextLevelButton.onclick = () => {
    hideLevelCompletionOverlay();  // Hide the overlay
    resetTimerAndStartLevel();  // Reset the timer for the new level
    currentLevelElement.innerText = `Level ${nextLevelNumber}`;  // Update the level label
    wordElement.innerText = getNextWordOrPair();  // Start words for the next level

    inputElement.focus();  // Focus the input element for typing
};


    // Event listener for restarting the game from Level 1
restartLevelButton.onclick = () => {
    hideLevelCompletionOverlay();  // Hide the overlay
    resetTimerAndStartLevel();  // Reset the timer
    level = 1;  // Reset to level 1
    current = 0;  // Reset the word index
    correctWordsCount = 0;  // Reset correct words count
    incorrectWordsCount = 0;  // Reset incorrect words count
    score = 0;  // Reset the score
    scoreElement.innerText = score;  // Update score display
    currentLevelElement.innerText = `Level 1`;  // Restart at level 1
    wordElement.innerText = getNextWordOrPair();  // Reset the words for level 1
};

}
