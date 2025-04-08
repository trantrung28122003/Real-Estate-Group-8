<template>
    <div class="location-news">
        <h6> Tin tức BĐS tại các tỉnh thành sôi động nhất </h6>
        <hr>
        <div class="top-news-by-location">
            <div @click="goto('hn')" class="news-by-location">
                <img src="https://images.foody.vn/images/_MG_0475_copy_copy.JPG" alt=""/>
                <span> Hà Nội </span>
            </div>
            <div @click="goto('hcm')" class="news-by-location">
                <img src="https://hinhanhdephd.com/wp-content/uploads/2020/01/tong-hop-nhung-hinh-anh-thanh-pho-dep-nhat-21-min-741x486.jpg" alt=""/>
                <span> Hồ Chí Minh </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goto(province) {
            var queryParams = {}
            if(province) {
                queryParams.p = province
            }
            this.$router.replace({ query: queryParams }).catch(err => {
                if (err.name !== 'NavigationDuplicated') {
                    throw err;
                }
            })
        },
    },
}
</script>

<style scoped>
.location-news {
    padding: 20px 20px;
    width: 100%;
    border-radius: 10px;
    border: 0.5px solid #f2f2f2;
    margin: 20px 0 10px 10px;
}

.top-news-by-location {
    display: flex;
    flex-direction: row;
}

.news-by-location {
    cursor: pointer;
    position: relative;
    width: 45%;
    height: 80px;
    margin: 0px 10px 0px 10px;
}

.news-by-location img {
    width: 100%;
    height: 80px;
    border-radius: 10px;
}

.news-by-location span {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 10px;
    left: 5px;
    color: white;
    width: 100%;
}

@media screen and (max-width: 1260px) {
    .news-by-location {
        width: 175px;
        height: 80px;
        margin: 0px 10px 0px 10px;
    }
}
</style>