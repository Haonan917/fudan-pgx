<template>
  <m-omics-result :omics-type="omicsType"
                  :bar-config="barConfig"
                  :line-config="lineConfig"
                  :omics-table-data="tableData"
                  :omics-mapping-data="mappingData">
  </m-omics-result>
</template>

<script>
import mOmicsResult from "@/components/cgz_main/mOmicsResult";


export default {
  components: {
    mOmicsResult
  },
  data() {
    return {
      omicsType:'MIR',
      barConfig: {
        xTitle: '',
        yTitle: 'Fold change (log2)',
        labels: [],
        // bar background
        backgroundColors: [
          'rgba(187,213,225)',
          'rgba(148,200,222)',
          '#f5b667',
          '#d9d9d9'
        ],
        borderColors: [
          'rgba(187,213,225)',
          'rgba(148,200,222)',
          '#f5b667',
          '#d9d9d9'
        ],
        borderWidth: 1,
        xAxisLineWidth: 2,
        yAxisLineWidth: 2,
        errorBarLineWidth: 2,
        errorBarLineColor: '#000000',
        xAxisColor: '#000000',
        yAxisColor: '#000000',
        xAxisFontSize: 10,
        yAxisFontSize: 10,
        xAxisFontColor: '#000000',
        yAxisFontColor: '#000000',
        titleFontSize: 18,
        titleFontFamily: 'Arial'
      },
      barData: [],
      lineConfig:{
        labels:[],
        backgroundColors:['#8bbdd9', '#f5b667', '#d9d9d9'],
        borderColors:['#8bbdd9', '#f5b667', '#d9d9d9'],
        xTitle:"",
        yTitle: "Fold change (log2)",
        xAxisLineWidth:2,
        yAxisLineWidth:2,
        borderLineWidth: 3,
        xAxisColor: '#000000',
        yAxisColor: '#000000',
        xAxisFontSize: 10,
        yAxisFontSize: 10,
        xAxisFontColor: '#000000',
        yAxisFontColor: '#000000',
        titleFontSize: 16,
        titleFontFamily: 'Arial',
        titleFontColor: '#000000',
        armColorGroup:  {
          'CG32': { backgroundColor: 'rgba(187,213,225)', borderColor: 'rgba(187,213,225)' },
          'CG48': { backgroundColor: 'rgba(148,200,222)', borderColor: 'rgba(148,200,222)' },
          'SP': { backgroundColor: '#f5b667', borderColor: '#f5b667' },
          'PB': { backgroundColor: '#d9d9d9', borderColor: '#d9d9d9' }
        }
      },
      lineData:[],
      tableData:[],
      mappingData:[],
      searchFields: ['Name']
    };
  },

  mounted() {
    // Load table data
    if (!this.$store.state.mainStore.mirTable) {
      this.$store.state.mainStore.mirTable = [];
    }
    this.tableData = this.$store.state.mainStore.mirTable
    console.log("table===========")
    console.log(this.tableData)

    // Load mapping data
    if (!this.$store.state.mainStore.mirMapping) {
      this.$store.state.mainStore.mirMapping = [];
    }
    const searchFields = this.searchFields
    this.mappingData = this.$store.state.mainStore.mirMapping.map(function(item) {
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
