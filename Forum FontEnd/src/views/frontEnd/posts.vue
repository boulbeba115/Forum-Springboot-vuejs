<template>
<div id="postsPage">
    <navBar />
    <div class="top-landing-2" v-bind:style="{ 'background-image': 'url('+getImgPath(topic.topicImage)+')' }">
        <div class="overly-2"></div>
        <div class="vertical-center-3">
            <div>
                <img class="topic-logos-2" :src="getImgPath(topic.topicLogo)" alt="">
            </div>
            <h1 style="margin: 20px 0; letter-spacing: 5px; text-transform: uppercase;color: white; font-family: 'Dosis';">
                {{topic.topicTitle}}
            </h1>
        </div>
    </div>
    <el-breadcrumb class="headerBar" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
            <i class="fa fa-home" aria-hidden="true">
                Home</i></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">{{category}} </el-breadcrumb-item>
        <el-breadcrumb-item><strong>{{topic.topicTitle}}</strong> </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main container-fluid pagesContainer" style="min-height: 500px">
        <div id="headers">
            <div class="row">
                <div class="col-sm-8" style="line-height: 3;">
                    This forum has {{topic.postList.length}} Posts {{nbReplies}} replies.
                </div>
                <div class="col-sm-4">
                    <div class="btn-div" v-if="isConnected">
                        <router-link to="/myPosts" class="editp"><i class="fa fa-list"></i> My Posts</router-link>
                        <router-link class="addp" to="/posts/addPost"><i class="fa fa-pencil"> Add Post</i></router-link>
                    </div>
                </div>
            </div>

        </div>
        <div v-if="announcements.length>0" style="margin-bottom: 3%;width:90%;margin: 0 auto;">
            <div class="announcement" style="background-color:#efba8b">
                <h5>announcement</h5>
            </div>
            <div>
                <table class="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <td style="width:50%;text-align: center;"></td>
                            <td style="width:15%;text-align: center;"><i class="fa fa-commenting-o"></i></td>
                            <td style="width:15%;text-align: center;"> <i class="fa fa-eye"></i> </td>
                            <td style="width:20%;text-align: center;"> <i class="fa fa-users"></i> </td>
                        </tr>
                        <tr class="post-row" v-for="post in announcements" style="background:white;border: 2px solid #fbf5f5;">
                            <td class="post-title">{{post.postTitle}}</td>
                            <td style="width:15%;text-align: center;padding: 32px 16px;">{{post.replies.length}}</td>
                            <td style="width:15%;text-align: center;padding: 32px 16px;"> 10 </td>
                            <td style="width:20%;text-align: center;">
                                <div class="disputo-freshness-box">
                                    <div class="disputo-freshness-left">
                                        <div class="disputo-freshness-name">
                                            <a title="View John Doe's profile" class="bbp-author-link">
                                                <span class="bbp-author-name">
                                                    {{post.postOwner.userName}}
                                                </span>
                                            </a>
                                        </div>
                                        <div class="disputo-freshness-link">
                                            <a title="Reply To: Italian Cuisine">
                                                {{post.createdAt}}
                                            </a>
                                        </div>
                                    </div>
                                    <div class="disputo-freshness-right disputo-verified-user">
                                        <a title="View John Doe's profile" class="bbp-author-link">
                                            <span class="bbp-author-avatar">
                                                <img class="avatar avatar-45 photo" height="45" width="45" :src="loadUserImg(post.postOwner.userPic)" alt="">
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <template v-if="datasShown<1">
            <div id="headers-5" style="border-left: 5px #e26d52 solid;">
                <span class="spanTitle">this Topic Doesn't contain ant post yet</span>
            </div>
        </template>
        <div v-else style="margin-bottom: 3%;;width:90%;margin: 0 auto;">
            <div class="announcement" style="background-color:rgb(28 36 53)">
                <div class="row">
                    <div class="col-sm-4">
                        <h5>Posts</h5>
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
                            <td style="width:5%;text-align: center;"><i class="fa fa-stack-exchange" aria-hidden="true"></i></td>
                            <td style="width:50%;text-align: center;"><i class="fa fa-sticky-note-o" aria-hidden="true"></i></td>
                            <td style="width:15%;text-align: center;"><i class="fa fa-commenting-o"></i></td>
                            <td style="width:15%;text-align: center;"> <i class="fa fa-eye"></i> </td>
                            <td style="width:20%;text-align: center;"> <i class="fa fa-users"></i> </td>
                        </tr>
                        <template v-for="post in datasShown">
                            <template v-if="post.postSatus!='Hidden'">
                                <tr @click="goToPost(post)" class="post-row" style="background:white;border: 2px solid #fbf5f5;">
                                    <td>
                                        <span v-if="post.postSatus=='Active'" class="status-ico"><i style="font-size: 22px;color: green;" class="fa fa-check-circle-o" aria-hidden="true"></i></span>
                                        <span v-if="post.postSatus=='Closed'" class="status-ico"><i style="color: gray;font-size: 20px" class="fa fa-lock" aria-hidden="true"></i></span>
                                        <span v-if="post.postSatus=='Archived'" class="status-ico"><i style="color: #1e9aca;" class="fa fa-archive" aria-hidden="true"></i></span>
                                        <span v-if="post.postSatus=='Pinned'" class="status-ico"><i style="color: #a904c7; font-size: 20px;" class="fa fa-thumb-tack" aria-hidden="true"></i></span>
                                    </td>
                                    <td style="width:50%;text-align: left;padding: 32px 16px;font-family: 'Exo';text-transform: capitalize; font-weight: 700; font-size: 18px;">{{post.postTitle}}</td>
                                    <td style="width:15%;text-align: center;padding: 32px 16px;">{{post.replies.length}}</td>
                                    <td style="width:15%;text-align: center;padding: 32px 16px;"> {{post.views}} </td>
                                    <td style="width:20%;text-align: center;">
                                        <div class="disputo-freshness-box">
                                            <div class="disputo-freshness-left">
                                                <div class="disputo-freshness-name">
                                                    <a title="View John Doe's profile" class="bbp-author-link">
                                                        <span class="bbp-author-name">
                                                            {{post.postOwner.userName}}
                                                        </span>
                                                    </a>
                                                </div>
                                                <div class="disputo-freshness-link">
                                                    <a title="Reply To: Italian Cuisine">
                                                        {{post.createdAt}}
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="disputo-freshness-right disputo-verified-user">
                                                <a title="View John Doe's profile" class="bbp-author-link">
                                                    <span class="bbp-author-avatar">
                                                        <img class="avatar avatar-45 photo" height="45" width="45" :src="loadUserImg(post.postOwner.userPic)" alt="">
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </template>
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
        <loginRow v-if="!isConnected" />
    </div>
    <backfooter />
</div>
</template>

<script>
import navBar from "@/components/navbar.vue";
import axiosBase from '@/views/base.js';
import backfooter from "@/components/footer.vue";
import loginRow from "@/components/loginRow.vue";
import Pagination from '@/components/frontPagination.vue'

export default {
    props: ['selectedTopic'],
    components: {
        navBar,
        backfooter,
        loginRow,
        Pagination
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
            announcements: [],
            posts: [],
            category: "",
            nbReplies: 0,
            checked: false,
            isConnected: false,
            /*Pagination */
            datas: [],
            datasFiltered: [],
            datasShown: [],
            currentPage: 1,
            nbPerPage: 5,
            nbPerPageSelect: 5
        }
    },
    computed: {
        maxDatas() {
            return this.datasFiltered.length
        },
    },
    created() {
        this.category = sessionStorage.getItem("category")
        this.nbReplies = sessionStorage.getItem("numberReplies") ? sessionStorage.getItem("numberReplies") : 0;
        if (sessionStorage.getItem("user"))
            this.isConnected = true
        else if (localStorage.getItem("user"))
            this.isConnected = true
        else
            this.isConnected = false

        if (typeof this.selectedTopic != 'undefined') {
            this.topic = this.selectedTopic
            if (this.topic.postList.length > 0) {
                this.announcements = this.topic.postList.filter((x) => x.announcment == true)
                this.posts = this.topic.postList.filter((x) => x.announcment == false)
                this.datasFiltered = this.sortByPinned(this.posts)
                this.datasShown = this.datasFiltered.slice(0, this.nbPerPage)
            }
        } else {
            let topicId = sessionStorage.getItem("topics")
            console.log(topicId)
            if (typeof topicId == 'undefined' || topicId == "")
                this.$router.push("/")
            axiosBase.get("/topics/" + topicId).then((response) => {
                this.topic = response.data
                if (this.topic.postList.length > 0) {
                    this.announcements = this.topic.postList.filter((x) => x.announcment == true)
                    this.posts = this.topic.postList.filter((x) => x.announcment == false)
                    this.datasFiltered = this.sortByPinned(this.posts)
                    this.datasShown = this.datasFiltered.slice(0, this.nbPerPage)
                    console.log(this.datasShown)
                }
            }).catch((error) => {

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
        loadImg(img) {
            var images = require.context('@/assets/img/')
            return images('./' + img)
        },
        loadUserImg(img) {
            var images = require.context('@/assets/img/users')
            return images('./' + img)
        },
        filterPostes(posts) {
            for (let post of posts) {
                if (post.isAnnouncment)
                    this.announcement.push(post)
                else
                    this.posts.push(post)
            }
        },
        sortByPinned(data) {
           return data.sort(function (a, b) {
               if(a.postSatus === "Pinned")
                return -1
                else if( a.postSatus === "Archived")
                return 0
            });
        },
        goToPost(post) {
            if (typeof post != "undefined") {
                sessionStorage.setItem("post", post.postId)
                this.$router.push("/posts/show")
            }
        },
        getImgPath(img) {
            return img ? require(`@/assets/img/TopicImg/${img}`) : ''
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
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo&display=swap');

div#headers {
    padding: 20px 13px;
    background: #f7f6f6;
    border-left: 5px #4242b3 solid;
    margin: 0 auto;
    width: 90%;
}

.announcement {
    margin-top: 2%;
    background: #f7f6f6;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 66px;
    padding: 19px;
}

.announcement h5 {
    text-transform: uppercase;
    font-family: 'Dosis', sans-serif;
    color: white
}

.vertical-center-3 {
    position: relative;
    z-index: 10000 !important;
    width: fit-content;
    margin: 0 auto;
    top: 38px;
    text-align: center;

}

.topic-logos-2 {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: 9px #c5c5c5 solid;
}

.topic-row {
    list-style: none;
    margin: 0;
    padding: 0;
    display: table;
    table-layout: fixed;
    width: 100%;
    border-top: 1px solid #ddd;
}

.login-from-shortcut {
    background: #e9edf1;
    margin-bottom: 2% !important;
    width: 90%;
    margin: 0 auto;
    padding: 2%;
    border-radius: 10px;
}

.login-from-shortcut label {
    margin-top: 1%;
}

legend {
    color: gray;
    font-family: 'Dosis';
    font-weight: bold;
    font-size: 36px;
}

.input-login {
    width: 100%;
    height: 45px;
    border-radius: 5px;
    border-color: gray;
    padding-left: 10px;

}

.login-submits {
    float: right;
    background: #5372ab;
    padding: 11px;
    border: none;
    font-size: 21px;
    border-radius: 7px;
    color: white;
}

.addit {
    padding: 20px 13px;
    margin: 0 auto;
    width: 90%;
    height: 67px;
}

.addp {
    background: #7f8ca9;
    padding: 10px;
    color: white;
    text-transform: capitalize;
    border-radius: 45px;
    position: relative;
    font-family: 'Dosis';
    font-size: 14px;
    width: 104px;
    text-align: center;

}

.addp:hover {
    background: #919eb9;
    padding: 10px;
    color: white;
    text-transform: capitalize;
    border-radius: 45px;
    position: relative;
    font-family: 'Dosis';
    font-size: 14px;
    cursor: pointer;
    width: 104px;
    text-align: center;
}

.editp {
    background: #7fa97f;
    padding: 10px;
    color: white;
    text-transform: capitalize;
    border-radius: 45px;
    position: relative;
    font-family: 'Dosis';
    font-size: 14px;
    margin-right: 12px;
    width: 104px;
    text-align: center;

}

.editp:hover {
    background: #8cbb8c;
    ;
    padding: 10px;
    color: white;
    text-transform: capitalize;
    border-radius: 45px;
    position: relative;
    font-family: 'Dosis';
    font-size: 14px;
    cursor: pointer;
}

.top-landing-2 {
    min-height: 300px;
    background: #364253;
    background-image: url(/img/background1.f08e6585.jpg);
    color: white;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 30%;
}

.overly-2 {
    background: rgba(39, 62, 84, 0.82);
    overflow: hidden;
    min-height: 300px;
    z-index: 2;
    position: absolute;
    width: 100%;
}

.user-img {
    height: 67px;
    width: 67px;
    border-radius: 100%;
    float: right;
}

.post-title {
    width: 50%;
    text-align: left;
    padding: 32px 16px;
    font-family: 'Exo';
    text-transform: capitalize;
    font-weight: 700;
    font-size: 20px;
    color: gray;
    line-height: 3;

}

.post-row:hover {
    background: rgb(252, 247, 247) !important;
}

.post-row {
    background: none !important;
    cursor: pointer;
}

.btn-div {
    float: right;
}

span.status-ico {
    text-align: center;
    display: block;
    line-height: 4.5;
}

.announcement-2 {
    margin-top: 2%;
    height: 66px;
    padding: 19px;
    background-color: rgb(28, 36, 53);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    color: white;
    position: relative;
    top: -16px;

}
</style>
