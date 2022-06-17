import router from './src/sign-store'
import {useUserStore} from '~/sign-store'
import {validateTokenUser} from '~/core'


// vue.js가 아닌 컴포넌트에서 store를 활용하는 방법 .

router.beforeEach(async (to)=>{
  const userStore = useUserStore()
  
  if(to.meta.auth) {
  
  const user = await validateTokenUser()
    if(user.email === 'admin@kdt.com' && user.displayName ==='admin') {
      return '/admin'
    }
    if(user && user.email){
      userStore.user = user
      return true
    }
    return '/signin'
  }
  return true
})


// main.js
import './routes/RouteGuard'

