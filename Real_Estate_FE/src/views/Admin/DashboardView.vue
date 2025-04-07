<template>
  <div>
    <h3>Dashboard</h3>
    <data-oveview/>
    <review-display/>
  </div>
</template>

<script>
import DataOveview from '@/components/Admin/Dashboard/DataOverview.vue'
import ReviewDisplay from '@/components/Admin/Dashboard/ReviewDisplay.vue'
export default {
  components: {
    DataOveview,
    ReviewDisplay,
  },
  data() {
    return {
    }
  },
  methods: {
        
  },
}
</script>

<style scoped>

</style>