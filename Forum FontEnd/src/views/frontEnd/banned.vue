<template>
<div>
    <navBar />
        <div class="top-landing-simple-posts">
        <div class="overly-simple"></div>
        <div class="container vertical-center-myposts">
            <h1 style="margin: 20px 0; letter-spacing: 5px; text-transform: uppercase;color: white;">
                Banned Account !!!
            </h1>
        </div>
    </div>
    <div id="Banned" class="row">
            <h1 class="h1i1">Sorry You Are Banned</h1>
            <br>
            <img src="@/assets/img/banned.png" alt="">
            <br>
            <h1 class="h1i1">Your are not enable to connect to your Account ,Unless an Admin or Moderator Remove Your Ban </h1>
    </div>
    <backfooter />
</div>
</template>

<script>
import Vue from 'vue'
import navBar from "@/components/navbar.vue";
import axiosBase from '@/views/base.js';
import backfooter from "@/components/footer.vue";

export default {
    components: {
        navBar,
        backfooter
    },
    data() {
        return {
        }

    },
    created() {
        if (sessionStorage.getItem("user"))
            this.userId = sessionStorage.getItem("user")
        else if (localStorage.getItem("user"))
            this.userId = localStorage.getItem("user")
        else {
            this.valid++
        }
        if (this.valid > 0) {
            this.$router.push("/")
            return
        }

    },
    methods: {

    }
}
</script>

<style >
div#Banned {
    display: block;
    text-align: center;

}

.h1i1 {
    text-transform: capitalize;
}
</style>
