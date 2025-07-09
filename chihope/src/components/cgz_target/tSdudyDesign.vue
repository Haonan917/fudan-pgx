<template>
  <div class="el-row" style="padding: 5vw 5vw;">
    <div class="el-col-24" style="display: flex;justify-content: left;align-items: center;margin-bottom: 4vw">
      <div style="text-align: left;font-size: 1.5vw;line-height: 3vw ">
        <p>For candidate gene detected by the therapeutic networks, we conducted in vitro and in vivo experiments to investigate its causal effects on interested phenotypes (in progress).</p>

      </div>
    </div>
    <div class="el-col-24">
      <img v-lazy="image" style="width: 80%;height: auto">
    </div>

  </div>


</template>

<script>
export default {
  name: "tStudyDesign",
  data(){
    return {
      image:'./Project/CGZTarget_design.png'
    }
  }
}
</script>

<style scoped>

</style>