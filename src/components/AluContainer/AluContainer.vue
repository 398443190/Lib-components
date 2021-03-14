<template>
  <div class="" id="alu-container" :ref="refName">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted, nextTick } from "vue";
import { debounce } from "../../utils/index.js";
export default {
  name: "AluContainer",
  props: {
    options: Object,
  },
  setup(ctx) {
    const refName = "AluContainer";
    const width = ref(0);
    const height = ref(0);
    const originalWidth = ref(0);
    const originalHeight = ref(0);
    const ready = ref(false);
    let context, dom, observe;
    const initSize = () => {
      return new Promise((resolve) => {
        nextTick(() => {
          dom = context.$refs[refName];
          // 获取大屏的真实尺寸
          if (ctx.options && ctx.options.width && ctx.options.height) {
            width.value = ctx.options.width;
            height.value = ctx.options.height;
          } else {
            width.value = dom.clientWidth;
            height.value = dom.clientHeight;
          }
          // 获取画布尺寸
          if (!originalHeight.value || !originalWidth.value) {
            originalWidth.value = window.screen.width;
            originalHeight.value = window.screen.height;
          }
          console.log(width.value, "width.value");
          console.log(height.value, "height.value");
          console.log(originalWidth.value, "originalWidth.value");
          console.log(originalHeight.value, "originalHeight.value");
          resolve();
        });
      });
    };
    const updateSize = () => {
      if (width.value && height.value) {
        dom.style.width = `${width.value}px`;
        dom.style.height = `${height.value}px`;
      } else {
        dom.style.width = `${originalWidth.value}px`;
        dom.style.height = `${originalHeight.value}px`;
      }
    };
    const updateScale = () => {
      // 获取真实的视口尺寸
      const currentWidth = document.body.clientWidth;
      const currentHeight = document.body.clientHeight;
      // 获取大屏最终的宽高
      const realWidth = width.value || originalWidth.value;
      const realHeight = height.value || originalHeight.value;
      const widthScale = currentWidth / realWidth;
      const heightScale = currentHeight / realHeight;
      dom.style.transform = `scale(${widthScale},${heightScale})`;
    };
    const onResize = async () => {
      await initSize();
      updateScale();
      console.log("w  resize");
    };
    const initMutationObserve = () => {
      const MutationObserve = window.MutationObserver;
      observe = new MutationObserver(onResize);
      observe.observe(dom, {
        attributes: true,
        attributeFilter: ["style"],
        attributeOldValue: true,
      });
    };
    const removeMutationObserve = () => {
      if (observe) {
        observe.disconnect();
        observe.takeRecords();
        observe = null;
      }
    };
    onMounted(async () => {
      ready.value = false;
      context = getCurrentInstance().ctx;
      await initSize();
      updateSize();
      updateScale();
      window.addEventListener("resize", debounce(100, onResize));
      initMutationObserve();
      ready.value = true;
    });
    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
      removeMutationObserve();
    });
    return {
      refName,
      ready,
    };
  },
};
</script>
<style lang="scss" scoped>
#alu-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  overflow: hidden;
  transform-origin: left top;
}
</style>