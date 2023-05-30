<!-- Login.vue -->
<template>
    <div class="login-container" id="form">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <AlertError :form="form" message="There were some problems with your input." />

            <input type="email" v-model="form.email" placeholder="Email" class="input-field" />
            <HasError :form="form" field="email" />

            <input type="password" v-model="form.password" placeholder="Password" class="input-field" />
            <HasError :form="form" field="password" />

            <button type="submit" class="submit-button">Login</button>

        </form>

        <p class="signup-link">Don't have an account? <router-link to="/register">Register</router-link></p>

        <notifications />
    </div>
</template>

<script>
    import axios from 'axios';
    import Form from "vform";
    import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from 'vform/src/components/bootstrap5'
    export default {
        name: 'Login',
        components: { Button, HasError, AlertError, AlertErrors, AlertSuccess},
        data() {
            return {
                form: new Form({
                    email: '',
                    password: '',
                }),
            };
        },
        methods: {
            login() {
                this.form.post('/login')
                    .then((response) => {
                        if (this.form.successful) {
                            this.$notify({
                                type: "success",
                                title: "Success",
                                text: "Successfully LoggedIn",
                            });

                            // Store the token in local storage
                            localStorage.setItem('token', response.data.token);

                            this.$router.push({name: 'app.dashboard'})
                        }else{
                            this.$notify({
                                type: "error",
                                title: "Error",
                                text: "Something went wrong try again later",
                            });
                        }
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            },
        },
    };
</script>

<!-- main.css -->
<style>
    .login-container {
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #fff;
        animation: fade-in 0.5s ease-in-out; /* Add a fade-in animation */
    }

    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    h2 {
        text-align: center;
        color: #333;
        font-size: 24px;
        margin-bottom: 20px;
    }

    form {
        margin-bottom: 20px;
    }

    .input-field {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .submit-button {
        width: 100%;
        padding: 10px;
        background-color: #3f51b5;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out; /* Add a smooth background color transition */
    }

    .submit-button:hover {
        background-color: #2c387e;
    }

    .signup-link {
        text-align: center;
        color: #666;
        font-size: 14px;
    }

    .signup-link a {
        color: #3f51b5;
        font-weight: bold;
        text-decoration: none;
    }

    .signup-link a:hover
    {
        text-decoration: underline;
    }
</style>