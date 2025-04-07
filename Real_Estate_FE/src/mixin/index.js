import postType from '@/data/postType.js'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase.js"
import fieldList from '@/data/fieldList.js'
export default {
    methods: {
        showAddress(post) {
            var district = post.district.split("-")[0]
            var province = post.province.split("-")[0]
            province = province.replace("Thành phố ", "")
            province = province.replace("Tỉnh ", "")
            if (province == "Hồ Chí Minh") {
                if (district.split(" ").length > 2 && district.split(" ")[0] == "Quận") {
                    district = district.replace("Quận ", "")
                }
            } else {
                district = district.replace("Quận ", "")
            }
            district = district.replace("Huyện ", "")
            district = district.replace("Thành phố ", "")
            return district ? district + ', ' + province : province
        },

        showPrice(card) {
            if (card.unit == "Thỏa Thuận") {
                return "Giá Thoả thuận";
            } else {
                if (card.type == "sell") {
                    if (card.unit == "VND/m2") {
                        return card.price / 1000 >= 1
                            ? (card.price / 1000).toFixed(2) + " tỷ" + "/m²"
                            : card.price + " triệu" + "/m²"
                    } else {
                        return card.price / 1000 >= 1
                            ? (card.price / 1000).toFixed(2) + " tỷ"
                            : card.price + " triệu"
                    }
                } else {
                    return card.price / 1000 >= 1
                        ? (card.price / 1000).toFixed(2) + " tỷ" + "/tháng"
                        : card.price + " triệu" + "/tháng";
                }
            }
        },

        showProvince(post) {
            var province = post.province.split("-")[0]
            province = province.replace("Thành phố ", "")
            province = province.replace("Tỉnh ", "")
            return province
        },
        
        showDistrict(post) {
            var district = post.district.split("-")[0]
            var province = post.province.split("-")[0]
            province = province.replace("Thành phố ", "")
            if (province == "Hồ Chí Minh") {
                if (district.split(" ").length > 2 && district.split(" ")[0] == "Quận") {
                    district = district.replace("Quận ", "")
                }
            } else {
                district = district.replace("Quận ", "")
            }
            district = district.replace("Huyện ", "")
            district = district.replace("Thành phố ", "")
            return district
        },

        formatDate(formatDate = new Date())
        {
            const date = new Date(formatDate);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;

            return formattedDate;
        },

        showTime(time) {
            const created_at = new Date(time)
            const current = new Date()
            const diffTime = current - created_at;
            if(diffTime/ (1000 * 60) < 60) {
                return Math.round(diffTime/ (1000 * 60)) + " phút trước"
            } else if(diffTime/ (1000 * 60 * 60) <= 23) {
              return Math.round(diffTime/ (1000 * 60 * 60)) + " giờ trước"
            } else if(diffTime/ (1000 * 60 * 60 * 24) < 7) {
              return Math.round(diffTime/ (1000 * 60 * 60 * 24)) + " ngày trước"
            } else {
                return this.formatDate(time)
            }
        },

        coppyClipboard(data) {
            navigator.clipboard.writeText(data)
        },

        isPhoneNumber(value) {
            if(value) {
                return /^\d{10}$/.test(value)
            } else {
                return true
            }
        },

        isArray(value) {
            if(Array.isArray(value)) {
                return value.length
            } else {
                return false
            }
        },

        showBrokerageArea(item) {

            if(item.project_name) {
                return postType[item.type_id] + ' tại ' + item.project_name + ', ' + this.showAddress(item)
            } else {
                return postType[item.type_id] + ' tại ' + this.showAddress(item)
            }
        },

        changeTypePost(type) {
            if(type) {
                type = type.replace("Bán", "Mua")
                type = type.replace("Cho thuê", "Thuê")
            }
            return type
        },

        uploadImage(loader) {
            return {
                upload: () => {
                    return new Promise((resolve, reject) => {
                        loader.file.then(async (file) => {
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
        },

        // getStatusClass(project) {
        //     return {
        //         'status-pending': project.status === 'Sắp mở bán',
        //         'status-completed': project.status === 'Đang mở bán',
        //         'status-handed': project.status === 'Đã bàn giao',
        //         'status-in-progress': project.status == ''
        //     };
        // },

        changeFieldNameToId(name) {
            for (const key in fieldList) {
                if (fieldList[key].name === name) {
                    return fieldList[key].id;
                }
            }
        },

        generateUniqueName(originalName) {
            // Tạo một tên mới dựa trên thời gian và tên gốc của ảnh
            const timestamp = new Date().getTime();
            const randomString = Math.random().toString(36).substring(2, 8);
            const fileExtension = originalName.split('.').pop();
            return `${timestamp}_${randomString}.${fileExtension}`;
        },

        scrollTo(target) {
            if (document.querySelector(target)) {
                document.querySelector(target).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
        },

        showEnterpriseName(enterprise) {
            if(enterprise.abbreviation) {
                return enterprise.name + ' (' + enterprise.abbreviation + ') '
            } else {
                return enterprise.name
            }
        },

        showProjectPrice(project) {
            if(project.start_price) {
                if(project.end_price) {
                    return project.start_price + " - " + project.end_price + " triệu/m²"
                } else {
                    return project.start_price + " triệu/m²"
                }
            } else {
                return "N/A"
            }
        },

        showProjectSize(project) {
            return project.size + " " + project.size_unit
        },

        goBack() {
            this.$router.go(-1);
        },

        gotoPage(page) {
            this.$router.push({ name: page }).catch((err) => {
                if (err.name !== "NavigationDuplicated") {
                  throw err;
                }
            })
        },

        getStatusClass(project) {
            return {
                'status-pending': project.project_status == 1,
                'status-completed': project.project_status == 2,
                'status-handed': project.project_status == 3,
                'status-in-progress': !project.project_status
            };
        },

        getFromObject(object, key, def = null) {
            if (object && typeof object == 'object') {
                if (key.includes('.')) {
                    const keys = key.split('.')
                    let temp = object
                    let error = false
                    keys.forEach((e) => {
                        try {
                            temp = temp[e]
                        } catch (err) {
                            error = true
                        }
                    })
                    if (error) {
                        return def
                    } else {
                        return temp
                    }
                } else {
                    if (key in object) {
                        return object[key]
                    } else {
                        return def
                    }
                }
            } else {
                return def
            }
        },
    }
}