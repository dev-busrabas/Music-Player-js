const music = document.querySelector('audio');
const image = document.querySelector('img');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const title = document.getElementById('title');
const creator = document.getElementById('creator');
const progressDiv = document.getElementById('progressDiv');
const progress = document.getElementById('progress');
const currentTimeSpan = document.getElementById('currentTime');
const totalTimeSpan = document.getElementById('totalTime');



let songIndex = 0;
let isPlaying = false;

// music.play();

const songs = [{
        name: 'Love',
        title: 'Love',
        creator: 'Anonymous'
    },
    {
        name: 'Dream',
        title: 'Dream',
        creator: 'Anonymous'
    }
]

function loadSong(song) {
    title.textContent = song.title;
    creator.textContent = song.creator;
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.png`
}

loadSong(songs[songIndex]);


function playSong() {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    music.pause();
}

function prevSong() {
    songIndex--;
    // console.log(songIndex);
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    // console.log(songIndex);
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgressBar(e) {
    if (isPlaying) {
        // console.log(e);
        const {
            currentTime,
            duration
        } = e.srcElement;
        // console.log(currentTime, duration);
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const durationMinutes = Math.floor(duration / 60)
        // console.log(durationMinutes);

        let durationSeconds = Math.floor(duration % 60);
        // console.log(durationSeconds);

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationSeconds) {
            totalTimeSpan.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60)
        // console.log(currentMinutes);

        let currentSeconds = Math.floor(currentTime % 60);
        // console.log(currentSeconds);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        if (currentSeconds) {
            currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds}`;
        }

    }
}

function setProgressBar(e){
    console.log(e);
    const width= e.srcElement.clientWidth;
    console.log(width);

const{ duration }=music;

    const clickX= e.offsetX;
    // console.log((clickX / width) * duration);
    music.currentTime=(clickX / width) * duration
}

playButton.addEventListener('click', () => isPlaying ? pauseSong() : playSong());


prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressDiv.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);



