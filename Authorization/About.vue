<template lang="">
  <div>
    <h1>{{ userStore.user.email }}</h1>
    <h1>{{ userStore.user.displayName }}</h1>
    <h1 v-if="userStore.user.profileImg">
      {{ userStore.user.profileImg }}
    </h1>
  </div>
</template>
<script>
import {mapStores} from 'pinia'
import { useUserStore } from './sign-store'


export default {
  data(){
    return{
      
    }
  },
  computed: {
    // userStore로 활용 가능
    ...mapStores(useUserStore)
  },
  created: {
    
  },
  methods: {

  }
}
</script>
<style lang="">
  
</style>
