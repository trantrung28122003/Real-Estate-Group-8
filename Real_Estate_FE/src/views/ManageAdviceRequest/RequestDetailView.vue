<template>
  <div class="create-post">
    <el-card class="post-infor card">
      <h4 style="color: #0e58a0">{{ request.title }}</h4>
      <div>
        <span>Tài chính: </span>
        <span class="request-address">{{ showPrice(request.data.price) }}</span>
      </div>
      <div>
        <span>Loại bất động sản cần tìm: </span>
        <span class="request-address">{{ postType[request.type_id] }}</span>
      </div>
      <div class="request-address">
        <i class="el-icon-location-outline"></i>
        {{ showAddress(request) }}
      </div>

      <h5 class="sub-title">Các yêu cầu về bất động sản</h5>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="label-infor">Diện tích</div>
        </el-col>
        <el-col :span="6"
          ><div>{{ request.data.size }}</div></el-col
        >
        <el-col :span="6">
          <div class="label-infor">Tài chính</div>
        </el-col>
        <el-col :span="6"
          ><div>{{ showPrice(request.data.price) }}</div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="label-infor">Số phòng khách</div>
        </el-col>
        <el-col :span="6"
          ><div>
            {{
              request.data.livingRoom
                ? request.data.livingRoom + " phòng"
                : "N/A"
            }}
          </div></el-col
        >
        <el-col :span="6">
          <div class="label-infor">Số phòng ngủ</div>
        </el-col>
        <el-col :span="6"
          ><div>
            {{ request.data.bedroom ? request.data.bedroom + " phòng" : "N/A" }}
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="label-infor">Số tầng</div>
        </el-col>
        <el-col :span="6"
          ><div>
            {{ request.data.floor ? request.data.floor + " tầng" : "N/A" }}
          </div></el-col
        >
      </el-row>
      <h5 v-if="request.description" class="sub-title">Thông tin mô tả thêm</h5>
      <p>{{ request.description }}</p>
    </el-card>
    <h3 class="page-title">Thông tin nhà môi giới đã chọn</h3>
    <list-broker-applied
      style="width: 90%;"
      :brokers="brokerAccepted"
      :brokerAccepted="true"
      @deleteBroker="brokerAccepted = []"
      @review="getBrokerAccepted()"
    />
    <h3 class="page-title">Danh sách nhà môi giới đã đăng kí</h3>
    <list-broker-applied
      style="width: 90%"
      :brokers="brokerApplieds"
      :disabled="brokerAccepted.length ? true : false"
      @acceptBroker="changeListen"
    />
    <div class="paginate-page" v-if="brokerApplieds.length">
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
import AdviceRequestApi from "@/api/adviceRequest";
import postType from "@/data/postType";
import ListBrokerApplied from "@/components/ManageAdviceRequest/ListBrokerApplied.vue";

export default {
  components: {
    ListBrokerApplied,
  },
  data() {
    return {
      request: {
        province: "-",
        district: "-",
        data: {
          price: null,
        },
      },
      postType: postType,
      brokers: [],
      brokerAccepted: [],
      brokerApplieds: [],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
    };
  },
  created() {
    this.getRequestDetail();
    this.getBrokerAccepted();
    this.listBrokerApplied(1);
  },
  methods: {
    handleChangPage(val) {
      this.listBrokerApplied(val);
    },
    getRequestDetail() {
      AdviceRequestApi.getDetail(this.$route.params.id, (response) => {
        this.request = response.data;
      });
    },
    changeListen() {
      this.getBrokerAccepted();
      this.listBrokerApplied(1);
    },
    showPrice(price) {
      return price / 1000 >= 1
        ? (price / 1000).toFixed(2) + " tỷ"
        : price + " triệu";
    },
    getBrokerAccepted() {
      AdviceRequestApi.getBrokerAccepted(this.$route.params.id, (response) => {
        this.brokerAccepted = response.data;
      });
    },
    listBrokerApplied(page) {
      AdviceRequestApi.listBrokerApplied(
        this.$route.params.id,
        page,
        (response) => {
          this.brokerApplieds = response.data.data;
          this.currentPage = page
          this.perPage = response.data.per_page
          this.totalPage = response.data.last_page
          this.total = response.data.total
        }
      );
    },
  },
};
</script>

<style scoped>
.card {
  width: 80%;
  margin: 3% 10%;
  padding: 20px;
}

.create-post {
  width: 100%;
  padding-left: 20px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.request-address {
  margin-top: 5px;
  font-size: 16px;
  font-weight: 600;
}
.page-title {
  margin: 10px 0px 20px 0px;
}
.paginate-page {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>