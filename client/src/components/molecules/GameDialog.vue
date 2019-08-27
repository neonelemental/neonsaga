<template>
  <dialog-pane>
    <text-writer
      v-shortkey="['enter']"
      @shortkey.native="nextMessage()"
      ref="typer"
      class="text-writer"
      tag="h3"
      :text="text"
      @doneWriting="stopSound"
    />
  </dialog-pane>
</template>

<script>
  import dialogSound from '@sounds/dialog.wav';
  import Sound from '@utils/sound';

  export default {
    props: {
      messages: {
        type: Array,
        required: true
      }
    },
    mounted () {
      this.sound.play();
    },
    data () {
      return {
        messageIndex: 0,
        sound: new Sound({
          src: [ dialogSound ],
          autoplay: true,
          loop: true,
        }),
        typing: true,
      }
    },
    computed: {
      text () {
        return this.messages[this.messageIndex];
      },
    },
    methods: {
      stopSound () {
        this.sound.stop();
        this.typing = false;
      },
      startSound () {
        this.sound.play();
        this.typing = true;
      },
      nextMessage () {
        if(this.messageIndex === this.messages.length -1 || this.typing) {
          this.$refs.typer.stopTyping();
          this.stopSound();
        }
        else {
          this.messageIndex++;
          this.startSound()
        }
      },
    }
  }
</script>