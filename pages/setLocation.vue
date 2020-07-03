<template>
  <div>
    <div class="search-bar">
      <div class="back" @click="back">
        <svg class="h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><polygon points="3.828 9 9.899 2.929 8.485 1.515 0 10 .707 10.707 8.485 18.485 9.899 17.071 3.828 11 20 11 20 9 3.828 9"/></svg>
      </div>
      <div id="geocoder" class="geocoder"></div>
    </div>
    <div id="map"></div>
    <div class="set-location-wrapper">
      <button @click="setLocation">{{ setLocMsg }}</button>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'; 

export default {
  data() {
    return {
      coords: null,
      access_token: 'pk.eyJ1Ijoic2FpcGhwIiwiYSI6ImNpdXozbmg3bDA1ZXQydXBzdHUyMTc3aWkifQ.xF9XmJLcfSGzBca12R9qow',
      map: {},
      mapArray: [],
      user: null,
      init: false,
      popUp: true,
      loading: false,
      setLocMsg: ""
    }
  },
  watch: { 
    mapArray (newArr, oldArr) {
      console.log({ newArr, oldArr })
      const el = document.createElement('div');
      el.className = 'marker';
      newArr.map((marker) => {
        const LngLat = [marker.location.lng, marker.location.lat]
        const popup = marker.description
        new mapboxgl.Marker(el)
            .setLngLat(LngLat)
            .setPopup(popup)
            .addTo(this.map)
      })
    }
  },
  async mounted () {
    this.getCoords();
    const response = await this.$axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/salawag.json?proximity=-122.3995752,37.7881856&access_token=pk.eyJ1Ijoic2FpcGhwIiwiYSI6ImNpdXozbmg3bDA1ZXQydXBzdHUyMTc3aWkifQ.xF9XmJLcfSGzBca12R9qow');
    console.log({ dssss: response })
    if (this.$route.params.type === 'pickup') {
      this.setLocMsg = 'Set Pickup Location';
    } else {
      this.setLocMsg = 'Set Drop Off Location';
    }
  },
  methods: {
    back () {
      this.$router.replace("/")
    },
    setLocation () {
      const location = document.querySelector('.mapboxgl-ctrl-geocoder--input')
      console.log({ location: location.value })
      if (this.$route.params.type === 'pickup') {
        this.$store.commit('SET_PICKUP', location.value);
      } else {
        this.$store.commit('SET_DROPOFF', location.value);
      }
      this.$router.replace("/")
    },
    createMap({ longitude, latitude }) {
      const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

      mapboxgl.accessToken = this.access_token
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 17,
        center: [longitude, latitude]
      }) 
      // this.map.addControl(new MapboxGeocoder({
      //   accessToken: this.access_token,
      //   countries: 'ph',
      //   mapboxgl
      // }))
      const geocoder = new MapboxGeocoder({
        accessToken: this.access_token,
        countries: 'ph',
        mapboxgl
      })

      document.getElementById('geocoder').appendChild(geocoder.onAdd(this.map));
    },
    getCoords() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition)
      } else {
        // eslint-disable-next-line no-console
        console.log('Geolocation is not supported by this browser.')
      }
    },
    showPosition(position) { 
      if (position) {
        this.createMap(position.coords);
        this.mapArray.push({ location: { lng: position.coords.longitude, lat: position.coords.latitude }})
      }
      this.coords = position.coords
    },
  }

}
</script>

<style lang="scss">
.idelivery-wrapper {
  position: absolute;
}
.set-location-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  button {
    background: #fff;
    padding: 1rem;
    width: 100%;
  }
}
.search-bar {
  display: flex;
  align-items: center;
  .back {
    padding: 0 1rem;
    svg {
      height: 1rem;
    }
  }
}
#map{
  width:100%;
  height:100vh;
  position: absolute;
}
.marker {
  background-image: url('/mapbox-icon.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>