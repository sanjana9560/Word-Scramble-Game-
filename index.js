

const msg = document.querySelector('.msg');
const guess = document.querySelector('input');
const btn = document.querySelector('.btn');
let audio = document.getElementById("myAudio");
let emojiContainer = document.querySelector('.emojiContainer');

let play = false;
let newWords = "";
let randWords = "";
let sWords = ['adidas', 'spark', 'nike', 'bata', 'miniso', 'flite', 'woodland', 'liberty', 'khadim', 'clarks', 'relexo', 'Solethreads', 'puma'];

function playAudio() {
    audio.play();
}

audio.addEventListener('ended', function () {
    console.log("Audio finished");
});

const createNewWord = () => {
    let ranNam = Math.floor(Math.random() * sWords.length);
    let newTempSwords = sWords[ranNam];
    return newTempSwords;
}

const scrambleWords = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let temp = arr[i];
        let j = Math.floor(Math.random() * (i + 1))

        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

// Define a function to handle the button click event
function handleButtonClick() {
    if (!play) {
        alert("Only use lowercase letters");
        play = true;
        btn.innerHTML = "Guess";
        guess.classList.toggle('hidden');
        newWords = createNewWord();
        randWords = scrambleWords(newWords.split("")).join("");
        msg.innerHTML = randWords;

        // Unmute and play the audio when the button is clicked
        audio.muted = false;
        playAudio();
    } else {
        let temWord = guess.value;
        if (temWord == newWords) {
            console.log("correct");
            play = false;
            msg.innerHTML = `Awesome, it's correct. It is ${newWords}`;
            btn.innerHTML = "Start Again";
            guess.classList.toggle('hidden');
            guess.value = "";

            // Change the src attribute of emojiContainer when the user wins
            emojiContainer.src = './party-popper-joypixels.gif';
            setTimeout(() => {
                emojiContainer.src = '';
            }, 3000);

        } else {
            console.log("incorrect");
            msg.innerHTML = `Sorry. It is incorrect. <br> Please try again ${randWords}.`;
            // span.innerHTML = '${ranwords}';
        }
    }
}

// Add the handleButtonClick function to the click event of the button
btn.addEventListener("click", handleButtonClick);

// Autoplay the audio when the page loads (muted by default)
audio.autoplay = true;
audio.muted = true;
