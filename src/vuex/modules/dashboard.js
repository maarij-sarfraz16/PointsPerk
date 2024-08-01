import widgetsConfig from "@/demoData/widgetConfig.json";

const state = () => ({
  widgetsVisibility: { ...widgetsConfig },
});

const mutations = {
  TOGGLE_WIDGET(state, widget) {
    state.widgetsVisibility[widget] = !state.widgetsVisibility[widget];
  },
};

const actions = {
  toggleWidget({ commit }, widget) {
    commit("TOGGLE_WIDGET", widget);
  },
};

const getters = {
  widgetsVisibility: (state) => state.widgetsVisibility,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
