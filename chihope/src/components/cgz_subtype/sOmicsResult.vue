<template>
  <v-container style="padding-left: 3vw; padding-right: 3vw;">
    <v-row>
      <v-col cols="12">
        <MolecularSearch @childClick="handleClick"
                         :omics-type="omicsType"
                         :items="molecularItems"
                         :keys="molecularKeys"/>
      </v-col>
      <v-row  v-if="!firstInitFlag">
        <v-col cols="3"></v-col>
        <v-col cols="6"  class="d-flex justify-left" >
          <v-card >
            <v-responsive :aspect-ratio="1/1">
              <PointChart
                  :labels="labels"
                  :chartData="chartData"
                  :errorBarLineColors="errorBarLineColors"
                  :xTitle="chartXTitle"
                  :yTitle="chartYTitle"
                  :borderWidth="pointConfig.borderLineWidth"
                  :xAxisLineWidth="pointConfig.xAxisLineWidth"
                  :yAxisLineWidth="pointConfig.yAxisLineWidth"
                  :errorBarLineWidth="pointConfig.errorBarLineWidth"
                  :xAxisColor="pointConfig.xAxisColor"
                  :yAxisColor="pointConfig.yAxisColor"
                  :xAxisFontSize="pointConfig.xAxisFontSize"
                  :yAxisFontSize="pointConfig.yAxisFontSize"
                  :xAxisFontColor="pointConfig.xAxisFontColor"
                  :yAxisFontColor="pointConfig.yAxisFontColor"
                  :titleFontSize="pointConfig.titleFontSize"
                  :titleFontFamily="pointConfig.titleFontFamily"
              />
            </v-responsive>
          </v-card>
        </v-col>
        <v-col cols="3"></v-col>
        <v-col cols="12">
          <v-card >
              <el-table :data="tableData" style="width: 100%"  :span-method="mergeRows" border stripe>
                <el-table-column prop="Name" label="Name" />
                <el-table-column prop="Subgroup" label="Subgroup" />
                <el-table-column prop="Mean (SE)" label="Mean (SE)" />
                <el-table-column prop="KW test Padj" label="KW test Padj"/>
                <el-table-column prop="Dunn's test Padj (MARD vs MOD)" label="Dunn's test Padj (MARD vs MOD)"  />
                <el-table-column prop="Dunn's test Padj (MARD vs SIDD)" label="Dunn's test Padj (MARD vs SIDD)"  />
                <el-table-column prop="Dunn's test Padj (MOD vs SIDD)" label="Dunn's test Padj (MOD vs SIDD)"  />
                <el-table-column prop="Dunn's test Padj (MARD vs SIRD)" label="Dunn's test Padj (MARD vs SIRD)"  />
                <el-table-column prop="Dunn's test Padj (MOD vs SIRD)" label="Dunn's test Padj (MOD vs SIRD)"  />
                <el-table-column prop="Dunn's test Padj (SIDD vs SIRD)" label="Dunn's test Padj (SIDD vs SIRD)"  />
              </el-table>
          </v-card>
        </v-col>
      </v-row>

    </v-row>
  </v-container>


</template>

<script>
import PointChart from "@/components/charts/PointChart";
import MolecularSearch from "@/components/MolecularSearch";
import {ElMessage} from "element-plus";
export default {
  components: {
    PointChart,
    MolecularSearch
  },
  props:{
    omicsType:{
      type: String,
      required:true
    },
    xTitle:{
      type: String,
      default: '',
    },
    yTitle:{
      type: String,
      default: ''
    },
    omicsMappingData:{
      type:Array,
      required:true
    },
    omicsTableData:{
      type:Array,
      required:true
    },
  },
  data() {
    return {
      pointTotalData:[],
      molecularItems:[],
      molecularKeys:[],
      firstInitFlag: true,
      pointConfig: {
        xAxisLineWidth: 2,
        yAxisLineWidth: 2,
        xAxisColor: '#000000',
        yAxisColor: '#000000',
        xAxisFontSize: 15,
        yAxisFontSize: 15,
        xAxisFontColor: '#000000',
        yAxisFontColor: '#000000',
        titleFontSize: 20,
        titleFontFamily: 'Arial',
        titleFontColor: '#000000',
        borderLineWidth: 2,
        errorBarLineWidth:3
      },
      labels: ['SIDD', 'MARD', 'MOD', 'SIRD'],
      chartData: [
        { x: 'MARD', y: 15, yMin: 13, yMax: 17 },
        { x: 'SIDD', y: 10, yMin: 8, yMax: 12 },
        { x: 'MOD', y: 20, yMin: 18, yMax: 22 },
        { x: 'SIRD', y: 25, yMin: 23, yMax: 27 }
      ],
      chartXTitle:'',
      chartYTitle:'',
      tableData:[],
      errorBarLineColors: ['#747fb2', '#a9c0dc', '#c380a9', '#e17171']
    };
  },
  methods: {
    mergeRows({ row, column, rowIndex, columnIndex }) {
      console.log(row)
      console.log(column)
      console.log(rowIndex)
      if (columnIndex >= 3) {
        if (rowIndex  === 0) {
          return {
            rowspan: 4,
            colspan: 1,
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          }
        }
      }

    },
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
      let filterPointData = this.pointTotalData.filter(item => item[anchor] === molecularID);
      if (filterPointData.length === 0) {
        ElMessage({
          message: 'No matched records',
          type: 'warning',
        });
        return;
      }
      // Table Data
      this.tableData = this.omicsTableData.filter(item => item[anchor] === molecularID)

      // Point Data
      if (this.omicsType==='CLN') {
        this.chartYTitle = molecularID
      }
      let newPointData = filterPointData.map(item => ({
        x: item.x,
        y: Number(Number(item.y).toFixed(3)),
        yMin:Number(Number(item.yMin).toFixed(3)),
        yMax:Number(Number(item.yMax).toFixed(3))
      }));

      const pointLabelOrder = this.labels
      let orderMap = pointLabelOrder.reduce((map, item, index) => {
        map[item] = index;
        return map;
      }, {});

      newPointData.sort((a, b) => orderMap[a.x] - orderMap[b.x]);
      this.chartData = newPointData
      this.firstInitFlag = false
      ElMessage({
        message: 'Query successfully',
        type: 'success',
      })
    }
  },

  mounted() {
    // 确保对象已被正确初始化
    if (!this.$store.state.subtypeStore.pointData) {
      this.$store.state.subtypeStore.pointData = [];
    }
    console.log(this.$store.state.subtypeStore.pointData)
    const pointDataFromStore= this.$store.state.subtypeStore.pointData
    const filterPointData = pointDataFromStore.filter(item => item.type === this.omicsType);
    this.pointTotalData = filterPointData.map(item => ({
      ID: item.id,
      Name:item.name,
      x: item.subgroup,
      y: Number(item.mean),
      yMin:Number(item.mean)-Number(item.se),
      yMax:Number(item.mean)+Number(item.se)
    }));

    // Search fields
    this.$nextTick(() => {
      this.molecularItems = this.omicsMappingData
      this.molecularKeys = Object.keys(this.molecularItems[0])
      this.chartXTitle = this.xTitle
      this.chartYTitle = this.yTitle
    });

  }
};
</script>

<style scoped>
/* Custom styles can be added here */
</style>
