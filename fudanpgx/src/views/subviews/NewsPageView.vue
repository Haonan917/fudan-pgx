<template>
  <div class="container-wrapper">
    <div class="container">
      <div style="min-height: 100vh;width: 82%;background-color: white;margin: auto;padding: 2vw 0;">
          <div id="header">
            <h1 style="margin-bottom: 1.5vw;font-size: 1.6vw">{{currentNews.title}}</h1>
            <p style="color: gray;opacity: 0.8;margin-bottom: 1.5vw;font-size: 1.2vw">
              <span style="margin-right: 1vw">{{currentNews.author}}</span>
              <span style="margin-right: 1vw">{{currentNews.time}}</span>
              <span>Shanghai</span>
            </p>
          </div>

        <div id="image"  style="margin-bottom: 3vw">
          <img :src="currentNews.cover" style="width: 50%;object-fit: cover;">
        </div>


        <div id="markedContent" class="markedContent">
          <div v-html="markedContent" ></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { marked } from 'marked';
// import hljs from "highlight.js"; // 引入 highlight.js
// import "highlight.js/styles/monokai-sublime.css"; // 引入高亮样式 这里我用的是sublime样式


export default {
  name: "NewsPageView",
  data(){
    return {
      markedContent:'',
    }
  },
  computed: {
    ...mapGetters({
      getNewsById: 'newsStore/getNewsById',
    }),
    currentNews() {
      // 假设你的路由参数中有 id 参数
      const newsId = this.$route.query.id;
      return this.getNewsById(newsId);
    },

  },
  mounted() {
    let content = this.currentNews.content
    // match strong
    let regex = /\*\*(.*?)\*\*/g;
    content = content.replace(regex, function(match, p1) {
      // 将 **包裹的内容替换为 <strong> 包裹的内容
      return `<strong>${p1}</strong>`;
    });

    regex = /==(.*?)==/g;
    content = content.replace(regex, function(match, p1) {
      // 将 **包裹的内容替换为 <strong> 包裹的内容
      return `<mark>${p1}</mark>`;
    });

    marked.setOptions({
      gfm: true // 确保启用 GFM 模式
    });
    this.markedContent = marked(content)
    // this.markedContent = markedContent.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-top: 4vw;
}

/deep/ #markedContent p{
  margin-top: 1.2vw;
  margin-bottom: 1.2vw;
  font-size: 1.2vw;
  line-height: 2.5vw;
  width: 100%;
  text-align: left;
  text-indent: 2vw;
}

/deep/ #markedContent strong{
  color: #0e419c;
}

/deep/ #markedContent mark{
  color: #ffffff;
  background-color: #0e419c;
  font-weight: bold;
  text-indent: 0rem !important;
}

/deep/ #markedContent table {
  width: 100%;
  border-collapse: collapse; /* 去掉单元格之间的间隙 */
}

::v-deep #markedContent th, ::v-deep #markedContent td {
  border: 0.1vw solid black; /* 设置边框 */
  padding: 1.2vw; /* 增加内边距 */
  text-align: center; /* 水平居中 */
  vertical-align: middle; /* 垂直居中 */
  font-size: 1.2vw;
}

::v-deep #markedContent th {
  /*background-color: #f2f2f2; !* 设置表头背景颜色 *!*/
  font-weight: bold; /* 加粗表头文字 */
  font-size: 1.2vw;
}
</style>