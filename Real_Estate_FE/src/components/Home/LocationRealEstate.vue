<template>
  <div>
    <!-- <div class="container">
      <h4>Bất động sản theo địa điểm</h4>
      <div class="row">
        <div class="col-6 col-md-4 col-lg-3" v-for="(item,index) in locationRealEstate" :key="index">
            <router-link :to="{ name: 'sellPost', params: { province: locationImage[item.province].code } }" style="text-decoration: none;">
                <div class="location-real-estate" v-if="locationImage[item.province]" :style="'background-image: url(' + locationImage[item.province].url + ');'">
                    <div class="text-location-realestate">
                        <span style="font-weight: 700;">{{ locationImage[item.province].text }}</span>
                        <p style>{{ item.total }} tin đăng</p>
                    </div>
                </div>

                <div v-else class="location-real-estate" style="background-image: url(https://www.ohanaliving.vn/542ac03681516bcca0dd605bedd41a2b.jpg);">
                    <span style="font-weight: 700;">{{item.province }}</span>
                    <p style>{{ item.total }} tin đăng</p>
                </div>
            </router-link>
        </div>
      </div>
        
    </div> -->
  </div>
</template>

<script>
import locationImage from "@/data/locationImage"
import PostApi from "@/api/post"
export default {
    mounted() {
        this.listLocationRealEstate();
    },
    data() {
        return {
            locationImage : locationImage,
            locationRealEstate : [],
        }
    },

    methods: {
        listLocationRealEstate() {
            PostApi.location(
                (response) => {
                    this.locationRealEstate = response.data;
                }
            )
        },

        // showimage(item){
            
        // }
    }

}
</script>

<style>
.location-real-estate{
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 10px;
    margin-bottom: 20px;
}

.text-location-realestate{
    color: white;
    padding-top: 20px;
    padding-left: 20px;
}

h4 {
  margin: 30px 0 10px 0;
}
</style>