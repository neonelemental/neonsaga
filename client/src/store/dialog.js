const state = {
  dialogMessages: [
    // "This is a message, welcome to the game!  It's wonderful to have you, soon we will be playing the game...",
    // "To continue, select a character and give it a name, then we can start playing."
  ],
  dialogSelectOptions: [
    // { label: "Yes", value: true },
    // { label: "No", value: false },
  ],
  playerMenuOpen: false,
};

const getters = {};

const actions = {
  closeDialog (context) {
    context.state.dialogMessages = [];
  },
  togglePlayerMenuOpen (context) {
    context.state.playerMenuOpen = !context.state.playerMenuOpen;
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