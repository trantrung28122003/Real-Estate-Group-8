<template>
  <div class="container">
    <h4>Quản lý báo cáo bài đăng</h4>
    <el-tabs style="margin-top: 30px;" v-model="activeName">
        <el-tab-pane v-for="tabPost in tabs" :key="tabPost.name" :label="tabPost.label" :name="tabPost.name" >
          <div class="content-tab">
            <ListReport class="content-tab-post" :reports="reports" @handleChange="listReport(1)"/>
            <div class="paginate-page" v-if="reports.length">
              <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AdminReportApi from "@/api/admin/adminReport";
import { Notification } from "element-ui";
import ListReport from '@/components/Admin/Post/ListReport.vue';
export default {
  data() {
    return {
      activeName: "0",
      search: "",
      reports: [],
      tabs: [
        {
          label: "Chờ xử lý",
          name: "0"
        },
        {
          label: "Đã xử lý",
          name: "1"
        },
        {
          label: "Đã xóa",
          name: "2"
        },
      ],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
    };
  },
  components: {
    ListReport,
  },
  computed: mapState({
    brokerRequestCount: (state) => state.brokerRequestCount,
  }),
  mounted() {
    this.listReport(1)
  },
  methods: {
    listReport(page) {
      AdminReportApi.list(
        page,
        {
          tab: this.activeName,
        },
        (response) => {
          this.reports = response.data.data
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
      this.listReport(1)
    },

    handleChangPage(val) {
      this.listReport(val)
    },

    ...mapActions(['commitSetBrokerRequestCount']),
    updateRequestCount() {
      this.requestNumber = this.brokerRequestCount ? this.brokerRequestCount : 0
      this.requestNumber -= 1
      this.commitSetBrokerRequestCount(this.requestNumber);
      this.listReport(1)
    },
  },
  watch: {
    activeName() {
      this.listReport(1)
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