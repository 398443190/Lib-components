<template>
  <div class="">
    <div class="container bg-grey">
      <svg height="400" width="400">
        <defs>
          <mask id="test-mask">
            <rect x="5" y="5" width="390" height="390" fill="grey"></rect>
            <circle r="50" cx="150" cy="150"/>
          </mask>
          <!-- <linearGradient id="linear-gradient">
            <stop offset="0%" stop-color="red"></stop>
            <stop offset="50%" stop-color="grey"></stop>
            <stop offset="100%" stop-color="blue"></stop>
          </linearGradient> -->
          <radialGradient
           id="linear-gradient" 
           r="50%"
           cx="50%"
           cy="50%"
           fx="50%"
           fy="50%">
            <stop offset="0%" stop-color="red"></stop>
            <stop offset="50%" stop-color="yellow"></stop>
            <stop offset="100%" stop-color="blue"></stop>
          </radialGradient>
        </defs>
        <!-- <rect x="5" y="5" width="390" height="390" fill="url(#linear-gradient)"></rect> -->
            <circle r="150" cx="200" cy="200" fill="url(#linear-gradient)"/>
        <!-- <rect
          x="5"
          y="5"
          width="390"
          height="390"
          fill="blue"
          mask="url(#test-mask)"
        ></rect> -->
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "SvgAnimation",
};
</script>

<style type="text/css" scoped>
.container {
  /* width: 200px;
  height: 200px; */
  border: 1px solid #000;
}
.bg-grey{
  background: grey;
}
</style>