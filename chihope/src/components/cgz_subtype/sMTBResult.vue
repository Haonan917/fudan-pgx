<template>
  <s-omics-result :omics-type="omicsType"
                  :omics-mapping-data="mappingData"
                  :omics-table-data="tableData"
                  x-title=""
                  y-title="Concentration (μM, log2)">
  </s-omics-result>
</template>

<script>
import sOmicsResult from "@/components/cgz_subtype/sOmicsResult";


export default {
  components: {
    sOmicsResult
  },
  data() {
    return {
      omicsType:'MTB',
      tableData:[],
      mappingData:[],
      searchFields: ['Name','HMDB ID', 'KEGG ID']
    };
  },

  mounted() {
    // Load table data
    if (!this.$store.state.subtypeStore.subtypeTable) {
      this.$store.state.subtypeStore.subtypeTable = [];
    }
    this.tableData = this.$store.state.subtypeStore.subtypeTable.filter(item=>item.Type===this.omicsType)

    // Load mapping data
    if (!this.$store.state.mainStore.mtbMapping) {
      this.$store.state.mainStore.mtbMapping = [];
    }
    const searchFields = this.searchFields
    this.mappingData = this.$store.state.mainStore.mtbMapping.map(function(item) {
      let object = {};
      searchFields.forEach(filed =>object[filed]= item[filed]);
      return object;
    });
  }
};
</script>

<style scoped>
/* 样式部分可以根据需要进行自定义 */
</style>
