<template>
  <div class="container">
    <div class="app-wrapper">
      <NavigationWrapper>
        <div class="menu default-burger" @click="openMenu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </div>
        <div class="logo">
          <img src="logo.png" alt />
        </div>
        <div class="info">
          <img src="info-icon.png" />
        </div>
      </NavigationWrapper>
      <!-- <div class="top-navigation"></div> -->
      <div class="menu-wrapper" :class="{ 'menu-open': isMenuOpen }">
        <div
          ref="menuContent"
          class="content"
          tabindex="-1"
          @focusout="handleFocusOut"
        >
          <div class="menu open-menu-burger" @click="openMenu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </div>
          <div class="big-logo">
            <img src="main-logo.png" alt />
          </div>
        </div>
      </div>
      <GmapV2 ref="gmapref" />
      <div class="book-form-wrapper">
        <div class="target-wrapper" @click="geMyLocation">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M17.94 11H13V9h4.94A8 8 0 0 0 11 2.06V7H9V2.06A8 8 0 0 0 2.06 9H7v2H2.06A8 8 0 0 0 9 17.94V13h2v4.94A8 8 0 0 0 17.94 11zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"
            />
          </svg>
        </div>
        <div class="form-content">
          <div @click="pickupLocation">
            <div class="form-icon">
              <img src="/me.png" alt />
            </div>
            <span>{{
              $store.state.pickupLocationDetails
                ? $store.state.pickupLocationDetails.location_name
                : 'Pick-Up Location'
            }}</span>
          </div>
          <div @click="dropoffLocation">
            <div class="form-icon">
              <img src="/pin.png" alt />
            </div>
            <span>{{
              $store.state.dropoffLocationDetails
                ? $store.state.dropoffLocationDetails.location_name
                : 'Drop-Off Location'
            }}</span>
          </div>
          <div
            v-if="$store.state.drivingDistance.distance"
            class="book-info text-left"
          >
            <div>
              Distance: {{ $store.state.drivingDistance.distance.text }} &nbsp;
            </div>
            <div>
              Duration: {{ $store.state.drivingDistance.duration.text }}
            </div>
          </div>
        </div>
        <button>BOOK</button>
      </div>
    </div>
  </div>
</template>

<script>
import GmapV2 from '../components/GmapV2'
import NavigationWrapper from '../components/NavigationWrapper'

export default {
  transition(to, from) {
    if (!from) {
      return 'page-right'
    }
    return +to.query.page < +from.query.page ? 'page-left' : 'page-right'
  },
  components: {
    GmapV2,
    NavigationWrapper,
  },
  data() {
    return {
      user: null,
      popUp: true,
      loading: false,
      isMenuOpen: false,
    }
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition)
    } else {
      //
    }
    // Calculate Travel
    if (
      this.$store.state.pickupLocationDetails &&
      this.$store.state.dropoffLocationDetails
    ) {
      this.$refs.gmapref.calculateTravel()
    }
  },
  methods: {
    geMyLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition)
      }
    },
    showPosition(position) {
      console.log({ position })

      const myPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.$store.commit('SET_USER_COORD', myPos)
      this.$refs.gmapref.setMyMarker(myPos)
    },
    pickupLocation() {
      this.$router.push('pickupLocation?page=2')
    },
    dropoffLocation() {
      this.$router.push('dropoffLocation?page=2')
    },
    handleFocusOut() {
      this.isMenuOpen = false
    },
    openMenu() {
      this.isMenuOpen = !this.isMenuOpen
      this.$refs.menuContent.focus()
    },
    searchPickup() {
      this.$router.push('/map')
    },
    selectUser(user) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        // this.popUp = false;
        this.$store.commit('SET_POPUP', false)
        this.$store.commit('SET_USER', user)
      }, 1000)
    },
    haversine_distance(mk1, mk2) {
      // this is for straight line, are you a pigeon?
      const R = 3958.8 // Radius of the Earth in miles
      const rlat1 = mk1.lat * (Math.PI / 180) // Convert degrees to radians
      const rlat2 = mk2.lat * (Math.PI / 180) // Convert degrees to radians
      const difflat = rlat2 - rlat1 // Radian difference (latitudes)
      const difflon = (mk2.lng - mk1.lng) * (Math.PI / 180) // Radian difference (longitudes)

      const d =
        2 *
        R *
        Math.asin(
          Math.sqrt(
            Math.sin(difflat / 2) * Math.sin(difflat / 2) +
              Math.cos(rlat1) *
                Math.cos(rlat2) *
                Math.sin(difflon / 2) *
                Math.sin(difflon / 2)
          )
        )
      return d
    },
  },
}
</script>

<style lang="scss">
$yellow: #ece71f;
$gray: #d1d2d4;
$black: #000;
$red: #ec2228;

.target-wrapper {
  position: absolute;
  z-index: 9;
  top: -51px;
  right: 11px;
  width: 4rem;
  background: #fff;
  padding: 0.6rem;
  border-radius: 4px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  &:active {
    transform: scale(0.9);
  }
  svg {
    fill: #5d5d5d;
  }
}

.book-form-wrapper {
  position: absolute;
  bottom: 0;
  height: 22rem;
  background-color: #fff;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 0.3fr;
  .form-content {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    padding: 1rem;
    grid-gap: 1rem;
    span {
      width: 100%;
    }
    .form-icon {
      width: 3rem;
      margin-left: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
      }
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #e3e3e3;
      border-radius: 6px;
      &:active {
        transform: scale(0.96);
      }
    }
  }
  button {
    width: 100%;
    background-color: $yellow;
    height: 5rem;
    font-weight: 600;
    font-size: 2rem;
  }
}

.menu-open {
  left: 0 !important;
}
.menu-open .menu-wrapper {
  left: 0;
}

.menu-wrapper {
  position: absolute;
  z-index: 9999;
  transition: left 500ms ease;
  top: 0;
  left: -500px;
  width: 100%;
  height: 100%;

  .content {
    width: 86%;
    height: 100%;
    outline: none;
    background-color: $yellow;
  }
  .big-logo {
    padding: 5rem;
    height: 21rem;
    img {
      height: 100%;
      margin: 0 auto;
    }
  }
}
.default-burger {
  background-color: $black;
  svg {
    fill: #fff;
  }
}
.menu {
  width: 6rem;
  padding: 1rem;
}
.open-menu-burger {
  svg {
    fill: #000;
  }
}

.logo {
  flex-grow: 1;
  height: 3rem;
  display: flex;
  justify-content: center;
  img {
    height: 100%;
  }
}
.info {
  padding: 1rem;
  height: 6rem;
  img {
    height: 100%;
  }
}
.GMap__Wrapper {
  height: 100vh !important;
}

.user-pick {
  transition: all 300ms;
  position: absolute;
  background-color: #fff;
  height: 9rem;
  width: 14rem;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);

  .user-pick-actions {
    margin-top: 2rem;
    button {
      padding: 0.4rem 1rem;
      min-width: 6rem;
      border: 1px solid #e3e3e3;
    }
  }
}

@-webkit-keyframes slide {
  100% {
    left: 0;
  }
}

@keyframes slide {
  100% {
    left: 0;
  }
}
</style>
