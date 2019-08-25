import { Howl } from 'howler';

export default class Sound {
  constructor ( options = {} ) {
    this.audioContext = new Howl(options);
  }

  play = () => {
    this.audioContext.play();
  }

  stop = () => {
    this.audioContext.stop();
  }
}