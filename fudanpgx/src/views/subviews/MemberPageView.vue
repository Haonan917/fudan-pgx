<template>
  <div class="container-wrapper" style="margin-top: 5vh">
    <section class="profile-page" >
      <div class="container" >
        <div id="intro">
          <el-row :gutter="24" class="row" >
            <div class="el-col-8" >
              <div id="profile">
                <img class="avatar avatar-circle" width="270" height="270" :src="currentMember.avatar" alt="Xiaotao SHEN">
                <div class="portrait-title">
                  <h2 style="font-size: 24px;">{{currentMember.name}}</h2>
                  <p style="font-size: 16px;margin-top: 10px;opacity: 0.7">{{currentMember.title}}</p>
                  <p style="font-size: 16px;margin-top: 10px;opacity: 0.7">{{currentMember.institution}}</p>
                </div>
                <ul class="network-icon" aria-hidden="true">
                  <!--                TODO: add icon-->
                  <!--                <li>email</li>-->

                </ul>
              </div>
            </div>
            <div class="el-col-16">
              <div class="article-style" >
                <p>
                  {{currentMember.intro}}
                </p>
<!--                <p>🐶 🏫 🈸 😄 👊 ✊ 👨‍👩‍👦 🐼 🌏 🎉 🇨🇳</p>-->
              </div>
              <el-row  class="description-style">
                <div class="el-col-10">
                  <div class="section-subheading">Interests</div>
                  <ul class="ul-interests">
                    <li v-for="(item, index) in currentMember.interests" :key="index">{{item}}</li>
                  </ul>
                </div>

                <div class="el-col-14">
                  <div class="section-subheading">Education</div>
                  <ul class="ul-edu">
                    <li v-for="(item, index) in currentMember.educations" :key="index">
                      <div class="description">
                        <p class="course">{{item.degree}}, {{item.duration}}</p>
                        <p class="institution">{{item.school}}</p>
                      </div>
                    </li>

                  </ul>
                </div>
              </el-row>
            </div>
          </el-row>
        </div>
        <el-divider />
<!--        <div id="publication" style="text-align: left;line-height: 1.5rem">-->
<!--          <h3>Publications:</h3>-->
<!--          <div class="pub-list">-->
<!--            <p class="pub" v-for="(item, index) in pubList" :key="index">-->
<!--              {{item.content}}-->
<!--              <el-link type="primary" :underline="false"  style="margin-left: 10px">Paper Link</el-link>-->
<!--            </p>-->

<!--          </div>-->
<!--        </div>-->
      </div>


    </section>
  </div>


</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "MemberPageView",
  data() {
    return{
      pubList:[
        {content:'Xiao W#*, Ren L#, …, Wang C*, Shi L*. Towards best practice in cancer mutation detection with whole-genome and whole-exome sequencing. Nature Biotechnology, 39, in press (2021)', url:''},
        {content:'Fang LT#, Zhu B#, Zhao Y#, …, Hong H*, Shi L*, Wang C*, Xiao W*. Establishing community reference samples, data and call sets for benchmarking cancer mutation detection using whole-genome sequencing. Nature Biotechnology, 39, in press (2021)', url:''},
        {content:'Jiang YZ#, Ma D#, Suo C#, Shi J#, Xue M#, Hu X#, …, Wang P*, Shi L*, Huang W*, Shao ZM*. Genomic and transcriptomic landscape of triple-negative breast cancers: subtypes and treatment strategies. Cancer Cell, 35(3), 428-440 (2019). (ESI highly cited paper)', url:''}
      ]
    }
  },

  computed: {
    ...mapGetters({
      getMemberById: 'memberStore/getMemberById',
      getMemberByName: 'memberStore/getMemberByName'
    }),
    currentMember() {
      // 假设你的路由参数中有 id 参数
      const memberId = this.$route.query.id;
      const memberName = this.$route.query.name;
      if (typeof(memberId) !== 'undefined') {
        return this.getMemberById(memberId);
      }
      return this.getMemberByName(memberName);

    }
  }
}
</script>

<style scoped>

.profile-page {
  width: 100vw;
  overflow-x: hidden; /* Prevent horizontal overflow */
  flex-grow: 1;
  background-color: white;
  min-height: calc(-75px + 100vh);

}

.container {
  width: 100%;
  padding: 50px 70px;
  margin-right: auto;
  margin-left: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

#profile {
  text-align: center;
  padding: 30px 10px;
  position: relative;
}

.portrait-title{
  padding-top: 20px;
}

.avatar-circle {
  border-radius: 50%;
}
.avatar {
  width: 270px;
  height: 270px;
  margin: 0 auto;
  object-fit: cover;
}
img {
  height: auto;
  max-width: 100%;
  display: block;
  vertical-align: middle;
  border-style: none;
  aspect-ratio: auto 270 / 270;
  overflow-clip-margin: content-box;
}
.article-style {
  overflow: hidden;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  text-align: justify;
  line-height: 2rem;
}

.description-style {

  text-align: justify;
  line-height: 1.8rem;
}

.section-subheading {
  font-size: 1.25rem;
  font-family: roboto, sans-serif;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: .5rem;
}


ul.ul-interests li {
  margin-left: 30px;
  font-size: .9rem;
}

ul.ul-edu {
  list-style: none;
}
ul.ul-edu li .description p.course {
  font-size: .9rem;
}
ul.ul-edu li .description p.institution {
  font-size: .75rem;
  color: rgba(0, 0, 0, .6);
}
ul.ul-edu li .description p {
  margin: 0;
}

ul.network-icon {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.pub-list {
  padding-left: 1.5rem
}

.pub {
  margin-top: 6px;
  font-size: 15px;
  opacity: 0.8
}
</style>