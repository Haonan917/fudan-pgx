<template>
  <div>
    <div class="el-row tac">
      <div class="el-col-4">
        <el-menu
            default-active="1"
            mode="vertical"
            @open="handleOpen"
            @close="handleClose"
            class="el-menu-vertical-demo"
        >

          <el-menu-item index="2">
            <span style="font-size: 1.1vw">Introduction</span>
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
      studyItems: {text:'Study Design', url:'/project/models/study'},
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
