<template>
<!--  <div id="network" style="{width: 100%;height: 100%;background-color: black}">-->
<!--    <div-->
<!--        class="linkText"-->
<!--        :style="linkTextPosition"-->
<!--        v-show="linkTextVisible"-->
<!--        v-text="linkTextContent"-->
<!--    ></div>-->
<!--    svg-->
<!--  </div>-->
  <div style="height: 100%;width: 100%;position: relative">
    <div style="position:absolute;right: 0%;bottom: 0%;height: 100%;width: 20%;">
      <div style="padding-left: 20%;padding-top: 5%; font-size: 1.2vw;font-weight: bolder">
        <span style="display: block"># Node: {{ nodeList.length }}</span>
        <span style="display: block"># Edge: {{linkList.length}}</span>
      </div>
      <div style="position: absolute;bottom: 10%">
        <img src="./Project/CGZMain_graph_legend.png"  class="full-width-image"/>
      </div>
    </div>
    <svg
        id="graphSVG"
        width="100%"
        height="100%"
        :style="{'background-color': theme.bgcolor}"
        @click="clickEle"
        @mouseover.prevent="svgMouseover"
        @mouseout="svgMouseout"
    >
      <g id="container">
        <!-- links and link-text 注：先绘制边 -->
        <g>
          <g v-for="link in links" :key="link.index">
            <line
                :class="`${link[linkTypeKey]} ${link.selected} link element`"
                :stroke="link.color?link.color:theme.linkStroke"
                :stroke-width="linkWidth"
            ></line>
            <!-- dx dy 文字左下角坐标 -->
            <text
                v-if="showLinkText"
                dx="0"
                dy="0"
                class="link-text"
                :fill="theme.textFill"
                :font-size="linkTextFrontSize"
            >{{link[linkTextKey]}}</text>
          </g>
        </g>

        <!-- node and node-text -->
        <g id="node-group">
          <g v-for="node in nodes" :key="node.index">
            <circle
                :fill="node.color?node.color:nodeColor(node[nodeTypeKey])"
                stroke-width="1"
                :stroke="highlightNodes.indexOf(node.id) == -1? theme.nodeStroke: 'gold' "
                :class="`${node[nodeTypeKey]} ${node.showText?'selected' : ''} node element`"
                :r="node.size?node.size:nodeSize"
            ></circle>
            <text
                v-show="node.showText"
                :dx="0"
                dy="-15"
                class="node-text"
                :fill="theme.textFill"
                :font-size="nodeTextFontSize"
            >{{node[nodeTextKey]}}</text>

          </g>
          <g></g>
        </g>
      </g>
    </svg>
  </div>

</template>

<script>
import * as d3 from "d3";

// 元素的 classList 是 DOMTokenList
DOMTokenList.prototype.indexOf = Array.prototype.indexOf;

export default {
  name: "GraphChart",
  props: {
    nodeList: Array,
    linkList: Array,
    // node
    nodeSize: {
      type: Number,
      default: 14
    },
    nodeTextKey: {
      type: String,
      default: "id"
    },
    nodeTypeKey: {
      type: String,
      default: "group"
    },
    nodeTextFontSize: {
      type: Number,
      default: 12
    },
    // link
    linkWidth: {
      type: Number,
      default: 2
    },
    showLinkText: {
      type: Boolean,
      default: false
    },
    linkTextKey: {
      type: String,
      default: "value"
    },
    linkTypeKey: {
      type: String,
      default: "type"
    },
    linkTextFrontSize: {
      type: Number,
      default: 10
    },
    linkDistance: {
      type: Number,
      default: 50
    },
    // svg
    svgSize: {
      type: Object,
      default: () => {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    },
    svgTheme: {
      type: String,
      default: "light" // dark or light
    },
    bodyStrength: {
      type: Number,
      default: -150
    },
    // others
    highlightNodes: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      selection: {
        links: [],
        nodes: []
      },
      pinned: [], // 被订住的节点的下标
      force: null,
      zoom: d3.zoom(),
      nodeColor: d3.scaleOrdinal(d3.schemeCategory10),
      linkTextVisible: false,
      linkTextPosition: {
        top: 0,
        left: 0
      },
      linkTextContent: ""
    };
  },
  computed: {
    nodes() {
      // 去重
      let nodes = this.nodeList.slice();
      let nodeIds = [];
      nodes = nodes.filter(node => {
        if (nodeIds.indexOf(node.id) === -1) {
          nodeIds.push(node.id);
          return true;
        } else {
          return false;
        }
      });
      return nodes;
    },
    links() {
      return this.linkList;
    },
    theme() {
      if (this.svgTheme === "light") {
        return {
          bgcolor: "white",
          nodeStroke: "black",
          linkStroke: "lightgray",
          textFill: "black"
        };
      } else {
        // dark
        return {
          bgcolor: "black",
          nodeStroke: "white",
          linkStroke: "rgba(200,200,200)",
          textFill: "white"
        };
      }
    }
  },
  watch: {
    bodyStrength: function() {
      this.initData();
      this.$nextTick(function() {
        this.initDragTickZoom();
      });
    },
    linkDistance: function() {
      this.initData();
      this.$nextTick(function() {
        this.initDragTickZoom();
      });
    },
    nodes: function() {
      this.initData();
      this.$nextTick(function() {
        this.initDragTickZoom();
      });
    }
  },
  created() {
    this.initData();
  },
  mounted() {
    this.initDragTickZoom();
  },
  methods: {
    initData() {
      this.force = d3
          .forceSimulation(this.nodes)
          .force(
              "link",
              d3
                  .forceLink(this.links)
                  .id(d => d.id)
                  .distance(this.linkDistance)
          )
          .force("charge", d3.forceManyBody().strength(this.bodyStrength)) //The strength of the attraction or repulsion
          .force(
              "center",
              d3.forceCenter(this.svgSize.width / 2, this.svgSize.height / 2)
          );
    },
    initDragTickZoom() {
      // Give nodes drag functionality
      d3.selectAll(".node").call(this.drag(this.force));
      this.force.on("tick", () => {
        // Update link positions
        d3.selectAll(".link")
            .data(this.links)
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        // Update node positions
        d3.selectAll(".node")
            .data(this.nodes)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        // Update node text positions
        d3.selectAll(".node-text")
            .data(this.nodes)
            .attr("x", d => d.x)
            .attr("y", d => d.y);
        // Update link text positions
        d3.selectAll(".link-text")
            .data(this.links)
            .attr("x", d => (d.source.x + d.target.x) / 2)
            .attr("y", d => (d.source.y + d.target.y) / 2);
      });

      // Initialize zoom
      this.zoom.scaleExtent([0.1, 4]).on("zoom", this.zoomed);

      d3.select("#graphSVG")
          .call(this.zoom)
          .on("dblclick.zoom", null);
    },
    clickLink(e) {
      this.$emit("clickLink", e, e.target.__data__);
    },
    clickNode(e) {
      if (this.pinned.length === 0) {
        this.pinnedState(e);
      } else {
        d3.selectAll(".element").style("opacity", 0.2);
        this.pinned = [];
      }
      this.$emit("clickNode", e, e.target.__data__);
    },
    clickEle(e) {
      if (e.target.tagName === "circle") {
        this.clickNode(e);
      } else if (e.target.tagName === "line") {
        this.clickLink(e);
      }
    },
    svgMouseover(e) {
      if (e.target.nodeName === "circle") {
        if (this.pinned.length === 0) {
          this.selectedState(e);
        }
        // 强制刷新
        this.$forceUpdate();
        this.$emit("hoverNode", e, e.target.__data__);
      } else if (e.target.nodeName === "line") {
        // 显示关系文本
        this.linkTextPosition = {
          left: e.clientX + "px",
          top: e.clientY - 50 + "px"
        };
        this.linkTextContent = e.target.__data__[this.linkTextKey];
        this.linkTextVisible = true;
        this.$emit("hoverLink", e, e.target.__data__);
      }
    },
    svgMouseout(e) {
      this.linkTextVisible = false;
      if (e.target.nodeName === "circle") {
        if (this.pinned.length === 0) {
          this.noSelectedState(e);
        }
        // 强制刷新
        this.$forceUpdate();
      }
    },
    selectedState(e) {
      // 节点自身显示文字、增加 selected class、添加进 selection
      e.target.__data__.showText = true;
      e.target.classList.add("selected");
      this.selection.nodes.push(e.target.__data__);
      // 周围节点显示文字、边和结点增加 selected class、添加进 selection
      this.lightNeibor(e.target.__data__);
      // 除了 selected 的其余节点透明度减小
      d3.selectAll(".element").style("opacity", 0.2);
    },
    noSelectedState(e) {
      // 节点自身不显示文字、移除 selected class
      e.target.__data__.showText = false;
      // e.target.classList.remove("selected");
      // 周围节点不显示文字、边和结点移除 selected class
      this.darkenNerbor();
      // 所有节点透明度恢复
      d3.selectAll(".element").style("opacity", 1);
    },
    pinnedState(e) {
      this.pinned.push(e.target.__data__.index);
      d3.selectAll(".element").style("opacity", 0.05);
    },
    lightNeibor(node) {
      this.links.forEach(link => {
        if (link.source.index === node.index) {
          link.selected = "selected";
          this.selection.links.push(link);
          this.selection.nodes.push(link.target);
          this.lightNode(link.target);
        }
        if (link.target.index === node.index) {
          link.selected = "selected";
          this.selection.links.push(link);
          this.selection.nodes.push(link.source);
          this.lightNode(link.source);
        }
      });
    },
    lightNode(selectedNode) {
      this.nodes.forEach(node => {
        if (node.index === selectedNode.index) {
          node.showText = true;
        }
      });
    },
    darkenNerbor() {
      this.links.forEach(link => {
        this.selection.links.forEach(selectedLink => {
          if (selectedLink.id === link.id) {
            link.selected = "";
          }
        });
      });
      this.nodes.forEach(node => {
        this.selection.nodes.forEach(selectednode => {
          if (selectednode.id === node.id) {
            node.showText = false;
          }
        });
      });
      // 清空 selection
      this.selection.nodes = [];
      this.selection.links = [];
    },
    zoomed(event) {
      d3.select("#container").attr(
          "transform",
          "translate(" + event.transform.x + "," + event.transform.y + ") scale(" + event.transform.k + ")"
      );
    },
    drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
    }
  }
};
</script>

<style scoped>
svg {
  /* border-radius: 5px; */
}

.element {
  transition: opacity 0.5s ease;
}
.selected {
  opacity: 1 !important;
}
.node,
.link {
  cursor: pointer;
}
.linkText {
  position: absolute;
  z-index: 10;
  background-color: rgba(75, 75, 75, 0.596);
  border-radius: 10px;
  color: white;
  padding: 10px;
}

.full-width-image {
  width: 56%;
  height: auto;
  display: block;
  bottom: 0%;
  /*margin: 0 auto;*/
}

</style>
