<template>
  <div v-if="!isLoggedIn">
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  </div>

  <div v-if="isLoggedIn">
    <button class="btn" @click="getZones()">Zones</button>
    <button class="btn" @click="getProfile()">Profile</button>
    <button class="btn" @click="logout()">Logout</button>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  import setAuthHeader from '../utils/setAuthHeader';
  
  export default {
    data() {
      return {
        isLoggedIn: localStorage.getItem('access_token')
      }
    },    
    mounted() {
      this.isLoggedIn = localStorage.getItem('access_token');
      console.log('mounted login' + this.isLoggedIn);

    },    
    methods: {
      reloadPage() {
        window.location.reload();
      },  
      login() {
        axios.post('https://car-parking-api.test/api/v1/auth/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log('response: ' + response);
          const access_token = response.data.access_token;
          localStorage.setItem('access_token', access_token);
          setAuthHeader(access_token); // set token to all subsequent requests
          this.reloadPage();
          // this.$router.push({ path: '/dashboard' })
        })
        .catch(error => {
          // handle login error
          console.log('error: ' + error.response);
        })
      },

      getZones() {
          axios.get('https://car-parking-api.test/api/v1/zones', {})
          .then(response => {
            localStorage.getItem('access_token', access_token);
            console.log(response);
          })
          .catch(error => {
          console.log('error: ' + error.response);
        })
      },

      getProfile() {
          axios.get('https://car-parking-api.test/api/v1/profile', {})
          .then(response => {
            console.log(response);
          })
          .catch(error => {
          // handle login error
          console.log('error: ' + error.response);
        })
      },      

      getParkings() {

      },
      getVehicles() {
        
      },

      logout() {
        axios.post('https://car-parking-api.test/api/v1/auth/logout', {
        })
        .then(response => {
          localStorage.removeItem('access_token');
          this.reloadPage();
        })
        .catch(error => {
          // handle login error
          console.log('error: ' + error.response);
        })
      },
    }
  }
  </script>
  