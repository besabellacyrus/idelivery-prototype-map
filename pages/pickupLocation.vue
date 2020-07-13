<template>
  <div>
    <MapSearch />
    <div class="btn-wrapper">
      <button>Set Pickup Location</button>
    </div>
  </div>
</template>

<script>
import MapSearch from '../components/MapSearch'
export default {
  components: {
    MapSearch
  }
}
</script>

<style lang="scss">
.btn-wrapper {
  position: absolute;
  bottom: 2rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  button {
    height: 5rem;
    width: 28rem;
    font-size: 1.75rem;
    background: #ece71f;
    border: 1px solid #dcd81d;
    border-radius: 6px;
  }
}
</style>