<template>
  <div>
    <MapSearch ref="mapSearch" />
    <div class="btn-wrapper">
      <button @click="setDropoffLocation">Set Drop-Off Location</button>
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
    setDropoffLocation () {
      this.$refs.mapSearch.getDropoff()
    }
  }
}
</script>

<style>
</style>