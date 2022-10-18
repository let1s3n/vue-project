<template>
  <header class="p-4 border-b border-stone-700">
    <h1>{{ msg }}</h1>
  </header>
</template>

<script>
export default {
  props: {
    msg: {
      type: String
    }
  }
};
</script>

<style scoped lang="scss">
</style>