<template>
  <div class="container-wrapper">
    <img :src="defaultImage" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1"/>
     <section class="carousel-container">

       <div style="position:relative; width: 100%; height: 100vh;overflow: hidden">
         <div class="mask">
         </div>
         <div style="position: absolute;top: 55%;left: 50%; width: 100vw;height: 100%;transform: translate(-50%,-50%)">
           <div style="position: absolute; top: 40%; left: 50%; width:100%;transform: translate(-50%, -50%); color: white;text-align: center">
             <div style="font-size: 5vw; font-weight: bold" class="shadow">
               WELCOME TO PGx GROUP!
             </div>
           </div>
         </div>
       </div>
     </section>
    <section id="latest-news" class="research-section">
      <div class="header" style="text-align: center">
        <h1 class="hero-title">👉 LATEST NEWS</h1>
        <p style="  margin: 1.5vw 0;">
          <span class="link" @click="goToNews">Detailed News</span>
        </p>
        <div style="position: relative">
          <el-carousel type="card" :interval="5000" arrow="always" height="65vh"  >
            <el-carousel-item v-for="(item, index) in recentNews" :key="index" @click="handleNewsClick(item)">
              <div style="position:relative; width: 100%; height: 100%;">
                <img :src="item.cover" style="width: auto; height:90%; object-fit: contain; object-position: center;"/>
              </div>
              <div style="position: absolute; bottom: 0%; left: 50%; z-index: 999;transform: translate(-50%, 0%); color: black; text-align: center;width: 100%">
                <span class="hero-title" style="font-size: 1.2vw;">
                  {{item.title}}
                </span>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>


      </div>

    </section>
    <section id="research-section" class="research-section">
      <div class="header" style="text-align: center">
        <h1 class="hero-title">🔬 ABOUT US</h1>
        <div style="width: 100%;text-align: justify;margin-top: 2vw;line-height: 2vw;opacity: 0.7;font-size: 1.5vw;margin-bottom: 2vw">
          We are a Pharmacogenomics (PGx) research group at Fudan University, Shanghai. Our research is focused on  <u>precision medicine</u>, <u>pharmacogenomics</u>, <u>bioinformatics</u>, and <u>multi-omics data quality control and standardization</u>. Our major research areas include:
        </div>
      </div>
      <div class="el-row research-section-item">
        <div class="el-col-12 section-image">
          <img :src="qcImage" style="width: 70%; height: auto; margin: auto" alt="">
        </div>
        <div class="el-col-12">
          <div class="section-subheading">Quality Control of Multi-Omics Data</div>
          <div class="article-style">
            <p>Quality control (QC) of multi-omics data ensures the reliability, reproducibility, and accuracy of high-throughput biological experiments, which is critical for integrating genomics, transcriptomics, proteomics, and metabolomics data. Rigorous QC frameworks prevent errors, improve reproducibility across studies, and ensure that biomarkers identified for precision medicine are trustworthy. Furthermore, QC plays a vital role in regulatory compliance and clinical applications, supporting the safe and effective translation of research discoveries into personalized therapies.
            </p>
          </div>
        </div>
      </div>
      <div class="el-row research-section-item">
        <div class="el-col-12">
          <div class="section-subheading">Pharmacogenomics and Phenomics Research</div>
          <div class="article-style">
            Multi-Omics-Driven Precision Drug Development and Application integrates genomics, transcriptomics, proteomics, and metabolomics to identify biomarkers and optimize drug responses. Through preclinical and clinical trials, such as those conducted for Chiglitazar, a PPARα/γ/δ pan-agonist used to treat type 2 diabetes, the research ensures that therapies are tailored to individual molecular profiles. High-quality, standardized omics data production, guided by international frameworks like the MAQC/SEQC consortium, underpins this process. The outcome is more reliable drug target discovery and biomarker identification, advancing personalized medicine from research to clinical practice.
          </div>
        </div>
        <div class="el-col-12 section-image">
          <img :src="pgxImage" style="width: 70%;height: auto; margin: auto">
        </div>

      </div>
      <div class="el-row research-section-item">
        <div class="el-col-12 section-image">
          <img :src="cancerImage" style="width: 60%;height: auto; margin: auto">
        </div>
        <div class="el-col-12">
          <div class="section-subheading">Cancer Precision Medicine</div>
          <div class="article-style">
            <p>Through multi-omics data integration (including genomics, transcriptomics, and proteomics), the group identifies biomarkers for disease diagnosis, prognosis, and personalized medicine, with a focus on cancer and other major diseases. Collaborative efforts have led to the development of precision molecular subtyping and targeted treatment strategies, such as for triple-negative breast cancer.</p>
          </div>
        </div>
      </div>
    </section>
    <section id="publication-section" class="publication-section">
      <div class="header" style="text-align: center">
        <h1 class="hero-title">📃 PUBLICATION HIGHLIGHTS</h1>

        <p style="  margin: 1.5vw 0;">
           <span class="link" @click="goToPubs">All Publications</span>
        </p>
      </div>
      <div class="el-row pub-section-item" v-for="(item, index) in highlightPublications" :key="index">
        <div class="el-col-21" style="padding-right:1vw;text-align: justify">
          <div class="section-subheading">{{item.title}}</div>
          <div class="article-style" style="line-height: 2vw">
            {{displayAbstract(item.abstract, item.expanded)}}
            <div v-if="item.abstract.length >= wordsLimit" style="display: inline-block;">
              <el-link type="primary"   style="margin-left: 0.5vw;font-size: 1.1vw;" @click="toggleExpand(item)" v-show="!item.expanded">More ...</el-link>
              <el-link type="primary"   style="margin-left: 0.5vw;font-size: 1.1vw;" @click="toggleExpand(item)" v-show="item.expanded">Less</el-link>
            </div>
          </div>
          <div class="article-metadata">
            {{item.author}}
            <span class="splitter">•</span>
            {{item.journal}}
            <span  class="splitter">•</span>
            {{item.year}}
          </div>
          <div >
            <a :href="item.link" target="_blank" id="link">
              <el-button style="font-size: 1.1vw; padding: 1vw 1.1vw;">Link</el-button>
            </a>

            <el-button @click="downloadPDF(item.doi)" style="margin-left: 1.5vw; font-size: 1.1vw; padding: 1vw 1.1vw;">PDF</el-button>

          </div>
        </div>
        <div class="el-col-3 section-image">
          <img :src="item.img" style="width: 100%;height: auto">
        </div>
      </div>
    </section>

    <section id="footer-section" class="footer-section">
      <div class="el-row" >
        <div class="el-col-5 section-image" style="height: 20vh">
          <img :src="footFudan" style="width: 35%">
        </div>

        <div class="el-col-14 section-image">
          <p style="font-size: 1.4vw">2024 © All Rights Reserved by Fudan PGx Group</p>
        </div>
        <div class="el-col-5 section-image" style="height: 20vh">
<!--          <RevolverMap></RevolverMap>-->
          <img :src="footGlobal" style="width: 40%">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import * as THREE from 'three';
// // import BIRDS from 'vanta/src/vanta.birds';
// import NET from 'vanta/src/vanta.net';
// import { CountTo } from 'vue3-count-to';
import {mapActions, mapGetters, mapMutations } from 'vuex';
// import RevolverMap from "@/components/Maps/RevolverMap";

export default {
  name: 'HomeView',
  components: {
    // CountTo
    // RevolverMap
  },
  computed: {
    ...mapGetters({
      highlightPublications: 'publicationStore/highlightPublications',
      recentNews: 'newsStore/recentNews'
    })
  },
  data(){
    return {
      defaultImage:'./Home/members.webp',
      qcImage:'./Home/QC.webp',
      pgxImage:'./Home/pharmacogenomics.webp',
      cancerImage:'./Home/cancer.webp',
      footFudan:'./Home/fudan.webp',
      footGlobal: './Home/global.webp',
      wordsLimit: 76,
      vantaEffect:null
    }
  },

  methods:{
    ...mapActions('publicationStore', ['downloadPdfByDoi']),
    ...mapMutations('shareStore', ['SET_NAV_ACTIVE']),
    downloadPDF(doi){
      this.downloadPdfByDoi(doi)
    },
    truncateWords(text, limit) {
      const words = text.split(' ');
      if (words.length <= limit) {
        return text;
      }
      return words.slice(0, limit).join(' ');
    },

    displayAbstract(text, isExpanded) {
      return isExpanded ? text : this.truncateWords(text, this.wordsLimit);
    },
    toggleExpand(item) {
      item.expanded = !item.expanded;
    },

    set_nav_active(active) {
      this.SET_NAV_ACTIVE(active)
    },

    handleNewsClick(item) {
      // news
      this.set_nav_active(5)
      console.log(item)
      this.$router.push({
        path: '/news/detail',
        query: {
          id: item._id,
        }
      })
    },

    goToNews(){
      // News
      this.set_nav_active(5)
      this.$router.push({path: '/news'})
    },

    goToPubs(){
      // Publications
      this.set_nav_active(2)
      this.$router.push({path: '/publication'})
    }
  },

  mounted() {

  },
}
</script>

<style scoped>
#app, * {
  font-family: Helvetica;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* 半透明黑色遮罩 */
  pointer-events: none; /* 遮罩不影响用户点击 */
}

.vanta-bg {
  width: 100%;
  height: 80vh; /* Adjust as needed */
  position: relative;
  background-color: #1f80ff;
}

.carousel-container{
  perspective: 500px;
  /*min-height: 40vh;*/
  /*background-color: #1f80ff;*/
}



#carousel .slider{
  position: absolute;
  top: 36%;
  left: 0;
  width: 100%;
  height: 100%;

}



#carousel:hover {
  animation-play-state: paused;
}

@keyframes rotate {
  0%{
    transform: rotateY(0deg);
  }
  100%{
    transform: rotateY(360deg);
  }
}



>>> .el-carousel {
  --el-carousel-arrow-font-size: 3vw;
  --el-carousel-arrow-size: 4vw;
  --el-carousel-arrow-background: rgba(31,45,61,0.11);
  --el-carousel-arrow-hover-background: rgba(31,45,61,0.23);
  --el-carousel-indicator-width: 4vw;
  --el-carousel-indicator-height: 0.1vw;
  --el-carousel-indicator-padding-horizontal: 1vw;
  --el-carousel-indicator-padding-vertical: 1vw;
  --el-carousel-indicator-out-color: var(--el-border-color-hover);
  position: relative;
}

.hero-title {
  line-height: 1;
  font-size: 2.5vw;


}


.research-section {
  min-height: 100vh;
  width: 100%;
  background-color: white;
  padding:2vw 3vw;
}

.research-section-item {
  margin: 2vw 2vw;
}

.link{
  cursor: pointer;
  font-size: 1.2vw;
  color: #007c48;
  text-decoration: none;
}

.link:hover{

  text-decoration: underline
}

.section-image {
  display: flex;
  justify-content: center;
  align-items: center;

}

.section-subheading {
  font-size: 1.5vw;
  /*font-family: roboto, sans-serif;*/
  font-weight: bolder;
  margin-top: 1vw;
  margin-bottom: 1vw;
  text-align: left;
}

.article-style {
  overflow: hidden;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  text-align: justify;
  line-height: 2.5vw;
  font-size: 1.3vw;
  margin-right: 2vw;

}

.publication-section{
  min-height: 100vh;
  width: 100%;
  /*background: #f7f7f7;*/
  background: #ffffff;
  padding:3vw 3vw;
}
.article-metadata {
  margin-top: 1vw;
  margin-bottom:1.2vw;
  overflow: hidden;
  font-size: 1vw;
  letter-spacing: .03em;
  color: rgba(0, 0, 0, .7);
}

.pub-section-item{
  margin: 2vw;
}

.footer-section{
  width: 100%;
  height: 30vh;
  background: white;
}

#link a {
  text-decoration: none;  /* 去掉链接的下划线 */
  color: inherit;  /* 继承父元素的颜色 */
}

#link a:visited {
  color: inherit;  /* 点击后颜色保持不变 */
}

#link a:hover {
  color: inherit;  /* 悬停时颜色保持不变 */
}

#link a:active {
  color: inherit;  /* 活动状态时颜色保持不变 */
}

.splitter {
  margin-left: 0.5vw;
  margin-right: 0.5vw;
}


.shadow {
  text-shadow: -0.3vw -0.3vw 0 rgba(0, 0, 0, 0.44)
}

</style>

