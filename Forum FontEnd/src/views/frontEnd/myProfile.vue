<template>
<div>
    <navBar />
    <div class="top-landing-user" style="height: 200px;">
        <div class="overly-simple" style="height: 200px;"></div>
        <div class="container vertical-center-user">
            <h1 style="margin: 20px 0; letter-spacing: 5px; text-transform: uppercase;color: white;">
                Edit My Profile
            </h1>
        </div>
    </div>
    <el-breadcrumb class="headerBar" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }"> <i class="fa fa-home" aria-hidden="true"></i>Home</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/profile' }">Profile</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="mainProfile" class="row">
        <div class="col-sm-8">
            <form class="user-form">
                <h4 class="editformtitle">Edit My Informations</h4>
                <div class="container-fluid" style="width: 72%;">
                    <div class="row" v-if="!user.isAnonym">
                        <div class="col-sm-6">
                            <div class="control-form">
                                <i class="fa fa-user pass-ico" aria-hidden="true"></i>
                                <input v-bind:class="{ errorField: validFirstName }" class="form-Inputs" v-model="user.firstName" type="text" placeholder="FirstName" />
                                <template v-if="validFirstName">
                                    <br />
                                    <span class="errorMsg">This Field Is empty</span>
                                </template>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="control-form">
                                <i class="fa fa-user-o pass-ico" aria-hidden="true"></i>
                                <input v-bind:class="{ errorField: validLastName }" class="form-Inputs" v-model="user.lastName" type="text" placeholder="LastName" />
                                <template v-if="validLastName">
                                    <br />
                                    <span class="errorMsg">This Field Is empty</span>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="control-form" style="line-height: 5;">
                                <el-date-picker class="dateInp" v-model="user.birthDate" type="date" placeholder="Pick a day">
                                </el-date-picker>
                                <template v-if="validBirthDate">
                                    <br />
                                    <span class="errorMsg" style="position: absolute;line-height: 2;">You need to Pick a Birth Date</span>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="control-form" style="text-align: left">
                                <i class="fa fa-envelope-open pass-ico" aria-hidden="true"></i>
                                <input v-bind:class="{ errorField: validUserMail }" type="email" style="width: 88.5%;" class="form-Inputs" placeholder="Email" v-model="user.userMail" />
                                <template v-if="validUserMail">
                                    <br />
                                    <span class="errorMsg">The Email is empty or not valid</span>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="control-form">
                                <i class="fa fa-lock pass-ico" aria-hidden="true"></i>
                                <input class="form-Inputs" v-bind:class="{ errorField: validPassword }" v-model="user.oldpass" type="password" placeholder="Current Password" />
                                <template v-if="validPassword">
                                    <br />
                                    <span class="errorMsg">You need to enter the current password</span>
                                </template>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="control-form">
                                <i class="el-icon-lock pass-ico" aria-hidden="true"></i>
                                <input class="form-Inputs" v-model="user.userPassword" type="password" placeholder="new Password" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="control-form">
                                About Me
                                <el-input type="textarea" :rows="5" placeholder="About Me" v-model="user.abouMe">
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <el-checkbox style="position: relative; top: 31px" v-model="user.isAnonym">Stay anonymous</el-checkbox>
                        </div>
                    </div>
                </div>

                <a @click="submitData()" class="Edit-Profil">Edit-Profil</a>
            </form>
        </div>
        <div class="col-sm-4">
            <div class="profile-card">
                <div class="ulogo">
                    <img class="" height="154" width="154" style="border-radius: 100%;" :src="loadImg(user.userPic)" alt="">
                </div>
                <h4 class="userNameClass">{{user.userName}}</h4>

                <div class="user-stats row">
                    <div class="col-sm-4" style="border-right: solid 1px;">
                        <a><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            <br>
                            2 post
                        </a>
                    </div>
                    <div class="col-sm-4">
                        <a>
                            <i class="fa fa-user-o" aria-hidden="true"></i>
                        </a>
                        <br>
                        0 following
                    </div>
                    <div class="col-sm-4" style="border-left: solid 1px;">
                        <a>
                            <i class="fa fa-user" aria-hidden="true"></i>
                        </a>
                        <br>
                        0 followers
                    </div>
                </div>
                <div class="row row-upload">
                    <el-upload class="upload-user-logo" ref="uploadImg" :limit="1" :on-exceed="limitExceted" :on-change="handleChange" :auto-upload="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" drag :action="imgUri" :file-list="fileList" multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                        <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 2mb</div>
                    </el-upload>
                    <div class="col-sm-12" style="text-align:center"><a class="upBtn" @click="UploadUserImg()" v-if="confirmUpload">Upload</a></div>

                </div>

            </div>

        </div>
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
            user: {
                firstName: "",
                lastName: "",
                userName: "",
                userMail: "",
                birthDate: "",
                abouMe: "",
                isAnonym: true,
                oldpass: "",
                userPassword: "",
                abouMe: "",
                userPic: ""
            },
            validFirstName: false,
            validLastName: false,
            validUserName: false,
            validUserMail: false,
            validBirthDate: false,
            validPassword: false,
            userId: "",
            dimgUri: "http://localhost:8070/api/users/img/",
            imgUri: "",
            valid: 0,
            confirmUpload: false,
            fileList: []
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
        console.log(this.userId)
        axiosBase.get("/users/by/identifier/" + this.userId)
            .then((response) => {
                this.user = response.data
            })
            .catch((e) => {

            })

    },
    methods: {
        loadImg(img) {
            var images = require.context('@/assets/img/users')
            return images('./' + img)
        },
        dateToYYYYMMDD(d) {
            return d && new Date(d.getTime() - (d.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0]
        },
        validateForm() {
            if (this.user.firstName == "" && !this.user.isAnonym)
                this.validFirstName = true
            else
                this.validFirstName = false
            if (this.user.lastName == "" && !this.user.isAnonym)
                this.validLastName = true
            else
                this.validLastName = false
            if (this.user.userName == "")
                this.validUserName = true
            else
                this.validUserName = false
            if (!this.ValidateEmail(this.user.userMail))
                this.validUserMail = true
            else
                this.validUserMail = false
            if (this.user.birthDate == null)
                this.validBirthDate = true
            else
                this.validBirthDate = false
            if ((this.user.userPassword != null || this.user.userPassword != "") && (this.user.oldpass == null || this.user.oldpass == ""))
                this.validPassword = true
            else
                this.validPassword = false

            if (this.validFirstName, this.validLastName || this.validUserName || this.validUserMail || this.validBirthDate || this.validPassword)
                return false
            return true
        },
        submitData() {
            if (!this.validateForm())
                return
            axiosBase.post("/users/edit/profile", this.user)
                .then((response) => {
                    this.user = response.data
                    this.$notify({
                        title: 'Profile updated successfully',
                        type: 'success'
                    });
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        ValidateEmail(mail) {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
                return (true)
            }
            return (false)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPng = file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!(isJPG || isPng)) {
                this.$message.error('Avatar picture must be JPG or PNG format!');
                this.fileList = []
                return false
            }
            if (!isLt2M) {
                this.$message.error('Avatar picture size can not exceed 2MB!');
                this.fileList = []
                return false
            }
            this.imgUri = this.dimgUri + this.user.userId
            return true;
        },
        handleChange(file, fileList) {
            this.imgUri = this.dimgUri + this.user.userId
            this.confirmUpload = true
        },
        handleAvatarSuccess(res, file) {
            this.user.userPic = res.userPic
            console.log(this.user)
            this.$notify({
                title: 'Image updated successfully',
                type: 'success'
            });
        },
        limitExceted() {
            this.$message.error('you can only upload 1 image');
        },
        UploadUserImg() {
            console.log(this.$refs.uploadImg.action);
            this.$refs.uploadImg.submit();
        }
    }
}
</script>

<style scoped>
div#mainProfile {
    margin-top: 2%;
    width: 85%;
    margin: 43px auto;

}

.userNameClass {
    text-align: center;
    color: gray;
    text-transform: capitalize;
}

.user-form {
    background: #f3f3f3;
    border-radius: 11px;
    margin-left: 13px;
    padding-bottom: 35px;
    padding-bottom: 7%;
    margin-bottom: 5%;
    min-height: 566px;
}

.profile-card {
    background: #f3f3f3;
    width: 100%;
    border-radius: 11px;
    min-height: 367px;
}

.editformtitle {
    padding-top: 19px;
    text-align: center;
    color: gray;
}

#mainProfile {
    background: white;
}

.Edit-Profil {
    background: green;
    padding: 10px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    margin-right: 20px;
    position: relative;
    float: right;
    right: 16.5%;
}

.Edit-Profil:hover {
    background: #129112;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    color: white;
}

.ulogo {
    width: fit-content;
    padding-top: 18px;
    margin: 0 auto;
}

.user-stats {
    width: 88%;
    display: flex;
    text-align: center;
    background: white;
    margin: 0 auto;
    padding: 16px;
    border-radius: 11px;
}

.top-landing-user {
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

.vertical-center-user {
    margin: 0;
    position: relative;
    top: 51px;
    z-index: 3;
    text-align: center;
    margin: 0 auto;

}

input.el-input__inner {
    border-radius: 10px;
    border: none;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 76% !important;
}

.row-upload {
    margin: 0;
    padding-top: 33px;
    padding-bottom: 27px;
}

.upload-user-logo {
    text-align: center;
    margin: 0 auto;
}

a.upBtn {
    margin-top: 7px;
    color: white;
    background: green;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;
}

a.upBtn:hover {
    margin-top: 7px;
    color: white;
    background: rgb(15, 158, 15);
    padding: 10px;
    border-radius: 10px;
    text-decoration: none;
    cursor: pointer;
}
</style>
