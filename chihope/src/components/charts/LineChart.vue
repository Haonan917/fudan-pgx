<template>
  <div className="chart-container">
    <canvas ref="lineChart" id="lineChart"></canvas>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {Chart, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale} from 'chart.js';
import {LineWithErrorBarsController, PointWithErrorBar} from 'chartjs-chart-error-bars';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, LineWithErrorBarsController, PointWithErrorBar, annotationPlugin);

export default defineComponent({
  name: 'LineWithErrorBarsChart',
  props: {
    labels: {
      type: Array,
      required: true
    },
    chartData: {
      type: Array,
      required: true
    },
    xTitle: {
      type: String,
      default: ''
    },
    yTitle: {
      type: String,
      default: ''
    },
    xAxisLineWidth: {
      type: Number,
      default: 1
    },
    yAxisLineWidth: {
      type: Number,
      default: 1
    },
    xAxisColor: {
      type: String,
      default: '#000000'
    },
    yAxisColor: {
      type: String,
      default: '#000000'
    },
    xAxisFontSize: {
      type: Number,
      default: 12
    },
    yAxisFontSize: {
      type: Number,
      default: 12
    },
    xAxisFontColor: {
      type: String,
      default: '#000000'
    },
    yAxisFontColor: {
      type: String,
      default: '#000000'
    },
    titleFontSize: {
      type: Number,
      default: 16
    },
    titleFontFamily: {
      type: String,
      default: 'Arial'
    },
    titleFontColor: {
      type: String,
      default: '#000000'
    },
    borderLineWidth: {
      type: Number,
      default: 3
    },
  },
  data() {
    return {
      config:null,
      chartInstance:null,
    };
  },
  mounted() {
    const ctx = this.$refs.lineChart.getContext('2d');
    this.config = {
      type: 'lineWithErrorBars',
      data: {
        labels: this.labels,
        datasets: this.chartData.map(dataset => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: dataset.backgroundColor,
          borderColor: dataset.borderColor,
          borderWidth: this.borderLineWidth,
          errorBarColor: dataset.borderColor,
          errorBarLineWidth: this.borderLineWidth,
          errorBarWhiskerLineWidth: this.borderLineWidth,
          errorBarWhiskerColor: dataset.borderColor,
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            offset: true, // 添加此行以在 x 轴前后留有空隙
            beginAtZero: false,
            title: {
              display: true,
              text: this.yTitle,
              font: {
                size:this.titleFontSize
              },
              family: this.titleFontFamily,
              color: this.titleFontColor
            },
            grid: {
              display: true,
              tickColor:this.yAxisColor,
              tickWidth:this.yAxisLineWidth,
              color:'#FFFFFF',
              offset:false
            },
            ticks: {
              color: this.yAxisFontColor,
              font: {
                size: this.yAxisFontSize
              },
              lineWidth: this.yAxisLineWidth
            },
            border: {
              color: this.yAxisColor,
              width: this.yAxisLineWidth
            }
          },
          x: {
            offset: true, // 添加此行以在 x 轴前后留有空隙
            title: {
              display: true,
              text: this.xTitle,
              font: {
                size:this.titleFontSize
              },
              family: this.titleFontFamily,
              color: this.titleFontColor
            },
            grid: {
              display: true,
              tickColor:this.xAxisColor,
              tickWidth:this.xAxisLineWidth,
              color:'#FFFFFF',
              offset:false
            },
            ticks: {
              color: this.xAxisFontColor,
              font: {
                size: this.xAxisFontSize
              },
              lineWidth: this.xAxisLineWidth
            },
            border: {
              color: this.xAxisColor,
              width: this.xAxisLineWidth
            }
          }
        },
        plugins: {
          legend: {
            display: true
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                yMin: 0,
                yMax: 0,
                borderColor: this.xAxisColor,
                borderWidth: this.xAxisLineWidth
              }
            }
          },

          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += `${context.parsed.y} (${context.parsed.yMax}, ${context.parsed.yMin})`;
                }
                return label;
              }
            }
          }
        }
      }
    };
    this.chartInstance = new Chart(ctx, this.config);
  },

  watch: {
    chartData: {
      deep: true,
      handler(newData) {
        this.chartInstance.destroy();
        let _this = this
        this.config.data.datasets = newData.map(dataset => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: dataset.backgroundColor,
          borderColor: dataset.borderColor,
          borderWidth: _this.borderLineWidth,
          errorBarColor: dataset.borderColor,
          errorBarLineWidth: _this.borderLineWidth,
          errorBarWhiskerLineWidth: _this.borderLineWidth,
          errorBarWhiskerColor: dataset.borderColor,
        }))

        const ctx = this.$refs.lineChart.getContext('2d');
        const newChart = new Chart(ctx, this.config);
        this.chartInstance = newChart
      }
    }
  }
});
</script>

<style scoped>
.chart-container {
  height: 100%;
  width: 100%;
  position: relative;
}

#lineChart {
  height: 100% !important;
  width: 100% !important;
}
</style>
