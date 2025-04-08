<template>
  <div>
    <div class="container">
      <h4>Dự án bất động sản nổi bật</h4>
      <div class="row">
        <div class="col-6 col-md-4 col-lg-3" v-for="project in projects" :key="project.id">
          <router-link :to="`/chi-tiet-du-an/${project.id}`" class="link-to-detail">
            <el-card class="project-card" :body-style="{ padding: '0px' }">
              <img :src="project.image" class="image" />
              <div style="padding: 14px">
                <div class="project-status">
                  <span v-if="project.project_status" :class="getStatusClass(project)">{{ projectStatus[project.project_status] }} {{ project.note ? " - " + project.note : "" }}</span>
                  <span v-else :class="getStatusClass(project)">Đang cập nhật {{ project.note ? " - " + project.note : "" }}</span>
                </div>
                <span class="project-name-show">{{ project.name }}</span>
                <div class="project-size-location">
                  <div v-if="project.size" class="project-size">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="25px" height="25px" viewBox="0 0 111.000000 93.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,93.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                        <path d="M40 800 l0 -70 30 0 c23 0 30 4 30 20 0 20 7 20 320 20 313 0 320 0 320 -20 0 -16 7 -20 30 -20 l30 0 0 70 0 70 -30 0 c-23 0 -30 -4 -30 -20 0 -20 -7 -20 -320 -20 -313 0 -320 0 -320 20 0 16 -7 20 -30 20 l-30 0 0 -70z"/>
                        <path d="M103 640 c-64 -39 -68 -53 -68 -265 0 -212 4 -226 68 -265 30 -19 52 -20 317 -20 265 0 287 1 317 20 64 39 68 53 68 265 0 212 -4 226 -68 265 -30 19 -52 20 -317 20 -265 0 -287 -1 -317 -20z m608 -69 c24 -19 24 -22 24 -196 0 -174 0 -177 -24 -196 -22 -18 -42 -19 -291 -19 -249 0 -269 1 -291 19 -24 19 -24 22 -24 196 0 174 0 177 24 196 22 18 42 19 291 19 249 0 269 -1 291 -19z"/>
                        <path d="M920 626 c0 -18 6 -25 23 -28 22 -3 22 -3 25 -225 l2 -223 -25 0 c-20 0 -25 -5 -25 -25 0 -24 2 -25 75 -25 73 0 75 1 75 24 0 18 -6 25 -22 28 l-23 3 0 220 0 220 23 3 c16 3 22 10 22 28 0 23 -2 24 -75 24 -73 0 -75 -1 -75 -24z"/>
                        </g>
                    </svg>
                    <span> {{ project.size + " " + project.size_unit}}</span>
                  </div>
                  <div class="project-location">
                      <i class="el-icon-location-outline"></i> {{ showAddress(project) }}
                  </div>
                </div>
              </div>
            </el-card>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import projectStatus from '@/data/projectStatus'
import ProjectApi from '@/api/project'
export default {
  data() {
    return {
      projects: [],
      projectStatus : projectStatus,
    };
  },
  mounted() {
    this.listProject();
  },
  methods: {
    listProject() {
      ProjectApi.listFavorite(
        (response) => {
          this.projects = response.data
        }
      )
    },
  },
};
</script>

<style scoped>
h4 {
  margin: 30px 0 10px 0;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.project-card {
  height: 100%;
}

.project-name-show {
  font-size: 15px;
  font-weight: 700;
  color: #0E58A0;;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 10px 0px 5px 0px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 200px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.navigation {
  margin-top: 10px;
}
</style>