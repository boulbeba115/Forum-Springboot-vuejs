<template>
<div>
    <div class="main-div">
        <navBar />

        <div class="login-container">
            <div class="login-form">
                <img src="../assets/img/UserLogo.png" v-bind:class="{ 'logo-SignIn': lSignIn, 'logo-signUp': lSignUp }" alt="" />
                <a @click="switching()" @mouseover="animate(0)" @mouseleave="animate(1)" class="sign-Up animate__animated" v-bind:class="{
            animate__bounceInDown: bounce,
            animate__heartBeat: shake,
          }">{{ SignVal }}</a>
                <div id="singIn" v-if="isSing" class="animate__animated animate__flipInX" style="margin-top: 36px">
                    <h4 class="login-title">Login</h4>
                    <form style="margin: 0 auto; width: fit-content; text-align: center">
                        <div class="control-form">
                            <i class="fa fa-user-o user-ico" aria-hidden="true"></i>
                            <input class="form-Inputs" v-bind:class="{ errorField: validateLoginName }" v-model="userform.login" type="text" placeholder="UserName" />
                            <template v-if="validateLoginName">
                                <br />
                                <span class="errorMsg" style="margin-left: 20px;">The UserName is empty</span>
                            </template>
                        </div>
                        <div class="control-form">
                            <i class="fa fa-lock pass-ico" style="position: relative; top: 2px" aria-hidden="true"></i>
                            <input class="form-Inputs" @keyup.enter="login()" v-bind:class="{ errorField: validateLoginPass }" v-model="userform.userPassword" type="password" placeholder="Password" />
                            <template v-if="validateLoginPass">
                                <br />
                                <span class="errorMsg" style="margin-left: 20px;">The password field is empty</span>
                            </template>
                        </div>
                        <div class="stayConn">
                            <el-checkbox v-model="userform.stayConnected">Stay Connected</el-checkbox>
                        </div>
                        <a v-if="!disableLogin" class="login-btn" @click="login()"><i class="fa fa-chevron-right login-icon" aria-hidden="true"></i></a>
                        <el-button v-else style="margin-bottom: 3%;" type="success" :loading="true" circle></el-button>
                    </form>
                </div>
                <div id="singUp" v-else style="padding-top: 51px;" class="animate__animated animate__flipInY">
                    <h4 class="login-title">Sing-Up</h4>
                    <form style="margin: 0 auto; width: fit-content; text-align: center">
                        <div class="container-fluid">
                            <div class="row" v-if="!userSignIn.isAnonym">
                                <div class="col-sm-6">
                                    <div class="control-form">
                                        <i class="fa fa-user pass-ico" aria-hidden="true"></i>
                                        <input v-bind:class="{ errorField: validFirstName }" class="form-Inputs" v-model="userSignIn.firstName" type="text" placeholder="FirstName" />
                                        <template v-if="validFirstName">
                                            <br />
                                            <span class="errorMsg">This Field Is empty</span>
                                        </template>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="control-form">
                                        <i class="fa fa-user-o pass-ico" aria-hidden="true"></i>
                                        <input v-bind:class="{ errorField: validLastName }" class="form-Inputs" v-model="userSignIn.lastName" type="text" placeholder="LastName" />
                                        <template v-if="validLastName">
                                            <br />
                                            <span class="errorMsg">This Field Is empty</span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="control-form">
                                        <i class="fa fa-user-circle-o pass-ico" aria-hidden="true"></i>
                                        <input v-bind:class="{ errorField: validUserName }" class="form-Inputs" v-model="userSignIn.userName" type="text" placeholder="UserName" />
                                        <template v-if="validUserName">
                                            <br />
                                            <span class="errorMsg">This Field Is empty</span>
                                        </template>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="control-form">
                                        <input v-bind:class="{ errorField: validBirthDate }" type="date" class="form-Inputs" v-model="userSignIn.birthDate" />
                                        <template v-if="validBirthDate">
                                            <br />
                                            <span class="errorMsg">You need to Pick a Birth Date</span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="control-form" style="text-align: left">
                                        <i class="fa fa-envelope-open pass-ico" aria-hidden="true"></i>
                                        <input v-bind:class="{ errorField: validUserMail }" type="email" style="width: 100%" class="form-Inputs" placeholder="Email" v-model="userSignIn.userMail" />
                                        <template v-if="validUserMail">
                                            <br />
                                            <span class="errorMsg">The Email is empty or not valid</span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="control-form">
                                        <i class="fa fa-lock pass-ico" aria-hidden="true"></i>
                                        <input class="form-Inputs" v-bind:class="{ errorField: validPassword }" v-model="userSignIn.userPassword" type="password" placeholder="Password" />
                                        <template v-if="validPassword">
                                            <br />
                                            <span class="errorMsg">You need to enter a password</span>
                                        </template>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <el-checkbox style="position: relative; top: 31px" v-model="userSignIn.isAnonym">Sign Up As anonymous</el-checkbox>
                                </div>
                            </div>
                        </div>

                        <a v-if="!disableRegister" @click="register()" class="login-btn"><i class="fa fa-chevron-right login-icon" aria-hidden="true"></i></a>
                        <el-button style="margin-bottom: 3%;" v-else type="success" :loading="true" circle></el-button>
                    </form>
                </div>
            </div>
        </div>
        <backfooter />
    </div>
</div>
</template>

<script>
import "../assets/css/login.css";
import axios from "axios";
import navBar from "@/components/navbar.vue";
import backfooter from "@/components/footer.vue";
export default {
    components: {
        navBar,
        backfooter,
    },
    data() {
        return {
            userform: {
                login: "",
                userPassword: "",
                stayConnected: true,
            },
            validateLoginName: false,
            validateLoginPass: false,
            disableLogin: false,
            disableRegister: false,
            userSignIn: {
                firstName: "",
                lastName: "",
                userName: "",
                userMail: "",
                birthDate: "",
                userPassword: "",
                isAnonym: true,
            },
            /* Animations & Styles */
            isSing: true,
            bounce: true,
            shake: false,
            lSignIn: true,
            lSignUp: false,
            SignVal: "Sign-Up",
            /* Validations */
            validFirstName: false,
            validLastName: false,
            validUserName: false,
            validUserMail: false,
            validBirthDate: false,
            validPassword: false,
            banned: false
        };
    },
    beforeCreate() {
        if (sessionStorage.getItem("user"))
            this.$router.push("/")
        else if (localStorage.getItem("user"))
            this.$router.push("/")
    },
    created() {
        if (this.$router.currentRoute.name != "Login") {
            this.switching();
        }
    },
    watch: {
        $route(to, from) {
            if (this.banned) {
                this.$router.push("/banned").catch(error => {
                    return
                });
            }
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
            this.disableLogin = true
            axios.post("http://localhost:8070/api/users/login", user)
                .then((response) => {
                    let res = response.data
                    this.disableLogin = false
                    this.banned = res.banned
                    this.checkAdmin(res)
                })
                .catch((error) => {
                    this.disableLogin = false
                    this.$notify.error({
                        title: 'Error',
                        message: 'Check the login and password',
                    });
                })
        },
        register() {
            if (this.validateForm())
                this.addUser(this.userSignIn);
        },
        validateForm() {

            if (this.userSignIn.firstName == "" && !this.userSignIn.isAnonym)
                this.validFirstName = true
            else
                this.validFirstName = false
            if (this.userSignIn.lastName == "" && !this.userSignIn.isAnonym)
                this.validLastName = true
            else
                this.validLastName = false
            if (this.userSignIn.userName == "")
                this.validUserName = true
            else
                this.validUserName = false
            if (!this.ValidateEmail(this.userSignIn.userMail))
                this.validUserMail = true
            else
                this.validUserMail = false
            if (this.userSignIn.birthDate == "")
                this.validBirthDate = true
            else
                this.validBirthDate = false
            if (this.userSignIn.userPassword == "")
                this.validPassword = true
            else
                this.validPassword = false
            if (this.validFirstName, this.validLastName || this.validUserName || this.validUserMail || this.valid4BirthDate || this.validPassword)
                return false
            return true
        },
        addUser(user) {
            this.disableRegister = true
            axios
                .post("http://localhost:8070/api/users", user)
                .then((response) => {
                    let id = response.data
                    this.disableRegister = false
                    localStorage.setItem("user", id)
                    this.$router.push("/")
                    this.$notify({
                        title: 'Account Registred Successfully',
                        type: 'success',
                        duration: 1000
                    });
                })
                .catch((error) => {
                    this.$notify.error({
                        title: 'Error',
                        type: 'The Minimal size of Username is 5 caracters',
                        duration: 1000
                    });
                    this.disableRegister = false
                });
        },
        ValidateEmail(mail) {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
                return (true)
            }
            return (false)
        },
        animate(n) {
            if (!n) {
                this.bounce = false;
                this.shake = true;
            } else {
                this.bounce = false;
                this.shake = false;
            }
        },
        switching() {
            this.isSing = !this.isSing;
            this.lSignIn = !this.lSignIn;
            this.lSignUp = !this.lSignUp;
            if (!this.isSing) {
                this.SignVal = "Sign-In";
            } else this.SignVal = "Sign-Up";
        },
        checkAdmin(res) {
            if (this.userform.stayConnected)
                localStorage.setItem("user", res.userId)
            else
                sessionStorage.setItem("user", res.userId)
            if (res.banned) {
                location.replace("/")
                this.$notify.error({
                        title: 'You are Banned',
                        type: 'success',
                        duration: 1000
                    });
                return
            } else {
                if (res.role == 'ROLE_ADMIN' || res.role == 'ROLE_MODERATOR') {
                    this.$notify({
                        title: 'LoggedIn Successfully',
                        type: 'success',
                        duration: 1000
                    });
                    location.replace("/dashBoard/users")
                    return
                } else {
                    this.$router.push("/")
                }

            }
            this.disableRegister = false

            this.$notify({
                title: 'LoggedIn Successfully',
                type: 'success',
                duration: 1000
            });

        }
    },
};
</script>

<style>
div#singIn {
    padding-top: 50px;
    margin-top: 0 imp !important;
}
</style>
