<template>
    <div class="container">
      <h4>Danh sách dự án chờ duyệt</h4>
      <p>Hiện có {{ total }} dự án</p>
      <el-input
        placeholder="Tìm kiếm theo ID hoặc tên dự án"
        class="search-field"
        v-model="search"
        clearable
    >
    </el-input>
    <el-button type="success" style="margin-left: 10px" @click="listRequest(1)">Tìm kiếm</el-button>
    <el-button type="primary" @click="handleReset()">Đặt lại</el-button>
      <div style="width: 100%;">
        <list-project :projects="projects" @acceptRejectAction="updateRequestCount()"/>
        <div v-if="projects.length" class="paginate-page">
          <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import { Notification } from 'element-ui'
import AdminProjectApi from '@/api/admin/adminProject'
import ListProject from '@/components/Admin/ManageProject/ListProject.vue';
export default {
  components: {
    ListProject,
  },
  mounted() {
    this.listRequest(1)
  },
  computed: mapState({
    projectRequestCount: (state) => state.projectRequestCount,
  }),
  data() {
    return {
      projects: [],
      requestNumber: 0,
      search: '',
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
      type: "sell",
    };
  },
  methods: {
    listRequest(page) {
      AdminProjectApi.listRequest(
        page,
        {
            'search' : this.search,
        },
        (response) => {
          this.projects = response.data.data
          this.currentPage = page;
          this.perPage = response.data.per_page;
          this.totalPage = response.data.last_page;
          this.total = response.data.total;
        }, (error) => {
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
      )
    },
    handleReset() {
        this.search = ''
        this.listRequest(1)
    },
    handleChangPage(val) {
      this.listRequest(val)
    },
    ...mapActions(["commitSetProjectRequestCount"]),
    updateRequestCount() {
      this.requestNumber = this.projectRequestCount;
      this.requestNumber -= 1;
      this.commitSetProjectRequestCount(this.requestNumber);
      this.listRequest(1)
    },
  },
};
</script>

<style scoped>
.content-page {
  margin-left: 100px;
  width: 70%;
}

.search-field {
  width: 400px;
  margin-bottom: 10px;
}

.list-request-post {
  display: flex;
  flex-direction: row;
}

.select-post-type {
  position: relative;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

.type-post {
  position: absolute;
  right: 20px;
}

.active_selected {
  background-color: red !important;
  color: white !important;
}

.paginate-page{
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>