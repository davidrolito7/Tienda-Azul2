import { ref } from "vue";

class AuthService {
    constructor() {
        this.jwt = ref('')
        this.error = ref('')
    }

    getJwt() {
        return this.jwt
    }
    getError() {
        return this.error
    }

    async login(username, password) {
        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const response = await res.json()

            if ('errors' in response) {
                this.error = "Login failed"
                return false
            }
            this.jwt = response.data.token
            return true
        } catch (error) {
            console.log(error);
        }
    }
}
