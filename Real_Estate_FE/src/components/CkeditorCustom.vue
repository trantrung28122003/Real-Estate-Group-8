<template>
    <ckeditor :editor="editor" :config="editorConfig" v-model="editorData" ></ckeditor>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import uploader from '../utils/functions'
export default {
    props: ['value', 'type'],
    data() {
        return {
            editorData: this.value,
            editor: ClassicEditor,
            editorConfig: {
                extraPlugins: [uploader],
                placeholder: this.type == 'project' ? "Thêm mô tả về dự án ở đây ....." : "Thêm nội dung tin tức ở đây .....",
            },
        }
    },
    watch: {
        value(newValue) {
            this.editorData = newValue;
        },
        editorData(newValue) {
            this.$emit('input', newValue);
        }
    }
}
</script>