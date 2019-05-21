<template>
<div>
  <div id="feedback">
    <div class="row">
      <form class="form-feedbacks w-100" name="feedbacksForm" id="feedbacksForm" @submit.prevent.stop="feedbacksFormSubmit" novalidate autocomplete="off">
        <div class="col-12">
          <h1 class="h3 my-5 font-weight-normal">Feedbacks</h1>
        </div>
        <div class="col-12">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Rating</th>
                <th scope="col">User id</th>
                <th scope="col">Comment</th>
                <th scope="col">Created at</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(feedback, key) in feedbacks" :key="key">
                <th scope="row">{{feedback.id}}</th>
                <td>{{feedback.rating}}</td>
                <td>{{feedback.userId}}</td>
                <td class="w-50">{{feedback.comment}}</td>
                <td>{{moment(feedback.createdAt).format('LLL')}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-12">
           <div class="row">
            <div class="col-12 col-sm-4 col-lg-2">
              <button class="btn btn-primary btn-block mb-4" :disabled="loading || Math.ceil(this.offset / this.limit) === 1" @click="prevPage">Previous</button>
            </div>
            <div class="col-12 col-sm-4 col-lg-2 ml-auto">
              <button class="btn btn-primary btn-block mb-4" :disabled="loading || Math.ceil(this.offset / this.limit) >= Math.ceil(this.total / this.limit)" @click="nextPage">Next</button>
            </div>
           </div>
        </div>
        <div class="col-12">
          <div class="row">
            <div class="col-12 col-md-2">
              <label for="minRating">Min rating</label>
              <div class="input-group">
                <input class="form-control" type="number" min="1" max="5" step="1" id="maxRating" v-model="minRating" :disabled="loading" placeholder="1..5">
              </div>
          </div>
          <div class="col-12 col-md-2">
            <label for="maxRating">Max rating</label>
             <div class="input-group">
              <input class="form-control" type="number" min="1" max="5" step="1" id="maxRating" v-model="maxRating" :disabled="loading" placeholder="1..5">
            </div>
          </div>
          <div class="col-12 col-md-3">
            <label for="startDate">Start date (Starting from)</label>
             <div class="input-group">
              <input class="form-control" type="text" id="startDate" v-model="startDate" :disabled="loading" placeholder="YYYY-MM-DD HH:mm:ss">
            </div>
          </div>
          <div class="col-12 col-md-3">
            <label for="endDate">End date (to)</label>
             <div class="input-group">
              <input class="form-control" type="text" id="endDate" v-model="endDate" :disabled="loading" placeholder="YYYY-MM-DD HH:mm:ss">
            </div>
          </div>
          <div class="col-12 col-md-2">
            <label for="endDate">Order (by date)</label>
             <div class="input-group">
              <select class="custom-select" v-model="order" :disabled="loading">
                <option value="asc" selected>Asc</option>
                <option value="des">Des</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4 mx-auto my-5">
          <div v-if="!!error" class="text-danger text-left mt-3">{{ error }}</div>
          <button class="btn btn-primary btn-block mt-3" :disabled="loading" type="submit">Get feedbacks</button>
          <button class="btn btn-secondary btn-block mt-3" type="button" @click="signout">Sign out</button>
        </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import feedbackManager from '../managers/feedbackManager'
import {router} from '../router/index'
export default {
  name: 'Feedback',
  data () {
    return {
      loading: false,
      feedbacks: [],
      error: '',
      minRating: '',
      maxRating: '',
      order: 'asc',
      offset: 1,
      startDate: '',
      endDate: '',
      total: 0,
      limit: 0
    }
  },
  mounted () {
    this.getFeedbacks()
  },
  methods: {
    signout () {
      router.push({name: 'signin'})
    },
    nextPage () {
      this.offset += this.limit
      this.getFeedbacks()
    },
    prevPage () {
      this.offset -= this.limit
      this.getFeedbacks()
    },
    getFeedbacks () {
      this.loading = true
      this.error = ''
      feedbackManager.getFeedbacks({
        minRating: parseInt(this.minRating),
        maxRating: parseInt(this.maxRating),
        order: this.order,
        offset: this.offset,
        startDate: this.moment(this.startDate).isValid() ? this.moment(this.startDate).format() : '',
        endDate: this.moment(this.endDate).isValid() ? this.moment(this.endDate).format() : ''
      }).then((response) => {
        this.total = parseInt(response.headers['x-total'])
        this.limit = parseInt(response.headers['x-limit'])
        this.feedbacks = response.data
      }).catch(error => {
        this.error = error.message
      }).finally(() => {
        this.loading = false
      })
    },

    feedbacksFormSubmit () {
      this.getFeedbacks()
    }
  }
}
</script>

<style scoped lang="scss">
.w-50 {
  width: 50%;
}
</style>
