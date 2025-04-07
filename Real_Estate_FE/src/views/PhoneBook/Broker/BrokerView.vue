<template>
  <div style="display: flex; flex-direction: row;" >
    <div class="post-filter-container">
      <div class="filter-post">
        <h4>Tìm kiếm nhà môi giới</h4>
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
        <el-select :disabled="!province" class="input-filter" id="project" v-model="project" placeholder="----- Dự án  -----" filterable clearable>
          <el-option v-for="item in projects" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <div class="action-filter">
          <el-button type="danger" icon="el-icon-refresh" @click="resetFilter">Đặt lại</el-button>
          <el-button type="primary" @click="applyFilter(1)">Tìm kiếm</el-button>
        </div>
      </div>
    </div>

    <div class="broker-list">
      <h4>Danh sách nhà môi giới</h4>
      <broker-list :brokers="brokers"/>
      <div class="paginate-page" v-if="brokers.length">
        <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import BrokerApi from "@/api/broker"
import axios from "axios"
import ProjectApi from '@/api/project'
import postType from '@/data/postType.js'
import BrokerList from '@/components/PhoneBook/Broker/BrokerList.vue'
export default {
  created() {
    this.getListProvince()
    this.applyFilter(1)
  },

  components: {
    BrokerList,
  },

  data() {
    return {
      brokers: [],
      projects: [],
      project: '',
      province: "",
      district: "",
      provinces: [],
      districts: [],
      search: "",
      typeSelected: null,
      postType: postType,
      listPostType: [],
      choicesType: [
        {
          text: 'Bán',
          value: 'sell'
        },
        {
          text: 'Cho thuê',
          value: 'rent'
        }
      ],
      type_id: null,
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
    }
  },

  methods: {
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

    applyFilter(page) {
      BrokerApi.list(
        page,
        {
          'search' : this.search,
          'province' : this.province,
          'district' : this.district,
          'type_id' : this.type_id,
          'type' : this.typeSelected,
          'project_id' : this.project,
        },
        (response) => {
          this.brokers = response.data.data
          this.currentPage = page
          this.perPage = response.data.per_page
          this.totalPage = response.data.last_page
          this.total = response.data.total
        }
      )
    },

    resetFilter() {
      this.search = ""
      this.province = ""
      this.district = ""
      this.type_id = ""
      this.typeSelected = ""
      this.project = ""
    },

    handleChangPage(val) {
      this.applyFilter(val)
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
.broker-list {
  flex: 2;
  margin: 30px 0 0 0px;
  width: 75%;
  margin-right: 15%;
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