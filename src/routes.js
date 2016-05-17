import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Index from './components/Index/Index'
import Help from './components/Help/Help'
import Todos from './components/Todos/Todos'
import User from './components/User/User'

export default function (router) {
  router.map({
    '/login': {
      component: Login
    },
    '/register': {
      component: Register
    },
    '/': {
      component: Index,
      subRoutes: {
        'todos': {
          component: Todos
        },
        'help': {
          component: Help
        },
        'user': {
          component: User
        }
      }
    }
  })
}
