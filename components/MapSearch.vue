<template>
  <div class="container">
    <div class="app-wrapper">
      <NavigationWrapper>
        <div class="back">
          <NuxtLink to="/?page=1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" />
            </svg>
          </NuxtLink>
        </div>
        <div class="search-box">
          <input ref="searchTextField" class="input" type="text" />
          <div v-if="showErrase" class="close-btn" @click="erraseSearch">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z"
              />
            </svg>
          </div>
        </div>
      </NavigationWrapper>
      <div v-if="hasHistory" class="history-wrapper">
        <div class="history-item" @click="setLocationFromHistory('current')">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
              />
            </svg>
          </span> Current Location
        </div>
        <div
          v-for="item in $store.state.searchHistory"
          :key="item.location_name"
          class="history-item"
          @click="setLocationFromHistory(item)"
        >
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z"
              />
            </svg>
          </span>
          {{ item.location_name }}
        </div>
      </div>
      <div v-if="isFormDetails" class="details-wrapper">
        <form class="delivery-form">
          <div class="text-left font-bold py-4">
            <span>Delivery Info (optional)</span>
          </div>
          <div class="input">
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-layout two-fields md-size-100">
                <div class="md-layout-item md-size-50">
                  <md-field>
                    <label>Room</label>
                    <md-input v-model="room"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-50">
                  <md-field>
                    <label>Floor</label>
                    <md-input v-model="floor"></md-input>
                  </md-field>
                </div>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <label>Building/Block</label>
                  <md-input v-model="block_bldg"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-80">
                <md-field ref="contactName">
                  <label>Contact Name</label>
                  <md-input v-model="contact_name"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-20 mt-6">
                <span @click="openContacts">Contacts</span>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <label>Contact Phone #</label>
                  <md-input v-model="contact_phone"></md-input>
                </md-field>
              </div>
            </div>
          </div>
        </form>
      </div>
      <GmapV2
        ref="gmapref"
        :map-obj="theMap"
        :search-input="$refs"
        @place-changed="setFormDetails"
      />
    </div>
  </div>
</template>

<script>
import GmapV2 from '../components/GmapV2'

export default {
  components: {
    GmapV2,
  },
  data() {
    return {
      map: '',
      markers: [],
      mapBounds: {}, 
      searchInputBox: '',
      isFormDetails: false,
      room: '',
      floor: '',
      block_bldg: '',
      contact_name: '',
      contact_phone: '',
      showErrase: false,
      coord: null,
      hasHistory: false,
      searchType: 'pickup'
    }
  }, 
  mounted() {
    this.$refs.searchTextField.focus()
    this.$refs.searchTextField.addEventListener('keyup', () => {
      this.hasHistory = false;
      this.showErrase = true
    })
    this.hasHistory = !this.showErrase;
  },
  methods: {
    setLocationFromHistory(data) {
      // eslint-disable-next-line camelcase
      const { location_name, room, floor, contact_phone, contact_name, searchType, coord } = data;
      if (data === 'current') {
        // reverse geocode 
        this.$refs.searchTextField.value = 'My Current Location'; 
        this.coord = coord
        this.searchType = searchType
        this.$refs.gmapref.setCurrentLocation();
      } else {
         
        // eslint-disable-next-line camelcase
        this.$refs.searchTextField.value = location_name;
        this.room = room;
        this.floor = floor;
        // eslint-disable-next-line camelcase
        this.contact_name = contact_name;
        // eslint-disable-next-line camelcase
        this.contact_phone = contact_phone;
        this.searchType = searchType
        this.coord = coord
        this.$refs.gmapref.setMarker(data)
      }
    },
    getPickup () {
      if (this.$refs.searchTextField.value === "") {
        return;
      }
      const payload = {
        location_name: this.$refs.searchTextField.value ? this.$refs.searchTextField.value : '' ,
        room: this.room,
        floor: this.floor,
        contact_name: this.contact_name,
        contact_phone: this.contact_phone,
        coord: this.coord,
        searchType: 'pickup'
      }
      this.searchType = 'pickup'
      this.$store.commit('SET_PICKUP_DETAILS', payload)
      this.$store.commit('SET_SEARCH_HISTORY', payload)
      this.$router.push('/?page=1')
    },
    getDropoff() {
      if (this.$refs.searchTextField.value === "") {
        return;
      }
      const payload = {
        location_name: this.$refs.searchTextField.value ? this.$refs.searchTextField.value : '',
        room: this.room,
        floor: this.floor,
        contact_name: this.contact_name,
        contact_phone: this.contact_phone,
        coord: this.coord,
        searchType: 'dropoff'
      } 
      this.searchType = 'dropoff'
      this.$store.commit('SET_DROPOFF_DETAILS', payload)
      this.$store.commit('SET_SEARCH_HISTORY', payload)
      this.$router.push('/?page=1')
    },
    async openContacts() { 
      const supported = 'contacts' in navigator && 'ContactsManager' in window
      if (supported) {
        // alert(supported);
        const props = ['name', 'tel',];
        const opts = {multiple: false};
        try {
          const contacts = await navigator.contacts.select(props, opts);
          this.handleResults(contacts);
        } catch (ex) {
          // Handle any errors here.
          alert(ex)
        }
      }
    },
    erraseSearch () {
      this.$refs.searchTextField.value = ""
      this.showErrase = false
      this.isFormDetails = false
      this.hasHistory = !this.showErrase;
    },
    handleResults(contact) {
      this.contact_name = contact[0].name;
      this.contact_phone = contact[0].tel;
    },
    setFormDetails(place) {
      this.isFormDetails = true
      this.coord = place
    },
    theMap(val) {
      this.map = val
    },
  },
}
</script>

<style lang="scss">
</style>
