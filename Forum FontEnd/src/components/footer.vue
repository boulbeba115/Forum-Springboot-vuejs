<template>
<div class="footer">
    <div class="row">
        <div class="col-sm-4">
            <h2 class="footer-left">SOCIAL FORUM <br /> 2020</h2>
        </div>
        <div class="col-sm-4">
            <img class="footer-logo" :src="require('@/assets/mylogo.png')" alt="">
        </div>
        <div class="col-sm-4">
            <h2 class="footer-right">TOGETHER WE SOLVE <br /> ALL PROBLEMS</h2>
        </div>
    </div>
    <div class="row">
        <div class="social-btns">
            <a  href="#"><i class="facebook fa fa-facebook"></i></a>
            <a  href="#"> <i class="twitter fa fa-twitter"></i></a>
            <a  href="#"><i class="google fa fa-google"></i></a>
            <a  href="#"><i class="linkedin fa fa-linkedin"></i></a>
            <a  href="#"><i class="skype fa fa-skype"></i></a>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
.social-btns {
    margin: 0 auto;
}
.twitter , .google , .linkedin ,.skype{
    border: 4px solid #e3e3e3;
    color: #e3e3e3;
    padding: 11px 13px;
    margin-left: 11px;
    border-radius: 100%;
    font-size: 20px;
    font-weight: bold;
    width: 50px;
    height: 50px;
    margin-bottom: 23px;
    cursor: pointer;
}
.facebook{
    border: 4px solid #e3e3e3;
    color: #e3e3e3;
    padding: 11px 15px;
    margin-left: 11px;
    border-radius: 100%;
    font-size: 20px;
    font-weight: bold;
    width: 50px;
    height: 50px;
    margin-bottom: 23px;
}
.twitter:hover , .google:hover , .linkedin:hover ,.skype:hover{
    border: 4px solid white;
    padding: 11px 13px;
    margin-left: 11px;
    border-radius: 100%;
    font-size: 20px;
    font-weight: bold;
    width: 50px;
    height: 50px;
    margin-bottom: 23px;
    background:white;
    color: gray;
}
.facebook:hover{
    border: 4px solid white;
    padding: 11px 15px;
    margin-left: 11px;
    border-radius: 100%;
    font-size: 20px;
    font-weight: bold;
    width: 50px;
    height: 50px;
    margin-bottom: 23px;
    background:white;
    color: gray;
}
.footer {
    background: #34495e;
    min-height: 400px;
    margin-top:1% ;
}

.footer-left {
    color: white;
    font-family: 'Dosis';
    font-size: 3em;
    text-align: center;
    margin-top: 32%;
}

.footer-logo {
    width: 275px;
    margin: 0 auto;
    display: block;
    position: relative;
    top: 61%;
    transform: translate(0, -50%);
}

.footer-right {
    color: white;
    font-family: 'Dosis';
    font-size: 3em;
    text-align: center;
    margin-top: 32%;
}
</style>
