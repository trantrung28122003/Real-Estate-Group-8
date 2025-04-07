<template>
  <div class="component">
    <!-- <search-nav /> -->
    <div class="row rent-sell-post-page">
      <div class="post-filter-container">
        <div class="filter-post">
          <h4>Bộ lọc tìm kiếm</h4>
          <label for="post-type">Loại nhà đất</label>
          <el-select
            class="input-filter"
            id="post-type"
            filterable
            clearable
            placeholder="Tất cả"
            v-model="postTypeSelected"
          >
          <div v-if="type == 'sell'">
            <el-option
              v-for="postType in postTypes.sell"
              :key="postType.value"
              :value="postType.value"
              :label="postType.text"
            ></el-option>
          </div>
          <div v-else>
            <el-option
              v-for="postType in postTypes.rent"
              :key="postType.value"
              :value="postType.value"
              :label="postType.text"
            ></el-option>
          </div>
          </el-select>
          <label for="province">Khu vực</label>
            <el-select class="input-filter" id="province" v-model="province" placeholder="-----  Tỉnh, thành phố  -----" filterable clearable>
              <el-option v-for="item in provinces" :key="item.province_id" :label="item.province_name" :value="item.province_name + '-' + item.province_id"></el-option>
            </el-select>
            <el-select :disabled="!province" class="input-filter" id="district" v-model="district" placeholder="-----  Quận, huyện  -----" filterable clearable>
              <el-option v-for="item in districts" :key="item.district_id" :label="item.district_name" :value="item.district_name + '-' + item.district_id"></el-option>
            </el-select>
            <el-select :disabled="!district" class="input-filter" id="ward" v-model="ward" placeholder="-----  Phường, xã  -----" filterable clearable>
              <el-option v-for="item in wards" :key="item.ward_id" :label="item.ward_name" :value="item.ward_name + '-' + item.ward_id"></el-option>
            </el-select>

          <label for="province">Dự án</label>
          <el-select no-data-text="No data" class="input-filter" id="province" v-model="project" placeholder="Dự án" filterable clearable>
            <el-option v-for="item in projects" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>

          <label for="post-price">Mức giá</label>
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
            <div v-if="type == 'rent'">
              <el-option
                v-for="(price, index) in optionRentPrice"
                :key="index"
                :value="price"
                >{{ price }}</el-option
              >
            </div>
            <div v-else>
              <el-option
                v-for="(price, index) in optionSellPrice"
                :key="index"
                :value="price"
                >{{ price }}</el-option
              >
            </div>
          </el-select>
          <label for="post-size">Diện tích</label>
          <el-select
            class="input-filter"
            id="post-size"
            clearable
            placeholder="Tất cả"
            v-model="sizeSelected"
          >
          <div>
            
          </div>
            <div class="price-input-filter">
              <el-input-number
                :min="0"
                :controls="false"
                v-model="startFilterSize"
                placeholder="Từ"
              ></el-input-number>
              <i class="el-icon-right"></i>
              <el-input-number
                :controls="false"
                v-model="endFilterSize"
                placeholder="Đến"
              ></el-input-number>
            </div>
            <hr>
            <el-option
              v-for="(size, index) in optionSize"
              :key="index"
              :value="size"
              >{{ size }}</el-option
            >
          </el-select>
          <label for="post-type"></label>
          <!-- <el-select
            class="input-filter"
            id="post-type"
            clearable
            placeholder="Tất cả"
          ></el-select> -->
          <div class="action-filter">
            <el-button type="danger" icon="el-icon-refresh" @click="resetFilter">Đặt lại</el-button>
            <el-button type="primary" @click="applyFilter">Áp dụng</el-button>
          </div>
        </div>
      </div>
      <div class="post-list-container">
        <div class="list-sell-rent-post">
          <h4>{{ title }}</h4>
          <p>Hiện có {{ total }} bất động sản</p>
          <div class="select-post-type">
            <el-select
              style="margin-bottom: 10px;"
              v-model="selectedOrderBy"
              placeholder="Tin mới nhất"
            >
              <el-option value="Tin mới nhất">Tin mới nhất</el-option>
              <el-option value="Giá thấp đến cao">Giá thấp đến cao</el-option>
              <el-option value="Giá cao đến thấp">Giá cao đến thấp</el-option>
              <el-option value="Diện tích lớn đến bé">Diện tích lớn đến bé</el-option>
              <el-option value="Diện tích bé đến lớn">Diện tích bé đến lớn</el-option>
            </el-select>
          </div>
          <div v-if="total" style="width:85%;">
            <div class="single-rent-sell-post" v-for="post in posts" :key="post.id">
              <div>
                <router-link :to="`/chi-tiet-bai-dang/${post.id}`">
                  <div class="show-post-image">
                    <img class="image-rent-sell-post" :src="post.image" loading="lazy" alt="" />
                    <div class="number-image"><i class="el-icon-picture-outline"> {{ post.number_image }}</i> </div>
                  </div>
                </router-link>
              </div>
              <div class="content-rent-sell-post">
                <router-link
                  class="link-to-detail"
                  :to="`/chi-tiet-bai-dang/${post.id}`"
                >
                  <span class="rent-sell-post-title">{{ post.title }}</span>
                </router-link>
                <span style="color: red; font-weight: 600">
                  {{ showPrice(post) + " ・ " + post.size + " m&sup2;" }}
                </span>
                <span v-if="post.bedroom">
                  {{ " ・ " + post.bedroom }} <i class="el-icon fa fa-bed"></i>
                </span>
                <span v-if="post.toilet">
                  {{ " ・ " + post.toilet }} <i class="el-icon fa fa-bath"></i>
                </span>
                <div class="post-location">
                  <i class="el-icon-location-outline"></i> {{ showAddress({province: post.province, district: post.district}) }}
                </div>
                <div class="published_at">{{ showTime(post.published_at) }}</div>
                <el-button v-if="user && user.email" class="ren-selt-post-bookmark" @click="bookmark(post)">
                  <i
                    v-if="post.bookmark == 1"
                    class="el-icon bookmarked fas fa-heart"
                  ></i>
                  <i v-else class="el-icon far fa-heart"></i>
                </el-button>
              </div>
            </div>
          </div>
          <list-post-error v-else />
          <div v-if="posts.length" class="paginate-page">
            <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import SearchNav from "@/layouts/SearchNav.vue"
import routerNameToType from "@/data/routerNameToType"
import postType from "@/data/postType"
import axios from "axios"
import BookmarkApi from '@/api/bookmark'
import PostApi from "@/api/post"
import ProjectApi from '@/api/project'
import { mapActions, mapState } from 'vuex'
import ListPostError from '@/components/NoneToDisplay/ListPostError.vue'
export default {
  computed: mapState({
    user: (state) => state.user,
    bookmarkCount: (state) => state.bookmarkCount,
  }),
  mounted() {
    this.province = this.$route.params.province
    this.filters.province = this.province ? this.province : ""
    this.setPostType()
    this.listPost(1)
    this.setTitle()
  },
  created() {
    this.getListProvince()
  },
  data(){
    return {
      numberBookmark: null,
      title: "",
      optionRentPrice: [
        "Dưới 1triệu",
        "1 - 3 triệu",
        "3 - 5 triệu",
        "5 - 10 triệu",
        "10 - 40 triệu",
        "40 - 70 triệu",
        "70 - 100 triệu",
        "Trên 100 triệu",
        "Thoả thuận",
      ],
      optionSellPrice: [
        "Dưới 500 triệu",
        "500 - 800 triệu",
        "800 triệu - 1 tỷ",
        "1 - 2 tỷ",
        "2 - 3 tỷ",
        "3 - 5 tỷ",
        "5 - 7 tỷ",
        "7 - 10 tỷ",
        "10 - 20 tỷ",
        "20 - 30 tỷ",
        "30 - 40 tỷ",
        "40 - 60 tỷ",
        "Trên 60 tỷ",
        "Thoả thuận",
      ],
      routerNameToType : routerNameToType,
      priceSelected: "",
      disabledSelectType: false,
      startFilterPrice: null,
      endFilterPrice: null,
      optionSize: [
        "Dưới 30 m²",
        "30 - 50 m²",
        "50 - 80 m²",
        "80 - 100 m²",
        "100 - 150 m²",
        "150 - 200 m²",
        "200 - 250 m²",
        "250 - 300 m²",
        "300 - 500 m²",
        "Trên 500 m²",
      ],
      postTypes: postType,
      sizeSelected: "",
      startFilterSize: null,
      endFilterSize: null,
      postTypeSelected: "",
      addressSelected: "",
      province: "",
      district: "",
      ward: "",
      provinces: [],
      districts: [],
      wards: [],
      projects: [],
      project: '',
      selectedOrderBy: "Tin mới nhất",
      posts: [],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
      type: "rent",
      filters: {
        'type_id': "",
        'startPrice': 0,
        'endPrice': 0,
        'project_id': "",
        'startSize': 0,
        'endSize': 0,
        'province': "",
        'district': "",
        'ward': "",
        'priceSelected': "",
      },
    }
  },
  components: {
    // "search-nav": SearchNav,
    ListPostError
  },
  methods: {
    setTitle() {
      if(this.filters.type_id) {
        this.title = postType[this.filters.type_id]
      } else if (this.type == "sell") {
        this.title = postType['sellPost']
      } else {
        this.title = postType['rentPost']
      }
      if(this.filters.province || this.filters.district) {
        this.title += " tại " + this.showAddress({province: this.filters.province, district: this.filters.district})
      } else {
        this.title += " trên toàn quốc"
      }
    },
    setPostType() {
      var currentRoute = this.$router.currentRoute.path
      if(currentRoute.includes('nha-dat-ban')) {
        this.type = "sell"
      } else {
        this.type = "rent"
      }
      if (this.$route.name != "rentPost" && this.$route.name != "sellPost") {
        this.postTypeSelected = this.routerNameToType[this.$route.name]
        this.filters.type_id = this.postTypeSelected
      } else {
        this.postTypeSelected = null
      }
    },
    updatePriceSelected() {
      // Xử lý logic để cập nhật giá trị của priceSelected dựa trên startFilterPrice và endFilterPrice
      // Ví dụ:
      if(this.startFilterPrice > this.endFilterPrice && this.endFilterPrice != 0){
        var $temp = this.startFilterPrice
        this.startFilterPrice = this.endFilterPrice
        this.endFilterPrice = $temp
      }
      if (this.startFilterPrice > 0 && this.endFilterPrice > 0 && this.endFilterPrice != 9999999999) {
        this.startFilterPrice/1000 >= 1 ? this.priceSelected = `${this.startFilterPrice/1000} tỷ - ` : this.priceSelected = `${this.startFilterPrice} triệu - `
        this.endFilterPrice/1000 >= 1 ? this.priceSelected += `${this.endFilterPrice/1000} tỷ` : this.priceSelected += `${this.endFilterPrice} triệu`
      } else if (this.startFilterPrice > 0) {
        this.startFilterPrice/1000 >=1 ? this.priceSelected = `>= ${this.startFilterPrice/1000} tỷ` : this.priceSelected = `>= ${this.startFilterPrice} triệu`
      } else if (this.endFilterPrice > 0) {
        this.endFilterPrice/1000 >= 1 ? this.priceSelected = `<= ${this.endFilterPrice/1000} tỷ` : this.priceSelected = `<= ${this.endFilterPrice} triệu`
      } else {
        this.priceSelected = ""
      }
    },

    updateSizeSelected() {

      if(this.startFilterSize > this.endFilterSize && this.endFilterSize != 0){
        var $temp = this.startFilterSize
        this.startFilterSize = this.endFilterSize
        this.endFilterSize = $temp
      }

      if (this.startFilterSize > 0 && this.endFilterSize > 0 && this.endFilterSize != 9999999999) {
        this.sizeSelected = `${this.startFilterSize} - ${this.endFilterSize} m²`
      } else if (this.startFilterSize > 0) {
       this.sizeSelected = `>= ${this.startFilterSize} m²`
      } else if (this.endFilterSize > 0) {
        this.sizeSelected = `<= ${this.endFilterSize} m²`
      } else {
        this.sizeSelected = ""
      }
    },

    updateSize() {
      switch (this.sizeSelected) {
        case "Dưới 30 m²":
        case "<= 30 m²":
          this.startFilterSize = 0
          this.endFilterSize = 30
          break;
        case "30 - 50 m²":
          this.startFilterSize = 30
          this.endFilterSize = 50
          break;
        case "50 - 80 m²":
          this.startFilterSize = 50
          this.endFilterSize = 80
          break;
        case "80 - 100 m²":
          this.startFilterSize = 80
          this.endFilterSize = 100
          break;
        case "100 - 150 m²":
          this.startFilterSize = 100
          this.endFilterSize = 150
          break;
        case "150 - 200 m²":
          this.startFilterSize = 150
          this.endFilterSize = 200
          break;
        case "200 - 250 m²":
          this.startFilterSize = 200
          this.endFilterSize = 250
          break;
        case "250 - 300 m²":
          this.startFilterSize = 250
          this.endFilterSize = 300
          break;
        case "300 - 500 m²":
          this.startFilterSize = 300
          this.endFilterSize = 500
          break;
        case "Trên 500 m²":
        case ">= 500 m²":
          this.startFilterSize = 500
          this.endFilterSize = 9999999999
          break;
        default:
          this.startFilterSize = 0
          this.endFilterSize = 0
          break;
      }
    },

    updateSellPrice() {
      if(this.priceSelected === "Dưới 500 triệu"){
        this.startFilterPrice = 0
        this.endFilterPrice = 500
      } else if(this.priceSelected === "500 - 800 triệu"){
        this.startFilterPrice = 500
        this.endFilterPrice = 800
      } else if(this.priceSelected === "800 triệu - 1 tỷ"){
        this.startFilterPrice = 800
        this.endFilterPrice = 1000
      } else if(this.priceSelected === "1 - 2 tỷ"){
        this.startFilterPrice = 1000
        this.endFilterPrice = 2000
      } else if(this.priceSelected === "2 - 3 tỷ"){
        this.startFilterPrice = 2000
        this.endFilterPrice = 3000
      } else if(this.priceSelected === "3 - 5 tỷ"){
        this.startFilterPrice = 3000
        this.endFilterPrice = 5000
      } else if(this.priceSelected === "5 - 7 tỷ"){
        this.startFilterPrice = 5000
        this.endFilterPrice = 7000
      } else if(this.priceSelected === "7 - 10 tỷ"){
        this.startFilterPrice = 7000
        this.endFilterPrice = 10000
      } else if(this.priceSelected == "10 - 20 tỷ"){
        this.startFilterPrice = 10000
        this.endFilterPrice = 20000
      } else if(this.priceSelected === "20 - 30 tỷ"){
        this.startFilterPrice = 20000
        this.endFilterPrice = 30000      
      } else if(this.priceSelected === "30 - 40 tỷ"){
        this.startFilterPrice = 30000
        this.endFilterPrice = 40000
      } else if(this.priceSelected === "40 - 60 tỷ"){
        this.startFilterPrice = 40000
        this.endFilterPrice = 60000
      } else if(this.priceSelected === "Trên 60 tỷ"){
        this.startFilterPrice = 60000
        this.endFilterPrice = 9999999999
      } else if(this.priceSelected === "Thoả thuận"){
        this.startFilterPrice = 0
        this.endFilterPrice = 0
      } else if(this.priceSelected === ""){
        this.startFilterPrice = 0
        this.endFilterPrice = 0
      }
    },

    updateRentPrice() {
      if(this.priceSelected === "Dưới 1 triệu"){
        this.startFilterPrice = 0
        this.endFilterPrice = 1
      } else if(this.priceSelected === "1 - 3 triệu"){
        this.startFilterPrice = 1
        this.endFilterPrice = 3
      } else if(this.priceSelected === "3 - 5 triệu"){
        this.startFilterPrice = 3
        this.endFilterPrice = 5
      } else if(this.priceSelected === "5 - 10 triệu"){
        this.startFilterPrice = 5
        this.endFilterPrice = 10
      } else if(this.priceSelected === "10 - 40 triệu"){
        this.startFilterPrice = 10
        this.endFilterPrice = 40
      } else if(this.priceSelected === "40 - 70 triệu"){
        this.startFilterPrice = 40
        this.endFilterPrice = 70
      } else if(this.priceSelected === "70 - 100 triệu"){
        this.startFilterPrice = 70
        this.endFilterPrice = 100
      } else if(this.priceSelected === "Trên 100 triệu"){
        this.startFilterPrice = 100
        this.endFilterPrice = 9999999999
      } else if(this.priceSelected === "Thoả thuận"){
        this.startFilterPrice = 0
        this.endFilterPrice = 0
      } else if(this.priceSelected === ""){
        this.startFilterPrice = 0
        this.endFilterPrice = 0
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
    async getListWard( district_id) {
      try {
        const response = await axios.get(`https://vapi.vnappmob.com/api/v2/province/ward/${district_id}`)
        if(response.status == 200) {
          this.wards = response.data.results
        }
      } catch (error) {
        console.error(error)
      }
    },

    resetFilter() {
      this.postTypeSelected = ''
      this.priceSelected = ''
      this.sizeSelected = ''
      this.startFilterPrice = null
      this.endFilterPrice = null
      this.startFilterSize = null
      this.endFilterSize = null
      this.province = null
      this.project = null
    },

    applyFilter() {
      this.filters = {
        'type_id': this.postTypeSelected,
        'startPrice': this.startFilterPrice,
        'endPrice': this.endFilterPrice,
        'startSize': this.startFilterSize,
        'endSize': this.endFilterSize,
        'province': this.province ? this.province : "",
        'district': this.district ? this.district : "",
        'ward': this.ward  ? this.ward : "",
        'project_id' : this.project,
        'priceSelected': this.priceSelected ? this.priceSelected : "",
      }
      this.setTitle()
      this.listPost(1)
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
    
    listPost(page) {
      var data = {
        ...this.filters,
        'type': this.type,
        'order_by': this.selectedOrderBy,
        // 'type_id': this.postTypeSelected,
      }
      PostApi.listRentSell(
        page,
        data,
        (response) => {
          this.posts = response.data.data
          this.currentPage = page;
          this.perPage = response.data.per_page;
          this.totalPage = response.data.last_page;
          this.total = response.data.total;
        }
      )
    },
    handleChangPage(val) {
      this.listPost(val)
    },
    ...mapActions(['commitSetBookmarkCount']),
    bookmark(post) {
      this.numberBookmark = this.bookmarkCount ? this.bookmarkCount : 0
      post.bookmark = !post.bookmark
      if(post.bookmark == 1) {
        this.numberBookmark += 1
      } else {
        this.numberBookmark -= 1
      }
      this.commitSetBookmarkCount(this.numberBookmark)
      BookmarkApi.bookmark(
        {
          'post_id': post.id,
        },
      )
    }
  },
  watch: {
    endFilterPrice() {
      this.updatePriceSelected()
    },
    startFilterPrice() {
      this.updatePriceSelected()
    },
    startFilterSize() {
      this.updateSizeSelected()
    },
    endFilterSize() {
      this.updateSizeSelected()
    },
    priceSelected() {
      if(this.type == "sell") {
        this.updateSellPrice()
      } else {
        this.updateRentPrice()
      }
    },
    sizeSelected() {
      this.updateSize()
    },
    province(val) {
      if(val){
        var $result = val.split("-")
        this.getListDistrict($result[1])
      } else {
        this.districts = []
        this.wards = []
        this.address = ""
      }
      this.listProjectOptions()
      this.district = ""
    },
    district(val) {
      if(val){
        var $result = val.split("-")
        this.getListWard($result[1])
      } else {
        this.wards = []
      }
      this.listProjectOptions()
      this.ward= ""
    },
    selectedOrderBy() {
      this.listPost(this.currentPage)
    },
    type() {
      this.listPost(this.currentPage)
    },
    '$route'() {
      this.setPostType()
      this.applyFilter()
    }
  },
}
</script>

<style scoped>
.component {
  display: flex;
  flex-direction: column
}

.rent-sell-post-page {
  display: flex
}

.post-filter-container {
  flex: 1;
  margin-left: 20px
}

.post-list-container {
  flex: 2;
  margin-top: 30px;
  margin-left: -10px
}

.filter-post {
  margin: 30px 0 0 40px;
  min-width: 250px;
  width: 70%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column
}

.input-filter {
  margin: 5px 0 10px 0;
  width: 100%;
}

.action-filter {
  display: flex;
  flex-direction: row;
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

.ren-selt-post-bookmark {
  position: absolute;
  bottom: 20px;
  right: 30px;
  background-color: white;
  height: 30px;
  width: 30px; /* Tăng kích thước để có kích thước vuông */
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Thêm bóng đổ cho nút */
}

.rent-sell-post-published {
  position: absolute;
  bottom: 5px;
}

.link-to-detail {
  text-decoration: none;
}

.bookmarked {
  color: red;
}

.paginate-page{
  width: 85%;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>