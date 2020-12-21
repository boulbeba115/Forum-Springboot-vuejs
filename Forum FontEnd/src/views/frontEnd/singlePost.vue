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
            <i class="fa fa-home" aria-hidden="true"> Home</i></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">{{category}} </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/posts' }"><strong>{{topic.topicTitle}}</strong> </el-breadcrumb-item>
        <el-breadcrumb-item><strong>{{post.postTitle}}</strong> </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main container-fluid pagesContainer" style="min-height: 500px">
        <div id="headers">
            <div class="row">
                <div class="col-sm-8" style="line-height: 3;">
                    <span class="spanTitle"> This Post has {{nbReplies}} replies.</span>
                </div>
                <div class="col-sm-4">
                    <div class="btn-div" v-if="isConnected">
                        <router-link class="addp" to="/posts/addPost"><i class="fa fa-pencil"> Add Post</i></router-link>
                        <a class="addr" href="#replying"><i class="fa fa-reply"> Add Reply</i></a>
                        <router-link to="/myPosts" class="editp"><i class="fa fa-list"></i> My Posts</router-link>

                    </div>
                </div>
            </div>

        </div>
        <div class="PostContent">
            <div>
                <div>
                    <ul class="disputo-replies-bar" style="padding-bottom: 10px;background: #0e6782;color: white;">
                        <li class="disputo-replies-title">
                            {{post.postTitle}}
                        </li>
                        <li class="disputo-replies-links">
                            <span class="disputo-replies-subscription">
                            </span>
                            <span class="disputo-replies-favorites">
                            </span>
                        </li>
                    </ul>
                    <ul class="forums bbp-lead">
                        <li>
                            <div id="rep-div" style="border-radius: 0px !important;" class="loop-item--1 user-id-1 bbp-parent-forum-73 even  post-188 topic type-topic status-publish hentry topic-tag-food topic-tag-italian">
                                <div class="disputo-replies-content-bar" style="border-radius: 0px;background: #0e6782;color: white;">
                                    <ul class="disputo-replies-content-bar-left">
                                        <li>
                                            <span class="bbp-topic-post-date">
                                                <i class="fa fa-clock-o">
                                                </i>
                                                {{ post.createdAt | moment("dddd, MMMM Do YYYY")  }}
                                            </span>
                                        </li>
                                    </ul>
                                    <ul class="disputo-replies-content-bar-right">
                                        <li>
                                            <a class="like-btn" @click="reviewPost(true)"><i class="fa fa-thumbs-o-up"></i> {{plikes}} </a>
                                        </li>
                                        <li>
                                            <a class="dislike-btn" @click="reviewPost(false)"><i class="fa fa-thumbs-o-down"></i> {{pdislikes}} </a>
                                        </li>
                                        <li>
                                            <el-tooltip class="item" effect="light" content="Report This Post" placement="top">
                                                <a class="report-btn" @click="showReportForm(true)"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></a>
                                            </el-tooltip>
                                        </li>

                                    </ul>
                                </div>
                                <div class="disputo-replies-wrapper">
                                    <div class="disputo-replies-author disputo-user-bbp_keymaster">
                                        <div class="disputo-replies-author-img disputo-verified-user" title="Verified User">
                                            <a title="View John Doe's profile" class="bbp-author-link">
                                                <span class="bbp-author-avatar">
                                                    <img alt="" :src="getUserImg(post.postOwner.userPic)" class="avatar avatar-80 photo" height="80" width="80" loading="lazy">
                                                </span>
                                            </a>
                                        </div>
                                        <div class="disputo-replies-author-info">
                                            <a href="#" title="View John Doe's profile" class="bbp-author-link">
                                                <span class="bbp-author-name" style="text-transform: capitalize;">
                                                    {{post.postOwner | hideMe}}
                                                </span>
                                            </a>
                                            <br>
                                            <div class="bbp-author-role">
                                                {{post.postOwner.userRole.userRole | role }}
                                            </div>
                                            <div>
                                                <span>Total Post {{'10'}}</span>
                                            </div>
                                            <div>
                                                <span>Total Participation: {{'54'}}</span>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="disputo-replies-content">
                                        <div class="disputo-reply-wrapper">
                                            <div id="main-text-content" class="disputo-quote-wrapper">
                                                <div v-html="post.postContent"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="replies-container">
            <div id="headers-2" v-if="datasShown.length>0">
                <div class="row">
                    <div class="col-sm-3">
                        <span class="spanTitle">All Replies</span>
                    </div>
                    <div class="col-sm-9">
                        <pagination style="float: right;" class="cc-w-auto" :records="maxDatas" :currentpage="currentPage" :number-per-page="nbPerPage" @changepage="changePage"></pagination>
                    </div>
                </div>
            </div>
            <div class="Reply-content">
                <div>
                    <div>
                        <ul class="ulReplies">
                            <li v-for=" r in datasShown">
                                <br>
                                <div id="rep-div" class="loop-item--1 user-id-1 bbp-parent-forum-73 even  post-188 topic type-topic status-publish hentry topic-tag-food topic-tag-italian">
                                    <div class="disputo-replies-content-bar" style="color: white;background: #34495e;}">
                                        <ul class="disputo-replies-content-bar-left">
                                            <li>
                                                <span class="bbp-topic-post-date">
                                                    <i class="fa fa-clock-o">
                                                    </i>
                                                    {{ r.created_At | moment("dddd, MMMM Do YYYY")  }}
                                                </span>
                                            </li>
                                        </ul>
                                        <ul class="disputo-replies-content-bar-right">
                                            <li>
                                                <a class="like-btn" @click="reviewReply(true,r)"><i class="fa fa-thumbs-o-up"></i> {{Likes(r)}} </a>
                                            </li>
                                            <li>
                                                <a class="dislike-btn" @click="reviewReply(false,r)"><i class="fa fa-thumbs-o-down"></i> {{dislikes(r)}} </a>
                                            </li>
                                            <li>
                                                <el-tooltip class="item" effect="light" content="Report This Reply" placement="top">
                                                    <a class="report-btn" @click="showReportForm(false,r)"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></a>
                                                </el-tooltip>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="disputo-replies-wrapper">
                                        <div class="disputo-replies-author disputo-user-bbp_keymaster">
                                            <div class="disputo-replies-author-img disputo-verified-user" title="Verified User">
                                                <a title="View John Doe's profile" class="bbp-author-link">
                                                    <span class="bbp-author-avatar">
                                                        <img alt="" :src="getUserImg(r.user.userPic)" class="avatar avatar-80 photo" height="80" width="80" loading="lazy">
                                                    </span>
                                                </a>
                                            </div>
                                            <div class="disputo-replies-author-info">
                                                <a href="#" title="View John Doe's profile" class="bbp-author-link">
                                                    <span class="bbp-author-name" style="text-transform: capitalize;">
                                                        {{r.user | hideMe}}
                                                    </span>
                                                </a>
                                                <br>
                                                <div class="bbp-author-role">
                                                    {{r.user.userRole.userRole | role }}
                                                </div>
                                                <div>
                                                    <span>Total Post {{'10'}}</span>
                                                </div>
                                                <div>
                                                    <span>Total Participation: {{'54'}}</span>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="disputo-replies-content">
                                            <div class="disputo-reply-wrapper">
                                                <div id="main-text-content" class="disputo-quote-wrapper">
                                                    <div v-html="r.replyContent"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="isConnected">
                <template v-if="post.postSatus=='Closed'">
                    <div id="headers-2" style="border-left: 5px #e26d52 solid;">
                        <span class="spanTitle"><i class="fa fa-lock"> </i>This Post is Closed You can't Reply to it</span>
                    </div>
                </template>
                <template v-else-if="post.postSatus=='Archived'">
                    <div id="headers-2" style="border-left: 5px #e26d52 solid;">
                        <span class="spanTitle"><i class="fa fa-archive"></i> This Post is Archived You can't Reply to it</span>
                    </div>
                </template>
                <template v-else>
                    <div id="replying">
                        <div class="row">
                            <div class="col-sm-3">
                                <span class="spanTitle">Add Replies</span>
                            </div>
                            <div class="col-sm-9">
                                <pagination style="float: right;" class="cc-w-auto" :records="maxDatas" :currentpage="currentPage" :number-per-page="nbPerPage" @changepage="changePage"></pagination>
                            </div>
                        </div>
                    </div>
                    <div class="add-Replies">
                        <div class="Reply">
                            <div class="Replying">
                                <vue-editor v-model="reply.replyContent" />
                            </div>
                            <div>
                                <a class="add-Reply" @click="addReply()">Add Reply</a>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

        </div>
        <loginRow v-if="!isConnected" />
    </div>
    <backfooter />
    <el-dialog id="reportId" title="Report Form" :visible.sync="reportDialog" width="30%">
        <form action="">
            <el-radio-group v-model="typeReport" style="display: grid;">
                <el-radio :label="'Racism'">Racism</el-radio>
                <el-radio :label="'Inappropriate_content'">Inappropriate content</el-radio>
                <el-radio :label="'Violent_language'">Violent language</el-radio>
                <el-radio :label="'Beside_the_point'">Beside the point</el-radio>
                <el-radio :label="'Others'">Others</el-radio>
            </el-radio-group>
            <div style="margin-top: 14px;font-weight: 500;">
                <span>Extra Details</span>
                <el-input style="margin-top: 11px;" :rows="5" type="textarea" v-model="causeReport"></el-input>
            </div>
            <div style="text-align: center;margin-top: 23px;">
                <a class="ReportSubmit" @click="reportPost()">Report</a>
            </div>
        </form>
    </el-dialog>
</div>
</template>

<script>
import Vue from "vue"
import navBar from "@/components/navbar.vue";
import axiosBase from '@/views/base.js';
import backfooter from "@/components/footer.vue";
import loginRow from "@/components/loginRow.vue";
import Vue2Editor from "vue2-editor";
import Pagination from '@/components/frontPagination.vue'

Vue.use(Vue2Editor);
Vue.use(require('vue-moment'));

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
            },
            post: {
                postOwner: {
                    userName: "",
                    anonym: false,
                    userRole: {
                        userRole: ""
                    },
                    replies: []
                },
                usersReviews: []
            },
            reply: {
                replyContent: "",
                post: "",
                user: {
                    userId: ""
                }
            },
            valid: 0,
            announcements: [],
            posts: [],
            category: "",
            nbReplies: 0,
            checked: false,
            isConnected: false,
            reportDialog: false,
            typeReport: 0,
            causeReport: "",
            isReportedPost: false,
            selectedReply: "",
            plikes: 0,
            pdislikes: 0,
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
    filters: {
        role: function (value) {
            if (!value) return ''
            else if (value == "ROLE_ADMIN") return "Admin"
            else if (value == "ROLE_MODERATOR") return "Moderator"
            else return "Member"
        },
        hideMe: function (value) {
            if (value.isAnonym) {
                return 'Anonym'
            }
            return value.userName
        }
    },
    beforeCreate() {
        this.nbReplies = sessionStorage.getItem("numberReplies") ? sessionStorage.getItem("numberReplies") : 0;
        let postId = sessionStorage.getItem("post");
        if (postId == null || postId == undefined) {
            this.$router.push("/posts")
            return
        }
        axiosBase.get("/posts/getPostBy/" + postId).then((response) => {
            this.post = response.data
            this.nbReplies = this.post.replies.length
            this.topic = this.post.postTopic
            this.category = this.post.postTopic.category.categoryTitle
            this.datasFiltered = this.post.replies
            this.datasShown = this.datasFiltered.slice(0, this.nbPerPage)
            this.plikes = this.post.usersReviews.filter(x => x.liked).length
            this.pdislikes = this.post.usersReviews.filter(x => x.dislike).length
        }).catch((error) => {

        })
    },
    created() {
        if (sessionStorage.getItem("user"))
            this.isConnected = true
        else if (localStorage.getItem("user"))
            this.isConnected = true
        else
            this.isConnected = false

        if (sessionStorage.getItem("user"))
            this.reply.user.userId = sessionStorage.getItem("user")
        else if (localStorage.getItem("user"))
            this.reply.user.userId = localStorage.getItem("user")
        else {
            this.valid++
        }
        let postId = sessionStorage.getItem("post");
        if (postId == null || postId == undefined) {
            this.$router.push("/posts")
            return
        }
        axiosBase.post("/posts/views/"+postId)
        .then((response)=>{
            
        })
        .catch((error)=>{

        })
    },
    methods: {
        loadImg(img) {
            var images = require.context('@/assets/img/')
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
        sortByPinned() {
            this.posts.sort(function (a, b) {
                return (a.postSatus === "Pinned") ? 1 : -1;
            });
        },
        getImgPath(img) {
            return img ? require(`@/assets/img/TopicImg/${img}`) : ''
        },
        getUserImg(img) {
            return img ? require(`@/assets/img/users/${img}`) : ''
        },
        addReply() {
            this.reply.post = this.post
            if (this.reply.replyContent == "") {
                this.$notify.error({
                    title: 'Error',
                    message: 'Plz type something in Reply Box',
                });
                return
            }
            if (this.valid > 0) {
                return
            }
            axiosBase.post("/posts/add/reply", this.reply)
                .then((response) => {
                    this.post.replies.push(response.data)
                    this.datasShown.push(response.data)
                    this.reply.replyContent = ""
                    this.$notify({
                        title: 'Reply added successfully',
                        type: 'success'
                    });
                })
                .catch(() => {

                })
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
        reportPost() {
            if (this.typeReport == "") {
                this.$message.error('select at least one option')
                return
            } else if (this.typeReport == 5 && this.causeReport == "") {
                this.$message.error('You need to specify the reason of this report')
                return
            }
            if (this.isReportedPost) {
                let report = {
                    type: this.typeReport,
                    cause: this.causeReport,
                    reportedPost: this.post,
                    userReport: {
                        userId: this.reply.user.userId
                    }
                }
                axiosBase.post("/posts/report/post", report)
                    .then((response) => {
                        let res = response.data
                        this.reportDialog = false
                        this.typeReport = ""
                        this.causeReport = ""
                        if (res) {
                            this.$notify({
                                title: 'Report Send Successfully',
                                type: 'success'
                            });
                        } else {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error while sending the report',
                            });
                        }

                    })
                    .catch((error) => {
                        this.reportDialog = false
                        this.typeReport = ""
                        this.causeReport = ""
                        this.$notify.error({
                            title: 'Error',
                            message: 'You already Report this Post',
                        });
                    })
            } else {
                let report = {
                    type: this.typeReport,
                    cause: this.causeReport,
                    reportedReply: this.selectedReply,
                    userRepReport: {
                        userId: this.reply.user.userId
                    }
                }
                axiosBase.post("/posts/report/reply", report)
                    .then((response) => {
                        this.reportDialog = false
                        this.typeReport = ""
                        this.causeReport = ""
                        let res = response.data
                        if (res) {
                            this.$notify({
                                title: 'Reply Reported Successfully',
                                type: 'success'
                            });
                        } else {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error while sending the report',
                            });
                        }
                    })
                    .catch((error) => {
                        this.reportDialog = false
                        this.typeReport = ""
                        this.causeReport = ""
                        this.$notify.error({
                            title: 'Error',
                            message: 'You already Report this Reply',
                        });
                    })
            }

        },
        reviewPost(param) {
            let review = {
                liked: true,
                dislike: false,
                post: this.post,
                user: {
                    userId: this.reply.user.userId
                }
            }
            if (!param) {
                review.liked = false
                review.dislike = true
            }
            axiosBase.post("/posts/review", review)
                .then((response) => {
                    let res = response.data
                    if (res == 0)
                        return
                    else if (res == 1) {
                        this.plikes++
                        this.pdislikes--
                    } else if (res == 2) {
                        this.plikes--
                        this.pdislikes++
                    } else if (res == 3)
                        this.plikes++
                    else
                        this.pdislikes++
                    return
                })
                .catch((error) => {
                    console.log(error)
                })

        },
        reviewReply(param, rep) {
            let review = {
                liked: true,
                dislike: false,
                reply: rep,
                user: {
                    userId: this.reply.user.userId
                }
            }
            if (!param) {
                review.liked = false
                review.dislike = true
            }
            axiosBase.post("/posts/reply/review", review)
                .then((response) => {
                    let res = response.data
                    if (typeof res != "object" || res == null) {
                        return
                    }
                    if (rep.reviews == null || rep.reviews.length < 1) {
                        rep.reviews = new Array(res)
                        return
                    }
                    let index = rep.reviews.findIndex(x => x.id == res.id)
                    if (index >= 0) {
                        rep.reviews.splice(index, 1)
                        rep.reviews.push(res)
                    } else {
                        rep.reviews.push(res)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })

        },
        Likes(rep) {
            if (rep.reviews == null)
                return 0
            return rep.reviews.filter(x => x.liked).length
        },
        dislikes(rep) {
            if (rep.reviews == null)
                return 0
            return rep.reviews.filter(x => x.dislike).length
        }
    }
}
</script>

<style>
.PostContent {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 3%;
}

.Reply-content {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 3%;
}

.add-Replies {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 3%;
}

.addr {
    background: #7d756d;
    padding: 10px;
    color: white;
    text-transform: capitalize;
    border-radius: 45px;
    margin-left: 10px;
    margin-right: 10px;
    position: relative;
    font-family: 'Dosis';
    font-size: 14px;
    width: 104px;

}

.addr:hover {
    background: #8b857f;
    padding: 10px;
    color: white;
    text-transform: capitalize;
    border-radius: 45px;
    position: relative;
    font-family: 'Dosis';
    font-size: 14px;
    cursor: pointer;
}

.disputo-container-vote-inner {
    position: relative;
    bottom: -57px;
}

a.add-Reply {
    float: right;
    background: #495f75;
    color: white;
    width: 100px;
    text-align: center;
    padding: 12px;
    border-radius: 12px;
    margin-top: 14px;
    margin-bottom: 14px;
    font-weight: 600;
    font-family: sans-serif;
    cursor: pointer;
}

a.add-Reply:hover {
    float: right;
    background: #5f748a;
    color: white;
    width: 100px;
    text-align: center;
    padding: 12px;
    border-radius: 12px;
    margin-top: 14px;
    margin-bottom: 14px;
    font-weight: 600;
    font-family: sans-serif;
    cursor: pointer;
}

#rep-div {
    border-top-left-radius: 10px !important;
    border-top-right-radius: 10px !important;
}

ul.forums {
    margin: 0 !important;
    padding: 0 !important;
}

.disputo-replies-content-bar {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

div#main-text-content {
    font-size: 21px;
    font-family: 'lato';
}

a.like-btn {
    color: #47d245;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
}

a.dislike-btn {
    color: rgb(232 63 63);
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
}

.spanTitle {
    font-size: 20px;
    line-height: 1.8;
}

li.disputo-replies-title {
    padding-bottom: 34px;
    font-weight: 400 !important;
    /* padding-bottom: 34px; */
}

ul.ulReplies {
    list-style: none;
}

#replying {
    padding: 20px 13px;
    background: #f7f6f6;
    border-left: 5px #4242b3 solid;
    margin: 0 auto;
    width: 90%;
    margin-bottom: 2%;
}

.disputo-replies-wrapper {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    width: 99.95% !important;
}

.report-btn {
    color: #e6bd26;
    font-size: 18px;
    position: relative;
    top: 1px;
    cursor: pointer;
}

.report-btn:hover {
    color: red;
    font-size: 18px;
    position: relative;
    top: 1px;
    cursor: pointer;
}

#reportId .el-dialog__header {
    text-align: center;
}

a.ReportSubmit {
    color: white;
    background: #46920d;
    padding: 13px;
    border-radius: 10px;
    cursor: pointer;
}

a.ReportSubmit:hover {
    color: white;
    background: #357703;
    padding: 13px;
    border-radius: 10px;
    cursor: pointer;
}
.ql-align-center {
    text-align: center;
}
</style>
