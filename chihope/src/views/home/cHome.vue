<template>
  <v-app style="background-color: #f0f2f5;">
    <v-container fluid v-if="showAlert" >
      <v-alert
          color="#d6d6d6"
          dismissible
          class="alert-browser-support"
          style="height:3vw"
      >
        <v-row>
          <v-col class="d-flex align-center justify-center text-center" cols="10">
            <span style="font-size: 1.2vw; color: white; text-align: center;">
              The ChiHOPE website only supports access from modern browsers, such as
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-CDA_chrome-01"></use>
              </svg>Chrome,
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-safari"></use>
              </svg> Safari,
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-firefox"></use>
              </svg> Firefox, or
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-Edge"></use>
              </svg> Edge.
            </span>
          </v-col>
          <v-col class="d-flex justify-end align-center" cols="2">
            <v-icon small @click="hideAlert" class="icon-size">mdi-eye-off-outline</v-icon>
            <v-icon small @click="closeAlert">mdi-close</v-icon>
          </v-col>
        </v-row>
      </v-alert>
    </v-container>
    <v-container style="height: 100vh" fluid>
      <!-- Header -->
      <v-row style="background-color: white;padding: 6vh 0vh">
        <v-col cols="12" class="center-align">
            <img
                src="./Logo/home_logo.png"
                alt="Element Icon"
                style="width: 60%;"
                contain
            />

        </v-col>
        <v-col cols="12"  class="center-align">
          <div style="font-size: 1.5vw;line-height: 2.5vw;padding: 0 0vw; font-family: Roboto, sans-serif">
            The ChiHOPE project is a longitudinal study with a cohort of 835 individuals from phase 3 trials of the glucose-lowering drug Chiglitazar. <br/>
            <span style="font-style: italic;color:#0070c0">
              We aimed at characterizing type 2 diabetes with longitudinal multi-omics profiling for effect treatments.
            </span>
          </div>
        </v-col>
        <v-col cols="12"  class="home-btn-container">
            <div  class="home-btn"  v-for="item in homeCard" :key="item.title" @click="goToAbout(item)">
              {{item.title}}
            </div>
        </v-col>
      </v-row>


      <v-row class=" footer">
        <v-col cols="2" class="d-flex text-center align-center justify-center">
          <img src="./fudan_logo.png" contain class="footer-img" />
        </v-col>
        <v-col cols="20" class="text-center d-flex align-center justify-center">
          <div class="footer-text" >
            State Key Laboratory of Genetic Engineering, Human Phenome Institute and School of Life Sciences, Shanghai Cancer Center, <a href="https://www.fudan.edu.cn/">Fudan University</a> <br>

            <a href="https://www.chipscreen.com/en/">Shenzhen Chipscreen Biosciences</a> Co. Ltd., Shenzhen, Guangdong, China<br>
            If you have any feedback or requests, please contact<a href="fudanpgx@outlook.com"> fudanpgx@outlook.com</a>
            <br>For more information about our lab (Fudan PGx), please visit <a href="http://fudan-pgx.org/">http://fudan-pgx.org/</a>
          </div>
        </v-col>
        <v-col cols="2" class="d-flex text-center align-center justify-center">
          <img src="./weixin_logo.png"  class="footer-img" />
        </v-col>
      </v-row>

    </v-container>

  </v-app>
</template>

<script>
export default {
  name: "cHome",

  data: () => ({

    showAlert: true,
    homeCard:[
      {img:'./about/chiglitazar_chemical.png',title:'Drug',text:'Insulin sensitizer Chiglitazar, a pan-PPAR agonist for type 2 diabetes treatment', url: '/about', id: '#drug'},
      {img:'./home/ChineseMap.jpg',title:'Cohort',text:'Drug-naive type 2 diabetes patients from wo randomized, double-blind, phase 3 trials of the insulin sensitizer chiglitazar', url: '/about', id: '#cohort'},
      {img:'./home/Omics.jpg',title:'Data',text:'Clinical analytes, metabolomics, proteomics, miRNAs transcriptomics, genomics and epigenomics', url: '/about', id: '#omics'},
      {img:'./home/Project.jpg',title:'Studies',text:'Three sub projects for precision chiglitazar treatment', url: '/project/main', id: null},
    ]
  }),
  methods: {
    hideAlert() {
      // Logic to hide alert
      this.showAlert = false;
    },
    closeAlert() {
      // Logic to close alert
      this.showAlert = false;
    },
    goToAbout(item) {
      this.$router.push({
        path: item.url,
        query: {
          location: item.id
        }
      })
    }
  }

}
</script>

<style scoped>
.custom-btn >>> .v-btn__content{
  /*background-color: black;*/
  padding:0 0vw;
  margin: 0;
  font-size: 1vw;

}


.custom-btn >>> .v-btn{
  height: 1vh;
  padding:0 0vw;
  margin: 0;
}



.footer {
  background-color: #f5f5f5; /* 可以根据需要调整背景色 */
  padding: 0vw 0;
  min-height: 8vw;
}

.footer a {
  color: #409eff; /* 链接颜色 */
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

.footer-text {
  font-size: 0.9vw; /* 调整文字大小 */
  line-height: 1.5vw;
}

.footer-img {
  max-height: 10vh; /* 调整图片高度 */
  max-width: 10vw; /* 调整图片宽度 */
}

.alert-browser-support {
  background-color: #e0e0e0;
  color: #ffffff;
  font-size: small;
}


.home-btn-container{
  display: flex;
  justify-content: space-around;
  align-items: center;
  /*margin-bottom: 15vh;*/
  margin-top: 1.6vw;
  padding: 0 20vw;
  background-color: white;

}

.home-btn {
  padding: 1.5vw 1vw;
  height: 2vw;
  width: 10vw;
  border-radius:0.6vw ;
  font-size: 1.5vw;
  font-weight: bold;
  background-color: #3d5c9a;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 1;

}

.home-btn:hover {
  opacity: 0.6;
}

.center-align {
  display: flex;
  justify-content: center;
  align-items: center
}

/*>>>.v-icon--size-default{*/
/*  width: 2vw !important;*/
/*  height: 2vw !important;*/
/*}*/
</style>
