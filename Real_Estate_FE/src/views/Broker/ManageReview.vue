<template>
  <div class="container">
    <h4>Đánh giá từ người dùng</h4>
    <el-table border :data="reviews" stripe style="width: 100%; margin-top: 20px;">
      <el-table-column align="center" label="Người dùng" width="260">
        <template slot-scope="scope">
          <router-link :to="`/chi-tiet-nguoi-dung/${scope.row.user_id}`" class="username-avt">
            <div style="margin-right: 10px;">
              <el-avatar v-if="scope.row.avatar" shape="circle" :size="60" fit="fill" :src="scope.row.avatar"></el-avatar>
              <el-avatar v-else shape="circle" :size="60" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
            </div>
            <div>
              <span style="font-weight: 600; color: #0e58a0">{{
                scope.row.name
              }}</span>
            </div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" width="250" label="Yêu cầu tư vấn">
        <template slot-scope="scope">
            <span @click="openRequestDetail(scope.row.advice_request)" class="hover-pointer" style="font-weight: 600; color: #0e58a0">{{
                scope.row.advice_request.title
            }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="160" label="Đánh giá">
        <template slot-scope="scope">
            <el-rate v-model="scope.row.rating" disabled></el-rate>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Nội dung">
        <template slot-scope="scope">
            <span>{{ scope.row.review ?  scope.row.review : 'N/A'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Thời gian" width="120">
        <template slot-scope="scope">
            <span>{{ showTime(scope.row.created_at) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
    class="dialog-custom-title"
      width="600px"
      :visible.sync="openDialog"
    >
        <template #title>
            <h4 style="color: #0e58a0">{{ selectedRequest.title }}</h4>
        </template>
        <div>
          <span>Tài chính: </span>
          <span class="request-address">{{
            showPrice(selectedRequest.data.price)
          }}</span>
        </div>
        <div>
          <span>Yêu cầu tư vấn về: </span>
          <span class="request-address">{{
            changeTypePost(postType[selectedRequest.type_id])
          }}</span>
        </div>
        <div class="request-address">
          <i class="el-icon-location-outline"></i>
          {{ showAddress(selectedRequest) }}
        </div>
        <h6 style="font-size: 18px;" class="sub-title">Các yêu cầu về bất động sản</h6>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="label-infor">Diện tích</div>
          </el-col>
          <el-col :span="6"
            ><div>{{ selectedRequest.data.size }}</div></el-col
          >
          <el-col :span="6">
            <div class="label-infor">Tài chính</div>
          </el-col>
          <el-col :span="6"
            ><div>{{ showPrice(selectedRequest.data.price) }}</div></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="label-infor">Số phòng khách</div>
          </el-col>
          <el-col :span="6"
            ><div>
              {{
                selectedRequest.data.livingRoom
                  ? selectedRequest.data.livingRoom + " phòng"
                  : "N/A"
              }}
            </div></el-col
          >
          <el-col :span="6">
            <div class="label-infor">Số phòng ngủ</div>
          </el-col>
          <el-col :span="6"
            ><div>
              {{
                selectedRequest.data.bedroom
                  ? selectedRequest.data.bedroom + " phòng"
                  : "N/A"
              }}
            </div></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="label-infor">Số tầng</div>
          </el-col>
          <el-col :span="6"
            ><div>
              {{
                selectedRequest.data.floor ? selectedRequest.data.floor + " tầng" : "N/A"
              }}
            </div></el-col
          >
        </el-row>
        <h6 style="font-size: 18px;" v-if="selectedRequest.description" class="sub-title">
          Thông tin mô tả thêm
        </h6>
        <p>{{ selectedRequest.description }}</p>
    </el-dialog>
    <div v-if="reviews.length" class="paginate-page">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="perPage"
        :page-count="totalPage"
        @current-change="handleChangPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import BrokerApi from "@/api/broker";
import postType from '@/data/postType';
export default {
  data() {
    return {
      search: "",
      selectedRequest: {
        created_at: null,
        data: {
            bedroom: null,
            floor: null,
            livingRoom: null,
            price: null,
            size: null,
        },
        description: null,
        district: '-',
        id: null,
        project_id: null,
        province: '-',
        title: null,
        type_id: null,
      },
      postType: postType,
      reviews: [],
      openDialog: false,
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
    };
  },
  mounted() {
    this.listReview(1)
  },
  methods: {
    listReview(page) {
      BrokerApi.listReview(
        page,
        (response) => {
          this.reviews = response.data.data
          this.currentPage = page
          this.perPage = response.data.per_page
          this.totalPage = response.data.last_page
          this.total = response.data.total
        },
      );
    },

    handleChangPage(val) {
      this.listReview(val)
    },
    openRequestDetail(request) {
      this.openDialog = true
      this.selectedRequest = {
        ...request
      }
    },
    showPrice(price) {
      return price / 1000 >= 1
        ? (price / 1000).toFixed(2) + " tỷ"
        : price + " triệu";
    },
  },
};
</script>

<style scoped>
.container{
  padding-top: 30px;
}
.paginate-page {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.username-avt {
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card {
  margin: 0px 10px;
  /* padding: 20px; */
}

.request-address {
    margin-top: 5px;
  font-size: 16px;
  font-weight: 600;
}
</style>