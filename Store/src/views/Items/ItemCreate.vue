<template>
  <main>
    <div class="container my-4">
      <div class="card shadow w-50 mx-auto">
        <div class="card-header">
          <b>
            <font-awesome-icon :icon="['fasr', 'pen-nib']" /> {{ isEdit ? 'Edit' : 'Create' }} Item
          </b>
        </div>
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label for="title" class="form-label required">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="model.item.title"
                placeholder="Item title e.g. leather shoes"
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label required">Description</label>
              <textarea
                class="form-control"
                id="description"
                v-model="model.item.description"
                rows="3"
                placeholder="Add some descriptions on the item"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="category" class="form-label required">Category</label>
              <select id="category" class="form-select" v-model="model.item.category">
                <option selected value="null" disabled>Select Category</option>
                <option value="men">Men's clothing</option>
                <option value="women">Women's clothing</option>
                <option value="accessories">Accessories</option>
                <option value="jewelery">Jewelery</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="price" class="form-label required">Price</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="model.item.price"
                placeholder="100"
              />
            </div>
          </form>
        </div>
        <div class="card-footer text-end">
          <button type="submit" class="btn btn-danger btn-sm me-2" @click="cancelEdit()">
            <font-awesome-icon :icon="['fas', 'ban']" />
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-dark btn-lg"
            @click="createOrUpdateItem()"
            :disabled="!enableSubmitButton()"
          >
            <font-awesome-icon :icon="['fas', 'floppy-disk']" />
            Submit
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

const backendAPI = 'http://localhost:5250/api/values'

export default {
  name: 'itemCreate',
  data() {
    return {
      model: {
        item: {
          title: '',
          description: '',
          category: null,
          price: null
        }
      },
      isEdit: false,
      itemToEditId: null
    }
  },
  mounted() {
    const itemId = this.$route.params.id
    if (itemId) {
      this.itemToEditId = itemId
      this.isEdit = true
      this.getItemById(itemId)
    }
  },
  methods: {
    getItemById(itemId) {
      axios
        .get(`${backendAPI}/${itemId}`)
        .then((res) => {
          console.log(res)
          this.model.item = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },

    createOrUpdateItem() {
      const itemData = this.isEdit
        ? { ...this.model.item, id: this.itemToEditId }
        : { ...this.model.item }
      if (this.isEdit) {
        axios
          .put(`${backendAPI}`, itemData)
          .then((res) => {
            console.log(res)
            this.cancelEdit()
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        axios
          .post(`${backendAPI}`, itemData)
          .then((res) => {
            console.log(res)
            this.cancelEdit()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },

    cancelEdit() {
      this.model.item = {
        title: '',
        description: '',
        category: null,
        price: null
      }
      this.$router.push('/store')
    },

    enableSubmitButton() {
      return Object.values(this.model.item).every((v) => !!v)
    }
  }
}
</script>
