export const state = () => ({
  pickup: false,
  dropoff: false,
  user: 'customer',
  isPopup: true,
  pickupLocationDetails: null,
  dropoffLocationDetails: null,
  searchHistory: [],
})

export const mutations = {
  SET_PICKUP(state, pickup) {
    state.pickup = pickup
  },
  SET_DROPOFF(state, dropoff) {
    state.dropoff = dropoff
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_POPUP(state, popup) {
    state.isPopup = popup
  },
  SET_PICKUP_DETAILS(state, payload) {
    state.pickupLocationDetails = payload
  },
  SET_DROPOFF_DETAILS(state, payload) {
    state.dropoffLocationDetails = payload
  },
  SET_SEARCH_HISTORY(state, payload) {
    state.searchHistory.push(payload)
  },
}
