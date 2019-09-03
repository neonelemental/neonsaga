<template>
  <div :class="`player player-${direction} ${playerClass}`"/>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState('gameBoard', {
        direction: state => state.currentDirection,
        consecutiveStepsInDirection: state => state.consecutiveStepsInDirection,
      }),
      playerClass () {
        switch(this.direction) {
          case 'up':
            return ['player-up-1-1', 'player-up-2-1', 'player-up-3-1', 'player-up-4-1']
              [this.consecutiveStepsInDirection % 4];
          case 'down':
            return ['player-down-1-1', 'player-down-2-1', 'player-down-3-1', 'player-down-4-1']
              [this.consecutiveStepsInDirection % 4];
          case 'left':
            return ['player-left-1-1', 'player-left-2-1', 'player-left-3-1', 'player-left-4-1']
              [this.consecutiveStepsInDirection % 4];
          case 'right':
            return ['player-right-1-1', 'player-right-2-1', 'player-right-3-1', 'player-right-4-1']
              [this.consecutiveStepsInDirection % 4];
        }
      }
    }
  }
</script>

<style>
  .player {

  }
</style>