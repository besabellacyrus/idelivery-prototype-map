<template>
  <div class="container modal-wrapper">
    <div v-if="$store.state.isPopup" class="user-pick">
      <div>
        <p>Please Choose</p>
      </div>
      <div><p v-if="loading">Loading...</p></div>
      <div class="user-pick-actions"> 
        <button @click="selectUser('rider')">Rider</button>
        <button @click="selectUser('customer')">Customer</button>
      </div>
    </div>
    <!-- <div class="search-wrapper">
      <button @click="searchPickup">Search</button>
    </div> -->
    <Book v-if="!$store.state.isPopup" />
  </div>
</template>

<script>
  import Book from '../components/Book';

export default {
  components: {
    Book
  },
  data () {
    return {
      user: null,
      popUp: true,
      loading: false
    }
  },
  methods: {
    searchPickup () {
      this.$router.push('/map')
    },
    selectUser(user) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        // this.popUp = false;
        this.$store.commit('SET_POPUP', false)
        this.$store.commit('SET_USER', user)
        console.log({ user })
      }, 1000)
    },
  }
}
</script>

<style lang="scss">
 .modal-wrapper {
   display: flex;
   justify-content: center;
   align-items: center;
 }
.user-pick {
  transition: all 300ms;
  position: absolute;
  background-color: #fff;
  height: 9rem;
  width: 14rem;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12);
  
  .user-pick-actions {
    margin-top: 2rem;
    button {
      padding: 0.4rem 1rem;
      min-width: 6rem;
      border: 1px solid #e3e3e3;
    }
  }
}
</style>