<template>
  <div class="app-container">
    <el-row :gutter="50">
        <el-col :span="18">
            <!-- HEADER -->
            <div class="title-container">
              <div style="display: flex;">
                  <el-button
                  class="button-icon primary"
                  style="margin-right: 20px"
                  icon="el-icon-arrow-left"
                  @click="$router.go(-1)"
                  />
                  <h1 class="page-title">Tambah Barang</h1>
              </div>
            </div>
            <el-form ref="supplierListForm" :model="supplierListForm" :rules="supplierListRules">
              <div class="summary-container">
                <div class="row">
                  <h4 class="summary-form summary-title">Umum</h4>
                  <p class="subtitle">
                    Select a category to make your reports more detailed. The description will be populated when the item is selected in an invoice or bill.
                  </p>
                  <hr>
                </div>
              </div>
              <div class="data-container">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Supplier" class="filter-form-item input-small" prop="supplier_name">
                      <el-select v-model="supplierListSelected" placeholder="List Supplier" filterable clearable value-key="supplier_id">
                        <el-option v-for="item, index in supplierList" :key="index" :label="item.supplier_name"
                          :value="item" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Detail Supplier:" v-if="isSupplierListSelected" class="filter-form-item input-small"><br>
                      <div class="row">
                        <p class="subtitle"><b>{{ supplierListSelected.supplier_name }}</b></p>
                        <p class="subtitle">{{ supplierListSelected.supplier_address ? supplierListSelected.supplier_address : "-" }}</p>
                        <p class="subtitle">{{ supplierListSelected.supplier_email ? supplierListSelected.supplier_email : "-" }}</p>
                        <p class="subtitle">NPWP: {{ supplierListSelected.supplier_npwp ? supplierListSelected.supplier_npwp : "-" }}</p>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="isSupplierListSelected">
                  <form-item :value="inputValue"/>
                </el-row>
              </div>
              <el-row style="text-align: right; margin-top: 25px; padding-bottom: 50px">
                <el-button @click="$router.go(-1)" type="info" round>Cancel</el-button>
                <el-button style="margin-right: 25px" type="success" round @click="createSupplier">Submit</el-button>
              </el-row>
            </el-form>
        </el-col>
        <el-col :span="6">
            <img src="@/assets/inventory.png" alt="" style="position: absolute">
            <div class="row" style="text-align: right;">
                <h4 class="filter-title">Inventory</h4>
                <h6>Stock management, SKU, item groups and variants, transfer orders, adjustments, warehouses, histories, and more.</h6>
            </div>
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
  import { getSupplierList } from '@/api/supplier'
  import { postSupplier } from '@/api/supplier'
  import CryptoJS from 'crypto-js'
  
  export default {
    components: { FormItem },
    data() {
      return {

        inputValue: '',
  
        // table var
        tableKey: 0,
        listLoading: true,
        total: 0,
        dataList: [],
        editList: [],
        supplierListSelected: "",
        isSupplierListSelected: false,

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
  
        // dropdown var
        roleList: ['Role 1', 'Role 2'],
        statusList: ['ACTIVE', 'INACTIVE'],
        currency: ['USD', 'IDR'],
        country: ['Indonesia', 'Singapore'],
  
        // form var
        supplierListForm: {
          isEdit: false,
          supplier_address: "scbd",
          supplier_email: "hendi@gmail.com",
          supplier_name: "Hendi",
          supplier_npwp: "1233456",
          supplier_telephone: "091283213",
          supplier_type: "vendor",
          supplier_whatsapp: "918923891231",
          supplier_description: "",
          supplier_status: "",
          supplier_currency: "",
          supplier_founder_address: "",
          supplier_city: "",
          supplier_zip_code: "",
          supplier_province: "",
          supplier_country: ""
        },
        selectedSupplier: [],

        supplierList: [],
  
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
    watch: {
      // whenever question changes, this function will run
      supplierListSelected() {
        if (this.supplierListSelected != "") {
          this.isSupplierListSelected = true
        } else {
          this.isSupplierListSelected = false
        }
      }
    },
    methods: {
      // DISABLE DATE
      disabledOtherDate(time) {
        var maxDate = moment()._d
        var isAfterMaxDate = time.getTime() > maxDate
        return isAfterMaxDate
      },

      getSupplierList() {
        this.listQuery
        getSupplierList(this.listQuery).then(response => {
          this.supplierList = response.data.data
        }).catch(() => {
        })
      },
  
      // button action
      createSupplier() {
        this.$refs.supplierListForm.validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.supplierListForm)
            
            postSupplier(tempData).then((response) => {
              this.$notify({
                title: 'Success',
                message: 'Successfully create supplier',
                type: 'success',
                duration: 2000
              })
              // this.cancelForm()
            }).catch((err) => {
              console.log("err", err);
            })
          }
        })
      }
    }
  }
  </script>
  