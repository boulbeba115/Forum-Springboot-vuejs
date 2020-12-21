<template>
<div id="indexPage">
    <navBar />
    <div class="top-landing" style="background-position-y: -280px;min-height:300px;">
        <div class="overly" style="min-height:300px;"></div>
        <div class="container vertical-center-main"  style="transform: translate(-50%, 55%);">
            <h1 style="margin: 20px 0; letter-spacing: 5px; text-transform: uppercase;color: white;">
                Welcome to Social Forum
            </h1>
            <p style="margin: 20px 0">
                The Place That you can Explain Yourself Without worrying
            </p>
        </div>
    </div>
    <el-breadcrumb class="headerBar" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
            <i class="fa fa-home" aria-hidden="true"></i> <strong>Home</strong> </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main container-fluid">
        <div class="row">
            <div class="col-sm-9">
                <topics />
            </div>
            <div id="sidebarContent" class="col-sm-3">
                <sideBar />
            </div>
        </div>
    </div>
    <backfooter />
</div>
</template>

<script>
import Vue from "vue";
import Topics from "@/components/topics.vue";
import SideBar from "@/components/sideBar.vue";
import navBar from "@/components/navbar.vue";
import backfooter from "@/components/footer.vue";
export default {
    components: {
        Topics,
        SideBar,
        navBar,
        backfooter
    },
};
</script>

<style>
.top-landing {
    min-height: 675px;
    background: #364253;
    background-image: url("../../assets/img/background1.jpg");
    color: white;
    background-size: cover;
    background-repeat: no-repeat;
}

.vertical-center-main {
    margin: 0;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 100%);
    z-index: 3;
    text-align: center;
}

.search-input {
    height: 60px;
    background: #303a47;
    outline: none;
}

#indexPage .fa-search {
    padding: 9px;
}

.input-group-append btn-info {
    border: 1px solid;
}

div#header-search {
    border: 1px solid white;
    width: 65%;
    margin: 0 auto;
}

.overly {
    background: rgba(39, 62, 84, 0.82);
    overflow: hidden;
    min-height: 675px;
    z-index: 2;
    position: absolute;
    width: 100%;
}

.headerBar {
    line-height: 2 !important;
    padding: 10px;
    background: #ecf0f1;
}

.main {
    background: white;
    width: 96%;
    padding-top: 3%;
}
.main.container-fluid.pagesContainer {
    width: 90%;
}
div#main {
    background: white;
}
</style>
