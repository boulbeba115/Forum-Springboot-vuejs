<template>
<div id="nav">
    <nav class="navbar navbar-expand-lg py-3 navbar-dark bg-dark shadow-sm" style="background-color: #4b749d!important;">
        <div class="container">
            <a href="/" class="navbar-brand-main">
                <!-- Logo Image -->
                <img src="@/assets/mylogo.png" width="45" alt="" class="d-inline-block align-middle mr-2">
                <!-- Logo Text -->
                <span class="text-uppercase font-weight-bold">Social Forum</span>
            </a>

            <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>

            <div id="navbarSupportedContent" class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto menuNavi">

                    <li class="nav-item active li-elment">
                        <router-link to="/" class="nav-link">HOME <span class="sr-only">(current)</span></router-link>
                    </li>
                    <template v-if="!isConnected">
                        <li class="nav-item active li-elment">
                            <a href="/login" class="nav-link">LOGIN <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active li-elment">
                            <a href="/register" class="nav-link">REGISTER <span class="sr-only">(current)</span></a>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item active li-elment">
                            <router-link to="/myPosts" class="nav-link">My Posts <span class="sr-only">(current)</span></router-link>
                        </li>
                        <li class="nav-item active li-elment">
                            <router-link to="/profile" class="nav-link">My Profile <span class="sr-only">(current)</span></router-link>
                        </li>
                        <li class="nav-item active li-elment">
                            <a @click="logOut()" class="nav-link">LogOut <span class="sr-only">(current)</span></a>
                        </li>
                    </template>
                    <li class="nav-item"><a href="#" class="nav-link"></a></li>
                </ul>
            </div>
        </div>
    </nav>
</div>
</template>

<script>
export default {
    data() {
        return {
            isConnected: false
        };
    },
    created() {
        if (sessionStorage.getItem("user"))
            this.isConnected = true
        else if (localStorage.getItem("user"))
            this.isConnected = true
        else
            this.isConnected = false
    },
    methods: {
        logOut() {
            sessionStorage.clear("user")
            localStorage.clear("user")
            this.isConnected = false
            this.$router.push("/")
            location.reload()
        }
    },
};
</script>

<style>
#nav {
    background: #e1e5ed;
    overflow: hidden;
}

.navbar-brand-main {
    font-family: "Rubik";
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: inline-block;
    padding-top: .3125rem;
    padding-bottom: .3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
}

.navbar-dark .navbar-brand-main {
    color: #fff;
}

.menuNavi {
    height: 99px;
    position: absolute;
    right: 9%;
}

.li-elment {
    line-height: 6;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: 117px;
    height: auto;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
}

.li-elment:hover {
    background: #92a4cc;
}

ul.el-menu-demo.el-menu--horizontal.el-menu {
    height: 66px;
}
</style>
