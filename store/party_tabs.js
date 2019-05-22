export const state = () => ({
    list: [
        { name: "All", value: 'all',active:true},
        { name: "일일호프", value: '.party1',active:false}, 
        { name: "파티", value: '.party2',active:false}, 
        { name: "페스티벌", value: '.party3',active:false},
        { name: "공연", value: '.party4',  active:false}, 
      ],
  })
  
  export const mutations = {
    add (state, tab) {
      state.list.push({
        name: name,
        active: false
      })
    },
    delete (state, { tab }) {
      state.list.splice(state.list.indexOf(tab), 1)
    },
    toggle (state, tab) {
      state.list.forEach(function(x) {
        x.active = false;
      })
      tab.active = true;
    }
  }