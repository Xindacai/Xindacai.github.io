/*
  TRACK INTERACTION LOGIC:
  The commands below will enable the user to use the play and pause functionality for each audio 
  track. This interaction gives users feedback through changing button text, enhancing usability.

  CONTEXTUAL DESIGN CHOICE:
  I intentionally restricted playback to one track at a time to simulate the behavior of Spotify's
  playlist page. */

  const tracks = document.querySelectorAll('.track');

  tracks.forEach(track => {
    const audio = track.querySelector('audio');
    const playBtn = track.querySelector('.play-btn');
    const progress = track.querySelector('.progress');
    const currentTimeEl = track.querySelector('.current-time');
    const durationEl = track.querySelector('.duration');
    const icon = playBtn.querySelector('img');
    const src = track.getAttribute('data-src');
  
    audio.src = src;
  
    playBtn.addEventListener('click', () => {
      document.querySelectorAll('audio').forEach(other => {
        if (other !== audio) other.pause();
      });
  /* The command below will ensure that my audio tracks show the pause logo when I play the
  audio on them, and switch back to the play logo when I pause the music on each audio track. */
      if (audio.paused) {
        audio.play();
        icon.src = 'icons8-pause-30.png';
        /* Shows the pause icon when the audio track is playing. */       
      } else {
        audio.pause();
        icon.src = 'icons8-play-30.png';
        /* Swap back to the play icon when the user pauses the audio. */ 
      }
    });
    
    /* The commands below will ensure that the time in my audio tracks' progress bars and 
    timestamps will be updated as the user plays the audio in each track. */
    audio.addEventListener('timeupdate', () => {
      progress.max = Math.floor(audio.duration);
      progress.value = Math.floor(audio.currentTime);
  
      const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
      };
  
      currentTimeEl.textContent = formatTime(audio.currentTime);
      const remaining = audio.duration - audio.currentTime;
      durationEl.textContent = '-' + formatTime(remaining);
    });
  
  /* This command below enables the user to drag the progress bar in the website's four audio
  tracks that will allow them to jump straight to any section in the audio track that they
  want. */  
    progress.addEventListener('input', () => {
      audio.currentTime = progress.value;
    });
  });