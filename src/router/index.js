import Vue from 'vue'
import VueRouter from 'vue-router'
import ApiService from '../common/api.service'
import ErrorFilter from '../common/error.filter'
import store from '../store/index'
import { CHECK_AUTH } from '../store/actions.type'
import routes from './routes'

Vue.filter('error', ErrorFilter)

ApiService.init()

Vue.use(VueRouter)


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const Router = new VueRouter({
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({y: 0}),
  routes
})

Router.beforeEach(
  (to, from, next) => {
    return Promise
      .all([store.dispatch(CHECK_AUTH)])
      .then(next)
  }
)

export default Router
