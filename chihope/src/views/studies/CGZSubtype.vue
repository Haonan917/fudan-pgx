<template>
  <div>
    <div class="el-row">
      <div class="el-col-4">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
        >
          <el-sub-menu index="2">
            <template #title>
              <span style="font-size: 1.1vw">Molecular differences</span>
            </template>
            <el-menu-item  v-for="( item,index) in resultsItems" :key="index" :index="2-index" @click="handleRouter(item)">
              <span style="font-size: 1vw;margin-left:1.6vw">{{item.text}}</span>
            </el-menu-item>

          </el-sub-menu>
        </el-menu>
      </div>
      <div class="el-col-20">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'CGZSubtype',
  data() {
    return {
      open:['Data Discovery'],
      isDataDiscoveryExpanded: false, // Control the expansion state
      studyItems: {text:'Study Design', url:'/project/subtype/study'},
      resultsItems: [
        { text: 'MiRNAomics', url: '/project/subtype/mir' },
        { text: 'Proteomics', url: '/project/subtype/prt' },
        { text: 'Metabolomics', url: '/project/subtype/mtb' },
        { text: 'Clinical analytes', url: '/project/subtype/cln' }
      ],
      style: {
        fontFamily: 'Arial'
      }
    }
  },

  methods:{
    handleRouter(item) {
      if (item.text !== 'MiRNAomics')  {
        this.$router.push({ path: item.url });
      } else {
        this.$router.push({ path:'/project/subtype/study' });
      }

    }
  }
}
</script>

<style scoped>
>>> .el-sub-menu__title {
  padding: 1vw 1vw !important;
  line-height: 3.5vw !important;
  height: 3.5vw !important;
}

>>> .el-icon{
  font-size: 1.6vw !important;
  line-height: 3.5vw !important;
  margin-right: 0vw !important;
  margin-top: 0vw !important;
  right: 2vw !important;
  top: 30% !important;
}

>>> .el-menu-item {
  padding: 1vw 1vw !important;
  line-height: 3.5vw !important;
  height: 3.5vw !important;
}
</style>
