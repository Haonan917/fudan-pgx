<template>
  <div class="container-wrapper">
    <div class="container" >
      <div class="top-search">

        <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :size="size"
            style="width: 300px"
        />

        <el-input v-model="searchTitle" style="display: inline-block; width: 300px;" placeholder="Search Title" />
        <el-select
            v-model="tagValue"
            placeholder="Choose tags for news"
            size="mini"
            style="width: 200px"
        >
          <el-option
              v-for="item in tagOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <el-button type="primary" :icon="Search" style="margin-left:20px" @click="clearSearch">Reset</el-button>
      </div>

      <div class="news" v-for="(item, index) in paginatedList" :key="index" @click="handleNewsClick(item)">
        <div class="news-header el-row" >
          <div class="el-col-18">
            <el-link type="default" :underline="false" >{{item.author}}</el-link>
            <el-divider direction="vertical" />
            <el-link type="info" :underline="false" >{{item.time}}</el-link>
            <el-divider direction="vertical" />
            <el-link type="primary" :underline="false" >{{item.type}}</el-link>
          </div>
          <div class="el-col-6">
<!--            <span class="news-tag">News</span>-->
          </div>
        </div>
        <div class="news-main" >
          <div class="el-row" >
            <div class="el-col-18" style="padding-right: 20px;">
              <h4 class="news-title">{{item.title}}</h4>
              <p class="news-content"> {{item.description}}</p>
              <div class="icon-group">
                <el-icon :size="18"><View /></el-icon>
                <span class="icon-num">0</span>
                <el-icon :size="18"><Star /></el-icon>
                <span class="icon-num">0</span>
                <el-icon :size="18"><ChatRound /></el-icon>
                <span class="icon-num">0</span>
              </div>
            </div>
            <div class="el-col-6" style="padding-left: 20px; padding-right: 20px;">
              <img :src="item.cover" class="news-img"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="el-row is-justify-space-around">
      <div class="pagination-container">
        <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNews"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 20, 30, 50]"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: "NewsView",
  data() {
    return {
      dateRange:'',
      searchTitle: '',
      tagValue: '',
      tagOptions: [
        {value:'News', label: 'News'},
        {value:'Publication', label: 'Publication'},
      ]
    }
  },
  computed: {
    ...mapGetters({
      pageSize: 'newsStore/pageSize',
      currentPage: 'newsStore/currentPage',
      newsList: 'newsStore/allNews',
      paginatedNews: 'newsStore/paginatedNews', // 使用分页的新闻
      totalNews: 'newsStore/totalNews', // 总新闻数量
      filteredNews: 'newsStore/filteredNews', // 引入新 getter
    }),

    filteredList() {
      let dataRange = this.formatDate(this.dateRange)
      return this.filteredNews(
          dataRange[0],
          dataRange[1],
          this.searchTitle,
          this.tagValue
      );
    },

    paginatedList() {
      return this.paginatedNews(this.filteredList)
    }
  },
  methods:{
    ...mapMutations('newsStore', ['SET_CURRENT_PAGE', 'SET_PAGE_SIZE']),

    handleNewsClick(item) {
      console.log(item._id)
      this.$router.push({
        path: '/news/detail',
        query: {
          id: item._id,
        }
      })
      // this.set_nav_active(5)
    },


    formatDate(dateRange) {
      if (dateRange === '') {
        return ['','']
      }
      const year0 = dateRange[0].getFullYear(); // 获取年份
      const month0 = String(dateRange[0].getMonth() + 1).padStart(2, '0'); // 获取月份，注意月份从0开始
      const day0 = String(dateRange[0].getDate()).padStart(2, '0'); // 获取日期

      const year1 = dateRange[1].getFullYear(); // 获取年份
      const month1 = String(dateRange[1].getMonth() + 1).padStart(2, '0'); // 获取月份，注意月份从0开始
      const day1 = String(dateRange[1].getDate()).padStart(2, '0'); // 获取日期

      return [`${year0}-${month0}-${day0}`, `${year1}-${month1}-${day1}`]; // 拼接成 "YYYY-MM-DD" 格式
    },

    clearSearch() {
      this.searchTitle = ''
      this.dateRange = ''
      this.tagValue = ''
    },

    handlePageChange(page) {
      this.SET_CURRENT_PAGE(page);
    },
    handleSizeChange(size) {
      this.SET_PAGE_SIZE(size);
    },
  }
}
</script>

<style scoped>
#app, * {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.container {
  /*第一参数控制上下，第二个参数控制左右*/
  width: 1050px;
  display: block;
  background-color: rgb(255, 255, 255);
  margin: 0px auto auto;
  min-height: 100%;
  padding-top: 4vw;
}

.top-search{
  padding: 20px;
}

.sort-by {
  padding: 10px 20px 10px 38px;
  text-align: right;
  border-top: 1px solid rgba(151, 151, 151, 0.1);
}

.news {
  padding: 10px 20px 20px 38px;
  text-align: left;
  border-top: 1px solid rgba(151, 151, 151, 0.1);
  cursor: pointer;
}
.news:hover {
  background-color: #f9fafa;
}

.news-header {
  margin-bottom: 20px;
}

.news-tag {
  float: right;
  color: rgb(101, 183, 135);
  font-weight: 550;
  font-size: 14px;
  margin-top: 2.5px;
  text-transform: capitalize;
}

.news-title{

}

.news-content {
  font-size: 14px;
  text-align: justify;
  color: rgb(96, 98, 102);
  margin-top: 10px;
}

.news-img {
  float: right;
  width: 100%;
  height: auto;
  max-height: 100px;
  object-fit: cover;
}

.icon-group {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: left;
}

.icon-num {
  margin-right: 10px;
  margin-left: 4px;
  font-size: 14px;
}

.pagination-container {
  margin-top: 30px;
  margin-bottom: 40px;
}
</style>