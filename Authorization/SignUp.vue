
<!-- index.js -->

<!-- app.vue -->

<template>
  <h1></h1>
</template>

<!-- signup.vue -->
<template>
  required: email,password, displayname
  <div>
  <input
  v-model="email"
  type="text" />
  </div>
  <div>
  <input
  v-model="password"
  type="password" />
  </div>
  <div>
  <input
  v-model="displayName"
  type="text" />
  </div>
  <button @click="signUp">
  Sign-Up
  </button>
</template>

<script>
import {mapStores} from 'pinia'
import { useUserStore } from '../sign-store'
export default{
  data(){
    return {
      email:'',
      password:'',
      displayName:''
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    async signUp() {
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        header: {
          'content-type':'application/json',
          apikey:'q',
          username:'4조',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
          displayName: this.displayName 
        })
      })
      const {user, accessToken} = await res.json()
      window.localStorage.setItem('token',accessToken)
      this.userSotre.user = user
    }
  }
}
</script>
