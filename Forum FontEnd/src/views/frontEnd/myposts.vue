<template>
<div id="addpost">
    <navBar />
    <div class="top-landing-simple-posts">
        <div class="overly-simple"></div>
        <div class="container vertical-center-myposts">
            <h1 style="margin: 20px 0; letter-spacing: 5px; text-transform: uppercase;color: white;">
                My Posts
            </h1>
        </div>
    </div>
    <el-breadcrumb class="headerBar" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }"> <i class="fa fa-home" aria-hidden="true"></i>Home</el-breadcrumb-item>
        <el-breadcrumb-item> <strong> My Posts </strong> </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main container-fluid pagesContainer" style="min-height: 500px">

        <template v-if="!isConnected">
            <div id="headers-5" style="border-left: 5px #e26d52 solid;">
                <span class="spanTitle"> You are Not Connected , login to see posts</span>
            </div>
        </template>
        <div v-else>
            <template v-if="posts.length<1">
                <div id="headers-5" style="border-left: 5px #e26d52 solid;">
                    <span class="spanTitle">You dont Have Any Post Yet</span>
                </div>
            </template>
            <template v-else>
                <div id="headers-2">
                    All My Posts
                </div>
                <div class="myposts">
                    <div class="announcement" style="background-color:rgb(28 36 53)">
                        <div class="row">
                            <div class="col-sm-4">
                                <h5 style="color:white">Posts</h5>
                            </div>
                            <div class="col-sm-8">
                                <pagination style="float: right;" class="cc-w-auto" :records="maxDatas" :currentpage="currentPage" :number-per-page="nbPerPage" @changepage="changePage"></pagination>
                            </div>
                        </div>
                    </div>
                    <div>
                        <table class="table table-striped table-bordered">
                            <tbody>
                                <tr>
                                    <td style="width:5%;text-align: center;">Status</td>
                                    <td style="width:50%;text-align: center;">Title</td>
                                    <td style="width:20%;text-align: center;">Category</td>
                                    <td style="width:20%;text-align: center;">Topic</td>
                                    <td style="width:5%;text-align: center;">Replies</td>
                                    <td style="width:5%;text-align: center;">views</td>
                                    <td style="width:5%;text-align: center;">Date</td>
                                </tr>
                                <template v-for="post in datasShown">
                                    <tr @click="goToPost(post)" class="post-row" style="background:white;border: 2px solid #fbf5f5;">
                                        <td>
                                            <span v-if="post.postSatus=='Active'" class="status-ico"><i style="font-size: 22px;color: green;" class="fa fa-check-circle-o" aria-hidden="true"></i></span>
                                            <span v-if="post.postSatus=='Closed'" class="status-ico"><i style="color: gray;font-size: 20px" class="fa fa-lock" aria-hidden="true"></i></span>
                                            <span v-if="post.postSatus=='Archived'" class="status-ico"><i style="color: #1e9aca;" class="fa fa-archive" aria-hidden="true"></i></span>
                                            <span v-if="post.postSatus=='Pinned'" class="status-ico"><i style="color: #a904c7; font-size: 20px;" class="fa fa-thumb-tack" aria-hidden="true"></i></span>
                                        </td>
                                        <td style="width:40%;text-align: left;padding: 32px 16px;font-family: 'Exo';text-transform: capitalize; font-weight: 700; font-size: 18px;">{{post.postTitle}}</td>
                                        <td style="width:20%;text-align: center;line-height: 4.4;">{{post.postTopic.category.categoryTitle}}</td>
                                        <td style="width:20%;text-align: center;line-height: 4.4;">{{post.postTopic.topicTitle}}</td>
                                        <td style="width:5%;text-align: center;padding: 32px 16px;">{{post.replies.length}}</td>
                                        <td style="width:5%;text-align: center;padding: 32px 16px;"> {{post.views}} </td>
                                        <td style="min-width:200px;text-align: center;padding: 32px 16px;"> {{ post.createdAt | moment("DD-MM-YYYY")  }} </td>

                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                    <div class="announcement-2">
                        <div class="row">
                            <div class="col-sm-4">
                                <h5 style="color:white">Posts</h5>
                            </div>
                            <div class="col-sm-8">
                                <pagination style="float: right;" class="cc-w-auto" :records="maxDatas" :currentpage="currentPage" :number-per-page="nbPerPage" @changepage="changePage"></pagination>
                            </div>
                        </div>

                    </div>
                </div>
            </template>
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
import Pagination from '@/components/frontPagination.vue'
import "@/assets/css/posts.css";

Vue.use(Vue2Editor);

export default {
    components: {
        navBar,
        backfooter,
        Pagination
    },
    data() {
        return {
            posts: [],
            isConnected: false,
            userId: "",
            valid: 0,
            /*Pagination */
            datas: [],
            datasFiltered: [],
            datasShown: [],
            currentPage: 1,
            nbPerPage: 10,
            nbPerPageSelect: 10
        }
    },
    computed: {
        maxDatas() {
            return this.datasFiltered.length
        },
    },
    created() {
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
        if (this.valid < 1) {
            axiosBase.get("posts/byUser/" + this.userId)
                .then((response) => {
                    this.posts = response.data
                    this.datasFiltered = this.sortByDate(this.posts)
                    this.datasShown = this.datasFiltered.slice(0, this.nbPerPage)
                })
                .catch((e) => {

                })
        }

    },
    watch: {
        nbPerPageSelect() {
            this.nbPerPage = _.toInteger(this.nbPerPageSelect)
            this.currentPage = 1
            this.refreshPage()
        },
        datasShown() {
            if (this.datasShown.length < 1 && this.datasFiltered.length > 0 && this.datas.length > 0) {
                this.currentPage = 1
                this.refreshPage()
            }
        },
        currentPage() {
            this.changePage(this.currentPage)
        }
    },
    methods: {
        sortByDate(data) {
            let a = data.sort(function (a, b) {
                return a.createdAt > b.createdAt ? -1 : 1
            });
            return data
        },
        loadImg(img) {
            var images = require.context('@/assets/img/')
            return images('./' + img)
        },
        goToPost(post) {
            if (typeof post != "undefined") {
                sessionStorage.setItem("post", post.postId)
                this.$router.push("/posts/show")
            }
        },
        changePage(index) {
            this.currentPage = index
            this.refreshPage()
        },

        refreshPage() {
            let start = this.getStartPagination()
            this.datasShown = this.datasFiltered.slice(start, start + this.nbPerPage)
        },
        getStartPagination() {

            return (this.currentPage - 1) * this.nbPerPage
        },
        showReportForm(param, reply = "") {
            this.isReportedPost = param
            this.reportDialog = true
            this.selectedReply = reply
        },
    },

}
</script>

<style>
.myposts {
    margin-bottom: 3%;
    width: 90%;
    margin: 0 auto;
}

.vertical-center-myposts {
    margin: 0;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    z-index: 3;
    text-align: center;
}

.top-landing-simple-posts {
    min-height: 200px;
    background: #364253;
    background-image: none;
    color: white;
    background-size: cover;
    background-repeat: no-repeat;
}

.overly-simple {
    background: rgba(39, 62, 84, 0.82);
    overflow: hidden;
    min-height: 200px;
    z-index: 2;
    position: absolute;
    width: 100%;
}

div#headers-5 {
    padding: 20px 13px;
    background: #f7f6f6;
    border-left: 5px #4242b3 solid;
    margin: 0 auto;
    width: 90%;
    margin-bottom: 2%;
    border-left: 5px solid rgb(226, 109, 82);
    position: relative;
    top: 50%;
    text-align: center;
    transform: translateY(200%);
}
</style>
