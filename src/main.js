import Vue from 'vue'
import App from './App'
import {router} from './router'
import moment from 'moment'
import NProgress from 'NProgress'

Vue.prototype.moment = moment
Vue.config.productionTip = false
NProgress.configure({ showSpinner: false })

// Create the event bus by creating a new Vue instance and
// binding it somehwere accessible. If you bind it to the
// Vue prototype, you can access it within your components
// like this:
//
// Emit an event
// this.$bus.$emit('myEvent', {data: true})
//
// React to an event
// this.$bus.$on('myEvent', (message) => {console.log(message})
Vue.prototype.$bus = new Vue({})

/* eslint-disable no-new */
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default app
