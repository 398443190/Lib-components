<template>
  <div class="echarts" id="echarts"></div>
</template>

<script>
import { watch, onMounted } from "vue";
import Echarts from "echarts";
export default {
  name: "AluEcharts",
  props: {
    options: Object,
  },
  setup(ctx) {
    let dom;
    let chart;
    const initChart = () => {
      if (!chart) {
        dom = document.getElementById("echarts");
        chart = Echarts.init(dom);
        chart.setOption(ctx.options);
      }
    };
    onMounted(() => {
      initChart();
    });
    watch(() => ctx.options, () => {
        initChart();
        chart.setOption(ctx.options);
      }
    );
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>