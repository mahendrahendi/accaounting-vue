<template>
  <div class="app-container">
    <!-- HEADER -->
    <div class="title-container">
      <h1 class="page-title">Satpas Management</h1>
    </div>

    <!-- BUTTON FOR SMALL MEDIA -->
    <div class="page-button-media">
      <el-tooltip content="Filter" placement="top">
        <el-button class="button-icon primary" @click="dialogFilter = true"><i class="fa-solid fa-filter" /></el-button>
      </el-tooltip>
    </div>

    <!-- FILTER -->
    <div class="filter-container">
      <h4 class="filter-form filter-title">Filter</h4>
    </div>
    <div class="filter-container">
      <el-form class="filter-form" style="margin-bottom: 10px">
        <el-col :span="8">
          <el-form-item class="filter-form-item input-small">
            <el-input v-model="listQuery.kodeSatpas" placeholder="Kode Satpas" clearable @change="handleFilter" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="filter-form-item input-small">
            <el-input v-model="listQuery.namaSatpas" placeholder="Nama Satpas" clearable @change="handleFilter" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="filter-form-item input-small">
            <el-select v-model="listQuery.status" placeholder="Status" clearable @change="handleFilter">
              <el-option v-for="item, index in statusList" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="filter-container">
      <el-form class="filter-form">
        <el-col :span="6">
          <el-form-item class="filter-form-item input-small">
            <el-date-picker v-model="listQuery.createdFrom" :picker-options="dateBetween" value-format="yyyy-MM-dd"
              type="date" clearable placeholder="Created Start" @change="handleFilter" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="filter-form-item input-small">
            <el-date-picker v-model="listQuery.createdTo" :picker-options="dateBetween" value-format="yyyy-MM-dd"
              type="date" clearable placeholder="Created End" @change="handleFilter" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="filter-form-item input-small">
            <el-date-picker v-model="listQuery.updatedFrom" :picker-options="dateBetween" value-format="yyyy-MM-dd"
              type="date" clearable placeholder="Updated Start" @change="handleFilter" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="filter-form-item input-small">
            <el-date-picker v-model="listQuery.updatedTo" :picker-options="dateBetween" value-format="yyyy-MM-dd"
              type="date" clearable placeholder="Updated End" @change="handleFilter" />
          </el-form-item>
        </el-col>
      </el-form>
    </div>

    <!-- FILTER DIALOG FOR SMALL MEDIA -->
    <el-dialog title="Filter" :visible.sync="dialogFilter" class="dialog-small">
      <el-form>
        <el-form-item>
          <el-input v-model="listQuery.kodeSatpas" placeholder="Kode Satpas" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.namaSatpas" placeholder="Nama Satpas" clearable />
        </el-form-item>
        <el-form-item class="filter-form-item input-small">
          <el-select v-model="listQuery.status" placeholder="Status" clearable>
            <el-option v-for="item, index in statusList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="listQuery.createdFrom" :picker-options="dateBetween" value-format="yyyy-MM-dd"
            type="date" clearable placeholder="Created From" />
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="listQuery.createdTo" :picker-options="dateBetween" value-format="yyyy-MM-dd"
            type="date" clearable placeholder="Created To" />
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="listQuery.updatedFrom" :picker-options="dateBetween" value-format="yyyy-MM-dd"
            type="date" clearable placeholder="Updated From" />
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="listQuery.updatedTo" :picker-options="dateBetween" value-format="yyyy-MM-dd"
            type="date" clearable placeholder="Updated To" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="button-custom small primary" @click="handleFilter">Search</el-button>
      </div>
    </el-dialog>

    <div class="container">
      <el-tooltip content="Add Satpas" placement="top">
        <el-button class="button-icon success super" icon="el-icon-plus" @click="handleAdd()" />
      </el-tooltip>
      <!-- <el-tooltip content="Upload Satpas by Excel" placement="top">
        <el-button class="super" type="primary" @click="$router.push('/enforcer-account/upload-enforcer')"><i
            class="fa fa-upload"></i> Upload Satpas Data (Excel)</el-button>
      </el-tooltip> -->
    </div>

    <!-- TABLE -->
    <el-table :key="tableKey" v-loading="listLoading" :data="dataList" fit @sort-change="sortChange">
      <el-table-column label="Kode Satpas" prop="sat_kode_satpas" sortable="custom">
        <template slot-scope="{row}">
          <span>{{ row.satpas_kode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Nama Satpas" prop="sat_nama_satpas" sortable="custom">
        <template slot-scope="{row}">
          <span>{{ row.satpas_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" prop="sat_status" sortable="custom">
        <template slot-scope="{row}">
          <span class="colored-status" :class="row.satpas_status | statusTagFilter">{{ row.satpas_status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Created at" prop="job_created_at" sortable="custom" align="center">
        <template slot-scope="{row}">
          <span>{{ row.satpas_created_from | dateTimeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Last Updated" prop="job_updated_at" sortable="custom" align="center">
        <template slot-scope="{row}">
          <span>{{ row.satpas_updated | dateTimeFilter }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Last Login" prop="lastLogin" sortable="custom" align="center">
        <template slot-scope="{row}">
          <span>{{ row.adm_usr_last_login | dateTimeFilter }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="Action" align="center" width="150px">
        <template slot-scope="{row}">
          <el-tooltip content="Edit" placement="top">
            <el-button class="table-icon-button primary" @click="handleEdit(row)"><i class="el-icon-edit" /></el-button>
          </el-tooltip>
          <el-tooltip content="Delete" placement="top">
            <el-button class="table-icon-button danger"
              @click="handleDelete(row.satpas_id, row.satpas_kode, row.satpas_name)"><i class="el-icon-delete" />
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize"
      @pagination="getList" />

    <!-- ADD ADMIN DIALOG -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogAdd" :close-on-click-modal="false" class="dialog-small">
      <el-form ref="satpasListForm" :model="satpasListForm" :rules="satpasListRules">
        <el-form-item prop="satpas_kode">
          <el-input ref="satpas_kode" v-model="satpasListForm.satpas_kode" placeholder="Kode Satpas*"
            type="text" tabindex="1" auto-complete="on" />
        </el-form-item>
        <el-form-item prop="satpas_name">
          <el-input ref="satpas_name" v-model="satpasListForm.satpas_name" placeholder="Nama Satpas*"
            type="text" tabindex="1" auto-complete="on" />
        </el-form-item>
        <el-form-item prop="satpas_status">
          <el-select v-model="satpasListForm.satpas_status" placeholder="Status" clearable>
            <el-option v-for="item, index in statusList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="button-custom small info" @click="dialogAdd = false">Cancel</el-button>
        <el-button v-if="satpasListForm.edit" class="button-custom small success" @click="updateSatpas">Submit</el-button>
        <el-button v-else class="button-custom small success" @click="createSatpas">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import Pagination from '@/components/Pagination'
import { validNumeric, validPassword, validUsername, validAlphabets } from '@/utils/validate'
import { MessageBox } from 'element-ui'
import { getSatpasList, postSatpas, putSatpas, deleteSatpas } from '@/api/satpas-device'
import { getRoleList } from '@/api/role-management'
import CryptoJS from 'crypto-js'

export default {
  components: { Pagination },
  filters: {
    dateFilter: function (date) {
      if (moment(date).isValid()) {
        return moment.utc(date).format('DD MMM YYYY')
      } else {
        return '-'
      }
    },
    dateTimeFilter: function (date) {
      if (moment(date).isValid()) {
        return moment.utc(date).format('DD MMM YYYY HH:mm')
      } else {
        return '-'
      }
    },
    statusTagFilter(status) {
      const statusMap = {
        'ACTIVE': 'success',
        'INACTIVE': 'danger',
        'DELETED': 'primary'
      }
      return statusMap[status]
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
      if (value !== this.satpasListForm.usr_pwd_hash) {
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
      if (value !== this.changePasswordForm.adm_updated_password) {
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
      if (result === 'complex') {
        callback(
          new Error(
            'Password must be at least 8 characters contains uppercase, lowercase, number, special character (@$!%*?&)'
          )
        )
      } else if (result === 'sequence') {
        callback(
          new Error(
            'Password can not contain sequence and predictable word (abc, 123, password, etc)'
          )
        )
      } else if (result === 'repeat') {
        callback(
          new Error('Password can not contain repeated alphabet or number')
        )
      } else {
        if (
          this.satpasListForm.adm_usr_first_name &&
          this.satpasListForm.adm_usr_last_name &&
          this.satpasListForm.adm_usr_email &&
          this.satpasListForm.adm_usr_mobile
        ) {
          var regexFirstName = new RegExp(
            '^((?!' + this.satpasListForm.adm_usr_first_name + ').)*$',
            'i'
          )
          var regexLastName = new RegExp(
            '^((?!' + this.satpasListForm.adm_usr_last_name + ').)*$',
            'i'
          )
          var regexEmail = new RegExp(
            '^((?!' + this.satpasListForm.adm_usr_email + ').)*$',
            'i'
          )
          var regexMobile = new RegExp(
            '^((?!' + this.satpasListForm.adm_usr_mobile + ').)*$',
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
      // filter date
      dateBetween: { disabledDate: this.disabledOtherDate },

      // query var
      listQuery: {
        page: 1,
        pagesize: 10,
        order: 'job_created_at desc',
        kodeSatpas: '',
        namaSatpas: '',
        status: '',
        createdFrom: '',
        createdTo: '',
        updatedFrom: '',
        updatedTo: ''
      },

      // table var
      tableKey: 0,
      listLoading: true,
      total: 0,
      dataList: [],
      editList: [],

      // flag var
      isShowPassword: false,
      isShowConfirmPassword: false,

      // dropdown var
      roleList: ['Role 1', 'Role 2'],
      statusList: ['ACTIVE', 'INACTIVE'],

      // dialog var
      dialogFilter: false,
      dialogAdd: false,
      dialogChangePassword: false,
      dialogTitle: 'Add Satpas',

      // form var
      satpasListForm: {
        edit: false,
        satpas_id: undefined,
        satpas_kode: '',
        satpas_name: '',
        satpas_status: ''
      },

      changePasswordForm: {
        adm_updated_password: '',
        confirmPasswordUpdated: '',
        adm_usr_reg_number: ''
      },

      changePasswordFormRules: {
        adm_updated_password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmPasswordUpdated: [{ required: true, trigger: 'blur', validator: isSameChangePassword }]
      },

      satpasListRules: {
        satpas_kode: [
          { required: true, trigger: 'blur', message: 'Please fill satpas kode' }
        ],
        satpas_name: [
          { required: true, trigger: 'blur', message: 'Please fill satpas name' }
        ],
        satpas_status: [
          { required: true, trigger: 'blur', message: 'Please choose status' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getRoles()
  },
  methods: {
    // DISABLE DATE
    disabledOtherDate(time) {
      var maxDate = moment()._d
      var isAfterMaxDate = time.getTime() > maxDate
      return isAfterMaxDate
    },

    getRoles() {
      getRoleList(this.listQuery).then(response => {
        this.roleList = response.data.roles
        this.getList()
      }).catch(() => {
        this.$message({
          type: 'error',
          message: 'Failed fetch role data'
        })
      })
    },

    convertRoles(roleId) {
      for (var i = 0; i < this.roleList.length; i++) {
        if (roleId === this.roleList[i].role_id) {
          return this.roleList[i].role_title
        }
      }
    },

    getList() {
      this.listLoading = true
      getSatpasList(this.listQuery).then(response => {
        console.log('response.data.data: ', response.data.data);
        this.dataList = response.data.data
        this.total = response.data.total_records
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },

    // button action
    createSatpas() {
      this.$refs.satpasListForm.validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.satpasListForm)

          postSatpas(tempData).then((response) => {
            console.log('response: ', response);
            this.$notify({
              title: 'Success',
              message: 'Successfully create satpas',
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.dialogAdd = false
            // this.cancelForm()
          }).catch((err) => {
            this.$notify({
              title: 'Error',
              message: 'Failed create satpas',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },

    updateSatpas() {
      this.$refs.satpasListForm.validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.satpasListForm)
          // console.log('tempData: ', tempData)

          putSatpas(tempData, this.satpasListForm.satpas_id).then((response) => {
            this.$notify({
              title: 'Success',
              message: 'Successfully update satpas',
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.dialogAdd = false
            // this.cancelForm()
          }).catch((err) => {
            this.$notify({
              title: 'Error',
              message: 'Failed update satpas',
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
      this.satpasListForm.edit = true
      this.dialogTitle = 'Edit Satpas'
      this.satpasListForm.satpas_id = row.satpas_id
      this.satpasListForm.satpas_kode = row.satpas_kode
      this.satpasListForm.satpas_name = row.satpas_name
      this.satpasListForm.satpas_status = row.satpas_status
      this.dialogAdd = true
      row.edit = !row.edit
    },

    handleAdd() {
      this.satpasListForm.edit = false
      this.dialogTitle = 'Add Satpas'
      this.satpasListForm.satpas_id = ''
      this.satpasListForm.satpas_kode = ''
      this.satpasListForm.satpas_name = ''
      this.satpasListForm.satpas_status = ''
      this.dialogAdd = true
    },

    handleChangePassword(id) {
      getAdminUserListDetail(id).then(response => {
        this.editUserForm = response.data
      })
      this.changePasswordForm.adm_usr_reg_number = id
      this.dialogChangePasswordVisible = true
    },
    handleCancelChangePassword() {
      this.dialogChangePasswordVisible = false
      this.$refs.changePasswordForm.resetFields()
    },

    changePassword() {
      this.$refs.changePasswordForm.validate((valid) => {
        if (valid) {
          this.loadingChange = true
          const tempData = Object.assign({}, this.changePasswordForm)
          tempData.adm_current_password = this.encrypt(tempData.adm_current_password)
          tempData.adm_udpated_password = this.encrypt(tempData.adm_udpated_password)
          putAdminUserPassword(tempData, tempData.adm_usr_reg_number).then(() => {
            this.loadingChange = false
            this.$notify({
              title: 'Success',
              message: 'Successfully Change',
              type: 'success',
              duration: 2000
            })
            this.$router.go('/admin/users')
          }).catch(() => {
            this.loadingChange = false
          })
        }
      })
    },

    cancelEdit(row) {
      row.edit = false
      // this.getList()
    },

    handleDelete(satpas_id, satpas_kode, satpas_name) {
      MessageBox.confirm(`Are you sure you want to delete satpas ${satpas_kode} - ${satpas_name}? Your action can not be undone.`, 'Delete Confirmation', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        console.log('satpas_id: ', satpas_id);
        deleteSatpas(satpas_id).then((response) => {
          this.$notify({
            title: 'Success',
            message: 'Successfully delete satpas',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }).catch((err) => {
          this.$notify({
            title: 'Error',
            message: 'Failed delete satpas',
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

    // functionality
    encrypt(data) {
      const key = ')H@McQfTjWnZr4u7w!z%C*F-JaNdRgUk'
      const iv = '514012241051832769327432916264923'
      const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC
      })

      return cipher.toString()
    },

    // SORT & FILTER
    handleFilter() {
      this.dialogFilter = false
      this.listQuery.page = 1
      this.getList()
    },

    sortChange(data) {
      const { prop, order } = data
      switch (order) {
        case 'ascending':
          this.listQuery.order = `${prop} asc`
          break
        case 'descending':
          this.listQuery.order = `${prop} desc`
          break
        default:
          this.listQuery.order = 'job_created_at desc'
          break
      }
      this.handleFilter()
    }

  }
}
</script>
