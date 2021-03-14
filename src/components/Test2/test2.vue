<template>
<div class="">
  <div class="test">{{message}}</div>
</div>
</template>

<script>
import { computed, ref } from 'vue'
export default {
    name: 'Test2Component',
    setup() {
        const message = 'hello  world test2'
        return {
            message
        }
    }
}
</script>

<style lang="scss" scoped>
.test {
    color: green;
}
</style>