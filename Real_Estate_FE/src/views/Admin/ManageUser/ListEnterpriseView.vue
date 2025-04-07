<template>
  <div class="container">
    <h3>Quản lý doanh nghiệp</h3>
    <el-input
      placeholder="Tìm kiếm theo tên doanh nghiệp"
      class="search-field"
      v-model="search"
      clearable
    >
    </el-input>
    <el-button
      type="success"
      style="margin-left: 10px"
      @click="listEnterprise(1)"
      >Tìm kiếm</el-button
    >
    <el-button type="primary" @click="handleReset()">Đặt lại</el-button>

    <el-tabs style="margin-top: 20px;" v-model="activeName">
      <el-tab-pane name="listAll">
        <span slot="label">
          Danh sách doanh nghiệp
        </span>
        <ListEnterprise :enterprises="enterprises" @acceptRejectAction="listEnterprise(currentPage)"/>
      </el-tab-pane>
      <el-tab-pane name="listRequest">
        <span slot="label">
          Danh sách chờ duyệt
          <el-badge :max="99" v-if="enterpriseRequestCount" :value="enterpriseRequestCount"/>
        </span>
        <ListEnterprise :enterprises="enterprises" @acceptRejectAction="updateRequestCount()"/>
      </el-tab-pane>
    </el-tabs>
    <div v-if="enterprises.length" class="paginate-page">
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
import AdminEnterpriseApi from "@/api/admin/adminEnterprise";
import { Notification } from "element-ui";
import ListEnterprise from '@/components/Admin/ManageUser/ListEnterprise.vue';
export default {
  data() {
    return {
      activeName: "listAll",
      search: "",
      enterprises: [],
      requestNumber: 0,
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
    };
  },
  components: {
    ListEnterprise,
  },
  computed: mapState({
    enterpriseRequestCount: (state) => state.enterpriseRequestCount,
  }),
  mounted() {
    this.listEnterprise(1);
  },
  methods: {
    listEnterprise(page) {
      AdminEnterpriseApi.list(
        page,
        {
          search: this.search,
          tab: this.activeName,
        },
        (response) => {
          this.enterprises = response.data.data
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

    ...mapActions(['commitSetEnterpriseRequestCount']),
    updateRequestCount() {
      this.requestNumber = this.enterpriseRequestCount ? this.enterpriseRequestCount : 0
      this.requestNumber -= 1
      this.commitSetEnterpriseRequestCount(this.requestNumber);
      this.listEnterprise(1)
    },
    
    handleChangPage(val) {
      this.listEnterprise(val);
    },
  },
  watch: {
    activeName() {
      this.listEnterprise(1)
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