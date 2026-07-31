const video = document.getElementById('video');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const progressKnob = document.getElementById('progressKnob');

playBtn.addEventListener('click', () => { video.play(); playBtn.blur(); });
pauseBtn.addEventListener('click', () => { video.pause(); pauseBtn.blur(); });

document.addEventListener('keydown', (e) => {
if (e.code === 'Space') {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
});

// Progress Bar
video.addEventListener('timeupdate', () => {
if (video.duration) {
    const pct = (video.currentTime / video.duration) * 100;
    progressFill.style.width = pct + '%';
    progressKnob.style.left = pct + '%';
}
});

function seek(e) {
const rect = progressBar.getBoundingClientRect();
const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
video.currentTime = pct * video.duration;
}

progressBar.addEventListener('click', seek);

let dragging = false;
progressKnob.addEventListener('mousedown', () => dragging = true);
document.addEventListener('mousemove', (e) => { if (dragging) seek(e); });
document.addEventListener('mouseup', () => dragging = false);

// Fullscreen Feature
document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyF') {
    if (!document.fullscreenElement) {
      document.querySelector('.player-wrap').requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
});

// Change document title
video.addEventListener('play', () => {
    document.title = "BANG BANG BANG - Playing";
});
video.addEventListener('pause', () => {
    document.title = "BANG BANG BANG";
});