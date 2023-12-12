import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('userStore', () => {
    const state = {
        role: "",
        token: null,
        id: null
    }

    const setToken = (token) => {
        state.token = token;
    }
    const setRole = (role) => {
        state.role = role
    }
    const setId = (id) => {
        state.id = id
    }

    const getState = computed(() => {
        return state
    })


    function $reset() {
        state.role = "";
        state.id = null
        state.token = null;
    }


    return { state, setToken, setRole, setId, $reset, getState }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

// export const useUserStore = defineStore('user', {
//     state: () => {
//         return {
//             name: "John Doe",
//         }
//     },
//     getters: {
//         upper: (state)=>state.name.toUpperCase()
//     },
//     actions: {
//         change(name) {
//             this.name=name;
//         }
//     }
// })
