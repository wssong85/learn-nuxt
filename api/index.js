import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
})

function fetchProductById(id) {
  return instance.get(`/products/${id}`)
}

function fetchProductsByKeyword(keyword) {
  return instance.get(`/products`, {
    params: {
      name_like: keyword,
    },
  })
}

function createCartItem(cartItem) {
  return instance.post('/carts', cartItem)
}

function fetchCartItems() {
  return instance.get('/carts')
}

function removeCartItem(id) {
  return instance.delete(`/carts`, id).catch((e) => {
    console.log(e)
  })
}

export {
  fetchProductById,
  fetchProductsByKeyword,
  createCartItem,
  removeCartItem,
  fetchCartItems,
}
