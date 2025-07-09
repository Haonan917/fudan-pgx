<template>
  <v-container style="padding-left: 3vw; padding-right: 3vw;">
    <v-row>
      <v-col cols="12">
        <MolecularSearch @childClick="handleClick"
                         :omics-type="omicsType"
                         :items="molecularItems"
                         :keys="molecularKeys"/>
      </v-col>
    </v-row>
    <v-row  v-if="!firstInitFlag">
      <v-col cols="6"  class="d-flex justify-left" >
        <v-card >
          <v-responsive :aspect-ratio="1/1">
            <BarWithErrorBarChart :labels="barConfig.labels"
                                  :chartData="barData"
                                  :xTitle="barConfig.xTitle"
                                  :yTitle="barConfig.yTitle"
                                  :backgroundColors="barConfig.backgroundColors"
                                  :borderColors="barConfig.borderColors"
                                  :borderWidth="barConfig.borderWidth"
                                  :xAxisLineWidth="barConfig.xAxisLineWidth"
                                  :yAxisLineWidth="barConfig.yAxisLineWidth"
                                  :errorBarLineWidth="barConfig.errorBarLineWidth"
                                  :errorBarLineColor="barConfig.errorBarLineColor"
                                  :xAxisColor="barConfig.xAxisColor"
                                  :yAxisColor="barConfig.yAxisColor"
                                  :xAxisFontSize="barConfig.xAxisFontSize"
                                  :yAxisFontSize="barConfig.yAxisFontSize"
                                  :xAxisFontColor="barConfig.xAxisFontColor"
                                  :yAxisFontColor="barConfig.yAxisFontColor"
                                  :titleFontSize="barConfig.titleFontSize"
                                  :titleFontFamily="barConfig.titleFontFamily"
            />
          </v-responsive>
        </v-card>
      </v-col>
      <v-col cols="6" class="d-flex justify-end"  >
        <v-card class="custom-card-height">
          <v-responsive :aspect-ratio="1/1">
            <LineWithErrorBarsChart
                :labels="lineConfig.labels"
                :chartData="lineData"
                :backgroundColors="lineConfig.backgroundColors"
                :borderColors="lineConfig.borderColors"
                :xTitle="lineConfig.xTitle"
                :yTitle="lineConfig.yTitle"
                :xAxisLineWidth="lineConfig.xAxisLineWidth"
                :yAxisLineWidth="lineConfig.yAxisLineWidth"
                :xAxisColor="lineConfig.xAxisColor"
                :yAxisColor="lineConfig.yAxisColor"
                :xAxisFontSize="lineConfig.xAxisFontSize"
                :yAxisFontSize="lineConfig.yAxisFontSize"
                :xAxisFontColor="lineConfig.xAxisFontColor"
                :yAxisFontColor="lineConfig.yAxisFontColor"
                :titleFontSize="lineConfig.titleFontSize"
                :titleFontFamily="lineConfig.titleFontFamily"
                :titleFontColor="lineConfig.titleFontColor"
                :borderLineWidth="lineConfig.borderLineWidth"
            />
          </v-responsive>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="!firstInitFlag">
      <v-col cols="12">
        <v-card >
          <v-data-table :items="tableData"></v-data-table>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import BarWithErrorBarChart from '@/components/charts/BarChart';
import LineWithErrorBarsChart from '../charts/LineChart.vue'
import MolecularSearch from "@/components/MolecularSearch";
import { mapGetters } from 'vuex';
import { ElMessage } from 'element-plus'

export default {
  components: {
    BarWithErrorBarChart,
    LineWithErrorBarsChart,
    MolecularSearch
  },

  computed: {
    ...mapGetters('mainStore', ['getBarData', 'getLineData']),
    getBarData() {
      return this.getBarData;
    },
    getLineData() {
      return this.getLineData;
    },

  },

  props:{
    omicsType:{
      type: String,
      required:true
    },

    barConfig:{
      type:Object,
      required:true
    },

    lineConfig:{
      type:Object,
      required:true
    },

    omicsTableData:{
      type:Array,
      required:true
    },
    omicsMappingData:{
      type:Array,
      required:true
    }
  },
  data() {
    return {
      snackbar:false,
      message: 'No matched results',
      firstInitFlag: true,
      molecularItems:[],
      molecularKeys:[],
      preMolecular:null,
      barTotalData:null,
      lineTotalData:null,

      barData: [],
      lineData:[],
      tableData:[]
    };
  },

  methods: {
    handleClick(item) {

      const anchor = "Name"
      const key = item.key
      const value = item.value
      let molecularItem = this.omicsMappingData.filter(item => item[key]===value)[0]
      if (molecularItem === undefined){
        ElMessage({
          message: 'No matched records',
          type: 'warning',
        });
        return;
      }

      const molecularID = molecularItem[anchor]
      if (molecularID === this.preMolecular) {
        ElMessage('Repeated query.')
        return;
      }
      this.preMolecular = molecularID

      let filterBarData = this.barTotalData.filter(item => item[anchor] === molecularID);
      let filterLineData = this.lineTotalData.filter(item => item[anchor] === molecularID);
      if (filterBarData.length === 0 && filterLineData.length === 0) {
        this.snackbar = true;
        ElMessage({
          message: 'No matched records',
          type: 'warning',
        });
        return;
      }

      // Table Data
      this.tableData = this.omicsTableData.filter(item => item[anchor] === molecularID)

      // Bar Data
      let newBarData = filterBarData.map(item => ({
        x: item.arm,
        y: Number(Number(item.y).toFixed(3)),
        yMin:Number(Number(item.yMin).toFixed(3)),
        yMax:Number(Number(item.yMax).toFixed(3))
      }));
      const barLabelOrder = [  'CG32', 'CG48', 'SP','PB' ]
      let orderMap = barLabelOrder.reduce((map, item, index) => {
        map[item] = index;
        return map;
      }, {});

      newBarData.sort((a, b) => orderMap[a.x] - orderMap[b.x]);
      this.barData = newBarData

      // LineData
      const lineLabelOrder = [ '0', '12', '24']
      let lineOrderMap = lineLabelOrder.reduce((map, item, index) => {
        map[item] = index;
        return map;
      }, {});
      let groupedData = {};
      filterLineData.forEach(item => {
        if (!groupedData[item.arm]) {
          groupedData[item.arm] = [];
        }
        let data = {
          x: item.x,
          y: Number(Number(item.y).toFixed(3)),
          yMin:Number(Number(item.yMin).toFixed(3)),
          yMax:Number(Number(item.yMax).toFixed(3))
        }
        groupedData[item.arm].push(data);
      });
      // 排序每一个 key 下的 value
      Object.keys(groupedData).forEach(key => {
        groupedData[key].sort((a, b) => lineOrderMap[a.x] - lineOrderMap[b.x]);
      });
      let newLineData = Object.keys(this.lineConfig.armColorGroup).map(arm => ({
        label: arm,
        data: groupedData[arm] || [],
        backgroundColor: this.lineConfig.armColorGroup[arm].backgroundColor,
        borderColor: this.lineConfig.armColorGroup[arm].borderColor
      }));
      this.lineData = newLineData

      this.firstInitFlag = false

      ElMessage({
        message: 'Query successfully',
        type: 'success',
      })
    }
  },

  mounted() {
    // 确保对象已被正确初始化
    if (!this.$store.state.mainStore.barData) {
      this.$store.state.mainStore.barData = [];
    }
    const barDataFromStore= this.$store.state.mainStore.barData
    const filterBarData = barDataFromStore.filter(item => item.type === this.omicsType);
    let parsedBarData = filterBarData.map(item => ({
      ID: item.id,
      Name:item.name,
      arm: item.arm,
      y: Number(item.mean),
      yMin:Number(item.mean)-Number(item.se),
      yMax:Number(item.mean)+Number(item.se)
    }));

    this.barTotalData=parsedBarData

    // lineData
    if (!this.$store.state.mainStore.lineData) {
      this.$store.state.mainStore.lineData = [];
    }
    const lineDataFromStore= this.$store.state.mainStore.lineData
    const filterLineData = lineDataFromStore.filter(item => item.type === this.omicsType);
    let parsedLineData = filterLineData.map(item => ({
      ID: item.id,
      Name:item.name,
      x: item.week,
      arm: item.arm,
      y: Number(item.mean),
      yMin:Number(item.mean)-Number(item.se),
      yMax:Number(item.mean)+Number(item.se)
    }));
    this.lineTotalData=parsedLineData

    // Search fields
    this.$nextTick(() => {
      this.molecularItems = this.omicsMappingData
      this.molecularKeys = Object.keys(this.molecularItems[0])
    });


  }


};
</script>

<style scoped>
/* 样式部分可以根据需要进行自定义 */
.message-text {
  font-size: 16px; /* Adjust this value to make the message text larger */
  font-family: Arial;
}
.close-button {
  font-size: 12px; /* Adjust this value to make the close button text smaller */
  font-family: Arial;
}
</style>
