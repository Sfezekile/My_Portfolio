const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/Blasted (ft. Mxthew).mp3',
        displayName: 'Blasted',
        cover: 'assets/9.png',
        artist: 'PurpleBeats Collective (ft. Mxthew)',
    }, 
    {
        path: 'assets/Falling (ft. kewan).mp3',
        displayName: 'Falling',
        cover: 'assets/8.png',
        artist: 'PurpleBeats Collective (ft. Kewan)',
    }, 
    {
        path: 'assets/Dooms Day.mp3',
        displayName: 'Dooms Day',
        cover: 'assets/4.png',
        artist: 'PurpleBeats Collective',
    },
    {
        path: 'assets/DOG HOUSE.mp3', /* fix audio*/
        displayName: 'DOG HOUSE',
        cover: 'assets/6.png', 
        artist: 'PurpleBeats Collective',
    }, 
    {
        path: 'assets/I NEED YOU (ft. Prod.Fr@nk).wav',
        displayName: 'I NEED YOU',
        cover: 'assets/I NEED YOU.png', /* change img*/
        artist: 'PurpleBeats Collective (ft. Prod.Fr@nk)',
    }, 
    {
        path: 'assets/JAzz Sample.mp3',
        displayName: 'Heavenly Grace',
        cover: 'assets/image (6).jpg',
        artist: 'PurpleBeats Collective',
    },
    {
        path: 'assets/Losing Sleep.mp3',
        displayName: 'Losing Sleep',
        cover: 'assets/5.png', /* change img*/
        artist: 'PurpleBeats Collective',
    },
    {
        path: 'assets/Leslie.mp3',
        displayName: 'Shadows',
        cover: 'assets/7.png',
        artist: 'PurpleBeats Collective',
    },
    {
        path: 'assets/R  U OK.mp3',
        displayName: 'R  U OK',
        cover: 'assets/Album 1 image.png',
        artist: 'PurpleBeats Collective',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);