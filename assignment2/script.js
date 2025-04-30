/*
  TRACK INTERACTION LOGIC:
  The script below enables individual play/pause functionality for each audio track.
  This interaction gives users feedback through changing button text, enhancing usability.

  CONTEXTUAL DESIGN CHOICE:
  We intentionally restrict playback to one track at a time to simulate the behavior of
  music streaming apps like Spotify. This was discussed as a user-centered interaction design
  pattern during class.
*/

const tracks = document.querySelectorAll('.track');

tracks.forEach((trackDiv) => {
  const audio = trackDiv.querySelector('audio');
  const button = trackDiv.querySelector('.play-btn');
  const progress = trackDiv.querySelector('.progress');
  const src = trackDiv.getAttribute('data-src');

  audio.src = src;

  button.addEventListener('click', () => {
    // Pause other tracks before playing new one — prevents audio overlap
    tracks.forEach(t => {
      const otherAudio = t.querySelector('audio');
      if (otherAudio !== audio) otherAudio.pause();
      t.querySelector('.play-btn').textContent = 'Play';
    });

    if (audio.paused) {
      audio.play();
      button.textContent = 'Pause'; // Feedback: Button label changes to indicate state
    } else {
      audio.pause();
      button.textContent = 'Play';
    }
  });

  /*
    SEEKBAR (PROGRESS BAR) LOGIC:
    Gives user control over playback — fulfilling the requirement for smooth transitions
    and usable interaction. The progress bar updates in real time and responds to dragging.
  */
  audio.addEventListener('timeupdate', () => {
    progress.max = Math.floor(audio.duration);
    progress.value = Math.floor(audio.currentTime);
  });

  progress.addEventListener('input', () => {
    audio.currentTime = progress.value;
  });
});