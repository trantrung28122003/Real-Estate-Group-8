export default {
  commitSetPostType({ commit }, data) {
    commit("setPostType", data);
  },

  commitSetUserInfo({ commit }, data) {
    commit("setUserInfo", data);
  },

  commitSetAdminInfo({ commit }, data) {
    commit("setAdminInfo", data);
  },

  commitSetFilterData({ commit }, data) {
    commit("setFilterData", data);
  },

  commitSetBookmarkCount({ commit }, data) {
    commit("setBookmarkCount", data);
  },

  commitSetNotificationCount({ commit }, data) {
    commit("setNotificationCount", data);
  },

  commitSetPostRequestCount({ commit }, data) {
    commit("setPostRequestCount", data);
  },

  commitSetProjectRequestCount({ commit }, data) {
    commit("setProjectRequestCount", data);
  },

  commitSetEnterpriseRequestCount({ commit }, data) {
    commit("setEnterpriseRequestCount", data);
  },

  commitSetBrokerRequestCount({ commit }, data) {
    commit("setBrokerRequestCount", data);
  }
};
