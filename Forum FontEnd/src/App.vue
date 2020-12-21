<template>
<div id="main">
    <div v-if="currentRoute==false">
        <router-view />
    </div>
    <div v-else>
        <div>
            <div class="dashbord">
                <el-menu default-active="2" class="dashBar" @select="handleSelect" :collapse="isCollapse">
                    <div v-if="!isCollapse" style="text-align:center" class="animate__animated  animate__zoomIn">
                        <img src="@/assets/logoWhite.png" width="150px" class="logoImg" alt="logo">
                        <a class="navbar-brand-2" href="#">FORUMS DASHBOARD </a>
                        <hr class="divider " />
                    </div>
                    <img v-else src="@/assets/swhitelogo.png" class="miniLogo animate__animated  animate__rotateIn" alt="logo">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span slot="title">User Manager</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">User Manager</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-edit-outline "></i>
                            <span slot="title">Posts Manager</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">Posts Managing</el-menu-item>
                            <el-menu-item index="2-2">Replies Managing</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-files "></i>
                            <span slot="title">Categories & Topics Manager</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">Categories Managing</el-menu-item>
                            <el-menu-item index="3-2">Topics Managing</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
                <div style="width:100%">
                    <nav class=" navbar navbar-expand-lg  static-top MenutBar topNavBar">
                        <div class="container">
                            <span v-if="!isCollapse" @click="isCollapse=!isCollapse" class="iconSpan"><i class="fa fa-bars iconStyle"></i></span>
                            <span v-else @click="isCollapse=!isCollapse" class="iconSpan">
                                <i style="padding: 7px 15px;" class="fa fa-ellipsis-v iconStyle"></i>
                            </span>
                            <span>
                                <h3 class="pageTitle">{{currentRt}}</h3>
                            </span>
                            <el-input class="searchInput" placeholder="Type something" prefix-icon="el-icon-search"> </el-input>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon">
                                    <i class="fa fa-bars" style="color:black; font-size:28px;"></i>
                                </span>

                            </button>
                            <div class="collapse navbar-collapse" id="navbarResponsive">
                                <ul class="navbar-nav ml-auto ul-nav-dash ">
                                    <li class="nav-item-dash ">
                                        <a href="/">Go to Form</a>
                                    </li>
                                    <li class="nav-item-dash" style="line-height: 4.8;">
                                        <a class="nav-link" @click="logingOut()" href="#">Logout</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div class="warpper">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-12">
                                    <router-view />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
</template>

<script>
import axiosBase from '@/views/base.js';

export default {
    methods: {

    },
    data() {
        return {
            isCollapse: true,
            banned: false,
            role: ""

        };
    },
    computed: {
        currentRt() {
            return this.$route.name;
        },
        currentRoute() {
            return (this.$route.path.toLowerCase().includes("dashboard"));
        }
    },
    beforeCreate() {
        if (sessionStorage.getItem("user"))
            this.userId = sessionStorage.getItem("user")
        else if (localStorage.getItem("user"))
            this.userId = localStorage.getItem("user")
        else {
            if (this.$route.path.toLowerCase().includes("dashboard")) {
                return this.$router.push("/login")
            }
        }
        if (this.userId) {
            axiosBase.get("/users/check/Status/" + this.userId)
                .then((response) => {
                    let res = response.data

                    this.banned = res.banned
                    console.log(this.banned)
                    this.role = res.role
                    if (this.banned) {
                        this.$router.push("/banned").catch(error => {
                            return
                        });
                    } else {
                        if (this.$route.path.toLowerCase().includes("banned")) {
                            this.$router.push("/").catch(error => {
                                return
                            });
                        } else if (this.$route.path.toLowerCase().includes("dashboard")) {
                            console.log(res.role == 'ROLE_ADMIN')
                            if (!(res.role == 'ROLE_ADMIN' || res.role == 'ROLE_MODERATOR')) {
                                this.currentRoute = false
                                this.$router.push("/NotFound").catch(error => {
                                    return
                                });
                            }

                        }

                    }
                })
                .catch((error) => {
                    return
                })
        }

    },
    created() {
        if (this.currentRoute)
            require("@/assets/css/dashNavBar.css");
    },
    watch: {
        $route(to, from) {
            if (this.banned) {
                this.$router.push("/banned").catch(error => {
                    return
                });
            }
            if (this.$route.path.toLowerCase().includes("dashboard")) {
                if (!(this.role == 'ROLE_ADMIN' || this.role == 'ROLE_MODERATOR')) {
                    this.currentRoute = false
                    this.$router.push("/NotFound").catch(error => {
                        return
                    });
                }
            }

        }
    },
    methods: {
        handleSelect(key, keyPath) {
            switch (key) {
                case "2-1":
                    this.$router.push("/dashBoard/posts").catch(() => {})
                    break;
                case "3-1":
                    this.$router.push("/dashBoard/category").catch(() => {})
                    break;
                case "3-2":
                    this.$router.push("/dashBoard/topics").catch(() => {})
                    break;
                case "1-1":
                    this.$router.push("/dashBoard/users").catch(() => {})
                    break;
                case "2-2":
                    this.$router.push("/dashBoard/replies").catch(() => {})
                    break;
                default:
                    break;
            }
        },
        logingOut() {
            sessionStorage.clear("user")
            localStorage.clear("user")
            this.isConnected = false
            this.$router.push("/login")
            location.reload()
        }
    },

};
</script>

<style>
.el-menu-item.is-active {
    color: gray !important;
}

.navbar-brand-2 {
    color: white;
    text-align: center;
    letter-spacing: 4px;
    height: 67px;
    width: 100%;
    padding-top: 21px;
    text-decoration: none;
}

.nav-item-dash {
    line-height: 6;
    height: 80px;
    padding: 0 20px;
    color: gray;
    min-width: 200px;
    text-align: center;
    font-weight: 500;
}
.nav-item-dash:hover {
    line-height: 6;
    height: 80px;
    background: #f7f5f5;
    padding: 0 20px;
    color: gray;
    min-width: 200px;
}
.ul-nav-dash {
    position: relative;
    left: 31px;
}
</style>
