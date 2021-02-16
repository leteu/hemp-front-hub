import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

// import home from './home.module'
import auth from './auth.module'
// import article from './article.module'
// import profile from './profile.module'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  modules: {
    // home,
    auth,
    // article,
    // profile
  }
})
