<template>
  <div>
    <MapSearch ref="mapSearch" />
    <div class="btn-wrapper">
      <button @click="setPickupLocation">Set Pick-Up Location</button>
    </div>
  </div>
</template>

<script>
import MapSearch from '../components/MapSearch'
export default {
  components: {
    MapSearch
  },
  methods: {
    setPickupLocation () {
      this.$refs.mapSearch.getPickup()
    }
  }
}
</script>

<style lang="scss">
</style>