<template>
<div>
  <div id="session">
    <form v-if="!userSessionId" class="form-session" name="sessionForm" id="sessionForm" @submit.prevent.stop="sessionFormSubmit" novalidate autocomplete="off">
      <h1 v-if="feedbackReceived" class="h3 mb-3 font-weight-normal">Thank you, your feedback has been received!</h1>
      <h1 class="h3 mb-3 font-weight-normal">{{feedbackReceived ? 'Start another session' : 'Please create a session'}}</h1>
      <div v-if="!!error" class="text-danger text-left mt-3">{{ error }}</div>
      <button class="btn btn-primary btn-block mt-3 mx-auto" :disabled="loading" type="submit">Start</button>
      <button class="btn btn-secondary btn-block mt-3 mx-auto" type="submit" @click="signout">Sign out</button>
    </form>
    <form v-if="userSessionId" class="form-feedback" name="feedbackForm" id="feedbackForm" @submit.prevent.stop="feedbackFormSubmit" novalidate autocomplete="off">
      <h1 class="h3 mb-3 font-weight-normal">Please rate a session</h1>
      <div class="form-group">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-info" :class="{ active: rating === '1' }">
            <input type="radio" name="options" id="option1" value="1" v-model="rating" autocomplete="off" :disabled="loading"> 1
          </label>
          <label class="btn btn-info" :class="{ active: rating === '2' }">
            <input type="radio" name="options" id="option2" value="2" v-model="rating" autocomplete="off" :disabled="loading"> 2
          </label>
          <label class="btn btn-info" :class="{ active: rating === '3' }">
            <input type="radio" name="options" id="option3" value="3" v-model="rating" autocomplete="off" :disabled="loading"> 3
          </label>
          <label class="btn btn-info" :class="{ active: rating === '4' }">
            <input type="radio" name="options" id="option3" value="4" v-model="rating" autocomplete="off" :disabled="loading"> 4
          </label>
          <label class="btn btn-info" :class="{ active: rating === '5' }">
            <input type="radio" name="options" id="option3" value="5" v-model="rating" autocomplete="off" :disabled="loading"> 5
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Comment ({{maxLength - comment.length}} Left)</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" :maxlength="maxLength" v-model="comment" :disabled="loading"></textarea>
      </div>
      <div v-if="!!error" class="text-danger text-left mt-3">{{ error }}</div>
      <button class="btn btn-primary btn-block mt-3 mx-auto" :disabled="loading" type="submit">Leave feedback</button>
      <button class="btn btn-secondary btn-block mt-3 mx-auto" type="button" @click="signout">Sign out</button>
    </form>
  </div>
</div>
</template>

<script>
import sessionManager from '../managers/sessionManager'
import feedbackManager from '../managers/feedbackManager'
import {router} from '../router/index'
export default {
  name: 'Session',
  data () {
    return {
      loading: false,
      userSessionId: null,
      error: '',
      comment: '',
      commentLeft: '',
      maxLength: 2000,
      rating: '5',
      feedbackReceived: false
    }
  },
  methods: {
    signout () {
      router.push({name: 'signin'})
    },
    createSession () {
      this.loading = true
      sessionManager.createSession().then((response) => {
        this.feedbackReceived = false
        this.userSessionId = response.data.id
        this.error = ''
      }).catch(error => {
        this.error = error.message
      }).finally(() => {
        this.loading = false
      })
    },
    createFeedback () {
      this.loading = true
      this.error = ''
      feedbackManager.createFeedback({
        userSessionId: this.userSessionId,
        comment: this.comment,
        rating: parseInt(this.rating)
      }).then((response) => {
        this.userSessionId = null
        this.comment = ''
        this.commentLeft = ''
        this.rating = '5'
        this.error = ''
        this.feedbackReceived = true
      }).catch(error => {
        this.error = error.message
      }).finally(() => {
        this.loading = false
      })
    },
    sessionFormSubmit () {
      this.createSession()
    },
    feedbackFormSubmit () {
      this.createFeedback()
    }
  }
}
</script>

<style scoped lang="scss">

  #session {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 100%;
    .btn {
      max-width: 300px;
    }
  }
  .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
    &:focus {
      z-index: 2;
    }
  }
  .form-session,
  .form-feedback {
    width: 100%;
    max-width: 660px;
    padding: 15px;
    margin: auto;
  }
</style>
