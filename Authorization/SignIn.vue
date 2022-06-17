<template lang="">
  <div>
    <input
      v-model="email"
      type="text" />
    <input
      v-model="password"
      type="password" />
    <button @click="signin">
      Log-In
    </button>
  </div>
</template>
<script>
import { mapStores } from 'pinia'
import {useUserStore} from '~/sign-store'
export default {
  data() {
    return {
      email:'',
      password:''
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
      async signIn() {
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        header: {
          'content-type':'application/json',
          apikey:'key',
          username:'4조',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        })
      })
      const {user, accessToken} = await res.json()
      window.localStorage.setItem('token',accessToken)
      this.userStore.user = user
    }
  }
}
</script>
<style lang="">
  
</style>
