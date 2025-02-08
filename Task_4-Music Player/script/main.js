let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let shuffle_btn = document.querySelector(".shuffle-track");
let mute_btn = document.querySelector(".mute-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let playlist_container = document.querySelector(".playlist");

let track_index = 0;
let isPlaying = false;
let isShuffle = false;
let isMuted = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
  { name: "Master Remix", artist: "Shane", image: "./images/s.jpg", path: "./songs/s (1).mp3"},
  { name: "Master ", artist: "Anirudh", image: "./images/s.jpg", path: "./songs/s (2).mp3"},
  { name: "Sound of Salaar", artist: "Ravi", image: "./images/s.jpg", path: "./songs/s (3).mp3"},
  { name: "Jawan", artist: "Anirudh", image: "./images/s.jpg", path: "./songs/s (4).mp3"},
  { name: "King of Kotha", artist: "Raheem", image: "./images/s.jpg", path: "./songs/s (5).mp3"},
  { name: "Brahmastra", artist: "Arjith", image: "./images/s.jpg", path: "./songs/s (6).mp3"},
  { name: "Lokiverse", artist: "Anirudh", image: "./images/s.jpg", path: "./songs/s (7).mp3"},
  { name: "Jailer", artist: "DSP", image: "./images/s.jpg", path: "./songs/s (8).mp3"},
  { name: "Vikram", artist: "Anirudh", image: "./images/s.jpg", path: "./songs/s (9).mp3"},
  { name: "Beast X Vikram", artist: "Amal", image: "./images/s.jpg", path: "./songs/s (10).mp3"},
  { name: "Master X Beast", artist: "Amal", image: "./images/s.jpg", path: "./songs/s (11).mp3"},
  { name: "Life is Beautiful", artist: "Yuvan", image: "./images/s.jpg", path: "./songs/s (12).mp3"},
  { name: "Vikram Title", artist: "Anirudh", image: "./images/s.jpg", path: "./songs/s (13).mp3"},
  { name: "Viakundapuram", artist: "Thaman", image: "./images/s.jpg", path: "./songs/s (14).mp3"},
  { name: "Master Sad", artist: "Anirudh", image: "./images/s.jpg", path: "./songs/s (15).mp3"},
  { name: "Charlie", artist: "Madhu", image: "./images/s.jpg", path: "./songs/s (16).mp3"},
  { name: "Arabiflow", artist: "Jake", image: "./images/s.jpg", path: "./songs/s (17).mp3"},
  { name: "Vi-Taong", artist: "Christopher", image: "./images/s.jpg", path: "./songs/s (18).mp3"},
  { name: "Tony-Igy", artist: "Louis", image: "./images/s.jpg", path: "./songs/s (19).mp3"},
  { name: "Pirates of Caribbean", artist: "James", image: "./images/s.jpg", path: "./songs/s (20).mp3"},
];

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_art.classList.remove("playing");  
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  document.body.style.backgroundColor = track_list[track_index].backgroundColor;  

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMin = Math.floor(curr_track.currentTime / 60);
    let currentSec = Math.floor(curr_track.currentTime - currentMin * 60);
    currentSec = (currentSec < 10) ? "0" + currentSec : currentSec;
    curr_time.textContent = currentMin + ":" + currentSec;

    let totalMin = Math.floor(curr_track.duration / 60);
    let totalSec = Math.floor(curr_track.duration - totalMin * 60);
    totalSec = (totalSec < 10) ? "0" + totalSec : totalSec;
    total_duration.textContent = totalMin + ":" + totalSec;
  }
}

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("playing"); 
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("playing");  
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  track_index = isShuffle ? Math.floor(Math.random() * track_list.length) : (track_index + 1) % track_list.length;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  track_index = (track_index - 1 + track_list.length) % track_list.length;
  loadTrack(track_index);
  playTrack();
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  shuffle_btn.classList.toggle("active", isShuffle);
}

function muteTrack() {
  isMuted = !isMuted;
  curr_track.muted = isMuted;
  mute_btn.innerHTML = isMuted ? '<i class="fa fa-volume-mute fa-2x"></i>' : '<i class="fa fa-volume-up fa-2x"></i>';
}

function seekTo() {
  let seekPosition = seek_slider.value * curr_track.duration / 100;
  curr_track.currentTime = seekPosition;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function generatePlaylist() {
  if (playlist_container) {
    playlist_container.innerHTML = "";
    track_list.forEach((track, index) => {
      let trackItem = document.createElement("div");
      trackItem.classList.add("playlist-item");
      trackItem.textContent = track.name + " - " + track.artist;
      trackItem.onclick = () => {
        track_index = index;
        loadTrack(track_index);
        playTrack();
      };
      playlist_container.appendChild(trackItem);
    });
  }
}

loadTrack(track_index);
generatePlaylist();
