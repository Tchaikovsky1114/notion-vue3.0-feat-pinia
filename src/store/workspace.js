import {defineStore} from 'pinia'
// import router from '~/routes'

export const useWorkspaceStore = defineStore('workspace',{
  state() {
    return {
      workspace: {},
      workspaces:[],
      workspacesLoaded: false,
      currentWorkspacePath: []
    }
  },
  getters:{
    
  },
  actions: {
    //actions = reducers
     async createWorkspace(payload = {}) {
      const {parentId} = payload
   const workspace = await request({
        method:'POST',
        body: {
          parentId,
          title:'',
        }
      })
      this.readWorkspace()
      window.location.href = `/workspaces/${workspace.id}`
    },

    async readWorkspace() {
      
      const workspaces = await request({
        method: 'GET'
      })
      
      this.workspaces = workspaces
      this.workspacesLoaded = true

      if(!this.workspaces.length) {
        this.createWorkspace()
      }
    },



    async readWorkspaceDetail(workspaceId) {
      const workspace = await request({
        method:'GET',
        workspaceId
      })
      this.workspace = workspace

    },

    async updateWorkspaceDetail(payload) {
      const {workspaceId,title,content, poster} = payload
      const updatedWorkspace = await request({
        workspaceId,
        method:'PUT',
        body: {
          title,
          content,
          poster
        }
      })
      this.workspace = updatedWorkspace
      this.readWorkspace()
    },

    
    async deleteWorkspace(workspaceId) {
     await request({
      workspaceId,
      method:'DELETE'
     })
      this.readWorkspace()
    },
    findWorkspacePath(currentWorkspaceId) {
      // 내가 필요로 하는 경로를 currentWorkspaceId에 입력한다.
      // 그  경로의 아래 자식요소(노션 title)들이 재귀를 통해 반환된다.
      
      const find = (workspace, parents) =>{
        if(currentWorkspaceId === workspace.id){
          this.currentWorkspacePath = [...parents, workspace]
        }
        if(workspace.children){
          workspace.children.forEach((ws) =>{
            find(ws, [...parents, workspace])
          })
        }
      }
      this.workspaces.forEach((workspace)=>{
        find(workspace, [])
      })
    }
  }
})

async function request(options) {
  const {workspaceId = '', method,body} = options
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${workspaceId}`,{
        method,
        headers: {
          'content-type':'application/json',
          'apikey': 'FcKdtJs202204',
          'username':'KimMyungSeong'
        },
        body: JSON.stringify(body)
      })
      return res.json()
}
