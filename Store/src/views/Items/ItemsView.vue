<template>
  <main>
    <div class="container">
      <div class="mt-4 pb-2 mb-2 heading">
        <div class="row">
          <div class="col-6">
            <h5>Products List</h5>
          </div>
          <div class="col-6 text-end">
            <RouterLink
              class="btn btn-sm btn-primary"
              to="/item/create"
              v-if="!isLoading && items.length > 0"
              ><font-awesome-icon :icon="['fas', 'circle-plus']" />Add</RouterLink
            >
          </div>
        </div>
      </div>

      <div class="items">
        <div class="row">
          <div class="col-sm-6 col-md-3 mb-4" v-if="isLoading || items.length === 0">
            <div class="card shadow-sm h-100 d-flex flex-column" aria-hidden="true">
              <svg
                class="bd-placeholder-img"
                width="100%"
                height="180"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Image cap"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#868e96"></rect>
              </svg>
              <div class="card-body" v-if="isLoading">
                <h5 class="card-title placeholder-glow">
                  <span class="placeholder col-6"></span>
                </h5>
                <p class="card-text placeholder-glow">
                  <span class="placeholder col-7"></span>
                  <span class="placeholder col-4"></span>
                  <span class="placeholder col-4"></span>
                  <span class="placeholder col-6"></span>
                  <span class="placeholder col-8"></span>
                </p>
                <div class="text-end">
                  <a class="btn btn-dark btn-sm disabled placeholder col-6"></a>
                </div>
              </div>
              <div class="card-body" v-if="!isLoading">
                <h5 class="card-title">There are no items</h5>
                <p class="card-text">
                  <span class="col-7"></span>
                  <span class="col-4"></span>
                  <span class="col-4"></span>
                  <span class="col-6"></span>
                  <span class="col-8"></span>
                </p>
                <div class="text-end">
                  <RouterLink class="btn btn-sm btn-primary" to="/item/create">
                    <font-awesome-icon :icon="['fas', 'circle-plus']" />
                    Add
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6 col-md-3 mb-4" v-for="(item, index) in items" :key="index" v-else>
            <!-- style="width: 18rem" -->
            <div class="card shadow-sm h-100 d-flex flex-column">
              <div class="item-image">
                <svg
                  class="bd-placeholder-img"
                  width="100%"
                  height="180"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: Image cap"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#868e96"></rect>
                  <text x="30%" y="50%" fill="#dee2e6" dy=".3em">Image Placeholder</text>
                </svg>
              </div>
              <div class="item-description p-4">
                <h5 class="card-title">{{ item?.title }}</h5>
                <p class="card-text clamp-text-3 flex-grow-1">
                  {{ item?.description }}
                </p>
              </div>
              <div class="item-footer mt-auto px-4 pt-2 pb-4">
                <div class="row">
                  <div class="col-4">
                    <h6>
                      <span class="badge text-bg-primary">
                        {{ formatPriceToKES(item?.price) }}
                      </span>
                    </h6>
                  </div>
                  <div class="col-8 text-end">
                    <RouterLink
                      class="btn btn-sm btn-dark me-2"
                      :to="{ path: '/item/edit/' + item.id }"
                    >
                      <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                      Edit
                    </RouterLink>
                    <button
                      type="button"
                      class="btn btn-sm btn-danger"
                      @click="deleteItem(item?.id)"
                    >
                      <font-awesome-icon :icon="['fas', 'trash']" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

const backendAPI = 'http://localhost:5250/api/values'

export default {
  name: 'storeItems',
  data() {
    return {
      items: [],
      isLoading: false
    }
  },

  mounted() {
    this.getStoreItems(true)
  },

  methods: {
    getStoreItems(isLoading) {
      this.isLoading = isLoading
      axios
        .get(`${backendAPI}`)
        .then((res) => {
          this.items = res.data
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
        })
    },
    deleteItem(itemId) {
      axios.delete(`${backendAPI}/${itemId}`).then((res) => {
        this.getStoreItems(false)
      })
    },

    formatPriceToKES(price) {
      const KES = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'KES'
      })
      return price ? KES.format(price) : 0
    }
  }
}
</script>
