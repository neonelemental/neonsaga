export default {
  methods: {
    stopSound (sound) {
      if(sound.playing)
        sound.stop();
    },
    startSound (sound) {
      if(!sound.playing || !sound.options.autoplay)
        sound.play();
    },
  }
}