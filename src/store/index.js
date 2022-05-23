import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const url = Vue.prototype.hostname;

export default new Vuex.Store({
  state: {
    marks: [],
    token: ''
  },
  mutations: {
    SET_MARKS_TO_STATE: (state, marks) => {
      state.marks = marks;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },
  actions: {
    GET_MARKS_FROM_API({ commit }) {
      return axios(url + "/api/positions", {
        method: "GET",
      })
        .then((marks) => {
          commit("SET_MARKS_TO_STATE", marks);
          console.log(marks);
          return marks;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
  },
  getters: {
    MARKS(state) {
      return state.marks;
    },
    TOKEN: state => {
      return this.state.token;
    }
  },
});
