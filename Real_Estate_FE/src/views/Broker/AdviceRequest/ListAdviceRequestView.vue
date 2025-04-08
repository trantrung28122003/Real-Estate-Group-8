<template>
    <div class="row" style="margin-top: 10px;">
    <div class="post-filter-container">
      <div class="filter-post">
        <h4>Tìm kiếm yêu cầu</h4>
        <el-input class="input-filter" placeholder="Nhập từ khoá tìm kiếm" v-model="search"> <i class="el-icon-search el-input__icon" slot="suffix"></i> </el-input>
        
        <label>Loại giao dịch</label>
        <el-select class="input-filter" id="sell-rent" v-model="typeSelected" placeholder="-----  Loại giao dịch  -----" clearable>
          <el-option v-for="item in choicesType" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>

        <label>Loại nhà đất</label>
        <el-select :disabled="!typeSelected" class="input-filter" id="post-type" v-model="type_id" placeholder="--- Loại hình bất động sản ---" filterable clearable>
          <el-option v-for="item in listPostType" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>

        <label for="province">Khu vực</label>
        <el-select class="input-filter" id="province" v-model="province" placeholder="-----  Tỉnh, thành phố  -----" filterable clearable>
          <el-option v-for="item in provinces" :key="item.province_id" :label="item.province_name" :value="item.province_name + '-' + item.province_id"></el-option>
        </el-select>
        <el-select :disabled="!province" class="input-filter" id="district" v-model="district" placeholder="-----  Quận, huyện  -----" filterable clearable>
          <el-option v-for="item in districts" :key="item.district_id" :label="item.district_name" :value="item.district_name + '-' + item.district_id"></el-option>
        </el-select>
        <el-select :disabled="!province" class="input-filter" id="project" v-model="project" placeholder="-----  Dự án  -----" filterable clearable>
          <el-option v-for="item in projects" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <div class="action-filter">
          <el-button type="danger" icon="el-icon-refresh" @click="resetFilter">Đặt lại</el-button>
          <el-button type="primary" @click="listAdviceRequest(1)">Tìm kiếm</el-button>
        </div>
      </div>
    </div>

    <div class="enterprise-list">
        <list-advice-requests :requests="advice_requests" :displayTitle="true" @applied="listAdviceRequest()"/>
        <div v-if="advice_requests.length" class="paginate-page">
          <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import ListAdviceRequests from '@/components/Broker/AdviceRequets/ListAdviceRequests.vue'
import AdviceRequestApi from '@/api/adviceRequest'
import postType from '@/data/postType.js'
import ProjectApi from '@/api/project'
export default {
  created() {
    this.getListProvince()
  },
  mounted() {
    this.listAdviceRequest(1)
  },
  data() {
    return {
      province: "",
      district: "",
      provinces: [],
      districts: [],
      projects: [],
      project: "",
      search: "",
      typeSelected: null,
      postType: postType,
      listPostType: [],
      choicesType: [
        {
          text: 'Mua',
          value: 'sell'
        },
        {
          text: 'Thuê',
          value: 'rent'
        }
      ],
      type_id: null,
      advice_requests : [],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
    }
  },
  components: {
      ListAdviceRequests,
  },
  methods: {
    listAdviceRequest(page) {
      AdviceRequestApi.listRequest(
        page,
        {
          'search' : this.search,
          'province' : this.province,
          'district' : this.district,
          'type_id' : this.type_id,
          'type' : this.typeSelected,
          'project_id' : this.project
        },
        (response) => {
          this.advice_requests = response.data.data
          this.currentPage = page
          this.perPage = response.data.per_page
          this.totalPage = response.data.last_page
          this.total = response.data.total
        }
      )
    },
    handleChangPage(val) {
      this.listAdviceRequest(val)
    },
    async getListProvince() {
      try {
        const response = await axios.get("https://vapi.vnappmob.com/api/v2/province/")
        if(response.status == 200) {
          this.provinces = response.data.results
        }
      } catch (error) {
        console.error(error)
      }
    },

    listProjectOptions() {
      ProjectApi.listProjectOptions(
        {
          province : this.province,
          district : this.district,
        },
        (response) => {
          this.projects = response.data
        }
      )
    },

    async getListDistrict( province_id) {
      try {
        const response = await axios.get(`https://vapi.vnappmob.com/api/v2/province/district/${province_id}`)
        if(response.status == 200) {
          this.districts = response.data.results
        }
      } catch (error) {
        console.error(error)
      }
    },
    resetFilter() {
      this.search = ""
      this.province = ""
      this.district = ""
      this.type_id = ""
      this.typeSelected = ""
      this.project = ""
    },
  },
  watch: {
    province(val) {
      if(val){
        var $result = val.split("-")
        this.getListDistrict($result[1])
      } else {
        this.districts = []
        this.wards = []
        this.address = ""
        this.project = ""
      }
      this.listProjectOptions()
      this.district = ""
    },
    district() {
      this.listProjectOptions()
    },
    typeSelected(val) {
      if(val == 'rent') {
        this.listPostType = {
          ...this.postType.rent
        }
      } else if(val == 'sell') {
        this.listPostType = {
          ...this.postType.sell
        }
      } else {
        this.listPostType = []
        this.type_id = null
      }
    },
    project(val) {
      if(val) {
        var selectedProject = this.projects.find(function(project) {
          return project.id === val;
        })

        if(!this.district) {
          this.district = selectedProject.district
        }
      }
    }
  }
}
</script>

<style scoped>
.enterprise-list {
  flex: 2;
  padding-right: 10%;
  margin: 30px 0 0 0px;
}

.filter-post {
  margin: 30px 0 0 40px;
  min-width: 250px;
  width: 70%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.input-filter {
  margin: 5px 0 10px 0;
  width: 100%;
}

.action-filter {
  display: flex;
  flex-direction: row;
}

.paginate-page{
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>