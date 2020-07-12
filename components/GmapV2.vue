<template>
  <div id="map"></div>
</template>

<script>
export default {
  props: {
    searchInput: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      map: '',
      searchBox: null,
      markers: [],
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 14.3115226, lng: 120.9303834 },
      zoom: 15,
      mapTypeId: 'roadmap',
    })

    // eslint-disable-next-line no-undef
    this.searchBox = new google.maps.places.Autocomplete(
      this.$props.searchInput.searchTextField
    )

    this.searchBox.addListener('place_changed', () => {
      const place = this.searchBox.getPlace()
      if (!place) {
        return
      }
      // Clear out the old markers.
      this.markers.forEach(function (marker) {
        marker.setMap(null)
      })
      this.markers = []
      // eslint-disable-next-line no-undef
      const bounds = new google.maps.LatLngBounds()
      if (!place.geometry) {
        console.log('Returned place contains no geometry')
        return
      }
      const icon = {
        url: place.icon,
        // eslint-disable-next-line no-undef
        size: new google.maps.Size(71, 71),
        // eslint-disable-next-line no-undef
        origin: new google.maps.Point(0, 0),
        // eslint-disable-next-line no-undef
        anchor: new google.maps.Point(17, 34),
        // eslint-disable-next-line no-undef
        scaledSize: new google.maps.Size(25, 25),
      }
      // Create a marker for each place.
      this.markers.push(
        // eslint-disable-next-line no-undef
        new google.maps.Marker({
          map: this.map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      )
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
      this.map.fitBounds(bounds)
    })

    this.$emit('mapObj', this.map)

    console.log({ searchBox: this.$props.searchInput.searchTextField })
  },
}
</script>

<style lang="scss">
#map {
  height: 100vh;
  width: 100%;
}
</style>
