<template>

  <div class="container">
    <div class="content-container" >
      <div class="top-search">
        <span class="demonstration" style="margin-left: 0.3vw">Publish Date</span>
        <el-date-picker
            v-model="searchYear"
            type="year"
            placeholder="Select year (default all)"
            :size="size"
            style="width: 15vw"
        />
        <span class="demonstration" style="margin-left: 40px">Title</span>
        <el-input v-model="searchKey" style="display: inline-block; width: 150px;" placeholder="Search title" />
        <span class="demonstration" style="margin-left: 40px">Journal</span>
        <el-input v-model="searchJournal" style="display: inline-block; width:150px;" placeholder="Search journal" />
        <el-button type="primary" :icon="Search" style="margin-left:20px" @click="clearSearch">Reset</el-button>
      </div>
      <div class="pub-list">
        <div class="pub" v-for="(item, index) in paginatedList" :key=index>
          <div class="el-row" style="margin-left: -15px; margin-right: -15px">
            <div class="el-col-19" style="padding-left: 15px; padding-right: 15px">
              <div class="pub-content" >
                <h3 style="margin: 0;font-size: 18px">
                  {{item.title}}
                </h3>
                <p style="font-size: 12px;color: rgb(144, 147, 153); margin-top: 5px">
                  {{item.author}}
                  <span class="splitter">•</span>
                  {{item.journal}}
                  <span  class="splitter">•</span>
                  {{item.year}}
                </p>
                <hr  style="margin-top: 10px; height: 1px; border: none; background-color: rgb(228, 231, 237);">
                <p  style="display: inline-block; font-size: 16px; text-align: justify; margin: 5px 0px 0px;opacity: 0.9">
                  {{displayAbstract(item.abstract, item.expanded)}}
                  <el-link type="primary"   style="margin-left: 10px;" @click="toggleExpand(item)" v-show="!item.expanded">More ...</el-link>
                  <el-link type="primary"   style="margin-left: 10px;" @click="toggleExpand(item)" v-show="item.expanded">Less</el-link>
                </p>
                <div style="margin-top: 5px;margin-bottom: 15px">
                  <el-link type="primary" :href="item.link" >Link</el-link>
                  <el-divider direction="vertical" />
                  <el-link type="primary" @click="downloadPDF(item.doi)" :disabled="!item.pdf" >PDF</el-link>


                </div>
              </div>
            </div>
            <div class="el-col-4 section-image" >
              <img :src="item.img" style="width: 100%" v-if="item.img">
            </div>
          </div>


        </div>
      </div>
    </div>
    <div class="el-row is-justify-space-around">
      <div class="pagination-container">
        <el-pagination
            background layout="total, sizes, prev, pager, next, jumper"
            :total="totalPublications"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 20,30, 50]"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>


</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
export default {
  name: "PublicationView",
  computed: {
    ...mapGetters({
      publicationList: 'publicationStore/allPublications',
      totalPublications: 'publicationStore/totalPublications',
      pageSize: 'publicationStore/pageSize',
      currentPage: 'publicationStore/currentPage',
      paginatedPublications: 'publicationStore/paginatedPublications',
      filteredPublications: 'publicationStore/filteredPublications', // 引入新 getter
    }),

    filteredList() {
      return this.filteredPublications(this.searchYear, this.searchKey, this.searchJournal);
    },
    paginatedList() {
      return this.paginatedPublications(this.filteredList)
    }
  },
  data() {
    return {
      wordsLimit: 76,
      searchYear:'',
      searchKey: '',
      searchJournal: '',
    }
  },

  methods: {
    ...mapMutations('publicationStore', ['SET_CURRENT_PAGE', 'SET_PAGE_SIZE']),
    ...mapActions('publicationStore', ['downloadPdfByDoi']),
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

    downloadPDF(doi){
      this.downloadPdfByDoi(doi)
    },

    handlePageChange(page) {
      this.SET_CURRENT_PAGE(page);
    },
    handleSizeChange(size) {
      this.SET_PAGE_SIZE(size);
    },
    clearSearch() {
      this.searchYear = '';
      this.searchKey = '';
      this.searchJournal = '';
      // this.filterPub(); // 重新过滤
    }
  },
}
</script>

<style scoped>

#app, * {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.container {
  /*第一参数控制上下，第二个参数控制左右*/
  padding:80px 0px;
  background-color: rgb(255, 255, 255);
  width: 1140px;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 12px 0px;
  margin: 0px auto auto;
  min-height: calc(-75px + 100vh);
}

.content-container {
  min-height: calc( 100vh);
}

.top-search {
  text-align: left;
  margin-left: 60px;
  margin-top: 1.5vw;
}
.demonstration {
  margin-right: 8px;
  font-weight: 520;
}
.pub {
  border: 1px solid rgb(228, 231, 237);
  margin: 30px 60px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  border-radius: 20px;
}

.pub-content {
  padding-top: 20px;
  padding-left: 40px;
  text-align: left;
}

.splitter {
  margin-left: 7px;
  margin-right: 7px;
}

.pagination-container {
  margin-top: 30px;
}
.section-image {
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>