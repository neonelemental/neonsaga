const state = {
  dialogMessages: [
    "This is a message, welcome to the game!  It's wonderful to have you, soon we will be playing the game...",
    "To continue, select a character and give it a name, then we can start playing."
  ],
  dialogSelectOptions: [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ],
};

const getters = {};

const actions = {
  closeDialog (context) {
    context.commit('clearDialogMessages');
  }
};

const mutations = {
  clearDialogMessages (state) {
    state.dialogMessages = []
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};