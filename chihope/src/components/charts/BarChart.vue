<template>
  <div className="chart-container">
    <canvas ref="barChart" id="barChart" ></canvas>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { BarWithErrorBarsController, BarWithErrorBar } from 'chartjs-chart-error-bars';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarWithErrorBarsController, BarWithErrorBar, annotationPlugin);

export default defineComponent({
  name: 'BarChart',
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
    backgroundColors: {
      type: Array,
      default: () => []
    },
    borderColors: {
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
    errorBarLineColor: {
      type: String,
      default: '#000000'
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
      config:null,
      chartInstance:null,
    };
  },
  mounted() {
    const ctx = this.$refs.barChart.getContext('2d');

    this.config = {
      type: 'barWithErrorBars',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.chartData,
            backgroundColor: this.backgroundColors,
            borderColor: this.borderColors,
            borderWidth: this.borderWidth,
            errorBarLineWidth: this.errorBarLineWidth,
            errorBarColor: this.errorBarLineColor,
            errorBarWhiskerLineWidth: this.errorBarLineWidth,
            errorBarWhiskerColor: this.errorBarLineColor
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            offset: true,
            beginAtZero: true,
            title: {
              display: true,
              text: this.yTitle,
              font: {
                size:this.titleFontSize
              },
              family: this.titleFontFamily,
              color: this.xAxisFontColor
            },
            grid: {
              display: true,
              tickColor:this.yAxisColor,
              tickWidth:this.yAxisLineWidth,
              color:'#FFFFFF',
              offset:false,
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
            title: {
              display: true,
              text: this.xTitle,
              font: {
                size:this.titleFontSize
              },
              family: this.titleFontFamily,
              color: this.yAxisFontColor
            },
            grid: {
              display: true,
              tickColor:this.xAxisColor,
              tickWidth:this.xAxisLineWidth,
              offset:false,
              color:'#FFFFFF',
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


    this.chartInstance = new Chart(ctx,this.config);

    // chartInstance.update()
    // this.chartInstance.data.datasets = [];
    // chartInstance.destroy();
  },
  watch: {
    chartData: {
      deep:true,
      handler(newData){
        this.chartInstance.destroy();
        this.config.data.datasets[0].data=newData

        const ctx = this.$refs.barChart.getContext('2d');
        const newChart=new Chart(ctx,this.config);
        this.chartInstance=newChart
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

#barChart {
  height: 100% !important;
  width: 100% !important;
}
</style>
