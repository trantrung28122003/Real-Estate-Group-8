<template>
  <div class="search-container">
    <div style="margin-top: 15px">
      <el-input
        placeholder="Nhập tiêu đề, địa chỉ của bất động sản cần tìm kiếm" v-model="search_field"
        class="search-field"
      >
        <el-button type="danger" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            search_field:"",
        }
    }
};
</script>

<style>
.search-container{
    margin-top: 40px;
    display: flex;
    justify-content: center;
    width: 100%;
}
.search-field {
  width: 150%;
}
</style>