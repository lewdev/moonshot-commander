var Sound = (function() {
  const PATH = "./audio/";
  const MUSIC_VOLUME = .1;
  let lastSoundName = null;
  let lastMusicName = null;
  //map of sound names to audio.
  let audioMap = null;
  //map of sound names to their file names.
  const nameMap = {
    "addPart":       "addPart - Jump 1.wav"
    , "clear":       "clear - Select 1.wav"
    , "endGame":     "endGame - Victory SoundFX2.ogg"
    , "match":       "match - Fruit collect 1.wav"
    , "noMatch":     "noMatch - Text 1.wav"
    , "gameBgMusic": "game - POL-star-way-short.wav"
    , "menuBgMusic": "menu - POL-follow-me-short.wav"
  };
  function init(callback) {
    if (!audioMap) {
      audioMap = {};    
      for (var name in nameMap) {
        audioMap[name] = new Audio(PATH + nameMap[name]);
      }
    }
    callback();
  }
  function play(soundName) {
    stop(lastSoundName);
    const audio = getAudio(soundName);
    if (audio) {
      audio.play();
    }
    lastSoundName = soundName;
  }
  function music(soundName) {
    stopMusic();
    const audio = getAudio(soundName);
    if (audio) {
      audio.play();
      audio.loop = true;
      audio.volume = MUSIC_VOLUME;
    }
    lastMusicName = soundName;
  }
  function getAudio(soundName) {
    if (!soundName) return null;
    const audio = audioMap[soundName];
    if (!audio) {
      console.error("Sound '" + soundName + "' not found");
      return null;
    }
    return audio;
  }
  function stop(soundName) {
    if (!soundName) return;
    const audio = getAudio(soundName);
    if (audio) {
      audio.currentTime = 0;
      audio.pause();
    }
  }
  function stopMusic() {
    const audio = getAudio(lastMusicName);
    if (audio) {
      audio.pause();
    }
  }
  function playMusic() {
    music(lastMusicName);
  }
  return {
    init: init
    , stopMusic: stopMusic
    , playMusic: playMusic
    , play: play
    , music: music
  }
})();