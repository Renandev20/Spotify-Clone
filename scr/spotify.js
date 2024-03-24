const topBar = document.querySelector('.topbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        topBar.classList.add('transparent');
    } else {
        topBar.classList.remove('transparent');
    }
});

const topbarHeight = topBar.offsetHeight;
const mainContent = document.querySelector('.main-content');
mainContent.style.paddingTop = `${topbarHeight + 20}px`;

const containerConcentracion = document.querySelectorAll('.card-concentracion');
const containerSpotifyPlaylists = document.querySelectorAll('.card-spotify-playlists');

// Função para criar os botões de play
const createButton = card => {
    // Criar o botão
    const button = document.createElement('button');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';

    // Adicionar o botão ao elemento filho
    card.appendChild(button);

    // Ocultar o botão inicialmente
    button.style.display = 'none';
    button.classList.add('btn-play');

    // Adicionar eventos de hover para mostrar e ocultar o botão
    card.addEventListener('mouseover', () => {
        button.style.display = 'block';
    });

    card.addEventListener('mouseout', () => {
        button.style.display = 'none';
    });

    button.addEventListener('click', () => {
        const audio = button.parentElement.querySelector('audio');
        togglePlayPause(button, audio);
    });
};

// Usar a função nos dois conjuntos de contêineres
containerConcentracion.forEach(card => {
    createButton(card);
});

containerSpotifyPlaylists.forEach(card => {
    createButton(card);
});

const toggleAudio = (audio) => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
};

const heartIcon = document.getElementById('heart');
const headphoneIcon = document.getElementById('headphone');

heartIcon.addEventListener('click', () => {
    if (heartIcon.classList.contains('green-icon')) {
        heartIcon.classList.remove('green-icon');
        heartIcon.style.color = "white";
    } else {
        heartIcon.classList.add('green-icon');
        heartIcon.style.color = "green"; // Ou qualquer outra cor desejada quando for clicado
    }
});

window.addEventListener('load', () => {
    // Verifica se o usuário está usando fones no computador
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            // Usuário está usando fones de ouvido
            headphoneIcon.classList.add('green-icon');
            stream.getTracks().forEach(track => track.stop());
        })
        .catch(err => {
            // Usuário não está usando fones de ouvido
            console.error('Erro ao acessar os dispositivos de áudio:', err);
        });
});

const togglePlayPause = (button, audio) => {
    const playIcon = '<i class="fa-solid fa-play"></i>';
    const pauseIcon = '<i class="fa-solid fa-pause"></i>';

    if (button.innerHTML === playIcon) {
        button.innerHTML = pauseIcon;
        toggleAudio(audio);
        togglePlayerAndContent();
    } else {
        button.innerHTML = playIcon;
        toggleAudio(audio);
    }
};

function mudarCoracao() {
    const heartIcon = document.getElementById('heart');

    heartIcon.addEventListener('click', () => {
        if (heartIcon.classList.contains('green-icon')) {
            heartIcon.classList.remove('green-icon');
            heartIcon.style.color = "white"; // Volta para a cor original (branca)
        } else {
            heartIcon.classList.add('green-icon');
            heartIcon.style.color = "green"; // Define a cor para verde
        }
    });
}

function mudarDecor() {
    const headphoneIcon = document.getElementById('headphone');

    headphoneIcon.addEventListener('click', () => {
        if (headphoneIcon.classList.contains('blue-icon')) {
            headphoneIcon.classList.remove('blue-icon');
            headphoneIcon.style.color = "white"; // Volta para a cor original (branca)
        } else {
            headphoneIcon.classList.add('blue-icon');
            headphoneIcon.style.color = "blue"; // Define a cor para azul
        }
    });
}

mudarCoracao();
mudarDecor();

const togglePlayerAndContent = () => {
    const musicPlayer = document.querySelector('.music-player');
    const moreSpotify = document.querySelector('.banner-bottom');

    if (musicPlayer.style.display === 'none') {
        musicPlayer.style.display = 'block';
        moreSpotify.style.display = 'none';
    } else {
        musicPlayer.style.display = 'none';
        moreSpotify.style.display = 'block';
    }
};

const audioPlayer = document.getElementById('audioPlayer');
audioPlayer.addEventListener('ended', () => {
    togglePlayerAndContent();
});

// Restante do código...
const songData = [
  {
    name: "Nothing Else Matters",
    artist: "Metallica",
    src: "song1",
  },
  {
    name: "Knockin' on Heaven's Door",
    artist: "Bob Dylan",
    src: "",
  },
  {
    name: "Guns N' Roses",
    artist: "Don't Cry",
    src: "song3",
  },
];

const container = document.querySelector(".container");
const songName = document.querySelector(".song-name");
const songArtist = document.querySelector(".song-artist");
const cover = document.querySelector(".cover");
const playPauseBtn = document.querySelector(".play-pause");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const audio = document.querySelector(".audio");
const songTime = document.querySelector(".song-time");
const songProgress = document.querySelector(".song-progress");
const coverArtist = document.querySelector(".cover span:nth-child(1)");
const coverName = document.querySelector(".cover span:nth-child(2)");

let songIndex = 0;

window.addEventListener("load", () => {
  loadSong(songIndex);
});

const loadSong = (index) => {
  coverName.textContent = songData[index].name;
  coverArtist.textContent = songData[index].artist;
  songName.textContent = songData[index].name;
  songArtist.textContent = songData[index].artist;
  audio.src = `music/${songData[index].src}.mp3`;
};

const playSong = () => {
  container.classList.add("pause");
  cover.classList.add("rotate");
  playPauseBtn.firstElementChild.className = "fa-solid fa-pause";
  audio.play();
};

const pauseSong = () => {
  container.classList.remove("pause");
  cover.classList.remove("rotate");
  playPauseBtn.firstElementChild.className = "fa-solid fa-play";
  audio.pause();
};

playPauseBtn.addEventListener("click", () => {
  if (container.classList.contains("pause")) {
    pauseSong();
  } else {
    playSong();
  }
});

const prevSongPlay = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songData.length - 1;
  }

  loadSong(songIndex);
  playSong();
};

const nextSongPlay = () => {
  songIndex++;
  if (songIndex > songData.length - 1) {
    songIndex = 0;
  }

  loadSong(songIndex);
  playSong();
};

prevBtn.addEventListener("click", prevSongPlay);
nextBtn.addEventListener("click", nextSongPlay);

audio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let currentTimeWidth = (currentTime / duration) * 100;
  songProgress.style.width = `${currentTimeWidth}%`;

  let songCurrentTime = document.querySelector(".time span:nth-child(1)");
  let songDuration = document.querySelector(".time span:nth-child(2)");

  audio.addEventListener("loadeddata", () => {
    let audioDuration = audio.duration;
    let totalMinutes = Math.floor(audioDuration / 60);
    let totalSeconds = Math.floor(audioDuration % 60);

    if (totalSeconds < 10) {
      totalSeconds = `0${totalSeconds}`;
    }

    songDuration.textContent = `${totalMinutes}:${totalSeconds}`;
  });

  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  songCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`;
});

songTime.addEventListener("click", (e) => {
  let progressWidth = songTime.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = audio.duration;
  audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;

  playSong();
});

audio.addEventListener("ended", nextSongPlay);




const agora = new Date();
const horaAtual = agora.getHours();

// Obtém o elemento de saudação
const saudacao = document.getElementById('saudacao');

// Define a saudação com base na hora
if (horaAtual >= 6 && horaAtual < 12) {
    saudacao.textContent = 'Bom Dia!';
} else if (horaAtual >= 12 && horaAtual < 18) {
    saudacao.textContent = 'Boa Tarde!';
} else {
    saudacao.textContent = 'Boa Noite!';
}
