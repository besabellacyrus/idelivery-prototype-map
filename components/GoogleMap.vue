<template>
  <div class="gmap-wrapper">
    <GMap
      ref="gMap"
      language="en"
      :options="{ fullscreenControl: false, disableDefaultUI: true }"
      :zoom="6"
    ></GMap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clusterStyle: [
        {
          url:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
          width: 56,
          height: 56,
          textColor: '#fff',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.gmap-wrapper {
  height: 100vh;
}
.search {
  position: absolute;
  top: 0;
  z-index: 999999;
}
</style>
