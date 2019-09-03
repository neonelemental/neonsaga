<template>
  <div
    class="game-board"
    v-shortkey="{ up: ['w'], down: ['s'], left: ['a'], right: ['d'] }"
    @shortkey="handlePlayerMovement"
  >
    <div class="sprite-row" v-for="y in tilesY" :key="`row-${y}`">
      <sprite-container
        v-for="x in tilesX"
        :x="x"
        :y="y"
        :key="`sprite-container-${x}-${y}`"
      >
        <player
          v-if="currentPosition[0] === x && currentPosition[1] === y"
          disposition="front"
        />
      </sprite-container>
    </div>
  </div>
</template>

<script>
  import { NUM_TILES_X, NUM_TILES_Y } from "@/constants";
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        tilesY: [...new Array(NUM_TILES_Y)].map((_, y) => y),
        tilesX: [...new Array(NUM_TILES_X)].map((_, x) => x)
      }
    },
    computed: {
      ...mapState('gameBoard', {
        currentPosition: state => state.currentPosition,
      }),
    },
    methods: {
      ...mapActions('gameBoard', ['movePlayer']),
      handlePlayerMovement(event) {
        this.movePlayer(event.srcKey);
      }
    }
  }
</script>