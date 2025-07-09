<template>
  <div class="container-wrapper">
    <div class="container">
      <div class="sub-container">
        <h1>Research Faculty</h1>
        <div class="people-container">
          <div class="people el-col-6" v-for="(item, index) in facultyList" :key="index">
            <img  loading="lazy" class="avatar avatar-circle hvr-grow-shadow" :src="item.avatar" @click="handleMemberClick(item)" alt="/public/member/phd/Default.png">
            <div class="portrait-title">
              <p style="font-size: 15px;margin-top: 4px;color: #3c90ff">{{item.name}}</p>
              <!--          <p style="font-size: 12px;opacity: 0.6;margin-top: 8px">{{item.institution}}</p>-->
              <p style="font-size: 12px;opacity: 0.6;margin-top: 8px">{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="sub-container">
        <h1>PhD Students</h1>
        <div class="people-container">
          <div class="people el-col-6" v-for="(item, index) in phdList" :key="index">
            <img  loading="lazy" class="avatar avatar-circle hvr-grow-shadow" :src="item.avatar" @click="handleMemberClick(item)" alt="/public/member/phd/Default.png">
            <div class="portrait-title">
              <p style="font-size: 15px;margin-top: 4px;color: #3c90ff">{{item.name}}</p>
              <!--          <p style="font-size: 12px;opacity: 0.6;margin-top: 8px">{{item.institution}}</p>-->
              <p style="font-size: 12px;opacity: 0.6;margin-top: 8px">{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="sub-container">
        <h1>Master Students</h1>
        <div class="people-container">
          <div class="people el-col-6" v-for="(item, index) in masterList" :key="index">
            <img  loading="lazy" class="avatar avatar-circle hvr-grow-shadow" :src="item.avatar" @click="handleMemberClick(item)" alt="/public/member/phd/Default.png">
            <div class="portrait-title">
              <p style="font-size: 15px;margin-top: 4px;color: #3c90ff">{{item.name}}</p>
              <!--          <p style="font-size: 12px;opacity: 0.6;margin-top: 8px">{{item.institution}}</p>-->
              <p style="font-size: 12px;opacity: 0.6;margin-top: 8px">{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="sub-container">
        <h1 @click="changeAlumni" style="cursor: pointer;  display: flex;align-items: center;justify-content: center;">
          <span style="margin-right: 10px">Alumni</span>
          <el-icon v-show="!showAlumni" ><Hide /></el-icon>
          <el-icon v-show="showAlumni"><View /></el-icon>
        </h1>
        <div class="people-container"  v-show="showAlumni">
<!--          <div class="people el-col-6" v-for="(item, index) in peopleList" :key="index">-->
<!--            <img  loading="lazy" class="avatar avatar-circle hvr-grow-shadow" :src="item.img" @click="handleMemberClick(item)" alt="/public/member/phd/Default.png">-->
<!--            <div class="portrait-title">-->
<!--              <p style="font-size: 15px;margin-top: 4px;color: #3c90ff">{{item.name}}</p>-->
<!--              &lt;!&ndash;          <p style="font-size: 12px;opacity: 0.6;margin-top: 8px">{{item.institution}}</p>&ndash;&gt;-->
<!--              <p style="font-size: 12px;opacity: 0.6;margin-top: 8px">{{item.title}}</p>-->
<!--            </div>-->
<!--          </div>-->
          <div class="el-col-22" style="display: flex;justify-content: center;align-items: center;margin: 32px 0 32px 0">
            <el-table :data="alumniList" border>
              <el-table-column prop="name" label="Name"  align="center" />
              <el-table-column prop="year" label="Graduation"  align="center"  />
              <el-table-column prop="degree" label="Degree" align="center"/>
              <el-table-column prop="direction" label="Direction" align="center" width="300"/>
              <el-table-column prop="email" label="Email"  align="center"/>
            </el-table>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "MembersView",
  components:{

  },
  data(){
    return {
      showAlumni: false,
    }
  },
  computed: {
    ...mapGetters({
      facultyList: 'memberStore/facultyList',
      phdList: 'memberStore/phdList',
      masterList: 'memberStore/masterList',
      alumniList: 'alumniStore/allAlumnis'
    })
  },
  methods:{
    handleMemberClick(item) {
      console.log(item._id)
      this.$router.push({
        path: '/author',
        query: {
          id: item._id,
          name:item.name
        }
      })
    },

    changeAlumni(){
      this.showAlumni = !this.showAlumni
    }
  }
}
</script>

<style scoped>
#app, * {
  font-family: Helvetica;
}

.container {
  /*第一参数控制上下，第二个参数控制左右*/

  background-color: rgb(255, 255, 255);
  width: 900px;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 12px 0px;
  margin: 0px auto auto;
  min-height: calc(-75px + 100vh);
  padding-top: 4vw;
}

.sub-container {
  padding:35px 0;
}

.people-container{
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}

.people {
  margin-top: 30px;
}
.avatar {
  /*width: 80%;*/
  /*max-width: 150px;*/
  height: auto;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  object-fit: cover;
  cursor: pointer;
}


.avatar-circle {
  border-radius: 50%;
}

.portrait-title{
  padding-top: 8px;
}

/* Grow Shadow */
.hvr-grow-shadow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}
.hvr-grow-shadow:hover, .hvr-grow-shadow:focus, .hvr-grow-shadow:active {
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


</style>