<template>
  <fade-transition>
    <game-dialog
      v-if="dialogMessages.length"
      :messages="dialogMessages"
      :options="dialogSelectOptions"
    />
    <player-menu
      v-else-if="playerMenuOpen"
      @closePlayerMenu="togglePlayerMenuOpen"
    />
    <div
      v-else
      v-shortkey="['enter']"
      @shortkey="togglePlayerMenuOpen"
    />
  </fade-transition>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState('dialog', {
        dialogMessages: state => state.dialogMessages,
        dialogSelectOptions: state => state.dialogSelectOptions,
        playerMenuOpen: state => state.playerMenuOpen
      })
    },
    methods: {
      ...mapActions('dialog', ['togglePlayerMenuOpen'])
    }
  }
</script>