<template>
  <div class="el-row" style="padding: 5vw 5vw;">
    <div class="el-col-24" style="display: flex;justify-content: left;align-items: center;margin-bottom: 4vw">
      <div style="text-align: left;font-size: 1.5vw;line-height: 3vw ">
        <p>We investigated the predictability of diabetes therapeutic outcomes (Y) and their biomarkers using a wide range of multi-omics datasets and machine learning algorithms (in progress).</p>

      </div>
    </div>
    <div class="el-col-24">
      <img v-lazy="image" style="width: 100%;height: auto">
    </div>

  </div>


</template>

<script>
export default {
  name: "cStudyDesign",
  data(){
    return {
      image:'./Project/CGZModel_design.png'
    }
  }
}
</script>

<style scoped>

</style>