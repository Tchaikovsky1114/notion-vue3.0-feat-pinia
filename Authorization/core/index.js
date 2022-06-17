export const validateTokenUser = async() => {
  const accessToken = window.localStorage.getItem('token')
    const res = await fetch('/api/auth/me',{
      method:'POST',
      headers:{
        Authorization: `Bearer ${accessToken}`
      },
    })
    return await res.json()
}
