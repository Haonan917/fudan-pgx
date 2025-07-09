<template>
  <div className="chart-container">
    <canvas ref="pointChart" id="pointChart"></canvas>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {Chart, Title, Tooltip, Legend, PointElement, LinearScale} from 'chart.js';
import {ScatterWithErrorBarsController, PointWithErrorBar} from 'chartjs-chart-error-bars';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(Title, Tooltip, Legend, PointElement, LinearScale, ScatterWithErrorBarsController, PointWithErrorBar, annotationPlugin);

export default defineComponent({
  name: 'PointChart',
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
    errorBarLineColors: {
      type: Array,
      default: () => []
    },
    borderWidth: {
      type: Number,
      default: 2
    },
    xAxisLineWidth: {
      type: Number,
      default: 1
    },
    yAxisLineWidth: {
      type: Number,
      default: 1
    },
    errorBarLineWidth: {
      type: Number,
      default: 10
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
    }
  },
  data() {
    return {
      config: null,
      chartInstance: null,
    };
  },
  mounted() {
    const ctx = this.$refs.pointChart.getContext('2d');

    this.config = {
      type: 'scatterWithErrorBars',
      data: {
        datasets: [
          {
            data: this.chartData,
            borderColor: this.errorBarLineColors,
            borderWidth: this.borderWidth,
            errorBarLineWidth: this.errorBarLineWidth,
            errorBarColor: this.errorBarLineColors,
            errorBarWhiskerLineWidth: this.errorBarLineWidth,
            errorBarWhiskerColor: this.errorBarLineColors
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            offset: true,
            suggestedMin: Math.max(...this.chartData.map(d => d.yMin)),
            suggestedMax: Math.min(...this.chartData.map(d => d.yMax)),
            title: {
              display: true,
              text: this.yTitle,
              font: {
                size: this.titleFontSize
              },
              family: this.titleFontFamily,
              color: this.xAxisFontColor
            },
            grid: {
              display: true,
              tickColor: this.yAxisColor,
              tickWidth: this.yAxisLineWidth,
              color: '#FFFFFF',
              offset: false,
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
            offset: true,
            type: 'category',
            labels: this.labels,
            title: {
              display: true,
              text: this.xTitle,
              font: {
                size: this.titleFontSize
              },
              family: this.titleFontFamily,
              color: this.yAxisFontColor
            },
            grid: {
              display: true,
              tickColor: this.xAxisColor,
              tickWidth: this.xAxisLineWidth,
              offset: false,
              color: '#FFFFFF',
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
            display: false
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
        this.config.data.datasets[0].data = newData;

        const ctx = this.$refs.pointChart.getContext('2d');
        const newChart = new Chart(ctx, this.config);
        this.chartInstance = newChart;
      }
    },
  }
});
</script>

<style scoped>
.chart-container {
  height: 100%;
  width: 100%;
  position: relative;
}

#pointChart {
  height: 100% !important;
  width: 100% !important;
}
</style>
