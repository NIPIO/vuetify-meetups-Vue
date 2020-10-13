import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	loadedMeetups: [
  	],
  	user: {
  		mail: '',
  	}
  },
  //NUNCA CORRER METODOS ASINCRÓNICOS EN MUTATIONS. SOO EN ACTIONS.
  mutations: {
    createMeetup(state,payload) {
      state.loadedMeetups.push(payload)
    },
    saveUserLogged (state, loggedUser) {
      state.user.mail = loggedUser.mail
    }
  },
  actions: {
    
  },
  modules: {
  },
  getters: {
  	loadedMeetups(state) {
      firebase.database().ref("meetups").once('value').then((data) => {
          state.loadedMeetups = data.val()
      });
      return state.loadedMeetups
  	},
  	loadMeetup(state) {
  		return (meetupId) => {
        console.log(state.loadedMeetups)
         let filtered = state.loadedMeetups.filter((el) => {
               console.log(el)
              })  			// return state.loadedMeetups.find((meetup) => {
  				// return meetup.place === meetupId
  			// })
  		}
  	},
    //checkeo de usuerio
    getUser(state) {
        return state.user.mail
    }
  },
})
