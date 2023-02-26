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
                  <h1 class="page-title">Create Pembelian</h1>
              </div>
            </div>
            <el-form ref="supplierListForm" :model="billingListForm" :rules="supplierListRules">
              <div class="summary-container">
                <div class="row">
                  <h4 class="summary-form summary-title">Billing</h4>
                  <p class="subtitle">
                    Detail penagihan muncul di pembelian Anda. Tanggal pembelian digunakan di dasbor dan laporan. Pilih tanggal yang Anda harapkan untuk membayar sebagai Tanggal Jatuh Tempo.
                  </p>
                  <hr>
                </div>
              </div>
              <div class="data-container">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="Supplier" class="filter-form-item input-small" prop="supplier_name">
                      <el-select v-model="supplierListSelected" placeholder="List Supplier" filterable clearable value-key="supplier_id">
                        <el-option v-for="item, index in supplierList" :key="index" :label="item.supplier_name"
                          :value="item" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="Pembelian dari:" v-if="isSupplierListSelected" class="filter-form-item input-small"><br>
                      <div class="row detail-container" style="margin-left: 20px;">
                        <p class="title"><b>{{ supplierListSelected.supplier_name }}</b></p>
                        <p>{{ supplierListSelected.supplier_address }}</p>
                        <p>NPWP: {{ supplierListSelected.supplier_npwp ? supplierListSelected.supplier_npwp : "-" }}</p>
                        <p>{{ supplierListSelected.supplier_email }}</p>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="14">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="Tanggal Pembelian" class="filter-form-item input-small">
                          <el-date-picker v-model="billingListForm.bill_start_date" value-format="yyyy-MM-dd" placeholder="YYYY-MM-DD" type="date" clearable />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="Nomor Pembelian" class="filter-form-item input-small" prop="bill_number">
                          <el-input v-model="billingListForm.bill_number" ref="bill_number" placeholder="Masukkan Nomor Pembelian" clearable />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="Tanggal Jatuh Tempo" class="filter-form-item input-small">
                          <el-date-picker v-model="billingListForm.bill_due_date" value-format="yyyy-MM-dd" placeholder="YYYY-MM-DD" type="date" clearable />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="Nomor Pembelian" class="filter-form-item input-small" prop="bill_order_number">
                          <el-input v-model="billingListForm.bill_order_number" ref="bill_order_number" placeholder="Masukkan No Pembelian" clearable />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="Ongkos Kirim" class="filter-form-item input-small" prop="bill_shipping_cost">
                          <el-input v-model="billingListForm.bill_shipping_cost" ref="bill_shipping_cost" placeholder="Masukkan Ongkos Kirim" clearable />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 30px; font-size: 14px;">
                  <el-col :span="4">
                    <span>Barang</span>
                  </el-col>
                  <el-col :span="7">
                    <span>Deskripsi</span>
                  </el-col>
                  <el-col :span="3">
                    <span>Kuantitas</span>
                  </el-col>
                  <el-col :span="3">
                    <span>Harga Beli</span>
                  </el-col>
                  <el-col :span="3">
                    <span>Harga Jual</span>
                  </el-col>
                  <el-col :span="2" style="text-align: right;">
                    <span>Jumlah</span>
                  </el-col>
                </el-row>
                <hr>
                <el-row v-for="(item, index) in formItemList" :key="index">
                  <!-- <el-col :span="24">
                    <el-form-item class="filter-form-item input-small">
                      <el-select v-model="supplierListSelected" placeholder="List Item" filterable clearable value-key="supplier_id">
                        <el-option v-for="item, index in itemList" :key="index" :label="item.item_name"
                          :value="item" />
                      </el-select>
                    </el-form-item>
                  </el-col> -->
                  <form-item 
                    :item_name="item.item_name"
                    :item_description="item.item_description"
                    :item_quantity="item.item_quantity"
                    :item_price="item.item_price"
                    :item_total="item.item_total"
                    :item_key="index"
                    @remove-item="removeItem"
                    @input="handleInput"
                  />
                </el-row>
                <el-row style="margin-top: 25px; padding-bottom: 50px">
                  <el-button style="width: 100%" @click="addMoreItem">Add more..</el-button>
                </el-row>
                <el-row style="text-align: right;">
                  <el-col :span="18">
                    <p>Subtotal</p>
                    <p>Ongkos Kirim</p>
                    <p>Total</p>
                  </el-col>
                  <el-col :span="6">
                    <p>{{ billingListForm.bill_subtotal }}</p>
                    <p>14.000</p>
                    <p>10.000.000</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
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

        isSupplierListSelected: false,
  
        // table var
        tableKey: 0,
        listLoading: true,
        total: 0,
        dataList: [],
        editList: [],
  
        // dropdown var
        roleList: ['Role 1', 'Role 2'],
        currency: ['USD', 'IDR'],
        supplierListSelected: null,
        supplierList: [],
        itemList: [],
        formItemList: [],
  
        // form var
        billingListForm: {
          isEdit: false,
          supplier_id: this.supplierListSelected ? this.supplierListSelected.supplier_id : "",
          bill_start_date: "",
          bill_number: "",
          bill_due_date: "",
          bill_order_number: "",
          bill_items: [],
          bill_notes: "",
          bill_subtotal: 0,
          bill_total: 0,
          bill_shipping_cost: 0
        },

        selectedSupplier: [],
  
        supplierListRules: {
          supplier_name: [
            { required: true, trigger: 'blur', message: 'Please enter the name' }
          ],
        }
      }
    },
    watch: {
      // whenever supplierListSelected question changes, this function will run
      supplierListSelected() {
        if (this.supplierListSelected != "") {
          this.isSupplierListSelected = true
          // this.inputForm.supplier_id = this.supplierListSelected.supplier_id
        } else {
          this.isSupplierListSelected = false
        }
      },

    },
    created() {
      this.getSupplierList()
      this.getItemList()
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

      getItemList() {
        this.supplierList = [
          {
            item_name: "Pulpen",
            item_description: "Mantab dah pokoknya",
            item_sell_price: 10000,
            item_purchase_price: 9000
          },
          {
            item_name: "Buku",
            item_description: "Mantab dah pokoknya",
            item_sell_price: 2000,
            item_purchase_price: 1500
          }
        ]
      },

      removeItem(index) {
        console.log('this.formItemList: ', this.formItemList);
        this.formItemList.splice(index, 1);
      },

      handleInput(data) {
        const billItems = this.billingListForm.bill_items
        
        if (billItems.length > 0) {
          billItems.map((d, i) => {
            if (data.item_key == d.item_key) {
              this.billingListForm.bill_subtotal -= parseInt(d.item_total_price)
              console.log('parseInt(data.item_total_price): ', data.item_total_price);
              billItems.splice(i, 1)
            }
          })
          billItems.push(data)
          this.billingListForm.bill_subtotal += parseInt(data.item_total_price)
        } else {
          billItems.push(data)
          this.billingListForm.bill_subtotal += parseInt(data.item_total_price)
        }

        console.log('billingListForm: ', this.billingListForm);
        console.log('billSubtotal: ', this.billingListForm.bill_subtotal);
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
  