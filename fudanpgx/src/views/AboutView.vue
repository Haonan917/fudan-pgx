<template>
  <div class="container-wrapper">
    <div class="container">
      <el-tabs tab-position="left" :stretch="true">
        <el-tab-pane label="Lab photo" >
          <div class="panel-container">
            <h1>Lab Photos</h1>
            <div class="photo-item" v-for="(item, index) in imgList" :key="index">
              <img :src="item.img" class="lab-img">
              <p class="img-date">{{item.date}}</p>
              <el-divider></el-divider>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Contact us">
          <div class="contact-container">
            <h1>Contact us</h1>
            <div class="icon">
              <div class="el-row" style="margin-top: 30px">
                <div class="el-col-2">
                  <div class="icon-box">
                    <img :src="teamIcon" class="icon-img">
                  </div>
                </div>
                <div class="el-col-14" >
                  <div class="icon-description">
                    <p class="title">Group</p>
                    <p class="content">Fudan PGX Group</p>
                  </div>
                </div>
                <div class="el-col-2">
                  <div class="icon-box">
                    <img :src="institutionIcon" class="icon-img">
                  </div>
                </div>
                <div class="el-col-6">
                  <div class="icon-description">
                    <p class="title">Institution</p>
                    <p class="content">Fudan University</p>
                  </div>
                </div>
              </div>

              <div class="el-row" style="margin-top: 50px">
                <div class="el-col-2">
                  <div class="icon-box">
                    <img :src="addressIcon" class="icon-img">
                  </div>
                </div>
                <div class="el-col-14">
                  <div class="icon-description">
                    <p class="title">Address</p>
                    <p class="content">D611, School of Life Sciences, Song Hu Road 2005, Fudan University (Jiangwan Campus), Shanghai, China, 200438</p>
                  </div>
                </div>
                <div class="el-col-2">
                  <div class="icon-box">
                    <img :src="mailIcon" class="icon-img">
                  </div>
                </div>
                <div class="el-col-6">
                  <div class="icon-description">
                    <p class="title">Email</p>
                    <p class="content">pgx@fudan.edu.cn</p>
                  </div>
                </div>
              </div>
            </div>


            <div class="el-col-24 amap-container"  >
              <el-amap :center="[121.507727, 31.340012]" :zoom="17">
                <el-amap-marker :position="[121.507727, 31.340012]" />
              </el-amap>
            </div>


          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  components:{

  },
  data(){
    return{
      imgList:[
        {img:'./About/photos/a.webp', date:'2023-05-01'},
        {img:'./About/photos/b.webp', date:'2023-05-01'},
        {img:'./About/photos/c.webp', date:'2023-05-01'}
      ],
      addressIcon:'./About/contact/address.svg',
      institutionIcon:'./About/contact/institution.svg',
      mailIcon:'./About/contact/mail.svg',
      teamIcon:'./About/contact/team.svg',
    }
  },


}
</script>

<style scoped>
#app, * {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.container {
  background-color: #fff;
  min-height: 100%;
  width: 1140px;
  display: block;
  text-align: left;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 12px 0px;
  padding-top: 4vw;
}

>>> .el-tabs--left {
  overflow: unset !important;
}

.panel-container{
  text-align: center;
  margin-top: 2vw;
}

.photo-item{
  margin-top: 30px
}

.lab-img {
  width: 75%;
  height: auto;
}

.img-date{
  margin-top: 10px
}


.contact-container{
  text-align: center;
  margin-top: 2vw;
  padding: 0px 60px;
  min-height: 800px;
}

.icon {
  text-align: left;
}
.icon-box{
  border: 1.5px solid #e4e7ed;
  width: 55px;
  height: 55px;
  /*display: flex;*/
  position: relative;
  border-radius: 50%;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
}

.icon-description{
  /*margin-left: 30px;*/
  display: flex;
  flex-direction: column;
  text-align: left;
  /*background-color: #42b983;*/
  height: 55px;
  justify-content: center; /* Vertically centers the content */
}
.icon-description .title{
  opacity: 0.7;
}

.icon-description .content{
  font-size: 14px;
  font-weight: bold;
}

.icon-img {
  display: inline-block;
  height: 30px;
  position: absolute;
  margin: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.amap-container{
  position: relative;
  background: rgb(252, 249, 242);
  margin-top: 40px;
  height: 400px
}
</style>