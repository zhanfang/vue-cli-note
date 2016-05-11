import Login from './components/Login'
import Register from './components/Register'
import Index from './components/Index'

export default function (router) {
  router.map({
    '/login': {
      component: Login
    },
    '/register': {
      component: Register
    },
    '/index': {
      component: Index
    }
  })
}
