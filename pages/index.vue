<template>
  <div class="app">
    <main>
      <!-- v-model 대체 -->
      <!--      :search-keyword="searchKeyword"-->
      <!--      @input="updateSearchKeyword"-->
      <SearchInput v-model="searchKeyword" @search="searchProducts" />
      <ul>
        <li
          class="item flex"
          v-for="product in products"
          :key="product.id"
          @click="moveToDetailPage(product.id)"
        >
          <img
            class="product-image"
            :src="product.imageUrl"
            :alt="product.name"
          />
          <p>{{ product.name }}</p>
          <span>{{ product.price }}</span>
        </li>
      </ul>
      <div class="cart-wrapper">
        <button class="btn" @click="moveToCartPage">장바구니 바로가기</button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import SearchInput from '~/components/SearchInput.vue'
import { fetchProductsByKeyword } from '~/api'

export default {
  name: 'PagesIndex.vue',

  components: {
    SearchInput,
  },

  async asyncData(ctx) {
    const response = await axios.get('http://localhost:3000/products')
    const products = response.data.map((item) => {
      return {
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`,
      }
    })
    return { products }
  },

  data() {
    return {
      searchKeyword: '',
    }
  },

  methods: {
    moveToDetailPage(id) {
      this.$router.push(`detail/${id}`)
    },
    // v-model 안쓸 경우
    // updateSearchKeyword(keyword) {
    //   this.searchKeyword = keyword
    // },
    async searchProducts() {
      const response = await fetchProductsByKeyword(this.searchKeyword)
      this.products = response.data.map((item) => {
        return {
          ...item,
          imageUrl: `${item.imageUrl}?random=${Math.random()}`,
        }
      })
    },
    moveToCartPage() {
      this.$router.push('/cart')
      // this.$router
      //   .push({
      //     path: '/cart',
      //     name: 'cart',
      //   })
      //   .catch((error) => {
      //     console.log('error', error)
      //   })
    },
  },
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}

.item {
  display: inline-block;
  width: 400px;
  height: 300px;
  text-align: center;
  margin: 0 0.5rem;
  cursor: pointer;
}

.product-image {
  width: 400px;
  height: 250px;
}

.app {
  position: relative;
}

.cart-wrapper {
  position: sticky;
  float: right;
  bottom: 50px;
  right: 50px;
}

.cart-wrapper .btn {
  display: inline-block;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
}
</style>
