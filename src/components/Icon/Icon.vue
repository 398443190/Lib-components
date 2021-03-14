<template>
  <svg>
    <use :href="iconName" :style="{...style}"></use>
  </svg>

</template>

<script>
export default {
    name: 'Icon',
    props: {
      name: String,
      style: Object
    },
    setup(ctx) {
      const iconName = `#${ctx.name}`
      return {
        iconName
      }
    }
}
</script>