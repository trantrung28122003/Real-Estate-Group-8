<template>
  <div class="container">
    <div class="nav">
      <h4>Thông báo</h4>
    </div>
    <div>
      <div class="notification-header">
        <div>
          <el-checkbox v-model="checked">Chọn tất cả</el-checkbox>
          <el-button @click="markAsReadAll()" type="text">
            <svg
              style="margin: 0px 3px 5px 20px"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="svg-md"
            >
              <g clip-path="url(#clip0_3285_125974)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.4206 6.3295C18.8599 6.76884 18.8599 7.48116 18.4206 7.9205L7.92056 18.4205C7.48122 18.8599 6.76891 18.8599 6.32957 18.4205L1.82951 13.9205C1.39017 13.4812 1.39016 12.7688 1.8295 12.3295C2.26884 11.8902 2.98115 11.8902 3.42049 12.3295L7.12506 16.034L16.8296 6.3295C17.2689 5.89017 17.9812 5.89017 18.4206 6.3295Z"
                  fill="#CCCCCC"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.2953 6.79557C23.7347 7.23491 23.7347 7.94722 23.2953 8.38656L12.8863 18.7956C12.447 19.2349 11.7347 19.2349 11.2953 18.7956C10.856 18.3562 10.856 17.6439 11.2953 17.2046L21.7043 6.79557C22.1437 6.35623 22.856 6.35623 23.2953 6.79557Z"
                  fill="#CCCCCC"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_3285_125974">
                  <rect width="24" height="24" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <span>Đánh dấu là đã đọc</span>
          </el-button>
          <el-switch
            style="margin-left: 20px"
            v-model="status"
            active-text="Chưa đọc"
            inactive-text=""
            @change="listNotification(1)"
          ></el-switch>
        </div>
      </div>
      <el-table
        v-if="notifications.length"
        ref="multipleTable"
        :show-header="false"
        :data="notifications"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="Thông báo">
          <template slot-scope="scope">
            <div @click="open(scope.row)"
              style="cursor: pointer"
              :class="
                scope.row.status === 0
                  ? 'unread-notification'
                  : 'read-notification'
              "
            >
              <span>
                {{ scope.row.message }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Date" width="150">
          <template slot-scope="scope">{{
            showTime(scope.row.created_at)
          }}</template>
        </el-table-column>
      </el-table>
      <div v-else class="empty-state">
        <svg
          width="130"
          height="130"
          viewBox="0 0 130 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M118.42 75.84C118.43 83.2392 116.894 90.5589 113.91 97.33H16.0901C12.8945 90.0546 11.3623 82.1579 11.605 74.2154C11.8478 66.2728 13.8594 58.4844 17.4933 51.4177C21.1272 44.3511 26.2919 38.1841 32.6109 33.3662C38.93 28.5483 46.2444 25.2008 54.021 23.5676C61.7976 21.9345 69.8407 22.0568 77.564 23.9257C85.2874 25.7946 92.4966 29.363 98.6662 34.3709C104.836 39.3787 109.811 45.6999 113.228 52.8739C116.645 60.0478 118.419 67.8937 118.42 75.84Z"
            fill="#F2F2F2"
          ></path>
          <path
            d="M4.58008 97.3301H125.42"
            stroke="#63666A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
          ></path>
          <path
            d="M67.8105 114.8C73.1014 114.8 77.3905 110.511 77.3905 105.22C77.3905 99.9293 73.1014 95.6401 67.8105 95.6401C62.5196 95.6401 58.2305 99.9293 58.2305 105.22C58.2305 110.511 62.5196 114.8 67.8105 114.8Z"
            fill="#A7A7A7"
            stroke="#63666A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M87.5702 65.5702C86.2602 53.8802 76.3802 49.7402 67.8102 49.7402C59.2402 49.7402 49.3702 53.8802 48.0602 65.5702C46.9402 74.2802 44.6502 80.9702 39.9302 87.3602C35.9302 92.9402 34.8102 98.7202 36.4202 102.71C36.6692 103.283 37.0822 103.769 37.6073 104.107C38.1323 104.445 38.7458 104.62 39.3702 104.61H96.2502C96.8831 104.631 97.5074 104.46 98.0424 104.121C98.5773 103.783 98.9981 103.291 99.2502 102.71C100.86 98.7102 99.6802 92.9402 95.7402 87.3602C91.0002 81.0002 88.6802 74.2802 87.5702 65.5702Z"
            fill="#D7D7D7"
          ></path>
          <path
            d="M99.2101 102.71C100.82 98.7101 99.6401 92.9401 95.7001 87.3601C91.0001 81.0001 88.6801 74.2801 87.5701 65.5701C87.3182 62.3646 86.134 59.3027 84.1635 56.7618C82.193 54.2209 79.5221 52.3119 76.4801 51.2701C74.579 50.5286 72.5005 50.3684 70.5083 50.8099C68.516 51.2515 66.6999 52.2748 65.2901 53.7501C62.3755 56.9524 60.5972 61.0257 60.2301 65.3401C58.9201 75.5501 56.1401 82.0001 50.6001 89.5001C47.2401 94.2501 45.3701 101.63 48.2901 104.61H96.2901C96.9095 104.614 97.5164 104.437 98.0356 104.099C98.5547 103.761 98.9632 103.278 99.2101 102.71Z"
            fill="white"
          ></path>
          <path
            d="M86.3002 60.4702C82.0002 51.7802 73.8702 49.7402 67.8102 49.7402C59.2402 49.7402 49.3702 53.8802 48.0602 65.5702C46.9402 74.2802 44.6502 80.9702 39.9302 87.3602C35.9302 92.9402 34.8102 98.7202 36.4202 102.71C36.6692 103.283 37.0822 103.769 37.6073 104.107C38.1323 104.445 38.7458 104.62 39.3702 104.61H96.2502C96.8831 104.631 97.5074 104.46 98.0424 104.121C98.5773 103.783 98.9981 103.291 99.2502 102.71C100.86 98.7102 99.6802 92.9402 95.7402 87.3602C91.5766 81.5452 88.8894 74.8049 87.9102 67.7202"
            stroke="#63666A"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
          ></path>
        </svg>
        <p>Hiện tại bạn không có thông báo nào</p>
      </div>
      <div v-if="notifications.length" class="paginate-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="perPage"
          :page-count="totalPage"
          @current-change="handleChangPage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NotificationApi from "@/api/notification";
export default {
  mounted() {
    this.listNotification(1);
  },
  data() {
    return {
      numberNotification: 0,
      multipleSelection: [],
      status: false,
      checked: false,
      notifications: [],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
    };
  },
  computed: mapState({
    notificationCount: (state) => state.notificationCount,
  }),

  methods: {
    ...mapActions(["commitSetNotificationCount"]),
    handleChangPage(val) {
      this.listNotification(val);
    },

    open(notification) {
      this.$alert(notification.message, notification.message, {
        showCancelButton: false,
        showConfirmButton: false,
        customClass: 'my-custom-alert'
      }).catch(() => {})
      if(!notification.status) {
        this.markAsRead(notification)
      }
    },

    markAsRead(notification) {
      NotificationApi.markAsRead(notification.id,
        () => {
          this.numberNotification = this.notificationCount ? this.notificationCount : 0
          this.numberNotification = this.numberNotification - 1
          this.commitSetNotificationCount(this.numberNotification)
          notification.status = 1
        },
      )
    },
    
    listNotification(page) {
      NotificationApi.list(
        page,
        {
          status: this.status ? "1" : "",
        },
        (response) => {
          this.notifications = response.data.data;
          this.currentPage = page;
          this.perPage = response.data.per_page;
          this.totalPage = response.data.last_page;
          this.total = response.data.total;
        }
      );
    },
    markAsReadAll() {
      const unreadNotificationIds = this.multipleSelection
        .filter((notification) => notification.status === 0)
        .map((notification) => notification.id);

      NotificationApi.markAsReadList(
        {
          list: unreadNotificationIds,
        },
        () => {
          this.notifications.forEach((notification) => {
            if (unreadNotificationIds.includes(notification.id)) {
              notification.status = 1;
            }
          });
          this.numberNotification = 0;
          this.commitSetNotificationCount(this.numberNotification);
          this.checked = false;
          this.toggleSelection();
        }
      );
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  watch: {
    checked(val) {
      if (val) {
        this.toggleSelection(this.notifications);
      } else {
        this.toggleSelection();
      }
    },
  },
};
</script>

<style scoped>
.content-tab {
  width: 75%;
}

.nav {
  display: flex;
  flex-direction: column;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: grey;
}

.paginate-page {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: #fff; /* To ensure header has background */
  padding: 10px;
  border-bottom: 1px solid #ebeef5; /* Optional: adds a subtle border */
}

.unread-notification {
  font-weight: bold;
}
</style>