<template>
    <div class="container">
        <div class="row my-5">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <form class="card shadow" @submit.prevent="loginUser" method="post">
                    <div class="card-header text-center fw-bold">
                        <img class="img-fluid my-3" src="./assets/img/logo.png" alt="logo">
                        Login Page
                    </div>
                    <div class="card-body">
                        <p class="text-center text-danger"  v-if="errorMessage">*| {{ errorMessage }} |*</p>
                        <div>
                            <label for="email">Email</label>
                            <input type="email" id="email" placeholder="example@gmail.com" class="form-control" v-model="user.email" required>
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <input type="password" id="password" class="form-control" v-model="user.password" required>
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <button type="submit" class="btn btn-success fw-bold px-5 btn-sm rounded-0 text-light">Login</button>
                    </div>
                    <div class="p-2 text-center fw-bold">
                        If you have no account then 
                        <router-link to="/register">Register</router-link>
                        here
                    </div>
                </form>
            </div>
            <div class="col-md-4"></div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import router from "../../router";
    export default {
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                },
                errorMessage: '',
            };
        },
        methods: {
            async loginUser() {
                try {
                    const response = await axios.post('/api/login', this.user);
                    // Handle the response from the Laravel backend
                    if (response.data.success == true) {
                        // Registration was successful, you can redirect or show a success message.
                        console.log(response.data);
                        localStorage.setItem('token', response.data.data.token);
                        localStorage.setItem('name', response.data.data.name);
                        router.push('/invoices');
                    } else if(response.data.success == false){
                        console.log(response.data.message);
                        this.errorMessage = (response.data.message);
                    } else {
                        // Registration failed, handle errors (e.g., show error messages).
                        console.log(response.data);
                        this.errorMessage = response.data.message;
                    }
                } catch (error) {
                    // Handle network errors, such as no connection to the backend.
                    console.error(error);
                    this.errorMessage = error.response.data.message;
                }
            },
        },
    };
</script>

