import UploadAdapter from './UploadAdapter'
export default function uploader(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = ( loader ) => {
        return new UploadAdapter( loader );
    }
}