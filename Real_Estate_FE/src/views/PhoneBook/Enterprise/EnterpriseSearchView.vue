<template>
  <div class="flex-row-content">
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
        <h4> {{ title }}</h4>
        <enterprise-list-search :enterprises="enterprises"/>
        <div class="paginate-page" v-if="enterprises.length">
          <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import EnterpriseApi from "@/api/enterprise"
import fields from "@/data/fieldList"
import EnterpriseListSearch from '@/components/PhoneBook/Enterprise/EnterpriseListSearch.vue'
export default {
    created() {
        this.getListProvince()
        this.setVariables()
        this.listEnterprise(1)
        this.setTitlePage()
    },

    components: {
        EnterpriseListSearch,
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
            enterprises: [],
            queryParams: {},
            title: "Doanh nghiệp các lĩnh vực",
            currentPage: 1,
            totalPage: 0,
            perPage: 0,
        }
    },

    methods: {
        setTitlePage() {
            if(this.field) {
                this.title = this.fields[this.field].name
            } else {
                this.title = "Doanh nghiệp các lĩnh vực"
            }
            if(this.province || this.district) {
                this.title += " tại " + this.showAddress({province: this.province, district: this.district})
            }
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

        listEnterprise(page) {
            EnterpriseApi.list(page, {
                'province': this.showProvince({ province : this.province }),
                'district': this.showDistrict({ province: this.province , district : this.district }),
                'search': this.search,
                'field': this.field,
            },
            (response) => {
                this.enterprises = response.data.data
                this.currentPage = page
                this.perPage = response.data.per_page
                this.totalPage = response.data.last_page
                this.total = response.data.total
            })
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
            this.$router.replace({ query: queryParams }).catch(err => {
                if (err.name !== 'NavigationDuplicated') {
                    throw err;
                }
            })
            this.listEnterprise(1)
            this.setTitlePage()
        },
        resetFilter() {
            this.field = ''
            this.province = ''
            this.district = ''
            this.search = ''
        },
        setVariables() {
            this.queryParams = this.$route.query
            this.search = this.queryParams.k ? this.queryParams.k : ""
            this.field = this.queryParams.f ? this.queryParams.f : ""
            this.field = this.changeFieldNameToId(this.field)
            this.province = this.queryParams.p ? this.queryParams.p : ""
            this.district = this.queryParams.d ? this.queryParams.d : ""
        },
        handleChangPage(val) {
            this.listEnterprise(val)
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

.paginate-page{
  margin-top: 30px;
  width: 80%;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>