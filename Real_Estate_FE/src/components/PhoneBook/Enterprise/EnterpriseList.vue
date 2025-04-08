<template>
    <div>
        <h4>Các doanh nghiệp, công ty bất động sản hàng đầu tại Việt Nam</h4>
        <div v-for="(item, index) in Object.keys(topEnterprises)" :key="index">
            <h5 @click="search(item)" class="col-6 field-name"> {{ item }}</h5>
            <div class="row enterprise-list">
                <div class="col-2 single-enterprise" v-for="enterprise in topEnterprises[item]" :key="enterprise.id">
                    <router-link class="link-to-detail" :to="`/doanh-nghiep/${enterprise.id}`">
                        <div class="row single-enterprise-content">
                            <img class="enterprise_logo" :src="enterprise.logo" :alt="enterprise.name">
                            <h3 class="enterprise-name"> {{ enterprise.name }}</h3>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            topEnterprises: {
                'Chủ đầu tư' : [
                    {
                        id: "1",
                        name: "Công ty Cổ phần Tập đoàn Tư vấn Đầu tư Xây dựng Kiên Giang (CIC Group) sdhdhshhddhdh",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "2",
                        name: "Kim oanh Group",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "3",
                        name: "Công ty CP Đầu tư & Phát triển Bất động sản TNR Holdings Việt Nam (TNR Holdings)",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "4",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                ],
                'Thi công xây dựng' : [
                    {
                        id: "5",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "6",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "7",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "8",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                ],
                'Sàn giao dịch bất động sản' : [
                    {
                        id: "9",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "10",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "11",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "12",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                ],
                'Trang trí nội thất' : [
                    {
                        id: "13",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "14",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "15",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "16",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                ],
                'Vật liệu xây dựng' : [
                    {
                        id: "17",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "18",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "19",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "20",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                ],
                'Tư vấn thiết kế' : [
                    {
                        id: "21",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "22",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "23",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "24",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                ],
                'Tài chính pháp lý' : [
                    {
                        id: "25",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "26",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "27",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "28",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                ],
                'Các lĩnh vực khác' : [
                    {
                        id: "29",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "30",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "31",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                    {
                        id: "32",
                        name: "VinGroup",
                        logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                    },
                ],
            }
        }
    },
    methods: {
        search(field) {
            this.$router.push({ path: '/tim-kiem-doanh-nghiep', query: {
                f : field,
            }});
        }
    }

}
</script>

<style scoped>
.enterprise-list {
    margin-top: 20px;
    min-width: 875px;
}

.field-name {
    margin-top: 30px;
    cursor: pointer;
}

.single-enterprise {
    margin: 0px 10px;
    border: 1px solid rgb(218, 198, 198);
    padding: 5px;
    border-radius: 5px;
    min-height: 175px;
}

.single-enterprise-content {
    justify-content: center;
}

.enterprise-name {
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #000;
}

.enterprise_logo {
    width: 90%;
    padding: 15px;
}
</style>