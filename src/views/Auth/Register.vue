<!-- Register.vue -->
<template>
    <div class="register-container">
        <h2>Register</h2>
        <form @submit.prevent="registerUser">

            <AlertError :form="form" message="There were some problems with your input." />

            <input type="text" placeholder="Full Name" class="input-field" v-model="form.name" required />
            <HasError :form="form" field="name" />

            <input type="email" placeholder="Email" class="input-field" v-model="form.email" required/>
            <HasError :form="form" field="email" />

            <input type="password" placeholder="Password" class="input-field" v-model="form.password" required/>
            <HasError :form="form" field="password" />

            <button type="submit" class="submit-button">Register</button>

        </form>

        <p class="login-link">Already have an account? <router-link to="/login">Login</router-link></p>

        <notifications />
    </div>
</template>

<script>
    import axios from 'axios';
    import Form from 'vform'
    import {AlertError, AlertErrors, AlertSuccess, Button, HasError} from "vform/src/components/bootstrap5";
    export default {
        name: 'Register',
        components: { Button, HasError, AlertError, AlertErrors, AlertSuccess},
        data() {
            return {
                form: new Form({
                    name: '',
                    email: '',
                    password: '',
                }),
            };
        },
        methods: {
            registerUser() {
                this.form.post('/register')
                    .then((response) => {
                        if (this.form.successful) {
                            this.$notify({
                                type: "success",
                                title: "Success",
                                text: "Successfully Registered",
                            });
                            console.log(response)
                            this.$router.push({name: 'app.login'})
                        }else{
                            this.$notify({
                                type: "error",
                                title: "Error",
                                text: "Something went wrong try again later",
                            });
                        }
                        console.log(response)
                    })
                    .catch((e) => {
                        console.error(e);
                    });

                this.form.post('/login')
                    .then((response) => {
                        if (this.form.successful) {
                            this.$notify({
                                type: "success",
                                title: "Success",
                                text: "Successfully LoggedIn",
                            });
                            console.log(response)
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
    .register-container {
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


    .login-link {
        text-align: center;
        color: #666;
        font-size: 14px;
    }


    .login-link a {
        color: #3f51b5;
        font-weight: bold;
        text-decoration: none;
    }


    .login-link a:hover {
        text-decoration: underline;
    }
</style>