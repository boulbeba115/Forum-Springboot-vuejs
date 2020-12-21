<template>
<div id="addpost">
    <navBar />
    <div class="top-landing-simple">
        <div class="overly-simple"></div>
        <div class="container vertical-center-2">
            <h1 style="margin: 20px 0; letter-spacing: 5px; text-transform: uppercase;color: white;">
                ADD POST
            </h1>
        </div>
    </div>
    <el-breadcrumb class="headerBar" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }"> <i class="fa fa-home" aria-hidden="true"></i>Home</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">{{category}} </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/posts' }">{{topic.topicTitle}}</el-breadcrumb-item>
        <el-breadcrumb-item> <strong> ADD POST </strong> </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main container-fluid pagesContainer" style="min-height: 500px" v-if="isConnected">
        <div id="headers-2">
            ADD NEW POST
            <a class="cancelp" @click="goback()"><i class="fa fa-reply"> </i>CANCEL</a>
        </div>
        <div class="post-form">
            <form class="add-post">
                <div>
                    <label>Post Title:</label>
                    <br />
                    <input class="ptitle-input" :class="{'Error-input':titleError}" v-model="postForm.postTitle" type="text">
                    <span v-if="titleError" class="error-span">The Post Title is Required</span>
                </div>
                <br />
                <div>
                    <label>Post Content</label>
                    <vue-editor v-model="postForm.postContent" :class="{'Error-input':contentError}" />
                    <span v-if="contentError" class="error-span">{{errorMessage}}</span>
                </div>
                <a class="submitpost" @click="submitPost()">Add Post</a>
            </form>
        </div>

        <template v-if="!isConnected">
            <div id="headers" style="margin-bottom: 2%;">
                You must be logged in to create new topics.
            </div>
            <div class="login-from-shortcut">
                <fieldset>
                    <legend> Log In </legend>
                    <div class="">
                        <label for="user_login"> Username: </label>
                        <input type="text" class="input-login" autocomplete="off">
                    </div>
                    <div class="">
                        <label for="user_pass"> Password: </label>
                        <input type="password" class="input-login">
                    </div>
                    <div class="">
                        <el-checkbox v-model="checked">Keep me signed in</el-checkbox>
                    </div>
                    <div class="r">
                        <button type="submit" class="login-submits"> Log In </button>
                    </div>
                </fieldset>
            </div>
        </template>
    </div>
    <backfooter />
</div>
</template>

<script>
import Vue from 'vue'
import Vue2Editor from "vue2-editor";
import navBar from "@/components/navbar.vue";
import axiosBase from '@/views/base.js';
import backfooter from "@/components/footer.vue";
import "@/assets/css/posts.css";

Vue.use(Vue2Editor);

export default {
    components: {
        navBar,
        backfooter
    },
    data() {
        return {
            topic: {
                id: 0,
                topicId: "",
                topicTitle: "",
                topicDescription: "",
                topicLogo: "",
                topicImage: "",
                postList: []
            },
            category: "",
            checked: false,
            postForm: {
                postTitle: "",
                postContent: "",
            },
            titleError: false,
            contentError: false,
            errorMessage: "The Post Content is Required",
            userId: "",
            valid: 0,
            isConnected: false
        }
    },
    async created() {
        this.category = sessionStorage.getItem("category")
        let topicId = sessionStorage.getItem("topics")
        if (typeof topicId == 'undefined' || topicId == "")
            this.$router.push("/")
        await axiosBase.get("/topics/" + topicId).then((response) => {
            this.topic = response.data
        }).catch((error) => {
            this.$router.push("/")
        })
        if (sessionStorage.getItem("user"))
            this.isConnected = true
        else if (localStorage.getItem("user"))
            this.isConnected = true
        else
            this.isConnected = false
        if (sessionStorage.getItem("user"))
            this.userId = sessionStorage.getItem("user")
        else if (localStorage.getItem("user"))
            this.userId = localStorage.getItem("user")
        else {
            this.valid++
        }
    },
    methods: {
        submitPost() {
            let errCount = 0,
                self = this;
            if (this.postForm.postTitle == "") {
                this.titleError = true
                errCount++
            } else
                this.titleError = false
            if (this.countWords(this.postForm.postContent) < 1) {
                this.contentError = true
                this.errorMessage = "The post length need to be at least 120 words"
                errCount++
            } else
                this.contentError = false

            if (errCount > 0) {
                this.$notify.error({
                    title: 'Error',
                    message: 'Please Fill empty fields',
                });
                return
            }
            let topic = {
                topicId: this.topic.topicId
            }
            this.postForm.postTopic = topic
            axiosBase.post("posts/" + this.userId, this.postForm)
                .then((response) => {
                    this.$notify({
                        title: 'Post added successfully',
                        message: 'you will be redirected in 1 seconds',
                        type: 'success'
                    });
                    setTimeout(() => {
                        self.goback()
                    }, 1000)
                })
                .catch((error) => {
                    this.$notify.error({
                        title: 'Error',
                        message: 'An error was produced while add this post',
                    });
                })

        },
        goback() {
            this.$router.push("/posts")
        },
        countWords(str) {
            str = str.replace(/(^\s*)|(\s*$)/gi, "");
            str = str.replace(/[ ]{2,}/gi, " ");
            str = str.replace(/\n /, "\n");
            console.log(str.split(' ').length)
            return str.split(' ').length;
        }
    }

}
</script>

<style>

</style>
