export const state = () => ({
  pickup: false,
  dropoff: false,
  user: "customer",
  isPopup: true,
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
  }
}