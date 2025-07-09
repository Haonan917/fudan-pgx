<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {
    // Main
    this.$store.dispatch('mainStore/fetchBarData');
    this.$store.dispatch('mainStore/fetchLineData');
    this.$store.dispatch('mainStore/fetchGraphData');
    this.$store.dispatch('mainStore/fetchTableData');
    this.$store.dispatch('mainStore/fetchMappingData');
    // Subtype
    this.$store.dispatch('subtypeStore/fetchPointData');
    this.$store.dispatch('subtypeStore/fetchSubtypeTable');
  }

}

console.log("windows width", window.innerWidth)
</script>

<style>
/* Add custom styles if needed */
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.icon {
  width: 1vw;
  height: 1.1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

/*body {*/
/*  font-size: 100px;*/
/*}*/
</style>
