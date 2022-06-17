<template lang="">
  <TheHeader />
  <button @click="workspaceStore.createWorkspace">
    생성
  </button>
  <section :key="$route.params.workspaceId">
    <div class="poster">
      <img
        v-if="workspaceStore.workspace.poster"
        :src="workspaceStore.workspace.poster"
        alt="poster" />
      <input
        type="file"
        @change="selectPoster" />
      <button @click="deletePoster">
        이미지 삭제
      </button>
    </div>
    <h1
      ref="title"
      contenteditable
      placeholder="No title"
      @keydown.prevent.enter="$refs.content.focus()"
      @blur="onInput">
      {{ workspaceStore.workspace.title }}
    </h1>
    <p
      ref="content"
      contenteditable
      placeholder="please write content"
      @blur="onInput"
      v-html="workspaceStore.workspace.content">
    </p>
  </section>
</template>
<script>

import {mapStores} from 'pinia'
import {useWorkspaceStore} from '~/store/workspace.js'
import TheHeader from '../components/TheHeader.vue'
export default {
  components:{TheHeader},
  computed: {
    ...mapStores(useWorkspaceStore),
    
  },
  watch: {
    $route() {
      this.workspaceStore.readWorkspaceDetail(this.$route.params.workspaceId)
      this.workspaceStore.findWorkspacePath(this.$route.params.workspaceId)
    }
  },
  created() {
    this.workspaceStore.readWorkspaceDetail(this.$route.params.workspaceId)
  },
  methods: {
    onInput(){
      // contenteditable에서 value 추출하기.
      const title = this.$refs.title.textContent
      const content = this.$refs.content.innerHTML

      if (!title.trim()) {
        this.$refs.title.innerHTML = ''
      }

      if(!this.$refs.content.textContent.trim()) {
        this.$refs.content.innerHTML = ''
      }

      this.workspaceStore.updateWorkspaceDetail({
        workspaceId:this.$route.params.workspaceId,
        title,
        content
      })
    },
    selectPoster(event) {
      const {files} = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load',(e)=>{
          // base64 code
          e.target.result
          this.workspaceStore.updateWorkspaceDetail({
            workspaceId: this.$route.params.workspaceId,
            poster:e.target.result
          })
        })
      }
    },
    deletePoster() {
      this.workspaceStore.updateWorkspaceDetail({
        workspaceId:this.$route.params.workspaceId,
        poster:'-1'
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  [contenteditable] {
    &:empty::before{
      content: attr(placeholder);
      color: #ccc;
    }
  }
</style>
