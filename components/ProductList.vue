<template>
  <div>
    {{ products }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ProductList',
  async asyncData(ctx) {
    console.log(1)
    const response = await axios.get('http://localhost:3000/products')
    const products = response.data
    return { products }
  },
}
</script>

<style scoped></style>
