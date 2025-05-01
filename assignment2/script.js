/*
  TRACK INTERACTION LOGIC:
  The commands below will enable the user to use the play and pause functionality for each audio 
  track. This interaction gives users feedback through changing button text, enhancing usability.

  CONTEXTUAL DESIGN CHOICE:
  We intentionally restrict playback to one track at a time to simulate the behavior of
  music streaming apps like Spotify. This was discussed as a user-centered interaction design
  pattern during class.
*/

const tracks = document.querySelectorAll('.track');

tracks.forEach(track => {
  const audio = track.querySelector('audio');
  const playBtn = track.querySelector('.play-btn');
  const icon = playBtn.querySelector('img');
  const progress = track.querySelector('.progress');
  const src = track.getAttribute('data-src');

  audio.src = src;

  // Play/Pause Button Logic
  playBtn.addEventListener('click', () => {
    // Pause all other tracks
    document.querySelectorAll('.track').forEach(otherTrack => {
      const otherAudio = otherTrack.querySelector('audio');
      const otherIcon = otherTrack.querySelector('.play-btn img');
      if (otherAudio !== audio) {
        otherAudio.pause();
        otherIcon.src = "icons8-play-30.png";
        otherIcon.alt = "Play";
      }
    });

    // Toggle Play/Pause for current track
    if (audio.paused) {
      audio.play();
      icon.src = "icons8-pause-30.png";
      icon.alt = "Pause";
    } else {
      audio.pause();
      icon.src = "icons8-play-30.png";
      icon.alt = "Play";
    }
  });

  // Progress bar updates
  audio.addEventListener('timeupdate', () => {
    progress.max = Math.floor(audio.duration);
    progress.value = Math.floor(audio.currentTime);
  });

  // User drags progress bar
  progress.addEventListener('input', () => {
    audio.currentTime = progress.value;
  });
});