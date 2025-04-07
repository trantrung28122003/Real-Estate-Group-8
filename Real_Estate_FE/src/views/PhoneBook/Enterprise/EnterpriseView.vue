<template>
  <div class="row">
    <div class="post-filter-container">
      <div class="filter-post">
        <h4>Tìm kiếm doanh nghiệp</h4>
        <el-input class="input-filter" placeholder="Nhập từ khoá tìm kiếm" v-model="search" clearable> <i class="el-icon-search el-input__icon" slot="suffix"></i> </el-input>
        <label for="field">Lĩnh vực</label>
        <el-select
          class="input-filter"
          id="field"
          filterable
          clearable
          placeholder="Tất cả"
          v-model="field"
        >
          <el-option v-for="item in fields" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <label for="province">Khu vực</label>
        <el-select class="input-filter" id="province" v-model="province" placeholder="-----  Tỉnh, thành phố  -----" filterable clearable>
          <el-option v-for="item in provinces" :key="item.province_id" :label="item.province_name" :value="item.province_name + '-' + item.province_id"></el-option>
        </el-select>
        <el-select :disabled="!province" class="input-filter" id="district" v-model="district" placeholder="-----  Quận, huyện  -----" filterable clearable>
          <el-option v-for="item in districts" :key="item.district_id" :label="item.district_name" :value="item.district_name + '-' + item.district_id"></el-option>
        </el-select>
        <div class="action-filter">
          <el-button type="danger" icon="el-icon-refresh" @click="resetFilter">Đặt lại</el-button>
          <el-button type="primary" @click="applyFilter">Tìm kiếm</el-button>
        </div>
      </div>
    </div>

    <div class="enterprise-list">
      <enterprise-list/>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import fields from "@/data/fieldList"
import EnterpriseList from '@/components/PhoneBook/Enterprise/EnterpriseList.vue'
export default {
  created() {
    this.getListProvince()
  },

  components: {
    EnterpriseList,
  },

  data() {
    return {
      fields: fields,
      province: "",
      district: "",
      provinces: [],
      districts: [],
      search: "",
      field:"",
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

    applyFilter() {
      var queryParams = {}
      if(this.search) {
        queryParams.k = this.search
      }
      if(this.field) {
        queryParams.f = this.fields[this.field].name
      }
      if(this.province) {
        queryParams.p = this.province
      }
      if(this.district) {
        queryParams.d = this.district
      }
      this.$router.push({ path: '/tim-kiem-doanh-nghiep', query: queryParams });
    },
    resetFilter() {

    },
  },
  
  watch: {
    province(val) {
      if(val){
        var $result = val.split("-")
        this.getListDistrict($result[1])
      } else {
        this.districts = []
      }
      this.district = ""
    },
  }
}
</script>

<style scoped>
.enterprise-list {
  flex: 2;
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
</style>