<template>
  <div class="container">
    <!-- <div class="app-wrapper">
      <NavigationWrapper>
        <div class="back">
          <NuxtLink to="/">Back</NuxtLink>
        </div>
        <div class="search-box">
          <input ref="searchTextField" class="input" type="text" />
        </div>
      </NavigationWrapper>
      <div id="map"></div>
    </div> -->
  </div>
</template>

<script>
// import NavigationWrapper from '../components/NavigationWrapper'
// // import GoogleMap from '../components/GoogleMap'

// export default {
//   transition: 'fade',
//   components: {
//     // GoogleMap,
//     NavigationWrapper,
//   },
//   data() {
//     return {
//       map: {},
//       searchBox: {},
//       markers: [],
//     }
//   },
//   mounted() {
//     // eslint-disable-next-line no-unused-vars, no-undef
//     this.map = new google.maps.Map(document.getElementById('map'), {
//       center: { lat: 14.3115226, lng: 120.9303834 },
//       zoom: 15,
//       mapTypeId: 'roadmap',
//     })

//     const input = this.$refs.searchTextField
//     // eslint-disable-next-line no-unused-vars, no-undef
//     this.searchBox = new google.maps.places.Autocomplete(input)

//     // Bias the SearchBox results towards current map's viewport.
//     this.map.addListener('bounds_changed', function () {
//       this.searchBox.setBounds(this.map.getBounds())
//     })

//     this.searchBox.addListener('place_changed', () => {
//       const place = this.searchBox.getPlace()
//       if (!place) {
//         return
//       }
//       // Clear out the old markers.
//       this.markers.forEach(function (marker) {
//         marker.setMap(null)
//       })
//       this.markers = []

//       // eslint-disable-next-line no-undef
//       const bounds = new google.maps.LatLngBounds()

//       if (!place.geometry) {
//         console.log('Returned place contains no geometry')
//         return
//       }
//       const icon = {
//         url: place.icon,
//         // eslint-disable-next-line no-undef
//         size: new google.maps.Size(71, 71),
//         // eslint-disable-next-line no-undef
//         origin: new google.maps.Point(0, 0),
//         // eslint-disable-next-line no-undef
//         anchor: new google.maps.Point(17, 34),
//         // eslint-disable-next-line no-undef
//         scaledSize: new google.maps.Size(25, 25),
//       }
//       // Create a marker for each place.
//       this.markers.push(
//         // eslint-disable-next-line no-undef
//         new google.maps.Marker({
//           map: this.map,
//           icon,
//           title: place.name,
//           position: place.geometry.location,
//         })
//       )
//       if (place.geometry.viewport) {
//         // Only geocodes have viewport.
//         bounds.union(place.geometry.viewport)
//       } else {
//         bounds.extend(place.geometry.location)
//       }
//       this.map.fitBounds(bounds)
//     })

//     this.searchBox.addListener('places_changed', () => {
//       const places = this.searchBox.getPlaces()
//       console.log('places changed', places)

//       if (places.length === 0) {
//         return
//       }
//       // Clear out the old markers.
//       this.markers.forEach(function (marker) {
//         marker.setMap(null)
//       })
//       this.markers = []
//     })
//   },

//   methods: {},
// }
</script>

<style lang="scss">
.pickup-location-nav {
  /* height: 1rem; */
}
#map {
  height: 100vh;
  width: 100%;
}

.search {
  flex-grow: 1;
  input {
    width: 89%;
    height: 4rem;
  }
}
</style>
