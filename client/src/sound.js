import nextSound from '@sounds/action.mp3';
import dialogSound from '@sounds/dialog.wav';
import { Howl } from 'howler';

export const sounds = {
  nextSound,
  dialogSound
};

export class Sound {
  constructor ( options = {} ) {
    this.options = options;
    this.audioContext = new Howl({
      ...options,
      onend: () => {
        this.playing = false;
        if(options.onend)
          options.onend();
      },
    });
    this.playing = options.autoplay;
  }

  play = () => {
    this.audioContext.play();
    this.playing = true;
  };

  stop = () => {
    this.audioContext.stop();
    this.playing = false;
  };
}