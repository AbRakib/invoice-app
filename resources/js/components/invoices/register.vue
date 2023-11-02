<template>
    <div class="container">
        <div class="row my-5">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <form class="card shadow" @submit.prevent="registerUser">
                    <div class="card-header text-center fw-bold">
                        <img class="img-fluid my-3" src="./assets/img/logo.png" alt="logo">
                        Registration Page
                    </div>
                    <div class="card-body">
                        <div>
                            <label for="name">Name</label>
                            <input type="text" id="name" placeholder="Your name" class="form-control" v-model="user.name">
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input type="email" id="email" placeholder="example@gmail.com" class="form-control" v-model="user.email">
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <input type="password" id="password" class="form-control" v-model="user.password">
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <button type="submit" class="btn btn-success btn-sm rounded-0 text-light shadow fw-bold px-3">Register</button>
                    </div>
                    <div class="p-2 text-center fw-bold">
                        If you have already account then 
                        <router-link to="/">Login</router-link>
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
                    name: '',
                    email: '',
                    password: '',
                },
            };
        },
        methods: {
            async registerUser() {
                try {
                    const response = await axios.post('/api/register', this.user);
                    // Handle the response from the Laravel backend
                    if (response.data) {
                        // Registration was successful, you can redirect or show a success message.
                        console.log(response.data);
                        router.push('/');
                    } else {
                        // Registration failed, handle errors (e.g., show error messages).
                        console.log(response);
                    }
                } catch (error) {
                    // Handle network errors, such as no connection to the backend.
                    console.error(error);
                }
            },
        },
    };
</script>

