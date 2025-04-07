<template>
    <div class="container">
      <div class="nav">
        <h4>Danh sách dự án</h4>
        <div class="search-and-type">
          <el-input
            placeholder="Tìm kiếm theo tên dự án"
            class="search-field"
            v-model="search"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="listProject(1)"
            ></el-button>
          </el-input>
          <el-select class="select" style="margin-left: 20px;" v-model="status" placeholder="Trạng thái dự án" clearable>
            <el-option v-for="item in projectStatus" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="tabProject in tabProjects" :key="tabProject.name" :label="tabProject.label" :name="tabProject.name" >
          <div class="content-tab">
            <tab-project-by-status :projects="projects" @handle-delete-project="listProject(1)"/>
            <div class="paginate-page" v-if="projects.length">
              <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import TabProjectByStatus from '@/components/Enterprise/ManageProject/TabProjectByStatus.vue';
import ProjectApi from "@/api/project"
import projectStatus from '@/data/projectStatus';
export default {
  components: {
    TabProjectByStatus,
  },
  mounted() {
    this.listProject(1)
  },
  data() {
    return {
      type: "sell",
      activeName: "all",
      search: "",
      projects: [],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      status: "",
      projectStatus : projectStatus.listStatus,
      tabProjects: [
        {
          label: "Tất cả",
          name: "all"
        },
        {
          label: "Đang hiển thị",
          name: "display"
        },
        {
          label: "Chờ duyệt",
          name: "hidden"
        },
        {
          label: "Đã xoá",
          name: "deleted"
        },
        {
          label: "Không duyệt",
          name: "rejected"
        },
      ]
    };
  },

  methods: {
    handleChangPage(val) {
      this.listProject(val)
    },

    listProject(page) {
      ProjectApi.listOwnerProject(
        page,
        {
          'search': this.search,
          'status': this.activeName,
          'project_status': this.status,
        },
        (response) => {
          this.projects = response.data.data
          this.currentPage = page
          this.perPage = response.data.per_page
          this.totalPage = response.data.last_page
        },
      )
    },
  }, 
  watch: {
    activeName() {
      this.listProject(1)
    },
    status() {
      this.listProject(1)
    }
  }
};
</script>

<style scoped>
.content-tab {
  width: 80%;
}

.nav {
  display: flex;
  flex-direction: column;
}

.search-and-type {
  display: flex;
  position: relative;
  flex-direction: row;
  margin: 10px 0 10px 0;
}
.search-field {
  width: 400px;
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