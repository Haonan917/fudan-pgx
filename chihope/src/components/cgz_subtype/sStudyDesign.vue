<template>
  <div class="el-row" style="padding: 5vw 5vw;">
    <div class="el-col-24" style="display: flex;justify-content: left;align-items: center;margin-bottom: 4vw">
      <div style="text-align: left;font-size: 1.5vw;line-height: 3vw ">
        <p> We investigated the molecular differences under different diabetes subgroups, including:</p>
        <ul style="margin-left: 4vw">
          <li>severe insulin deficient diabetes (SIDD, n = 268)</li>
          <li>mild age related diabetes (MARD, n = 310)</li>
          <li>mild obesity related diabetes (MOD, n = 163)</li>
          <li>severe insulin resistant diabetes (SIRD, n = 85)</li>
        </ul>
        <p>You can query the results for each molecule in this section.</p>
      </div>
    </div>
    <div class="el-col-24">
      <img v-lazy="image" style="width: 100%;height: auto">
    </div>

  </div>

</template>

<script>
export default {
  name: "sStudyDesign",
  data(){
    return {
      image:'./Project/CGZSubtype_design.png'
    }
  }
}
</script>

<style scoped>
.full-width-image {
  width: 100%;
  height: auto;
}
</style>