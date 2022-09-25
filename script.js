// DOM elements
let play = document.getElementById("play");
let pause = document.getElementById("pause");
let forward = document.getElementById("forward");
let backward = document.getElementById("backward");
let songName = document.querySelector(".song-name");
let startTime = document.querySelector(".startTime");
let endTime = document.querySelector(".endTime");
let range = document.querySelector(".range");
let imageMusic = document.querySelector(".image");
let volume = document.getElementById("volume");
let volumeDiv = document.querySelector(".volumeDiv");
let volumeRange = document.getElementById("volumeRange");
let download = document.getElementById('download');

// objects of songs
let songs = [
  {
    songName: "Gallan goodiyaan",
    audio: "Songs/gallan goodiyaan.mpeg",
    image:
    "Songs/Images/You.jpg",
  },
  {
    songName: "You",
    audio: "Songs/you.mpeg",
    image:
    "Songs/Images/You.jpg",
  },
  {
    songName: "Iktara",
    audio: "Songs/iktara.mpeg",
    image:
    "Songs/Images/You.jpg",
  },
  {
    songName: "Afeemi",
    audio: "Songs/afeemi.mpeg",
    image:
      "Songs/Images/You.jpg",
  },
  {
    songName: "Lovely",
    audio: "Songs/lovely.mp3",
    image:
      "Songs/Images/You.jpg",
  },
  {
    songName: "Buddhu sa mann",
    audio: "Songs/buddhu sa mann.mpeg",
    image:
      "Songs/Images/You.jpg",
  },
  {
    songName: "Jaane Kyun",
    audio: "Songs/jaane kyun.mpeg",
    image:
    "Songs/Images/You.jpg",
  },
  {
    songName: "Journey Song",
    audio: "Songs/journey song.mpeg",
    image:
    "Songs/Images/You.jpg",
  },
  {
    songName: "Love You Zindagi",
    audio: "Songs/love you zindagi.mpeg",
    image:
    "Songs/Images/You.jpg",
  },
  {
    songName: "Mere Liye Tm Kaafi Ho",
    audio: "Songs/mere liye tm kaafi ho.mpeg",
    image:
    "Songs/Images/You.jpg",
  },
  {
    songName: "Piya O Re Piya",
    audio: "Songs/piya o re piya.mpeg",
    image:
    "Songs/Images/You.jpg",
  },
  {
    songName: "Tu Chahiye",
    audio: "Songs/tu chahiye.mpeg",
    image:
    "Songs/Images/You.jpg",
  },
  {
    songName: "Sugar and Brownies",
    audio: "Songs/sugar and brownies.mp3",
    image:
      "Songs/Images/You.jpg",
  },
  {
    songName: "Tu hi Yaar Mera",
    audio: "Songs/tu hi yaar mera.mpeg",
    image:
    "Songs/Images/You.jpg",
  },
];
let counter = 0;
let audio = new Audio(songs[counter].audio);
songName.innerHTML = "Enjoy your playlists!";

// Play song
play.addEventListener(
  "click",
  (PlaySong = () => {
    audio.volume = volumeRange.value;
    audio.play();
    songName.innerHTML = songs[counter].songName;
    play.classList.add("hide");
    pause.classList.remove("hide");
    setInterval(() => {
      updateTimeline(audio);
      let minutes = Math.floor(audio.currentTime / 60);
      let seconds = Math.floor(audio.currentTime - minutes * 60);
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      startTime.innerHTML = `${minutes}:${seconds}`;
    });
  })
);

// Pause song
pause.addEventListener(
  "click",
  (PauseSong = () => {
    audio.pause();
    songName.innerHTML = songs[counter].songName;
    pause.classList.add("hide");
    play.classList.remove("hide");
    range.value = audio.currentTime;
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime - minutes * 60);
    startTime.innerHTML = `${minutes}:${seconds}`;
  })
);

// Play Next
forward.addEventListener(
  "click",
  (playNext = () => {
    counter++;
    if (counter > songs.length - 1) {
      counter = 0;
    }
    imageMusic.style.background = `url('${songs[counter].image}')`;
    songName.innerHTML = songs[counter].songName;
    audio.src = songs[counter].audio;

    
    audio.play();
  })
);

// Play Previous
backward.addEventListener("click", () => {
  counter--;
  if (counter < 0) {
    counter = songs.length - 1;
  }
  imageMusic.style.background = `url('${songs[counter].image}')`;
  audio.src = songs[counter].audio;

  songName.innerHTML = songs[counter].songName;

  audio.play();
});


// Timeline function
function updateTimeline(song) {
  let duration = song.duration;
  range.max = duration;
  let min = duration / 60;
  let MinInt = Math.floor(min);
  let secondsLeft = Math.floor((min - MinInt) * 60);
  if (secondsLeft < 10) {
    secondsLeft = `0${secondsLeft}`;
  }
  if (MinInt < 10) {
    MinInt = `0${MinInt}`;
  }

  endTime.innerHTML = `${MinInt}:${secondsLeft}`;
  range.value = song.currentTime;
}

// playList Code
let list = document.querySelector(".list");

list.addEventListener("click", () => {
  // playlist body
  let listMusic = document.createElement("div");
  listMusic.classList.add("listMusic");
  document.body.appendChild(listMusic);

  // total tracks
  let span = document.createElement("span");
  span.innerHTML = `${songs.length} tracks`;
  span.classList.add("track");
  listMusic.appendChild(span);

  // icon of cross
  let icon = document.createElement("div");
  icon.innerHTML = `<i class="fas fa-times"></i>`;
  icon.classList.add("cross");
  listMusic.appendChild(icon);

  // cross the playlist to remove from DOM
  icon.addEventListener("click", () => {
    listMusic.remove();
  });

  // list of songs in playlist
  songs.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = item.songName;
    listMusic.appendChild(li);

    // click event to play that particular song
    li.addEventListener("click", (e) => {
      audio.currentTime = 0;
      audio.pause();
      counter = index;
      audio = new Audio(songs[index].audio);
      imageMusic.style.background = `url(${item.image})`;
      PlaySong();
    });
  });

  // for styling the playlist list
  listMusic.firstElementChild.nextElementSibling.style.marginTop = "40px";
});

// autoplay the next song when the current song gets over
audio.addEventListener("ended", playNext);

// to drag the range and play the song from that particular position
range.addEventListener("input", () => {
  audio.currentTime = range.value;
});


// volume icon click event
volume.addEventListener("click", () => {
  volumeRange.classList.toggle("visibility");
  document.getElementById("volumeValue").classList.toggle("visibility");
});

// code to change the volume
volumeRange.addEventListener("input", () => {
  audio.volume = volumeRange.value;
  // value of current volume
  document.getElementById("volumeValue").innerHTML = `${Math.ceil(
    volumeRange.value * 100
  )}%`;
});

download.addEventListener('click',()=>{
  PauseSong();
  window.open(audio.src)
})
