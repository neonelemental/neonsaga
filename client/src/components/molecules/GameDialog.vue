<template>
  <dialog-pane>
    <text-writer
      v-shortkey="['enter']"
      @shortkey.native="nextMessage()"
      ref="typer"
      class="text-writer"
      tag="h3"
      :text="text"
      @doneWriting="() => this.stopSound(this.scrobbleSound)"
    />
  </dialog-pane>
</template>

<script>
  import nextSound from '@sounds/action.mp3';
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
      this.startSound(this.scrobbleSound);
    },
    data () {
      return {
        messageIndex: 0,
        scrobbleSound: new Sound({
          src: [ dialogSound ],
          autoplay: true,
          loop: true,
        }),
        nextSound: new Sound({
          src: [ nextSound ],
          autoplay: false,
          loop: false,
          volume: 0.125,
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
      nextMessage () {
        if(this.messageIndex === this.messages.length -1 || this.typing) {
          if(this.typing)
            this.startSound(this.nextSound);
          this.$refs.typer.stopTyping();
          this.stopSound(this.scrobbleSound);
          this.typing = false;
        }
        else {
          this.messageIndex++;
          this.startSound(this.scrobbleSound);
          this.typing = true;
        }
      },
    }
  }
</script>