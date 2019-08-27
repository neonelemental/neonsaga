<template>
  <game-layout>
    <div class="game">
      <fade-transition>
        <game-dialog v-if="dialogMessages.length" :messages="dialogMessages"/>
      </fade-transition>
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