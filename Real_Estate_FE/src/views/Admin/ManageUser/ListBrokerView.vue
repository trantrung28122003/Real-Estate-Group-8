<template>
  <div class="container">
    <h3>Quản lý nhà môi giới</h3>
    <el-input
      placeholder="Tìm kiếm theo email hoặc số điện thoại"
      class="search-field"
      v-model="search"
      clearable
    >
    </el-input>
    <el-button
      type="success"
      style="margin-left: 10px"
      @click="listBroker(1)"
      >Tìm kiếm</el-button
    >
    <el-button type="primary" @click="handleReset()">Đặt lại</el-button>

    <el-tabs style="margin-top: 20px;" v-model="activeName">
      <el-tab-pane name="listAll">
        <span slot="label">
          Danh sách nhà môi giới
        </span>
        <ListBroker :brokers="brokers" @acceptRejectAction="listBroker(currentPage)"/>
      </el-tab-pane>
      <el-tab-pane name="listRequest">
        <span slot="label">
          Danh sách chờ duyệt
          <el-badge :max="99" v-if="brokerRequestCount" :value="brokerRequestCount"/>
        </span>
        <ListBroker :brokers="brokers" @acceptRejectAction="updateRequestCount()"/>
      </el-tab-pane>
    </el-tabs>

    <div v-if="brokers.length" class="paginate-page">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="perPage"
        :page-count="totalPage"
        @current-change="handleChangPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AdminBrokerApi from "@/api/admin/adminBroker";
import { Notification } from "element-ui";
import ListBroker from '@/components/Admin/ManageUser/ListBroker.vue';
export default {
  data() {
    return {
      requestNumber: 0,
      activeName: "listAll",
      search: "",
      brokers: [],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
    };
  },
  components: {
    ListBroker,
  },
  computed: mapState({
    brokerRequestCount: (state) => state.brokerRequestCount,
  }),
  mounted() {
    this.listBroker(1)
  },
  methods: {
    listBroker(page) {
      AdminBrokerApi.list(
        page,
        {
          search: this.search,
          tab: this.activeName,
        },
        (response) => {
          this.brokers = response.data.data
          this.currentPage = page
          this.perPage = response.data.per_page
          this.totalPage = response.data.last_page
          this.total = response.data.total
        },
        (error) => {
          if(error?.response?.data?.code) {
            if(error.response.data.code === 403) {
              Notification.error({
                title: "Thất bại",
                message: error.response.data.error,
              });
              this.goBack()
            }
          }
        }
      );
    },

    handleReset() {
      this.search = ""
      this.listBroker(1)
    },

    handleChangPage(val) {
      this.listBroker(val)
    },

    ...mapActions(['commitSetBrokerRequestCount']),
    updateRequestCount() {
      this.requestNumber = this.brokerRequestCount ? this.brokerRequestCount : 0
      this.requestNumber -= 1
      this.commitSetBrokerRequestCount(this.requestNumber);
      this.listBroker(1)
    },
  },
  watch: {
    activeName() {
      this.listBroker(1)
    }
  },
};
</script>

<style scoped>
.container{
  width: 100%;
  /* padding-right: 20px; */
}
.search-field {
  width: 400px;
  margin-top: 20px;
}
.paginate-page {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>