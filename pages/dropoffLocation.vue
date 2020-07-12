<template>
  <div class="container">
    <div class="app-wrapper">
      <NavigationWrapper>
        <div class="back">
          <NuxtLink to="/">Back</NuxtLink>
        </div>
        <div class="search-box">
          <input ref="searchTextField" class="input" type="text" />
        </div>
      </NavigationWrapper>
      <GmapV2 :map-obj="theMap" :search-input="$refs" />
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
    }
  },
  mounted() {
    // input = this.$refs.searchTextField
    // eslint-disable-next-line no-unused-vars, no-undef
    // this.searchBox = new google.maps.places.Autocomplete(input)
    // this.searchBox.addListener('place_changed', () => {
    //   const place = this.searchBox.getPlace()
    //   if (!place) {
    //     return
    //   }
    //   // Clear out the old markers.
    //   this.markers.forEach(function (marker) {
    //     marker.setMap(null)
    //   })
    //   this.markers = []
    //   // eslint-disable-next-line no-undef
    //   const bounds = new google.maps.LatLngBounds()
    //   if (!place.geometry) {
    //     console.log('Returned place contains no geometry')
    //     return
    //   }
    //   const icon = {
    //     url: place.icon,
    //     // eslint-disable-next-line no-undef
    //     size: new google.maps.Size(71, 71),
    //     // eslint-disable-next-line no-undef
    //     origin: new google.maps.Point(0, 0),
    //     // eslint-disable-next-line no-undef
    //     anchor: new google.maps.Point(17, 34),
    //     // eslint-disable-next-line no-undef
    //     scaledSize: new google.maps.Size(25, 25),
    //   }
    //   // Create a marker for each place.
    //   this.markers.push(
    //     // eslint-disable-next-line no-undef
    //     new google.maps.Marker({
    //       map: this.map,
    //       icon,
    //       title: place.name,
    //       position: place.geometry.location,
    //     })
    //   )
    //   if (place.geometry.viewport) {
    //     // Only geocodes have viewport.
    //     bounds.union(place.geometry.viewport)
    //   } else {
    //     bounds.extend(place.geometry.location)
    //   }
    //   // if (bounds) {
    //   //   this.map.fitBounds(bounds)
    //   // }
    //   // this.map = bounds
    // })
  },
  methods: {
    theMap(val) {
      this.map = val
    },
  },
}
</script>

<style lang="scss">
.search-box {
  width: 100%;

  input {
    width: 100%;
    height: 3rem;
  }
}
</style>
