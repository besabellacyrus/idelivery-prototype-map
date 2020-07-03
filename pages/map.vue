<template>
  <div class="container">
    <!-- <div id="map"></div> -->
  </div> 
</template>

<script>
import mapboxgl from 'mapbox-gl'; 

export default {
  async asyncData ({ $axios }) {
    const response = await $axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/salawag.json?proximity=-122.3995752,37.7881856&access_token=pk.eyJ1Ijoic2FpcGhwIiwiYSI6ImNpdXozbmg3bDA1ZXQydXBzdHUyMTc3aWkifQ.xF9XmJLcfSGzBca12R9qow');
    console.log({ dssss: response })
  },
  data() {
    return {
      coords: null,
      access_token: 'pk.eyJ1Ijoic2FpcGhwIiwiYSI6ImNpdXozbmg3bDA1ZXQydXBzdHUyMTc3aWkifQ.xF9XmJLcfSGzBca12R9qow',
      map: {},
      mapArray: [],
      user: null,
      init: false,
      popUp: true,
      loading: false
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
  mounted () {
    this.getCoords();
  },
  methods: {
    createMap({ longitude, latitude }) {
      mapboxgl.accessToken = this.access_token
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 13,
        center: [longitude, latitude]
      }) 
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
#map{
   width:100%;
   height:100vh;
}
.marker {
  background-image: url('/mapbox-icon.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
.container {
  @apply flex justify-center items-center text-center mx-auto;
  max-width: 425px;
  background-color: #e3e3e3;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.gmap {
  height: 100%;
  width: 100%;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>





