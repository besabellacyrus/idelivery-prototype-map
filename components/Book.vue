<template>
  <div class="container">
    <div class="bottom-navigation">
      <div class="pickup" @click="handleClick('pickup')">
        <span v-if="!$store.state.pickup">Pick Up Location</span>
        <div v-else>
          <p>Pick Up Location</p>
          <p>{{ $store.state.pickup }}</p>
        </div>
      </div>
      <div class="dropoff" @click="handleClick('dropoff')">
        <span v-if="!$store.state.dropoff">Drop Off Location</span>
        <div v-else>
          <p>Drop Off Location</p>
          <p>{{ $store.state.dropoff }}</p>
        </div>
      </div>
      <div v-if="$store.state.dropoff && $store.state.pickup">
        <a :href="`https://www.google.com/maps/dir/${encodeURIComponent($store.state.pickup)}/${encodeURIComponent($store.state.dropoff)}`" target="_blank">
        <button>Deliver Now</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(type) {
      console.log('clicked')
      this.$router.push({ name: 'setLocation', params: { type } })
    }
  }
}
</script>

<style lang="scss">
.pickup,.dropoff {
  height: 3rem;
    width: 100%;
}
.bottom-navigation {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  height: 20rem;
  background-color: #fff;
  width: 98%;
  z-index: 999;
  display: flex;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12);
  button {
    padding: 1rem;
    background-color: dimgrey;
    color: #fff;
    margin-top: 2rem;
  }
}
</style>