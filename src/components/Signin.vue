<template>
<div>
  <div id="signin">
    <form class="form-signin" name="signinForm" id="signinForm" @submit.prevent.stop="signinFormSubmit" novalidate autocomplete="off">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <input type="text" id="inputName" class="form-control" placeholder="Name" required="" autofocus="" v-model="name" :disabled="loading">
      <input type="password" id="inputPassword" class="form-control mt-2" placeholder="Password" required="" v-model="password" :disabled="loading">
      <div v-if="!!error" class="text-danger text-left mt-3">{{ error }}</div>
      <button class="btn btn-primary btn-block mt-3" :disabled="!name.length || !password.length || loading" type="submit">Sign in</button>
    </form>
  </div>
</div>
</template>

<script>
import accountManager from '../managers/accountManager'
import {router} from '../router/index'
export default {
  name: 'Signin',
  data () {
    return {
      error: '',
      name: '',
      password: '',
      loading: false
    }
  },
  methods: {
    getOAthToken () {
      this.loading = true
      accountManager.getOAthToken({
        name: this.name,
        password: this.password
      }).then((user) => {
        if (user && user.role === 'admin') {
          router.push({name: 'feedbacks'})
        } else {
          router.push({name: 'sessions'})
        }
      }).catch(error => {
        this.password = ''
        this.error = error.message
      }).finally(() => {
        this.loading = false
      })
    },
    signinFormSubmit () {
      this.getOAthToken()
    }
  }
}
</script>

<style scoped lang="scss">

  #signin {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 100%;
  }
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;

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
  }
</style>
