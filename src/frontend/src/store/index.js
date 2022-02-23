import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);

import user from "@/static/user.json";

import {
  ADD_ENTITY,
  ADD_NOTIFICATION,
  DELETE_ENTITY,
  DELETE_NOTIFICATION,
  SET_ENTITY,
  UPDATE_ENTITY,
} from "./mutation-types";
import { MESSAGE_LIVE_TIME } from "../common/constants";

import { uniqueId } from "lodash";
import VuexPlugins from "../plugins/vuexPlugins";

const state = () => ({
  notifications: [],
  user: {},
});

const mutations = {
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },

  [ADD_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },

  [UPDATE_ENTITY](state, { module, entity, value }) {
    if (module) {
      const index = state[module][entity].findIndex(
        ({ id }) => id === value.id
      );

      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    } else {
      const index = state[entity].findIndex(({ id }) => id === value.id);

      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },

  [DELETE_ENTITY](state, { module, entity, id }) {
    if (module) {
      state[module][entity] = state[module][entity].filter(
        (e) => +e.id !== +id
      );
    } else {
      state[entity] = state[entity].filter((e) => +e.id !== +id);
    }
  },

  [ADD_NOTIFICATION](state, notification) {
    state.notifications = [...state.notifications, notification];
  },

  [DELETE_NOTIFICATION](state, id) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== id
    );
  },
};

const actions = {
  init({ dispatch }) {
    dispatch("fetchUser");
    dispatch("Builder/init");
  },
  async createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };

    commit(ADD_NOTIFICATION, uniqueNotification);

    setTimeout(
      () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
  fetchUser({ commit }) {
    const getUser = user;

    commit(SET_ENTITY, {
      module: null,
      entity: "user",
      value: getUser,
    });
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [VuexPlugins],
  modules,
});
