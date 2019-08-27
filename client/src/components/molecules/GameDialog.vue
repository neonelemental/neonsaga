<template>
  <dialog-pane>
    <text-writer
      v-shortkey="['enter']"
      @shortkey.native="nextMessage()"
      ref="textWriter"
      class="text-writer"
      tag="h3"
      :text="text"
      @doneWriting="doneWriting"
    />
  </dialog-pane>
</template>

<script>
  import nextSound from '@sounds/action.mp3';
  import dialogSound from '@sounds/dialog.wav';
  import Sound from '@utils/sound';
  import { mapActions } from 'vuex';

  export default {
    props: {
      messages: {
        type: Array,
        required: true
      }
    },
    mounted () {
      this.startWriting();
    },
    data () {
      return {
        messageIndex: 0,
        scrobbleSound: new Sound({
          src: [ dialogSound ],
          autoplay: true,
          loop: true,
          volume: 1.5,
        }),
        nextSound: new Sound({
          src: [ nextSound ],
          autoplay: false,
          loop: false,
          volume: 0.1,
        }),
        typing: false,
        dialogOver: false,
      }
    },
    computed: {
      text () {
        return this.messages[this.messageIndex];
      },
      lastMessage () {
        return this.messageIndex === this.messages.length -1;
      },
    },
    methods: {
      ...mapActions('dialog', ['closeDialog']),
      nextMessage () {
        if(this.typing) // We're stopping the typing, so provide audio feedback.
          this.startSound(this.nextSound);
        if(this.dialogOver) // We've seen the last dialog message, so close the dialog box.
          return this.closeDialog();

        if(this.lastMessage || this.typing) { // the user wants to skip the message being written.
          this.$refs.textWriter.stopTyping();
          this.doneWriting();
        }
        else { // the user has requested the next message in the queue to be written.
          this.messageIndex++;
          this.startWriting();
        }
      },
      doneWriting () {
        if(this.lastMessage)  // Let the rest of the dialog component know there are no more messages to show.
          this.dialogOver = true;
        this.typing = false;
        this.stopSound(this.scrobbleSound);
      },
      startWriting () {
        this.startSound(this.scrobbleSound);
        this.typing = true;
      },
    }
  }
</script>