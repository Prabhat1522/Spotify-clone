// ── Greeting ────────────────────────────────────────────
const greetEl = document.getElementById('greeting');
const h = new Date().getHours();
greetEl.textContent = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';

// ── Card click → set Now Playing ─────────────────────────
const tracks = [
  { title: 'Top 50 – Global', artist: 'Spotify Charts', img: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=60&h=60&fit=crop' },
  { title: 'Viral 50 – India', artist: 'Spotify Charts', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop' },
  { title: 'Daily Mix 1', artist: 'Coldplay, The Weeknd & more', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=60&h=60&fit=crop' },
  { title: 'Chill Hits', artist: 'Spotify', img: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=60&h=60&fit=crop' },
  { title: 'Release Radar', artist: 'Spotify', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=60&h=60&fit=crop' },
  { title: 'Discover Weekly', artist: 'Spotify', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=60&h=60&fit=crop' },
];

let currentTrackIdx = 0;
let playing = false;
let progress = 0;
let ticker = null;
const totalSeconds = 210;

const npArt = document.getElementById('np-art');
const npTitle = document.getElementById('np-title');
const npArtist = document.getElementById('np-artist');
const playIcon = document.getElementById('play-icon');
const progressFill = document.getElementById('progress-fill');
const progressThumb = document.getElementById('progress-thumb');
const currTimeEl = document.getElementById('curr-time');
const heartBtn = document.getElementById('heart-btn');

function setTrack(idx) {
  const t = tracks[idx % tracks.length];
  npArt.style.backgroundImage = `url('${t.img}')`;
  npTitle.textContent = t.title;
  npArtist.textContent = t.artist;
  currentTrackIdx = idx % tracks.length;
  progress = 0;
  updateProgress();
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = String(Math.floor(sec % 60)).padStart(2, '0');
  return `${m}:${s}`;
}

function updateProgress() {
  const pct = (progress / totalSeconds) * 100;
  progressFill.style.width = pct + '%';
  progressThumb.style.left = pct + '%';
  currTimeEl.textContent = formatTime(progress);
}

function startPlay() {
  playing = true;
  playIcon.className = 'fa-solid fa-pause';
  ticker = setInterval(() => {
    progress += 1;
    if (progress >= totalSeconds) { progress = 0; }
    updateProgress();
  }, 1000);
}

function pausePlay() {
  playing = false;
  playIcon.className = 'fa-solid fa-play';
  clearInterval(ticker);
}

document.getElementById('play-pause').addEventListener('click', () => {
  if (npTitle.textContent === 'No track selected') {
    setTrack(0);
    startPlay();
    return;
  }
  playing ? pausePlay() : startPlay();
});

// Click on cards
document.querySelectorAll('.music-card').forEach((card, i) => {
  card.addEventListener('click', () => {
    clearInterval(ticker);
    setTrack(i % tracks.length);
    startPlay();
  });
});

// Click on quick cards
document.querySelectorAll('.quick-card').forEach((card, i) => {
  card.addEventListener('click', () => {
    clearInterval(ticker);
    setTrack(i % tracks.length);
    startPlay();
  });
});

// Progress bar seek
const progressTrack = document.getElementById('progress-track');
progressTrack.addEventListener('click', (e) => {
  const rect = progressTrack.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  progress = pct * totalSeconds;
  updateProgress();
});

// Heart button
heartBtn.addEventListener('click', () => {
  heartBtn.classList.toggle('liked');
  const icon = heartBtn.querySelector('i');
  icon.className = heartBtn.classList.contains('liked') ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
});

// Volume track click
const volTrack = document.querySelector('.volume-track');
const volFill = document.getElementById('vol-fill');
volTrack.addEventListener('click', (e) => {
  const rect = volTrack.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  volFill.style.width = (pct * 100) + '%';
});

// Nav buttons (decorative scroll)
document.getElementById('btn-back').addEventListener('click', () => {
  document.getElementById('main-scroll').scrollBy({ top: -200, behavior: 'smooth' });
});
document.getElementById('btn-fwd').addEventListener('click', () => {
  document.getElementById('main-scroll').scrollBy({ top: 200, behavior: 'smooth' });
});

// Init
setTrack(0);
