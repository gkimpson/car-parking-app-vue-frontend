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
    <button class="btn" @click="getVehicles()">Vehicles</button>
    <button class="btn" @click="logout()">Logout</button>
  </div>

  <!-- <div v-for="post in posts" v-bind:key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
  </div> -->

  <div v-if="visibleDiv === 'vehicles'">
    <div v-for="vehicle in vehicles" v-bind:key="vehicle.id">
        <p>{{ vehicle.reg_number }}</p>
    </div>
  </div>

  <div v-if="visibleDiv === 'zones'">
    <div v-for="zone in zones" v-bind:key="zone.id">
        <h2>{{ zone.name }}</h2>
        <p>£{{ zone.price_per_hour }} p/hr</p>
    </div>
  </div>


  </template>
  
  <script>
  import axios from 'axios';
  import setAuthHeader from '../utils/setAuthHeader';
  
  export default {
    data() {
      return {
        isLoggedIn: localStorage.getItem('access_token'),
        posts: [],
        vehicles: [],
        zones: [],
        visibleDiv: null,
      }
    },
    mounted() {
      this.isLoggedIn = localStorage.getItem('access_token')
    },    
    methods: {
      async getData() {
          try {
            axios.get('http://jsonplaceholder.typicode.com/posts', {})
          .then(response => {
            this.posts = response.data
          })
          .catch(error => {
          console.log('error: ' + error.response);
        })            

          } catch (error) {
            console.log(error);
          }
      }, 
      reloadPage() {
        window.location.reload();
      },  
      async login() {
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

      async getZones() {
          axios.get('https://car-parking-api.test/api/v1/zones', {})
          .then(response => {
            this.zones = response.data.data;
            this.visibleDiv = 'zones';
          })
          .catch(error => {

        })
      },

      async getProfile() {
          axios.get('https://car-parking-api.test/api/v1/profile', {})
          .then(response => {
            this.profile = response.data.data;
            this.visibleDiv = 'profile';
          })
          .catch(error => {
          // handle login error
          console.log('error: ' + error.response);
        })
      },      

      async getParkings() {

      },

      async getVehicles() {
        axios.get('https://car-parking-api.test/api/v1/vehicles', {
        })
        .then(response => {
          this.vehicles = response.data.data;
          this.visibleDiv = 'vehicles';
        })
        .catch(error => {
          console.log('error: ' + error.response);
        })
      },      

      async logout() {
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
    },
    created() {
      // this.getData();
    },    
  }
  </script>
  