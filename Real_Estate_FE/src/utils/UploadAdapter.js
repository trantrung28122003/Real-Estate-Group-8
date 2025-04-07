import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase.js"
export default class UploadAdapter {
    constructor( loader ) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return new Promise((resolve, reject) => {
            this.loader.file.then(async (file) => {
                try {
                    if (!file) return;
                    var storageRef = null
                    var downloadURL = ""
                    storageRef = ref(
                        storage,
                        `projects/` +
                          Math.random().toString(36).slice(2, 8) +
                          `${file.name}`
                        );
                      await uploadBytes(storageRef, file)
                      downloadURL = await getDownloadURL(storageRef)
                    resolve({ default: downloadURL })
                } catch (error) {
                    reject(error)
                }
            })
        })
    }
}