<template>
  <dialog-pane>
    <dialog-pickem
      ref="pickem"
      :options="options"
      v-if="showPickem"
      @input="handleConfirmEvent"
    />
    <text-writer
      ref="textWriter"
      v-shortkey="['enter']"
      @shortkey.native="nextMessage()"
      tag="h3"
      v-model="writing"
      :text="text"
    />
  </dialog-pane>
</template>

<script>
  import { sounds, Sound } from '@/sound';
  import { mapActions } from 'vuex';

  export default {
    props: {
      messages: {
        type: Array,
        required: true
      },
      options: {
        type: Array,
        required: false,
        default: () => []
      },
    },
    watch: {
      'writing' (isWriting) {
        if(isWriting)
          this.startSound(this.scrobbleSound);
        else
          this.stopSound(this.scrobbleSound);
      }
    },
    data () {
      return {
        writing: true,
        messageIndex: 0,
        scrobbleSound: new Sound({
          src: [ sounds.dialogSound ],
          autoplay: true,
          loop: true,
          volume: 1.5,
        }),
        nextSound: new Sound({
          src: [ sounds.nextSound ],
          autoplay: false,
          loop: false,
          volume: 0.1,
        }),
      }
    },
    computed: {
      text () {
        return this.messages[this.messageIndex];
      },
      lastMessage () {
        return this.messageIndex === (this.messages.length - 1);
      },
      dialogOver () {
        return this.lastMessage && !this.writing;
      },
      showPickem () {
        return this.dialogOver && this.options.length;
      },
    },
    methods: {
      ...mapActions('dialog', ['closeDialog']),
      nextMessage () {
        this.dialogOver ? this.handleCloseDialogEvent() : this.handleNextMessageEvent();
      },
      handleCloseDialogEvent () {
        if(this.options.length) // The user has to make a confirmation selection.  So trigger selection.
          return this.$refs.pickem.setActive({ srcKey: 'enter' });
        else // The dialog doesn't require confirmation, close the dialog.
          return this.closeDialog();
      },
      handleNextMessageEvent () {
        if(this.writing)  // User has skipped the writing, so provide audio feedback.
          this.startSound(this.nextSound);
        if(this.lastMessage || this.writing) // the user wants to skip the message being written.
          this.$refs.textWriter.stopWriting();
        else // the user has requested the next message in the queue to be written.
          this.messageIndex++;
      },
      handleConfirmEvent (selectedOption) {
        this.startSound(this.nextSound);
        this.$emit('input', selectedOption);
        this.closeDialog();
      },
    },
  }
</script>