<template>
<div>
    <div class="disputo-add-border panel-widget-style panel-widget-style-for-304-0-1-1 XXsnipcss_extracted_selector_selectionXX">
        <div class="so-widget-disputo-list so-widget-disputo-list-base">
            <div class="disputo-widget-title">
                <h4>
                    <span> Latest Posts </span>
                </h4>
            </div>
            <div class="disputo-post-list-wrapper" style="    position: relative;top: -26px;">
                <div class="disputo-post-list" v-for="post in posts" @click="goToPost(post)">
                    <div class="disputo-post-list-left">
                        <a>
                            <img :src="getUserImg(post.postOwner.userPic)" />
                        </a>
                    </div>
                    <div class="disputo-post-list-right">
                        <p>
                            <a>
                                {{post.postTitle}}
                            </a>
                        </p>
                        <div class="disputo-post-list-info">
                            <i class="fa fa-clock-o"> </i>
                            <a>
                                {{ post.createdAt | moment("dddd, MMMM Do YYYY")  }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import "../assets/css/sideBar.css"
import axiosBase from '@/views/base.js';

export default {
    data() {
        return {
            posts: [],
        }
    },
    created() {
        axiosBase.get("/posts/latest/posts")
            .then((response) => {
                this.posts = response.data
            })
            .catch((error) => {

            })
    },
    methods: {
        getUserImg(img) {
            return img ? require(`@/assets/img/users/${img}`) : ''
        },
        goToPost(post) {
            if (typeof post != "undefined") {
                sessionStorage.setItem("post", post.postId)
                this.$router.push("/posts/show")
            }
        },
    }
};
</script>

<style>
.disputo-widget-title {
    text-align: center;
    background: #223547;
    width: 100%;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.so-widget-disputo-list.so-widget-disputo-list-base {
    width: 100%;
    padding: 0;
    margin: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.disputo-add-border.panel-widget-style.panel-widget-style-for-304-0-1-1.XXsnipcss_extracted_selector_selectionXX {
    padding: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: relative;
    top: 26px;
}



.disputo-add-border h4 {
    padding: 22px;
    color: white;
}

.disputo-post-list {
    height: 94px;
    margin: 0 auto;
    width: 100%;
    cursor: pointer;
    padding: 20px;
}
.disputo-post-list:hover {
    background: #f7f7f7;
    height: 94px;
    margin: 0 auto;
    width: 100%;
    cursor: pointer;
    padding: 20px;
}
</style>
