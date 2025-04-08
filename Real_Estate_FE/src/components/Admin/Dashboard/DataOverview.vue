<template>
    <div style="margin: 20px 0px 20px 0px;" class="row" v-if="data">
        <div class="col-lg-4 col-6" v-for="item in data" :key="item.id">
            <div
              class="small-box"
              :class="{
                'bg-success': item['name'].includes('projects'),
                'bg-warning': item['name'].includes('rating'),
                'bg-danger': item['name'].includes('posts'),
                'bg-info': item['name'].includes('account'),
              }"
            >
              <div class="inner">
                <div class="inline-content">
                    <h3>{{ item['count'] ? item['count'] : 0 }}</h3>
                    <p style="margin-left: 10px;">{{ item['label'] }}</p>
                </div>
                <div v-if="dataRequest.includes(item['name'])" class="inline-content">
                    <h4>{{ item['request'] ? item['request'] : 0 }}</h4>
                    <p style="margin-left: 10px;">Chờ duyệt</p>
                </div>
                <div v-if="item['name'] == 'user_accounts'" class="inline-content">
                    <h4>{{ item['active'] ? item['active'] : 0 }}</h4>
                    <p style="margin-left: 10px;">Hoạt động</p>
                </div>
                <div v-if="item['name'] == 'rating'" class="inline-content">
                    <h4>{{ item['avg_rating'] ? item['avg_rating'] : 0 }}</h4>
                    <p style="margin-left: 5px;"><i class="fa-solid fa-star"></i></p>
                </div>
              </div>
              <div class="icon">
                <i v-if="item['name'] == 'posts'" class="fa-regular fa-file-lines"></i>
                <i v-if="item['name'] == 'projects'" class="fa-solid fa-building"></i>
                <i v-if="item['name'] == 'user_accounts'" class="fa-solid fa-users"></i>
                <i v-if="item['name'] == 'enterprise_accounts'" class="fa-solid fa-building-user"></i>
                <i v-if="item['name'] == 'broker_accounts'" class="fa-solid fa-user-tie"></i>
                <i v-if="item['name'] == 'rating'" class="fa-solid fa-star"></i>
              </div>
              <a @click="gotoPage(item)" class="small-box-footer">Xem chi tiết  <i class="fas fa-arrow-circle-right"></i></a>
            </div>
        </div>
    </div>  
</template>

<script>
import AdminDashboardApi from "@/api/admin/adminDashboard"
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            dataRequest: ['posts', 'projects', 'enterprise_accounts', 'broker_accounts'],
            data: [],
        }
    },
    created() {
        this.getData()
    },
    methods: {
        ...mapActions(['commitSetPostRequestCount', 'commitSetProjectRequestCount', 'commitSetEnterpriseRequestCount', 'commitSetBrokerRequestCount']),
        getData() {
            AdminDashboardApi.overview(
                (reponse) => {
                    this.data = reponse.data
                    var object = this.data.find(item => item.name === "posts");
                    var requestValue = object ? object.request : 0;
                    this.commitSetPostRequestCount(requestValue)
                    
                    object = this.data.find(item => item.name === "projects");
                    requestValue = object ? object.request : 0;
                    this.commitSetProjectRequestCount(requestValue)

                    object = this.data.find(item => item.name === "enterprise_accounts");
                    requestValue = object ? object.request : 0;
                    this.commitSetEnterpriseRequestCount(requestValue)

                    object = this.data.find(item => item.name === "broker_accounts");
                    requestValue = object ? object.request : 0;
                    this.commitSetBrokerRequestCount(requestValue)
                }
            ) 
        },
        gotoPage(item) {
            var href = ''
            switch (item['name']) {
                case 'posts':
                    href = '/admin/danh-sach-tin-dang'
                    break
                case 'projects':
                    href = '/admin/danh-sach-du-an'
                    break
                case 'user_accounts':
                    href = '/admin/quan-ly-nguoi-dung'
                    break
                case 'enterprise_accounts':
                    href = '/admin/quan-ly-doanh-nghiep'
                    break
                case 'broker_accounts':
                    href = '/admin/quan-ly-nha-moi-gioi'
                    break
                case 'rating':
                    href = '#user_review'
                    break
                default:
                    break
            }
            if(href) {
                if(href.includes('#')) {
                    this.scrollTo(href)
                } else {
                    this.$router.push(href)
                }
            }
        }
    },
}
</script>

<style>

</style>