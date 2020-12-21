import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/frontEnd/main.vue'
import PostList from '../views/frontEnd/posts.vue'
import Login from '../views/login.vue'
import DashBoard from '../views/backEnd/dashboard.vue'
import Posts from "../views/backEnd/Posts/posts.vue"
import Category from "../views/backEnd/categoryTopic/categories.vue"
import Topic from "../views/backEnd/categoryTopic/topics.vue"
import AddPost from "../views/frontEnd/addPost.vue"
import SignlePost from "../views/frontEnd/singlePost.vue"
import MyPosts from "../views/frontEnd/myposts.vue"
import myProfile from "../views/frontEnd/myProfile.vue"
import Banned from "../views/frontEnd/banned.vue"
import PageNotFound from "../views/frontEnd/PageNotFound.vue"
import Users from "../views/backEnd/users/users.vue"
import Replies from "../views/backEnd/Replies/Replies.vue"

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Main',
    component: Home
},
{
    path: '/posts',
    name: 'Posts',
    component: PostList,
    props: true
},
{
    path: '/posts/addPost',
    name: 'AddPost',
    component: AddPost,
    props: true
},
{
    path: '/posts/show',
    name: 'showPost',
    component: SignlePost,
    props: true
},
{
    path: '/myPosts',
    name: 'myPosts',
    component: MyPosts,
},
{
    path: '/profile',
    name: 'profile',
    component: myProfile,
},
{
    path: '/banned',
    name: 'Banned',
    component: Banned,
},
{
    path: '/login',
    name: 'Login',
    component: Login
},
{
    path: '/register',
    name: 'Register',
    component: Login
},
{
    path: '/dashBoard',
    name: 'DashBoard',
    component: DashBoard
},
{
    path: '/dashBoard/posts',
    name: 'Posts Manager',
    component: Posts
},
{
    path: '/dashBoard/category',
    name: 'Category Manager',
    component: Category
},
{
    path: '/dashBoard/topics',
    name: 'Topic Manager',
    component: Topic
},
{
    path: '/dashBoard/users',
    name: 'Users Manager',
    component: Users
},
{
    path: '/dashBoard/replies',
    name: 'Replies',
    component: Replies
},
{ path: "*", component: PageNotFound },
    /*
    {

      component: () => import( webpackChunkName: "about"  '../views/About.vue')
    }*/
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router