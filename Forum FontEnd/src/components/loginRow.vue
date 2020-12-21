<template>
<div>
    <div id="headers" style="margin-bottom: 2%;">
        You must be logged in to create new topics.
    </div>
    <div class="login-from-shortcut">
        <fieldset>
            <legend>
                Log In
            </legend>
            <div class="">
                <label for="user_login">
                    Username:
                </label>
                <input v-bind:class="{ errorField: validateLoginName }" v-model="userform.login" type="text" class="input-login" autocomplete="off">
                <template v-if="validateLoginName">
                    <br />
                    <span class="errorMsg" >The UserName is empty</span>
                </template>
            </div>
            <div class="">
                <label for="user_pass">
                    Password:
                </label>
                <input @keyup.enter="login()" v-bind:class="{ errorField: validateLoginPass }" v-model="userform.userPassword" type="password" class="input-login">
                <template v-if="validateLoginPass">
                    <br />
                    <span class="errorMsg" >The password field is empty</span>
                </template>
            </div>
            <div class="">
                <el-checkbox v-model="userform.stayConnected">Keep me signed in</el-checkbox>
            </div>
            <div class="r">
                <button @click="login()" type="submit" class="login-submits">
                    Log In
                </button>
            </div>
        </fieldset>

    </div>
</div>
</template>

<script>
import axiosBase from '@/views/base.js';
export default {
    data() {
        return {
            userform: {
                login: "",
                userPassword: "",
                stayConnected: true,
            },
            validateLoginName: false,
            validateLoginPass: false,
        }
    },
    methods: {
        login() {

            let countErr = 0
            if (this.userform.login == "") {
                this.validateLoginName = true
                countErr++
            } else
                this.validateLoginName = false

            if (this.userform.userPassword == "") {
                this.validateLoginPass = true
                countErr++
            } else
                this.validateLoginPass = false
            if (countErr > 0)
                return
            let user = {
                userName: this.userform.login,
                userPassword: this.userform.userPassword
            }
            axiosBase.post("users/login", user)
                .then((response) => {
                    let userId = response.data
                    if (this.userform.stayConnected)
                        localStorage.setItem("user", userId)
                    else
                        sessionStorage.setItem("user", userId)
                    location.reload()
                    this.$notify({
                        title: 'Log-In successfully',
                        type: 'success',
                        duration: 1000
                    });
                })
                .catch(() => {
                    this.$notify.error({
                        title: 'Error',
                        message: 'Check the login and password',
                    });
                })
        },
    }

}
</script>

<style>
.errorMsg {
    color: red;
    margin-left: 5px;
    text-transform: capitalize;
}
</style>
