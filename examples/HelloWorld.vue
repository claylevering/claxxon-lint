<template>
  <div class="hello-world">
    <h1>{{ message }}</h1>
    <p>{{ computedValue }}</p>
  </div>
</template>

<script>
export default {
  name: 'TheHelloWorld',
  props: {
    message: {
      type: String,
      default: 'Hello Vue!'
    }
  },
  computed: {
    computedValue() {
      return this.message.toUpperCase();
    }
  }
}
</script>

<style scoped>
.hello-world {
  padding: 20px;
}
</style>
