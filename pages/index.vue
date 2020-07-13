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
        <div ref="menuContent" class="content" tabindex="-1" @focusout="handleFocusOut">
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
      <GmapV2 :user-postition="userPosition" />
      <div class="book-form-wrapper">
        <div class="form-content">
          <div @click="pickupLocation">
            <span>Pick-Up</span>
          </div>
          <div @click="dropoffLocation">
            <span>Drop-Off</span>
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
  transition (to, from) {
    if (!from) { return 'page-right' }
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
      userPosition: { lat: 0, lng: 0 },
    }
  },
  mounted () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
  },
  methods: { 
    showPosition (position) {
      this.userPosition.lat = position.coords.latitude
      this.userPosition.lng = position.coords.longitude 
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
  },
}
</script>

<style lang="scss">
$yellow: #ece71f;
$gray: #d1d2d4;
$black: #000;
$red: #ec2228;

.book-form-wrapper {
  position: absolute;
  bottom: 0;
  height: 17rem;
  background-color: #fff;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 0.3fr;
  .form-content {
    display: grid;
    grid-template-rows: 1fr 1fr;
    padding: 1rem;
    grid-gap: 1rem;
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #e3e3e3;
      border-radius: 6px;
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
