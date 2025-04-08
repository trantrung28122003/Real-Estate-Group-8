<template>
    <div>
        <div>
            <h4 class="list_titles">Các doanh nghiệp tương tự</h4>
        </div>
        <div class="slider-container">
            <div class="slider-wrapper">
                <el-button id="prev-slide" class="slide-button" size="small"><i class="el-icon-arrow-left"></i></el-button>
                <ul class="image-list">
                    <div class="image-item" v-for="(item, index) in enterprise_list" :key="index">
                        <img class="enterprise_logo" :src="item.logo" :alt="item.name">
                    </div>
                </ul>
                <el-button id="next-slide" class="slide-button" size="small"><i class="el-icon-arrow-right"></i></el-button>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/slider.js"
export default {
    data() {
        return {
            enterprise_list: [
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2017/08/30/hmcVYWuR/20170830161956-84f8.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2017/08/30/hmcVYWuR/20170830161956-84f8.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2017/08/30/hmcVYWuR/20170830161956-84f8.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2017/08/30/hmcVYWuR/20170830161956-84f8.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2017/08/30/hmcVYWuR/20170830161956-84f8.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2017/08/30/hmcVYWuR/20170830161956-84f8.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2017/08/30/hmcVYWuR/20170830161956-84f8.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2017/08/30/hmcVYWuR/20170830161956-84f8.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2017/08/30/hmcVYWuR/20170830161956-84f8.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2017/08/30/hmcVYWuR/20170830161956-84f8.jpg",
                },
                {
                    name: "",
                    logo: "https://file4.batdongsan.com.vn/2021/08/05/20210805171156-a7b6.jpg",
                },
            ],
        }
    },
}
</script>

<style scoped>
.enterprise-list {
    margin-top: 20px;
}

.enterprise_logo {
    width: 100%;
    border: 1px solid rgb(218, 198, 198);
    padding: 15px;
    border-radius: 5px;
}

.slider-container {
    max-width: 1200px;
    width: 95%;
}
.slider-wrapper {
    position: relative;
}
.slider-wrapper .slide-button {
    position: absolute;
    top: 50%;
    outline: none;
    border: none;
    height: 50px;
    width: 50px;
    z-index: 5;
    color: #fff;
    display: flex;
    cursor: pointer;
    font-size: 2.2rem;
    background: #000;
    /* align-items: center;
    justify-content: center; */
    border-radius: 50%;
    transform: translateY(-50%);
}
.slider-wrapper .slide-button:hover {
    background: #404040;
}

.slider-wrapper .slide-button {
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
}
.slider-wrapper .slide-button#prev-slide {
    left: -25px;
}
.slider-wrapper .slide-button#next-slide {
    justify-content: center;
    right: -25px;
}
.slider-wrapper .image-list {
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    gap: 18px;
    font-size: 0;
    list-style: none;
    margin-bottom: 30px;
    overflow-x: auto;
    scrollbar-width: none;
}
.slider-wrapper .image-list::-webkit-scrollbar {
    display: none;
}
.slider-wrapper .image-list .image-item {
    width: 175px;
    /* height: 125px; */
    object-fit: cover;
}

</style>