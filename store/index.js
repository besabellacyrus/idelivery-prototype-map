export const state = () => ({
  pickup: false,
  dropoff: false,
  user: 'customer',
  isPopup: true,
  pickupLocationDetails: null,
  dropoffLocationDetails: null,
  searchHistory: [],
  userCoord: { lat: 0, lng: 0 },
  drivingDistance: {},
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
  SET_USER_COORD(state, coord) {
    state.userCoord = coord
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
  SET_DRIVING_DISTANCE(state, distance) {
    state.drivingDistance = distance
  },
  SET_SEARCH_HISTORY(state, payload) {
    console.log({ payload })
    if (
      !state.searchHistory.find(
        (el) => el.location_name === payload.location_name
      )
    ) {
      if (payload.location_name !== 'My Current Location') {
        state.searchHistory.push(payload)
      }
    }
  },
}
