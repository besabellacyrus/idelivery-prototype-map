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
      <GmapV2 :map-obj="theMap" :search-input="$refs" @place-changed="setFormDetails" />
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
      searchInput: '',
      isFormDetails: false,
      room: '',
      floor: '',
      block_bldg: '',
      contact_name: '',
      contact_phone: '',
      showErrase: false
    }
  },
  mounted() {
    this.$refs.searchTextField.focus()
    this.$refs.searchTextField.addEventListener('keyup', () => {
      console.log({ vaaa: this.$refs.searchTextField.value })
      this.showErrase = true
    })
  },
  methods: {
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
    },
    handleResults(contact) {
      this.contact_name = contact[0].name;
      this.contact_phone = contact[0].tel;
    },
    setFormDetails() {
      this.isFormDetails = true
    },
    theMap(val) {
      this.map = val
    },
  },
}
</script>

<style lang="scss">
.search-box {
  width: 100%;
  padding: 1rem;
  .close-btn {
    position: absolute;
    right: 14px;
    z-index: 9999999;
    top: 24%;
    svg {
      height: 3rem;
    }
  }
  input {
    width: 100%;
    padding: 1rem;
    height: 4rem;
    font-size: 1.7rem;
  }
}
.back {
  width: 7rem;
  height: 100%;
  background: #000;
  svg {
    fill: #fff;
  }
}
.details-wrapper {
  position: absolute;
  width: 100%;
  z-index: 6;
  top: 6rem;
  background: rgba(255, 255, 255, 0.96);
  animation: slideDown 500ms;
  padding: 1rem;
}
.md-field {
  margin: initial !important;
}
.two-fields {
  .md-input {
    width: 100% !important;
  }
}
</style>
