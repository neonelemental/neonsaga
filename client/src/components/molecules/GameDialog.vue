<template>
  <div class="game-dialog">
    <dialog-pane/>
    <text-writer
      class="text-writer"
      tag="h3"
      :text="text"
      @doneWriting="stopSound"
    />
  </div>
</template>

<script>
  import dialogSound from '@sounds/dialog.wav';
  import Sound from '@utils/sound';

  export default {
    props: {
      text: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        sound: new Sound({
          src: [ dialogSound ],
          autoplay: true,
          loop: true,
        })
      }
    },
    mounted () {
      this.sound.play();
    },
    methods: {
      stopSound () {
        this.sound.stop();
      },
    }
  }
</script>

<style lang="scss" scoped>
  .dialog-pane {
    position: absolute;
    z-index: 1;
  }

  .text-writer {
    position: absolute;
    z-index: 2;
  }
</style>