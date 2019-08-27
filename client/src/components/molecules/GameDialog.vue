<template>
  <dialog-pane>
    <text-writer
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
        })
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
      },
    }
  }
</script>