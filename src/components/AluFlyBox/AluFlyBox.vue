<template>
  <div class="alu-flybox" :ref="refName">
    <svg :width="width" :height="height">
      <defs>
        <path :id="pathId" :d="path" fill="none" />
        <radialGradient
          :id="radialGradientId"
          r="50%"
          cx="50%"
          cy="50%"
          fx="100%"
          fy="50%"
        >
          <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
          <!-- <stop offset="50%" stop-color="yellow"></stop> -->
          <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
        </radialGradient>
        <mask :id="maskId">
          <circle :r="starLength" cx="0" cy="0" :fill="`url(#${radialGradientId})`">
            <animateMotion
              :dur="`${duration}s`"
              :path="path"
              rotate="auto"
              repeatCount="indefinite"
            />
          </circle>
        </mask>
      </defs>
      <use :href="`#${pathId}`" stroke-width="1" :stroke="lineColor" />
      <use
        :href="`#${pathId}`"
        stroke-width="3"
        :stroke="startColor"
        :mask="`url(#${maskId})`"
      />
    </svg>
    <div class="alu-flybox-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, getCurrentInstance } from "vue";
const { v4: uuidv4 } = require('uuid');
export default {
  name: "AluFlyBox",
  props: {
    lineColor: {
      type: String,
      default: '#235fa7'
    },
    startColor: {
      type: String,
      default: '#235fa7'
    },
    starLength: {
      type: [String, Number],
      default: '50'
    },
    duration: {
      type: [String, Number],
      default: '5'
    },
  },
  setup(ctx) {
    const uuid = uuidv4()
    const width = ref(0);
    const height = ref(0);
    const refName = "aluFlyBox";
    const pathId = `${refName}-path-${uuid}`
    const radialGradientId = `${refName}-radis-${uuid}`
    const maskId = `${refName}-maskId-${uuid}`
    const path = computed(() =>
      `M5 5 L${width.value - 5} 5 L${width.value - 5} ${height.value - 5} L5 ${height.value - 5} Z`
    )
    const init = () => {
      const instance = getCurrentInstance();
      const dom = instance.ctx.$refs[refName];
      width.value = dom.clientWidth;
      height.value = dom.clientHeight;
      console.log(dom, "dom");
    };
    onMounted(() => {
      init();
    });
    return {
      width,
      height,
      refName,
      path,
      pathId,
      radialGradientId,
      maskId
    };
  },
};
</script>
<style lang="scss" scoped>
.alu-flybox {
  position: relative;
  width: 100%;
  height: 100%;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .alu-flybox-content {
    width: 100%;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
}
</style>