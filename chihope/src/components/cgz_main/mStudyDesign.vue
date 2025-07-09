<template>
  <div class="el-row" style="padding: 5vw 5vw;">
    <div class="el-col-24" style="display: flex;justify-content: left;align-items: center;margin-bottom: 4vw">
        <div style="text-align: left;font-size: 1.5vw;line-height: 3vw ">
          <p>We investigated the molecular responses under four treatment arms, including:</p>
          <ul style="margin-left: 4vw">
            <li>Chiglitazar 32 mg/day (n = 267)</li>
            <li>Chiglitazar 48 mg/day (n = 267)</li>
            <li>Sitagliptin (n = 163)</li>
            <li>Placebo (n = 138)</li>
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
  name: "mStudyDesign",
  data(){
    return {
      image:'./Project/CGZMain_design.jpg'
    }
  }
}
</script>

<style scoped>

</style>