
const Music = (() => {
  let lastSongName = null;
  let audio = null;
  const loaded = {};
  const play = songName => {
    stop();
    if (!loaded[songName]) loaded[songName] = new Audio(`assets/${songName}.mp3`);
    if (!loaded[songName]) { console.error(`Song name "${songName}" not found.`); return; }
    audio = loaded[songName];
    audio.currentTime = 0;
    audio.loop = true;
    audio.volume = MUSIC_VOLUME;
    audio.play();
    lastSongName = songName;
    audio.addEventListener('ended', () => { this.currentTime = 0; this.play(); }, false);
  };
  const stop = () => {
    if (!lastSongName || !loaded[lastSongName]) return;
    // console.log("stop", lastSongName);
    loaded[lastSongName].pause();
  }
  return {
    play,
    stop,
  }
})();