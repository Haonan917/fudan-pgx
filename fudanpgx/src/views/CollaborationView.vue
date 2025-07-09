<template>
  <div class="container-wrapper">
    <div class="container">
      <div class="content-container">
        <div class="consortium" v-for="(item, index) in consortiumList" :key="index">
          <h1>{{item.title}} <a style="cursor: pointer" :href="item.link" target="_blank" v-if="item.link">🔗</a></h1>
          <div style="display: flex;flex-flow: wrap;margin-top: 20px">
            <div class="consortia-container">
              <div class="el-row" style="justify-content: space-around">
                <div class="consortia-content  hvr-grow-shadow el-col-5" v-for="(subItem, subIndex) in item.subList" :key="subIndex">
                  <a :href="subItem.url" target="_blank" v-if="subItem.url">
                    <img :src="subItem.img" class="consortia-pic">
                    <p  class="title">{{subItem.title}}</p>
                    <p  class="subtitle">{{subItem.subtitle}}</p>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: "CollaborationView",

  data(){
    return {
      consortiumList:[
        {
          title:'MAQC Consortium',
          link:'https://themaqc.org/',
          subList:[
            {title:'MAQC-I', subtitle: 'RNA MicroArray', img:'./Collaboration/MAQC/maqc1.webp', url:'https://www.nature.com/collections/mtqqkzsptk?_gl=1*acaub0*_up*MQ..&gclid=CjwKCAjwtNi0BhA1EiwAWZaANEhe2ec2YXzp8zvFD4oITx5Up6QvSreM04WnUzrQdiOqnwsx8OYCEBoCTSEQAvD_BwE'},
            {title:'MAQC-II', subtitle: 'Predictive Models', img:'./Collaboration/MAQC/maqc2.webp', url:'https://www.nature.com/collections/tlrcqxrcdx?_gl=1*1k70o2a*_up*MQ..&gclid=CjwKCAjwtNi0BhA1EiwAWZaANEhe2ec2YXzp8zvFD4oITx5Up6QvSreM04WnUzrQdiOqnwsx8OYCEBoCTSEQAvD_BwE'},
            {title:'MAQC-III (SEQC)', subtitle: 'RNA-seq', img:'./Collaboration/MAQC/maqc3.webp', url:'https://www.nature.com/collections/ppgrhzcwpf?_gl=1*1la4kxb*_up*MQ..&gclid=CjwKCAjwtNi0BhA1EiwAWZaANEhe2ec2YXzp8zvFD4oITx5Up6QvSreM04WnUzrQdiOqnwsx8OYCEBoCTSEQAvD_BwE'},
            {title:'MAQC-IV (SEQC2)', subtitle: 'DNA-seq', img:'./Collaboration/MAQC/maqc4.webp', url:'https://www.nature.com/collections/fjhdjcdefg?_gl=1*zuw7vr*_up*MQ..&gclid=CjwKCAjwtNi0BhA1EiwAWZaANEhe2ec2YXzp8zvFD4oITx5Up6QvSreM04WnUzrQdiOqnwsx8OYCEBoCTSEQAvD_BwE'},

          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  /*第一参数控制上下，第二个参数控制左右*/
  background-color: rgb(255, 255, 255);
  width: 1050px;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 12px 0px;
  margin: 0px auto auto;
  min-height: calc( 100vh);
  padding-top: 2vw;
}

.content-container {
  min-height: calc(-215px + 100vh);
  margin-bottom: 100px;
}

.consortium {
  padding-top: 3vw;
}

.consortia-container{
  width: 100%;
  margin: 10px;
  display: block;
  position: relative;
  height: 280px;
  border-radius: 10px;
}
.consortia-content {
  -webkit-box-shadow: rgba(100, 100, 111, .2) 0 7px 29px 0;
  box-shadow: 0 7px 29px 0 rgba(100, 100, 111, .2);
  /*height: 100%;*/
  cursor: pointer;
  margin: 10px;
}

.consortia-pic {
  height: 100%;
  width: 100%;
  border-radius: 10px;
}

.title {
  margin-top: 10px
}

.subtitle {
  font-size: 12px;
  opacity: 0.6;
  margin-top: 1px;
}
a {
  text-decoration: none;  /* 去掉链接的下划线 */
  color: inherit;  /* 继承父元素的颜色 */
}

a:visited {
  color: inherit;  /* 点击后颜色保持不变 */
}

a:hover {
  color: inherit;  /* 悬停时颜色保持不变 */
}

a:active {
  color: inherit;  /* 活动状态时颜色保持不变 */
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