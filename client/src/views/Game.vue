<template>
  <game-layout>
    <div class="game">
      <game-dialog
        :messages="dialogMessages"
      />
    </div>
  </game-layout>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState('dialog', {
        dialogMessages: state => state.dialogMessages
      })
    }
  }
</script>