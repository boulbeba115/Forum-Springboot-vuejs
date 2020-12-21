<template>
<div>
    <div>
        <div class="announcement" style="background-color:rgb(28 36 53)">
            <div class="row">
                <div class="col-sm-4">
                    <h5 style="color:white">Categories</h5>
                </div>
                <div class="col-sm-8">
                    <pagination style="float: right;" class="cc-w-auto" :records="maxDatas" :currentpage="currentPage" :number-per-page="nbPerPage" @changepage="changePage"></pagination>
                </div>
            </div>
        </div>
        <div class="categTopics" v-for="cat in datasShown">
            <div class="row category" style="margin:0;">

                <div class="col-sm-6 col6-Design">
                    <h1 class="category-title">{{ cat.categoryTitle }}</h1>
                    <hr class="catagory-divider-style" />
                    <span class="forum_description" style="margin-left: 5%; color: white">{{ cat.categoryDescription }}</span>
                </div>
                <div class="col-sm-6">
                    <div class="row center-Vertical">
                        <div class="col-sm-4">
                            <i class="fa fa-bullhorn posts-Icon" aria-hidden="true"></i>
                            <br />
                            {{ numberOfTopics(cat) }}
                            <br />
                            Topics
                        </div>
                        <div class="col-sm-4">
                            <i class="fa fa-thumb-tack replay-Icon" aria-hidden="true"></i>
                            <br />
                            {{ numberOfPosts(cat) }}
                            <br />
                            Posts
                        </div>
                        <div class="col-sm-4">
                            <i class="fa fa-comments topic-Icon" aria-hidden="true"></i>
                            <br />
                            {{ numberOfReplies(cat) }}
                            <br />
                            replies
                        </div>
                    </div>
                </div>
            </div>
            <main class="row-container">
                <section v-for="topic in cat.topicList" @click="goToPosts(topic,cat)" style="max-height: 500px;min-height: 500px;cursor: pointer;">
                    <figure>
                        <img v-if="topic.topicImage!=''" class="topic-img" :src="require('@/assets/img/TopicImg/'+topic.topicImage)" />
                        <img v-else class="topic-img" src="https://images.pexels.com/photos/1391421/pexels-photo-1391421.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="Free Stock Photo from pexels.com" />
                    </figure>
                    <div class="logo-center">
                        <img v-if="topic.topicLogo!=''" class="topic-logo" :src="require('@/assets/img/TopicImg/'+topic.topicLogo)" alt="" />
                        <img v-else class="topic-logo" src="../assets/img/1.png" alt="" />
                    </div>
                    <article style="transform: translateY(-90px);">
                        <div>
                            <div class="row" style="margin:0">
                                <div class="col-sm-12">
                                    <h5 class="topic-title">{{ topic.topicTitle }}</h5>
                                </div>
                            </div>
                            <div href="#" class="tile_inner">
                                <div class="row" style="margin:0;min-height:140px;">
                                    <div class="tile_title">
                                        <span class="forum_description">{{topic.topicDescription}}</span>
                                    </div>
                                </div>
                                <div class="row" style="margin: 0;">
                                    <hr class="divider-style" />
                                </div>
                                <div class="row" style="text-align: center;margin: 0;">
                                    <template v-if="topic.postList.length>0">
                                        <div class="col-4">
                                            <span class="mini_number">{{topic.postList.length }}</span>
                                            <span class="mini_label">Posts</span>
                                        </div>
                                        <div class="col-4">
                                            <span class="mini_number">{{ topicReplies(topic) }}</span>
                                            <span class="mini_label">Replies</span>
                                        </div>
                                        <div class="col-4">
                                            <span class="mini_date">
                                                <time>{{lastPostDate(topic) | moment("ddd-MM")}}</time>
                                            </span>
                                            <span class="mini_label"> Last post </span>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="col-6">
                                            <span class="mini_number">{{topic.postList.length }}</span>
                                            <span class="mini_label">Posts</span>
                                        </div>
                                        <div class="col-6">
                                            <span class="mini_number">{{ topicReplies(topic) }}</span>
                                            <span class="mini_label">Replies</span>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        </div>
        <div class="announcement-2" style="position: relative;top: -33px;">
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

</div>
</template>

<script>
import Vue from "vue";
import "../assets/css/Gridstyle.css";
import axiosBase from '@/views/base.js'
import Pagination from '@/components/frontPagination.vue'
Vue.use(require("vue-moment"));

export default {
    components: {
        Pagination
    },
    data() {
        return {
            categorys: [],
            /*Pagination */
            datas: [],
            datasFiltered: [],
            datasShown: [],
            currentPage: 1,
            nbPerPage: 3,
            nbPerPageSelect: 3
        };
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
    methods: {
        goToPosts(selectedTopic, category) {
            let replies = 0
            if (selectedTopic.postList != "undefined" && selectedTopic.postList.length > 0) {
                for (let post of selectedTopic.postList) {
                    if (
                        typeof post.replies != "undefined" &&
                        post.replies.length > 0
                    ) {
                        replies += post.replies.length;
                    }
                }
            }
            sessionStorage.setItem("topics", selectedTopic.topicId)
            sessionStorage.setItem("category", category.categoryTitle)
            sessionStorage.setItem("numberReplies", replies)
            this.$router.push({
                name: 'Posts',
                params: {
                    selectedTopic
                }
            })
        },
        numberOfTopics(cat) {
            return typeof cat.topicList != "undefined" && cat.topicList.length > 0 ?
                cat.topicList.length :
                0;
        },
        numberOfPosts(cat) {
            let sum = 0;
            if (typeof cat.topicList != "undefined" && cat.topicList.length > 0) {
                for (let topic of cat.topicList) {
                    if (
                        typeof topic.postList != "undefined" &&
                        topic.postList.length > 0
                    ) {
                        sum += topic.postList.length;
                    }
                }
            }
            return sum;
        },
        numberOfReplies(cat) {
            let sum = 0;
            if (typeof cat.topicList != "undefined" && cat.topicList.length > 0) {
                for (let topic of cat.topicList) {
                    if (topic.postList != "undefined" && topic.postList.length > 0) {
                        for (let post of topic.postList) {
                            if (
                                typeof post.replies != "undefined" &&
                                post.replies.length > 0
                            ) {
                                sum += post.replies.length;
                            }
                        }
                    }
                }
            }
            return sum;
        },
        topicReplies(topic) {
            let sum = 0;
            if (typeof topic.postList != "undefined" && topic.postList.length > 0) {
                for (let post of topic.postList) {
                    if (typeof post.replies != "undefined" && post.replies.length > 0) {
                        sum += post.replies.length;
                    }
                }
            }
            return sum;
        },
        lastPostDate(topic) {
            if (topic.postList.length) {
                return topic.postList.reduce((m, v, i) =>
                    v.createdAt > m.createdAt && i ? v : m
                ).createdAt;
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
    created() {
        let self = this;
        axiosBase
            .get("Categories/all")
            .then((response) => {
                self.categorys = response.data;
                this.datasFiltered = self.categorys
                this.datasShown = this.datasFiltered.slice(0, this.nbPerPage)
            })
            .catch((error) => {
                console.error(error);
            });
    },

};
</script>

<style>
.tile_inner {
    width: 100%;
    text-decoration: none;
    box-sizing: border-box;
    min-height: 200px;
    padding-top: 0 !important;
}

.logo-center {
    margin: 0 auto;
    width: fit-content;
    position: relative;
    transform: translateY(-78px);
}

.topic-logo {
    background: white;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin: 0 auto;
    border: 3px solid #a4b3b7;
}

.topic-title {
    color: #a5a0a0;
    font-size: 18px;
    text-align: center;
    margin-top: 19px;
}

.divider-style2 {
    height: 5px;
    background: #8a90ba;
    border-radius: 65px;
    width: 22%;
    margin-top: 39px !important;
}

.divider-style {
    height: 1px;
    background: #e58d32;
    border-radius: 65px;
    width: 91%;
    margin: 13px auto;
}

.categTopics {
    background: #ecf0f1;
    border-radius: 13px;
    margin-bottom: 2%;
    padding-top: 2%;
}

.category-title {
    color: white;
    font-family: "Rubik";
    font-size: 24px;
    text-transform: capitalize;
}

.topic-Icon {
    color: white;
    font-size: 25px !important;
    background-color: #ff5a5f;
    width: 50px;
    height: 50px;
    padding: 12px 13px;
    border-radius: 100%;
    margin-bottom: 2%;
}

.posts-Icon {
    color: white;
    font-size: 25px !important;
    background-color: #6b717e;
    width: 50px;
    height: 50px;
    padding: 13px 13px;
    border-radius: 100%;
    margin-bottom: 2%;
}

.replay-Icon {
    color: white;
    font-size: 25px !important;
    background-color: #1d84b5;
    width: 50px;
    height: 50px;
    padding: 13px 17px;
    border-radius: 100%;
    margin-bottom: 2%;
}

.catagory-divider-style {
    height: 5px;
    background: #8a90ba;
    border-radius: 65px;
    width: 40%;
    margin-left: 5%;
    margin: 0 auto;
}

.center-Vertical {
    text-align: center;
    margin: 0;
    position: relative;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.tile_title {
    line-height: 3;
}

.tile_title>.forum_description {
    min-height: 103px;
}

.col6-Design {
    background: #223547;
    margin: 0;
    color: white;
    padding-top: 11px;
    padding-bottom: 19px;
    border-top-right-radius: 18px;
    border-bottom-right-radius: 33%;
    text-align: center;
}

.tile_title {
    width: 100%;
}
</style>
