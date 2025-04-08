<template>
  <div v-if="isVisible" class="image-modal" @click="closeModal">
    <div class="image-modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <el-image
        class="full-image"
        :src="imageUrl"
        fit="cover"></el-image>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    imageUrl: String,
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
}

.image-modal-content {
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  font-size: 30px;
  cursor: pointer;
}

.full-image {
  max-width: 100%;
  max-height: 100%;
}
</style>