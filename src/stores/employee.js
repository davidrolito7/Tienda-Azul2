import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed } from 'vue'
import axios from 'axios'


export const useEmployeeStore = defineStore('employee', () => {
    const state = {
        fullname: "",
        curp: "",
        rfc: "",
        phone: "",
        id: null,
        email: "",
        salary: 0
    }
    const setEmployee = (token) => {
        axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `/api/auth/profile-user`
        }).then((result) => {
            const employee = result.data.employee
            if (!employee) return;
            state.curp = employee.curp
            state.email = employee.email
            state.fullname = employee.fullname
            state.id = employee.id
            state.phone = employee.phone
            state.rfc = employee.rfc
            state.salary = employee.salary
        }).catch((err) => {
            console.log(err);
        });
    }

    const getEmployee = computed(() => {
        return state
    })

    function $reset() {
        state.fullname = ""
        state.curp = ""
        state.rfc = ""
        state.phone = ""
        state.id = null
        state.email = ""
        state.salary = 0
    }

    return { state, setEmployee, getEmployee, $reset }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useEmployeeStore, import.meta.hot))
}
