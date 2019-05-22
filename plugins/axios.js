export default function ({ $axios, store }) {
 $axios.onRequest((config) => {
    try{
      if(store.state.authToken){
        config.headers.common['Authorization'] = 'Token ' + store.state.authToken;
      }
    }
    catch{
      return
    }
 })
}
