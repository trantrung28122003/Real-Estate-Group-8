<template>
  <div style="display: flex; flex-direction: row">
    <div class="post-filter-container">
      <div class="filter-post">
        <h4>Tìm kiếm dự án</h4>
        <el-input class="input-filter" placeholder="Nhập từ khoá tìm kiếm" v-model="search" clearable> <i class="el-icon-search el-input__icon" slot="suffix"></i> </el-input>
        <label for="field">Loại hình</label>
        <el-select
          class="input-filter"
          id="field"
          filterable
          clearable
          placeholder="Tất cả"
          v-model="type_id"
        >
          <el-option v-for="item in projectType.textValue" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
        <label for="province">Khu vực</label>
        <el-select class="input-filter" id="province" v-model="province" placeholder="-----  Tỉnh, thành phố  -----" filterable clearable>
          <el-option v-for="item in provinces" :key="item.province_id" :label="item.province_name" :value="item.province_name + '-' + item.province_id"></el-option>
        </el-select>
        <el-select :disabled="!province" class="input-filter" id="district" v-model="district" placeholder="-----  Quận, huyện  -----" filterable clearable>
          <el-option v-for="item in districts" :key="item.district_id" :label="item.district_name" :value="item.district_name + '-' + item.district_id"></el-option>
        </el-select>

        <label for="province">Giá</label>
        <el-select
          class="input-filter"
          id="post-price"
          clearable
          placeholder="Tất cả"
          v-model="priceSelected"
        >
          <div class="price-input-filter">
            <el-input-number
              :min="0"
              :controls="false"
              v-model="startFilterPrice"
              placeholder="Từ"
            ></el-input-number>
            <i class="el-icon-right"></i>
            <el-input-number
              :controls="false"
              v-model="endFilterPrice"
              placeholder="Đến"
            ></el-input-number>
          </div>
          <div>
            <el-option
              v-for="(price, index) in optionPrice"
              :key="index"
              :value="price"
              >{{ price }}</el-option
            >
          </div>
        </el-select>

        <label for="status">Trạng thái</label>
        <el-select class="input-filter" id="status" v-model="statusSelected" placeholder="Trạng thái" filterable clearable>
          <el-option v-for="item in status" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
        <div class="action-filter">
          <el-button type="danger" icon="el-icon-refresh" @click="resetFilter()">Đặt lại</el-button>
          <el-button type="primary" @click="applyFilter()">Tìm kiếm</el-button>
        </div>
      </div>
    </div>
    <div class="project-list">
      <project-list :projects="projects" :filters="filters"/>
      <div class="paginate-page">
        <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import ProjectApi from '@/api/project'
import ProjectType from '@/data/projectType'
import ProjectList from '@/components/Project/ProjectList.vue'
import projectStatus from '@/data/projectStatus'
import routerNameToType from '@/data/routerNameToType'
export default {
  created() {
    this.getListProvince()
    this.setProjectType()
    this.listProject(1)
  },
  components: {
    ProjectList,
  },

  data() {
    return {
      routerNameToType : routerNameToType,
      projects: [],
      projectType : ProjectType,
      type_id : "",
      province: "",
      district: "",
      provinces: [],
      districts: [],
      search: "",
      status: projectStatus.listStatus,
      statusSelected: "",
      startFilterPrice: null,
      endFilterPrice: null,
      priceSelected: "",
      optionPrice: [
        "Dưới 5 triệu/m²",
        "5 - 10 triệu/m²",
        "10 - 20 triệu/m²",
        "20 - 35 triệu/m²",
        "35 - 50 triệu/m²",
        "50 - 80 triệu/m²",
        "Trên 80 triệu/m²",
      ],
      filters: {
        'search' : "",
        'type_id': "",
        'startPrice': 0,
        'endPrice': 0,
        'province': "",
        'district': "",
        'status' : "",
      },
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
    }
  },

  methods: {
    setProjectType() {
      if (this.$route.name != "project") {
        this.type_id = this.routerNameToType.project[this.$route.name]
        this.filters.type_id = this.type_id
      } else {
        this.type_id = null
      }
    },
    listProject(page) {
      var data = {
        ...this.filters
      }
      ProjectApi.listProject(
        page,
        data,
        (response) => {
          this.projects = response.data.data
          this.currentPage = page;
          this.perPage = response.data.per_page;
          this.totalPage = response.data.last_page;
        }
      )
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

    applyFilter() {
      this.filters = {
        'search' : this.search,
        'status' : this.statusSelected,
        'type_id': this.type_id,
        'startPrice': this.startFilterPrice,
        'endPrice': this.endFilterPrice,
        'province': this.province ? this.province : "",
        'district': this.district ? this.district : "",
      }
      this.listProject(1)
    },

    resetFilter() {
      this.search = null
      this.type_id = null
      this.priceSelected = null
      this.startFilterPrice = null
      this.endFilterPrice = null
      this.province = null
      this.statusSelected = null
    },

    updatePriceSelected() {
      if(this.startFilterPrice > this.endFilterPrice && this.endFilterPrice != 0){
        var $temp = this.startFilterPrice
        this.startFilterPrice = this.endFilterPrice
        this.endFilterPrice = $temp
      }
      if (this.startFilterPrice > 0 && this.endFilterPrice > 0 && this.endFilterPrice != 9999999999) {
        this.priceSelected = `${this.startFilterPrice} - `
        this.priceSelected += `${this.endFilterPrice} triệu/m²`
      } else if (this.startFilterPrice > 0) {
        this.priceSelected = `>= ${this.startFilterPrice} triệu/m²`
      } else if (this.endFilterPrice > 0) {
        this.priceSelected = `<= ${this.endFilterPrice} triệu/m²`
      } else {
        this.priceSelected = ""
      }
    },

    updatePrice() {
      if(this.priceSelected === "Dưới 5 triệu/m²"){
        this.startFilterPrice = 0
        this.endFilterPrice = 5
      } else if(this.priceSelected === "5 - 10 triệu/m²"){
        this.startFilterPrice = 5
        this.endFilterPrice = 10
      } else if(this.priceSelected === "10 - 20 triệu/m²"){
        this.startFilterPrice = 10
        this.endFilterPrice = 20
      } else if(this.priceSelected === "20 - 35 triệu/m²"){
        this.startFilterPrice = 20
        this.endFilterPrice = 35
      } else if(this.priceSelected === "35 - 50 triệu/m²"){
        this.startFilterPrice = 35
        this.endFilterPrice = 50
      } else if(this.priceSelected === "50 - 80 triệu/m²"){
        this.startFilterPrice = 50
        this.endFilterPrice = 80
      } else if(this.priceSelected === "Trên 80 triệu/m²"){
        this.startFilterPrice = 80
        this.endFilterPrice = 9999999999
      } else if(this.priceSelected === ""){
        this.startFilterPrice = 0
        this.endFilterPrice = 0
      }
    },
    handleChangPage(val) {
      this.listProject(val)
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
      }
      this.district = ""
    },
    priceSelected() {
      this.updatePrice()
    },
    endFilterPrice() {
      this.updatePriceSelected()
    },
    startFilterPrice() {
      this.updatePriceSelected()
    },
    '$route'() {
      this.setProjectType()
      this.applyFilter()
    }
  }
}
</script>

<style scoped>
.project-list {
  flex: 2;
  margin: 30px 0 0 0px;
}

.price-input-filter {
  display: flex;
  flex-direction: row;
  width: 250px;
  padding: 20px;
}

.el-icon-right {
  margin: 10px 3px 0 3px
}

.paginate-page{
  width: 85%;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>