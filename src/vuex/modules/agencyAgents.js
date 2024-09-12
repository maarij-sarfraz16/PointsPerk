import agencyAgents from '../../demoData/agencyAgentsData.json';

const state = () => ({
  agencyAgentsData: '',
  filteredData: null,
});

const getters = {
  getAgencyAgentsData: (state) => state.agencyAgentsData,
  getFilteredAgencyData: (state) => state.filteredData,
};

const mutations = {
  setAgencyData(state, res) {
    state.agencyAgentsData = res;
  },
  setFilteredData(state, filteredData) {
    state.filteredData = filteredData;
  },
};

const actions = {
  fetchAgencyAgentsData({ commit }) {
    commit('setAgencyData', agencyAgents);
  },

  filterAgencyAgentsData({ commit, state }, { searchTerm, status }) {
    let filteredAgentsData = state.agencyAgentsData;

    if (searchTerm) {
      filteredAgentsData = filteredAgentsData.filter((agent) => {
        const agentValues = Object.values(agent)
          .concat(Object.values(agent.agency || {}))
          .map((value) => (typeof value === 'string' ? value.toLowerCase() : ''));

        return agentValues.some((value) => value.includes(searchTerm.toLowerCase()));
      });
    }

    if (status && status !== 'Status') {
      filteredAgentsData = filteredAgentsData.filter((agent) => agent.status === status);
    }

    commit('setFilteredData', filteredAgentsData.length ? filteredAgentsData : null);
  },
  addNewAgent({ commit, state }, newAgent) {
    const emailExists = state.agencyAgentsData.some((agent) => agent.email === newAgent.email);

    if (emailExists) {
      return Promise.reject('Agent with this email already exists.');
    }

    const newAgencyAgentsData = [...state.agencyAgentsData];
    newAgencyAgentsData.push(newAgent);

    commit('setAgencyData', newAgencyAgentsData);

    return Promise.resolve();
  },

  deleteUser({ commit, state }, id) {
    const updatedData = state.agencyAgentsData.filter((agent) => agent.id !== id);
    commit('setAgencyData', updatedData);
  },

  editUser({ commit, state }, updatedAgent) {
    const existingAgentIndex = state.agencyAgentsData.findIndex((agent) => agent.id === updatedAgent.id);

    if (existingAgentIndex === -1) {
      return Promise.reject('Agent not found.');
    }

    const duplicateEmail = state.agencyAgentsData.some(
      (agent) => agent.email === updatedAgent.email && agent.id !== updatedAgent.id,
    );

    if (duplicateEmail) {
      return Promise.reject('Agent with this email already exists.');
    }

    const updatedData = [...state.agencyAgentsData];
    updatedData[existingAgentIndex] = updatedAgent;

    commit('setAgencyData', updatedData);

    return Promise.resolve();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
