<template>
  <v-container>

    <v-row>
      <v-col cols="12">
        <MolecularSearch @childClick="handleClick"
                         @childSelect="handleSelect"
                         :items="molecularItems"
                         :keys="molecularKeys"
                         :init-key="initKey"
        />
      </v-col>
      <v-col cols="12" style="display: flex;justify-content: center;align-items: center">
        <v-card style="width: 100vw;height: 80vh" id="graphChart">
          <graph-chart
              :nodeList="nodes"
              :linkList="links"
              :nodeSize="nodeSize"
              :linkWidth="linkWidth"
              :linkDistance="linkDistance"
              :svgTheme="svgTheme?'dark':'light'"
              :bodyStrength="bodyStrength"
              :svg-size="svgSize"
          ></graph-chart>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card >
          <v-data-table :items="tableData"></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GraphChart from "@/components/charts/GraphChart";
import MolecularSearch from "@/components/MolecularSearch";
import {ElMessage} from "element-plus";

export default {
  name: "app",

  components: {
    GraphChart,
    MolecularSearch
  },
  data() {
    return {
      tableData:[],
      allMolecularItems:[],
      molecularItems:[],
      molecularKeys:['All','MiRNAomics', 'Proteomics', 'Metabolomics', 'Clinical analytes'],
      molecularKeysMapping:{
        'MIR':'MiRNAomics',
        'PRT':'Proteomics',
        'MTB':'Metabolomics',
        'CLN':'Clinical analytes',
        'All':'All'
      },
      molecularValuesMapping:{
        'MiRNAomics':'MIR',
        'Proteomics':'PRT',
        'Metabolomics':'MTB',
        'Clinical analytes':'CLN',
        'All':'All'
      },
      svgSize:{
        width:1000,
        height:2000
      },
      initKey:'All',
      nodes: [],
      links: [],
      showSettingCard: false,
      nodeSize: 8,
      nodeLowSize:6,
      nodeHighSize:16,
      linkWidth: 2,
      linkDistance: 50,
      linkLowColor:'#81b1de',
      linkMidColor:'#FFFFFF',
      linkHighColor:'#db3b31',
      bodyStrength: -150,
      svgTheme: false, // light
      omicsColorMap:{
        'CLN':"#E41A1C",
        'MIR':"#984EA3",
        'PRT': "#4DAF4A",
        'MTB': "#377EB8"
      },
    };
  },
  methods:{
    initSvgSize(elementID){
      const element = document.getElementById(elementID);
      const rect = element.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      this.svgSize.height = height;
      this.svgSize.width = width;
    },
    mapNtoSize(items, low, high) {
      const NValues = items.map(item => item.N);
      const minN = Math.min(...NValues);
      const maxN = Math.max(...NValues);

      return items.map(item => {
        const mappedN = ((item.N - minN) / (maxN - minN)) * (high - low) + low;
        return {
          ...item,
          size: mappedN
        };
      });
    },
    mapRtoColor(r, lowR, highR, lowColor,midColor, highColor){
      const t = (r - lowR) / (highR - lowR); // mapping to [0, 1]
      const lowRGB = {
        r: parseInt(lowColor.slice(1, 3), 16),
        g: parseInt(lowColor.slice(3, 5), 16),
        b: parseInt(lowColor.slice(5, 7), 16)
      };
      const midRGB = {
        r: parseInt(midColor.slice(1, 3), 16),
        g: parseInt(midColor.slice(3, 5), 16),
        b: parseInt(midColor.slice(5, 7), 16)
      };
      const highRGB = {
        r: parseInt(highColor.slice(1, 3), 16),
        g: parseInt(highColor.slice(3, 5), 16),
        b: parseInt(highColor.slice(5, 7), 16)
      };
      let color;
      if (t <= 0.5) {
        // 从 lowColor 到 midColor
        const t1 = t * 2;
        color = {
          r: Math.round(lowRGB.r + t1 * (midRGB.r - lowRGB.r)),
          g: Math.round(lowRGB.g + t1 * (midRGB.g - lowRGB.g)),
          b: Math.round(lowRGB.b + t1 * (midRGB.b - lowRGB.b))
        };
      } else {
        // 从 midColor 到 highColor
        const t2 = (t - 0.5) * 2;
        color = {
          r: Math.round(midRGB.r + t2 * (highRGB.r - midRGB.r)),
          g: Math.round(midRGB.g + t2 * (highRGB.g - midRGB.g)),
          b: Math.round(midRGB.b + t2 * (highRGB.b - midRGB.b))
        };
      }

      // 将 RGB 转换为十六进制
      return `#${((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1)}`;
    },
    handleSelect(selectedKey){
      if (selectedKey===this.initKey){
        this.molecularItems = this.allMolecularItems.map(obj => {
          const key = Object.keys(obj)[0];
          return { 'All': obj[key] };
        });
      } else {
        this.molecularItems = this.allMolecularItems.filter(obj => (selectedKey in obj) );
      }

      const mappedKey = this.molecularValuesMapping[selectedKey];
      this.resetLinksAndNodes(selectedKey, mappedKey);
      this.updateTableData();
    },
    handleClick(item) {
      const key = item.key === this.initKey ? this.initKey : item.key;
      const mappedKey = this.molecularValuesMapping[key];
      const value = item.value;

      if (value === null) {
        this.resetLinksAndNodes(key, mappedKey);
        this.updateTableData();
        ElMessage({
          message: 'Query successfully',
          type: 'success',
        });
        return;
      }

      const molecularItem = this.molecularItems.find(item => item[key] === value);

      if (!molecularItem) {
        ElMessage({
          message: 'No matched records',
          type: 'warning',
        });
        return;
      }

      const molecularID = molecularItem[key];
      if (molecularID === this.preMolecular) {
        ElMessage('Repeated query.');
        return;
      }
      this.preMolecular = molecularID;

      this.updateLinksAndNodes(molecularID);

      this.bodyStrength = -1000;

      this.updateTableData();

      ElMessage({
        message: 'Query successfully',
        type: 'success',
      });
    },
    resetLinksAndNodes(key, mappedKey) {
      if (key === this.initKey) {
        this.links = this.$store.state.mainStore.graphEdge.map(item => this.mapLink(item));
      } else {
        this.links = this.$store.state.mainStore.graphEdge.filter(item =>
            mappedKey === item.type1 || mappedKey === item.type2
        ).map(item => this.mapLink(item));
      }
      this.bodyStrength = -150;
      this.updateNodes();
    },
    updateLinksAndNodes(molecularID) {
      this.links = this.$store.state.mainStore.graphEdge.filter(item =>
          molecularID === item.name1 || molecularID === item.name2
      ).map(item => this.mapLink(item));
      this.updateNodes();
    },

    updateNodes() {
      const sources = this.links.map(item => item.source);
      const targets = this.links.map(item => item.target);
      const nodeIds = new Set([...sources, ...targets]);
      const omicsColorMap = this.omicsColorMap;
      this.nodes = this.$store.state.mainStore.graphNode.filter(item =>
          nodeIds.has(item.Name)
      ).map(item => ({
        id: item.Name,
        group: item.Group,
        N: item.N,
        color: omicsColorMap[item.Group]
      }));

      this.nodes = this.mapNtoSize(this.nodes, this.nodeLowSize, this.nodeHighSize);
    },

    updateTableData() {
      this.tableData = this.links.map(item => ({
        Source: item.source,
        Target: item.target,
        R: item.value,
        N: item.n,
        FDR: item.fdr
      }));
    },

    mapLink(item) {
      return {
        source: item.name1,
        target: item.name2,
        value: item.r,
        n: item.n,
        fdr: item.fdr,
        color: this.mapRtoColor(item.r, -1, 1, this.linkLowColor, this.linkMidColor, this.linkHighColor)
      };
    }
  },

  mounted() {
    this.initSvgSize('graphChart')

    if (!this.$store.state.mainStore.graphNode) {
      this.$store.state.mainStore.graphNode = [];
    }
    if (!this.$store.state.mainStore.graphEdge) {
      this.$store.state.mainStore.graphEdge = [];
    }
    // Set molecular input box
    let _this = this
    this.allMolecularItems = this.$store.state.mainStore.graphNode.map(function (item){
      let object = {};
      const keyName =  _this.molecularKeysMapping[item.Group]
      object[keyName] = item.Name
      return object
    })

    this.molecularItems = this.allMolecularItems.map(obj => {
      const key = Object.keys(obj)[0];
      return { 'All': obj[key] };
    });

    // set nodes and edges
    const omicsColorMap = this.omicsColorMap
    this.nodes = this.$store.state.mainStore.graphNode.map(item=>({
      id: item.Name,
      group:item.Group,
      N:item.N,
      color: omicsColorMap[item.Group]
    }));
    this.nodes = this.mapNtoSize(this.nodes, this.nodeLowSize,this.nodeHighSize)

    const nodeIds = new Set(this.nodes.map(item => item.id));
    this.links = this.$store.state.mainStore.graphEdge.filter(item =>
        nodeIds.has(item.name1) && nodeIds.has(item.name2)
    ).map(item => ({
      source: item.name1,
      target: item.name2,
      value: item.r,
      n: item.n,
      fdr: item.fdr,
      color: _this.mapRtoColor(item.r,-1,1,_this.linkLowColor, _this.linkMidColor,_this.linkHighColor)
    }));

    console.log("links",this.links)

    // set table
    this.tableData = this.links.map(item=>({
      Source: item.source,
      Target: item.target,
      R: item.value,
      N: item.n,
      FDR: item.fdr
    }))
  }

};
</script>

<style>
body {
  margin: 0;
}

.setting-box-button {
  position: fixed;
  overflow: auto;
  top: 20px;
  right: 40px;
  border: 2px solid rebeccapurple;
}

.setting-box-card {
  position: fixed;
  z-index: 10;
  overflow: auto;
  top: 15px;
  right: 15px;
  width: 500px;
  max-height: 700px;
}
</style>