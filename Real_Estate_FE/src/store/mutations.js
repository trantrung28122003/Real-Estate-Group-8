export default {
  setPostType(state, data) {
    state.postTypes = data;
  },

  setUserInfo(state, data) {
    state.user = data;
  },

  setAdminInfo(state, data) {
    state.admin = data;
  },

  setFilterData(state, data) {
    state.filter = data;
  },

  setBookmarkCount(state, data) {
    state.bookmarkCount = data;
  },

  setNotificationCount(state, data) {
    state.notificationCount = data;
  },

  setPostRequestCount(state, data) {
    state.postRequestCount = data
  },

  setProjectRequestCount(state, data) {
    state.projectRequestCount = data
  },

  setEnterpriseRequestCount(state, data) {
    state.enterpriseRequestCount = data
  },

  setBrokerRequestCount(state, data) {
    state.brokerRequestCount = data
  },
};
