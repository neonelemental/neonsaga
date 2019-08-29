<template>
  <fade-transition>
    <game-dialog
      v-if="dialogMessages.length"
      :messages="dialogMessages"
      :options="dialogSelectOptions"
    />
    <player-menu
      v-else-if="playerMenuOpen"
      @closePlayerMenu="playerMenuOpen = false"
    />
    <div
      v-else
      v-shortkey="['enter']"
      @shortkey="playerMenuOpen = true"
    />
  </fade-transition>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState('dialog', {
        dialogMessages: state => state.dialogMessages,
        dialogSelectOptions: state => state.dialogSelectOptions
      })
    },
    data () {
      return {
        playerMenuOpen: false,
      }
    },
  }
</script>