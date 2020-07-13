<template>
  <div class="container">
    <div class="app-wrapper">
      <NavigationWrapper>
        <div class="back">
          <NuxtLink to="/?page=1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" />
            </svg>
          </NuxtLink>
        </div>
        <div class="search-box">
          <input ref="searchTextField" class="input" type="text" />
        </div>
      </NavigationWrapper>
      <div v-if="isFormDetails" class="details-wrapper">
        <form class="delivery-form">
          <label for>Delivery Info (optional)</label>
          <div>
            <div>
              <label for="room">Room</label>
              <input id="room" type="text" placeholder />
            </div>
            <div>
              <label for="floor">Floor</label>
              <input id="floor" type="text" placeholder />
            </div>
          </div>
        </form>
      </div>
      <GmapV2 :map-obj="theMap" :search-input="$refs" @place-changed="setFormDetails" />
    </div>
  </div>
</template>

<script>
import GmapV2 from '../components/GmapV2'
export default {
  components: {
    GmapV2,
  },
  data() {
    return {
      map: '',
      markers: [],
      mapBounds: {},
      searchInput: '',
      isFormDetails: false
    }
  },
  mounted () {
    this.$refs.searchTextField.focus();
    
  },
  methods: {
    setFormDetails () {
      this.isFormDetails = true
      console.log({ isFormDetails: this.isFormDetails })
    },
    theMap(val) {
      this.map = val
    },
  },
}
</script>

<style lang="scss">
.search-box {
  width: 100%;
  padding: 1rem;
  input {
    width: 100%;
    padding: 1rem;
    height: 4rem;
    font-size: 1.7rem;
  }
}
.back {
  width: 7rem;
  height: 100%;
  background: #000;
  svg {
    fill: #fff;
  }
}
.details-wrapper {
  position: absolute;
  width: 100%;
  z-index: 6;
  top: 6rem;
  background: rgba(255, 255, 255, 0.8);
  height: 22rem;
  animation: slideDown 500ms;
}
</style>
