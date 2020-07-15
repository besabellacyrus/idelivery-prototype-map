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
        // this.markers.forEach(function (marker) {
        //   marker.setMap(null)
        // })
        // this.markers = []

        // eslint-disable-next-line no-undef
        const bounds = new google.maps.LatLngBounds()

        if (!place.geometry) {
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
        this.$emit('place-changed', { lng: place.geometry.location.lng(), lat: place.geometry.location.lat() })

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }
        this.map.fitBounds(bounds)
      })
      this.$emit('mapObj', this.map)
    }
  },
  methods: {
    setCurrentLocation () {
      // eslint-disable-next-line no-undef
      const geocoder = new google.maps.Geocoder();
      this.geocodeLatLng(geocoder, this.map);
      
    },
    setMarker (data) {
      const latlng = {
        lat: data.coord.lat || 0,
        lng: data.coord.lng || 0,
      }
      // eslint-disable-next-line no-undef, no-unused-vars
      const marker = new google.maps.Marker({
        position: latlng,
        map: this.map,
        icon: this.icons.pin.icon, 
      })
      this.map.setCenter(latlng)
    },
    calculateTravel () {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
     

      if (this.$store.state.pickupLocationDetails && this.$store.state.dropoffLocationDetails) {
        const route = {
          origin: this.$store.state.pickupLocationDetails.coord,
          destination: this.$store.state.dropoffLocationDetails.coord,
          travelMode: 'DRIVING'
        }

        directionsService.route(route, this.getDirection);
      }
    },
    getDirection (response, status) { // anonymous function to capture directions
      // eslint-disable-next-line no-undef
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(this.map);
      if (status !== 'OK') {
        alert('Directions request failed due to ' + status);
      } else {
        directionsRenderer.setDirections(response); // Add route to the map
        const directionsData = response.routes[0].legs[0]; // Get data about the mapped route
        if (!directionsData) {
          console.log('Directions request failed');
        } else { 
          this.$store.commit('SET_DRIVING_DISTANCE', directionsData)
          // alert(" Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").")
        }
      }
    },
    geocodeLatLng(geocoder, map) {
      const latlng = {
        lat: this.userPostition.lat || 0,
        lng: this.userPostition.lng || 0,
      }
      const icon = this.icons.pin.icon
      geocoder.geocode({ location: latlng }, function(results, status) {
        if (status === "OK") {
          if (results[0]) {
            console.log({ results: results[0] })
            map.setZoom(11);
            // eslint-disable-next-line no-undef, no-unused-vars
            const marker = new google.maps.Marker({
              position: latlng,
              icon,
              map,
            });
            // infowindow.setContent(results[0].formatted_address);
            // infowindow.open(map, marker);
          } else {
            console.log("No results found");
          }
        } else {
          console.log("Geocoder failed due to: " + status);
        }
      });
    }
  }
}
</script>

<style lang="scss">
#map {
  height: 100vh;
  width: 100%;
}
</style>
