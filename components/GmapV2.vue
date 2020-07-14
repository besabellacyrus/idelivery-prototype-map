/* global google */
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
    userPostition: {
      type: Object,
      default: () => ({ lat: 14.3115226, lng: 120.9303834 }),
    }
  },
  data() {
    return {
      map: '',
      searchBox: null,
      markers: [],
      icons: {
        rider: {
          icon: '/rider.png',
          scaledSize: { height: 25, width: 25 },
        },
        pin: {
          icon: {
            url: '/pin.png',
            scaledSize: { height: 25, width: 25 },
          },
        },
        me: {
          icon: {
            url: '/me.png',
            scaledSize: { height: 25, width: 25 },
          },
        },
      },
    }
  },
  mounted() {
    const center = {
      lat: this.userPostition.lat || 14.3115226,
      lng: this.userPostition.lng || 120.9303834,
    }
    
    // eslint-disable-next-line no-undef
    this.map = new google.maps.Map(document.getElementById('map'), {
      center,
      zoom: 15,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      mapTypeId: 'roadmap',
    })


    // eslint-disable-next-line no-undef, no-new
     new google.maps.Marker({
      map: this.map,
      icon: this.icons.me.icon,
      title: 'Me',
      position: center,
    })

    if (this.$props.searchInput) {
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
        // const icon = {
        //   url: place.icon,
        //   // eslint-disable-next-line no-undef
        //   size: new google.maps.Size(71, 71),
        //   // eslint-disable-next-line no-undef
        //   origin: new google.maps.Point(0, 0),
        //   // eslint-disable-next-line no-undef
        //   anchor: new google.maps.Point(17, 34),
        //   // eslint-disable-next-line no-undef
        //   scaledSize: new google.maps.Size(25, 25),
        // }

        // eslint-disable-next-line no-undef, no-unused-vars
        const markers = new google.maps.Marker({
          map: this.map,
          icon: this.icons.pin.icon,
          title: place.name,
          position: place.geometry.location,
        })

        // display form details
        this.$emit('place-changed', place.geometry.location)

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }
        this.map.fitBounds(bounds)
      })

      // this.map.panBy(0,-130)
      this.$emit('mapObj', this.map)
    }
  },
}
</script>

<style lang="scss">
#map {
  height: 100vh;
  width: 100%;
}
</style>
