<template>
    <div class="container">
      <h4>Danh sách tin chờ duyệt</h4>
      <p>Hiện có {{ total }} bất động sản</p>
      <el-input
        placeholder="Tìm kiếm theo ID hoặc tên dự án"
        class="search-field"
        v-model="search"
        clearable
      >
      </el-input>
      <el-button type="success" style="margin-left: 10px" @click="listRequestPost(1)">Tìm kiếm</el-button>
      <el-button type="primary" @click="handleReset()">Đặt lại</el-button>
      <div class="select-post-type">
        <el-select
          style="margin-bottom: 10px"
          v-model="selectedOrderBy"
          placeholder="Tin mới nhất"
        >
          <el-option value="Tin mới nhất">Tin mới nhất</el-option>
          <el-option value="Giá thấp đến cao">Giá thấp đến cao</el-option>
          <el-option value="Giá cao đến thấp">Giá cao đến thấp</el-option>
          <el-option value="Diện tích lớn đến bé">Diện tích lớn đến bé</el-option>
          <el-option value="Diện tích bé đến lớn">Diện tích bé đến lớn</el-option>
        </el-select>
        <div class="type-post">
          <el-button :class="{ active_selected: type === 'sell' }" @click="type = 'sell'" style="width: 100px; margin-right: -10px">Bán</el-button>
          <el-button :class="{ active_selected: type === 'rent' }" @click="type = 'rent'">Cho thuê</el-button>
        </div>
      </div>
      <div style="width: 100%;">
        <list-post :posts="posts" @acceptRejectAction="updateRequestCount()"/>
        <div v-if="posts.length" class="paginate-page">
          <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import { Notification } from 'element-ui'
import AdminPostApi from '@/api/admin/adminPost'
import ListPost from '@/components/Admin/Post/ListPost.vue';
export default {
  components: {
    ListPost,
  },
  computed: mapState({
    postRequestCount: (state) => state.postRequestCount,
  }),
  mounted() {
    this.listRequestPost(1)
  },
  data() {
    return {
      selectedOrderBy: "Tin mới nhất",
      requestNumber: 0,
      posts: [],
      search: "",
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
      type: "sell",
    };
  },
  methods: {
    listRequestPost(page) {
      AdminPostApi.listRequestPost(
        page,
        {
          'search' : this.search,
          'order_by': this.selectedOrderBy,
          'type': this.type,
        },
        (response) => {
          this.posts = response.data.data
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
    handleChangPage(val) {
      this.listRequestPost(val)
    },
    handleReset() {
      this.search = ''
      this.listRequestPost(1)
    },
    ...mapActions(['commitSetPostRequestCount']),
    updateRequestCount() {
      this.requestNumber = this.postRequestCount
      this.requestNumber -= 1
      this.commitSetPostRequestCount(this.requestNumber)
      this.listRequestPost(1)
    }
  },
  watch: {
    selectedOrderBy() {
      this.listRequestPost(this.currentPage)
    },
    type() {
      this.listRequestPost(this.currentPage)
    }
  },
};
</script>

<style scoped>
.content-page {
  margin-left: 100px;
  width: 70%;
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

.search-field {
  width: 400px;
  margin-bottom: 10px;
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