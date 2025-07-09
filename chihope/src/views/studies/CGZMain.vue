<template>
  <div>
    <div class="el-row tac" style="width: 100vw">
      <div class="el-col-4">
        <el-menu
            default-active="2"
            mode="vertical"
            @open="handleOpen"
            @close="handleClose"
            class="el-menu-vertical-demo"
        >
          <el-sub-menu index="2"  >
            <template #title>
              <span style="font-size: 1.1vw">Molecular response</span>
            </template>

            <el-menu-item  v-for="( item,index) in resultsItems" :key="index" :index="2-index" @click="handleRouter(item)">
              <span style="font-size: 1vw;margin-left:1.6vw">{{item.text}}</span>
            </el-menu-item>

          </el-sub-menu>
          <el-menu-item index="3">
            <span style="font-size: 1.1vw">Omics  Network</span>
          </el-menu-item>
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
  name: 'CGZMain',
  data() {
    return {
      open:['Data Discovery'],
      isDataDiscoveryExpanded: false, // Control the expansion state
      studyItems: {text:'Study Design', url:'/project/main/study'},
      resultsItems: [
        { text: 'MiRNAomics', url: '/project/main/mir' },
        { text: 'Proteomics', url: '/project/main/prt' },
        { text: 'Metabolomics', url: '/project/main/mtb' },
        { text: 'Clinical analytes', url: '/project/main/cln' },
        // { text: 'Omics Network', url: '/project/main/network' },
      ],
      style: {
        fontFamily: 'Arial'
      }
    }
  },

  methods: {
    handleRouter(item) {
      if (item.text !== 'MiRNAomics')  {
        this.$router.push({ path: item.url });
      } else {
        this.$router.push({ path:'/project/main/study' });
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
