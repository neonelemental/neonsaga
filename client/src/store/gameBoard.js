import {
  NUM_TILES_Y,
  NUM_TILES_X,
} from "@/constants";
import PlayerMovement from "@modules/PlayerMovement";

let gameBoard = {};
[...new Array(NUM_TILES_Y)].forEach((_, y) => {
  gameBoard[y] = {};
  [...new Array(NUM_TILES_X)].forEach((_, x) => {
     gameBoard[y][x] = [];
  });
});

const state = {
  gameBoard,
  currentPosition: [0,0],
  currentDirection: 'down',
  lastPlayerMovementUpdate: new Date(),
  moving: false,
  consecutiveStepsInDirection: 0,
};

const getters = {};

const actions = {
  movePlayer (context, direction) {
    if(context.rootState.dialog.playerMenuOpen || context.rootState.dialog.dialogMessages.length)
      return;

    return new PlayerMovement({
      direction,
      currentDirection: context.state.currentDirection,
      currentPosition: context.state.currentPosition,
      lastPlayerMovementUpdate: context.state.lastPlayerMovementUpdate,
      consecutiveStepsInDirection: context.state.consecutiveStepsInDirection,
    })
      .nextPosition()
      .then(({ nextPosition, consecutiveStepsInDirection }) => {
        context.state.currentDirection = direction;
        context.state.currentPosition = nextPosition;
        context.state.lastPlayerMovementUpdate = new Date();
        context.state.consecutiveStepsInDirection = consecutiveStepsInDirection;
      })
      .catch(()=>{}) // nothing.  the movement was rejected.
  }
};

const mutations = {};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};