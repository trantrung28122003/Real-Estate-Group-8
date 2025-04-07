<template>
  <div>
    <post-detail />
    <real-estate-for-you />
    <post-view-history />
  </div>
</template>

<script>
import RealEstateForYou from "@/components/Home/RealEstateForYou.vue";
import PostDetail from "@/components/ManagePost/PostDetail.vue";
import PostViewHistory from '@/components/ManagePost/PostViewHistory.vue';
export default {
  components: {
    'real-estate-for-you' : RealEstateForYou,
    'post-detail': PostDetail,
    'post-view-history' : PostViewHistory,
  },
};
</script>

<style>
</style>