<template>
  <div>
    <div class="container">
      <div class="main-panel">
        <img
          class="product-image"
          :src="product.imageUrl"
          :alt="product.name"
        />
      </div>
      <div class="side-panel">
        <p class="name">{{ product.name }}</p>
        <p class="price">{{ product.price }}</p>
        <button type="button" @click="addToCart">카트에 담기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createCartItem, fetchProductById } from '~/api'

export default {
  name: 'ProductId',
  async asyncData({ params }) {
    const response = await fetchProductById(params.id)
    const product = response.data
    return { product }
  },
  methods: {
    async addToCart() {
      // const removeResponse = await removeCartItem(this.product.id)
      // console.log('removeReponse', removeResponse)
      const response = await createCartItem(this.product)
      console.log('response.data', response.data)
      this.$store.commit('addCartItem', this.product)
      this.$router.push('/cart')
    },
  },
  // created() {
  //   const id = this.$route.params.id
  //   let productById = fetchProductById(id)
  // },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.product-image {
  width: 500px;
  height: 375px;
}

.side-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;
  text-align: center;
  padding: 0 1rem;
}
</style>
