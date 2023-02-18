<template>
  <div class="app-container">
    <el-row>
        <el-col :span="24">
            <!-- HEADER -->
            <div class="title-container">
              <div style="display: flex;">
                  <el-button
                  class="button-icon primary"
                  style="margin-right: 20px"
                  icon="el-icon-arrow-left"
                  @click="$router.go(-1)"
                  />
                  <h1 class="page-title">Create Tagihan</h1>
              </div>
            </div>
            <el-form ref="supplierListForm" :model="billingListForm" :rules="supplierListRules">
              <div class="summary-container">
                <div class="row">
                  <h4 class="summary-form summary-title">Billing</h4>
                  <p class="subtitle">
                    Detail penagihan muncul di tagihan Anda. Tanggal Tagihan digunakan di dasbor dan laporan. Pilih tanggal yang Anda harapkan untuk membayar sebagai Tanggal Jatuh Tempo.
                  </p>
                  <hr>
                </div>
              </div>
              <div class="data-container">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="Pemasok" class="filter-form-item input-small" prop="supplier_name">
                      <el-select v-model="supplierListSelected" placeholder="List Pemasok" filterable clearable value-key="supplier_id">
                        <el-option v-for="item, index in supplierList" :key="index" :label="item.supplier_name"
                          :value="item" />
                      </el-select>
                    </el-form-item>
                    <div class="row" style="margin-left: 20px;" v-if="supplierListSelected !== null">
                      <p class="subtitle">Tagihan dari:</p>
                      <p class="subtitle"><b>{{ supplierListSelected.supplier_name }}</b></p>
                      <p class="subtitle">{{ supplierListSelected.supplier_address }}</p>
                      <p class="subtitle">NPWP: {{ supplierListSelected.supplier_npwp }}</p>
                      <p class="subtitle">{{ supplierListSelected.supplier_email }}</p>
                    </div>
                  </el-col>
                  <el-col :span="14">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="Tanggal Tagihan" class="filter-form-item input-small" prop="bill_start_date">
                          <el-input v-model="billingListForm.bill_start_date" ref="bill_start_date" placeholder="Masukkan Nama" clearable @change="handleFilter" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="Nomor Tagihan" class="filter-form-item input-small" prop="bill_number">
                          <el-input v-model="billingListForm.bill_number" ref="bill_number" placeholder="Masukkan Nama" clearable @change="handleFilter" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="Tanggal Jatuh Tempo" class="filter-form-item input-small" prop="bill_due_date">
                          <el-input v-model="billingListForm.bill_due_date" ref="bill_due_date" placeholder="Masukkan Nama" clearable @change="handleFilter" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="Nomor Pesanan" class="filter-form-item input-small" prop="bill_order_number">
                          <el-input v-model="billingListForm.bill_order_number" ref="bill_order_number" placeholder="Masukkan Nama" clearable @change="handleFilter" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 30px; font-size: 14px;">
                  <el-col :span="4">
                    <span>Item</span>
                  </el-col>
                  <el-col :span="8">
                    <span>Deskripsi</span>
                  </el-col>
                  <el-col :span="3">
                    <span>Kuantitas</span>
                  </el-col>
                  <el-col :span="3">
                    <span>Harga</span>
                  </el-col>
                  <el-col :span="6">
                    <span>Jumlah</span>
                  </el-col>
                </el-row>
                <hr>
                <el-row v-for="(item, index) in formItemList" :key="index">
                  <form-item 
                    :item_name="item.item_name"
                    :item_description="item.item_description"
                    :item_quantity="item.item_quantity"
                    :item_price="item.item_price"
                    :item_total="item.item_total"
                  />
                </el-row>
                <el-row style="margin-top: 25px; padding-bottom: 50px">
                  <el-button style="width: 100%" @click="addMoreItem">Add more item..</el-button>
                </el-row>
                <!-- <el-row>
                  <el-col :span="18">
                    <el-form-item label="Catatan" class="filter-form-item input-small" style="text-align: right;" prop="bill_start_date"></el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="Catatan" class="filter-form-item input-small" prop="bill_start_date"></el-form-item>
                  </el-col>
                </el-row> -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="Catatan" class="filter-form-item input-small" prop="bill_start_date">
                      <el-input v-model="billingListForm.bill_notes" ref="bill_start_date" type="textarea" :rows="3" placeholder="Masukkan Catatan" clearable />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-row style="text-align: right; margin-top: 25px; padding-bottom: 50px">
                <el-button @click="$router.go(-1)" type="info" round>Cancel</el-button>
                <el-button style="margin-right: 25px" type="success" round>Submit</el-button>
              </el-row>
            </el-form>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import moment from 'moment'
  import FormItem from './components/FormItem.vue'
  import { validNumeric, validPassword, validUsername, validAlphabets } from '@/utils/validate'
  import { MessageBox } from 'element-ui'
  import { getEnforcerList, postEnforcer, putEnforcer, putEnforcerPassword, deleteEnforcer } from '@/api/enforcer-account'
  import { getRoleList } from '@/api/role-management'
  import { postSupplier } from '@/api/supplier'
  import { getSupplierList } from '@/api/supplier'
  import CryptoJS from 'crypto-js'
  
  export default {
    components: { FormItem },
    filters: {
      dateFilter: function (date) {
        if (moment(date).isValid()) {
          return moment(date).format('DD MMM YYYY')
        } else {
          return '-'
        }
      },
      dateTimeFilter: function (date) {
        if (moment(date).isValid()) {
          return moment(date).format('DD MMM YYYY HH:mm')
        } else {
          return '-'
        }
      }
    },
    data() {
      const validateAlphabets = (rule, value, callback) => {
        if (!validAlphabets(value)) {
          callback(new Error('Only allow alphabets'))
        } else {
          callback()
        }
      }
      const validateEmail = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('Please enter the correct email'))
        } else {
          callback()
        }
      }
      const validateNumber = (rule, value, callback) => {
        if (!validNumeric(value)) {
          callback(new Error('Mobile number must be numeric'))
        } else {
          callback()
        }
      }
      const isSame = (rule, value, callback) => {
        if (value != this.enforcerListForm.enforcer_password) {
          callback(
            new Error(
              'Confirm password does not match! Make sure your password correct'
            )
          )
        } else {
          callback()
        }
      }
      const isSameChangePassword = (rule, value, callback) => {
        if (value != this.changePasswordForm.enforcer_updated_password) {
          callback(
            new Error(
              'Confirm password does not match! Make sure your password correct'
            )
          )
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        const result = validPassword(value)
        if (result == 'complex') {
          callback(
            new Error(
              'Password must be at least 8 characters contains uppercase, lowercase, number, special character (@$!%*?&)'
            )
          )
        } else if (result == 'sequence') {
          callback(
            new Error(
              'Password can not contain sequence and predictable word (abc, 123, password, etc)'
            )
          )
        } else if (result == 'repeat') {
          callback(
            new Error('Password can not contain repeated alphabet or number')
          )
        } else {
          if (
            this.enforcerListForm.adm_usr_first_name &&
            this.enforcerListForm.adm_usr_last_name &&
            this.enforcerListForm.adm_usr_email &&
            this.enforcerListForm.adm_usr_mobile
          ) {
            var regexFirstName = new RegExp(
              '^((?!' + this.enforcerListForm.adm_usr_first_name + ').)*$',
              'i'
            )
            var regexLastName = new RegExp(
              '^((?!' + this.enforcerListForm.adm_usr_last_name + ').)*$',
              'i'
            )
            var regexEmail = new RegExp(
              '^((?!' + this.enforcerListForm.adm_usr_email + ').)*$',
              'i'
            )
            var regexMobile = new RegExp(
              '^((?!' + this.enforcerListForm.adm_usr_mobile + ').)*$',
              'i'
            )
            if (
              !regexFirstName.test(value) ||
              !regexLastName.test(value) ||
              !regexEmail.test(value) ||
              !regexMobile.test(value)
            ) {
              callback(
                new Error('Password can not contain personal information')
              )
            } else {
              callback()
            }
          } else {
            callback()
          }
        }
      }
  
      return {

        // query var
        listQuery: {
          page: 1,
          pagesize: 1000,
          order: '',
          start: 1,
          name: '',
          email: '',
          address: '',
          supplierType : 'vendor',
        },
  
        // table var
        tableKey: 0,
        listLoading: true,
        total: 0,
        dataList: [],
        editList: [],
  
        // dropdown var
        roleList: ['Role 1', 'Role 2'],
        statusList: ['ACTIVE', 'INACTIVE'],
        currency: ['USD', 'IDR'],
        supplierListSelected: null,
        supplierList: [],
        formItemList: [],
        country: ['Indonesia', 'Singapore'],
  
        // form var
        billingListForm: {
          isEdit: false,
          supplier_id: this.supplierListSelected ? this.supplierListSelected.supplier_id : "",
          bill_start_date: "",
          bill_number: "",
          bill_due_date: "",
          bill_order_number: "",
          bill_items: [],
          bill_notes: ""
        },

        selectedSupplier: [],
  
        supplierListRules: {
          supplier_name: [
            { required: true, trigger: 'blur', message: 'Please enter the name' }
          ],
        }
      }
    },
    created() {
      this.getSupplierList()
    },
    methods: {
      // DISABLE DATE
      disabledOtherDate(time) {
        var maxDate = moment()._d
        var isAfterMaxDate = time.getTime() > maxDate
        return isAfterMaxDate
      },

      addMoreItem() {
        this.formItemList.push({
          item_name: '',
          item_description: '',
          item_quantity: '',
          item_price: '',
          item_total: ''
        })
      },

      getSupplierList() {
        this.listQuery
        getSupplierList(this.listQuery).then(response => {
          this.supplierList = response.data.data
        }).catch(() => {
        })
      },

  
      updateUser() {
        this.$refs.enforcerListForm.validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.enforcerListForm)
  
            putEnforcer(tempData, this.enforcerListForm.enforcer_id).then((response) => {
              this.$notify({
                title: 'Success',
                message: 'Successfully update enforcer',
                type: 'success',
                duration: 2000
              })
              this.getList()
              this.dialogAddEnforcer = false
              // this.cancelForm()
            }).catch((err) => {
              this.$notify({
                title: 'Error',
                message: 'Failed update user',
                type: 'error',
                duration: 2000
              })
            })
          }
        })
      },
  
      // BUTTON ACTION
      handleEdit(row) {
        this.editList = JSON.parse(JSON.stringify(row))
        this.enforcerListForm.edit = true
        this.dialogTitle = 'Edit Enforcer'
        this.enforcerListForm.enforcer_id = row.enforcer_id
        this.enforcerListForm.enforcer_email = row.enforcer_email
        this.enforcerListForm.enforcer_jobtitle = row.enforcer_jobtitle
        this.enforcerListForm.enforcer_nrp = row.enforcer_nrp
        this.enforcerListForm.enforcer_phone_number = row.enforcer_phone_number
        this.enforcerListForm.enforcer_status = row.enforcer_status
        this.enforcerListForm.enforcer_username = row.enforcer_username
        this.dialogAddEnforcer = true
        row.edit = !row.edit
      },
  
      handleAdd() {
        this.enforcerListForm.edit = false
        this.dialogTitle = 'Add Enforcer'
        this.enforcerListForm.enforcer_email = ''
        this.enforcerListForm.enforcer_jobtitle = ''
        this.enforcerListForm.enforcer_nrp = ''
        this.enforcerListForm.enforcer_phone_number = ''
        this.enforcerListForm.enforcer_status = ''
        this.enforcerListForm.enforcer_username = ''
        this.enforcerListForm.enforcer_password = ''
        this.enforcerListForm.confirmPassword = ''
        this.enforcerListForm.edit = false
        this.dialogAddEnforcer = true
      },
  
      cancelEdit(row) {
        row.edit = false
        // this.getList()
      },
  
      handleDelete(enforcer_id, nrp, username) {
        MessageBox.confirm(`Are you sure you want to delete enforcer ${nrp} (${username}) ? Your action can not be undone.`, 'Delete Confirmation', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          deleteEnforcer(enforcer_id).then((response) => {
            this.$notify({
              title: 'Success',
              message: 'Successfully delete enforcer',
              type: 'success',
              duration: 2000
            })
            this.getList()
          }).catch((err) => {
            this.$notify({
              title: 'Error',
              message: 'Failed update user',
              type: 'error',
              duration: 2000
            })
          })
        }).catch(() => { })
      },
  
      cancelForm() {
        const view = this.$route.path
        this.$store
          .dispatch('tagsView/delView', view)
          .then(({ visitedViews }) => {
            const view2 = visitedViews.slice(-1)[0]
            this.$store.dispatch('tagsView/delView', view2)
            this.$router.go('admin-management/list')
          })
      },
  
      // SORT & FILTER
      handleFilter() {
        this.dialogFilter = false
        this.listQuery.page = 1
        this.getList()
      },
  
    }
  }
  </script>
  