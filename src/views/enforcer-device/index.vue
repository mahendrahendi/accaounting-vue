<template>
  <div class="app-container">
    <!-- HEADER -->
    <div class="title-container">
      <h1 class="page-title">Enforcer Device</h1>
    </div>

    <!-- BUTTON FOR SMALL MEDIA -->
    <div class="page-button-media">
      <el-tooltip content="Filter" placement="top">
        <el-button class="button-icon primary" @click="dialogFilter=true"><i class="fa-solid fa-filter"></i></el-button>
      </el-tooltip>
    </div>
    
    <!-- FILTER -->
    <div class="filter-container">
      <el-form class="filter-form">
        <el-form-item class="filter-form-item input-small" style="min-width: 300px">
          <el-input v-model="listQuery.eventAdmUsrRegnum" placeholder="Aidigest" clearable @change="handleFilter" />
        </el-form-item>
        <el-form-item class="filter-form-item input-small">
          <el-input v-model="listQuery.eventModule" placeholder="Device Type" clearable @change="handleFilter" />
        </el-form-item>
        <el-form-item class="filter-form-item input-small">
          <el-date-picker v-model="listQuery.lastLoginFrom" :picker-options="dateBetween" value-format="yyyy-MM-dd" type="date" clearable placeholder="Start enrolled" @change="handleFilter"/>
        </el-form-item>
        <el-form-item class="filter-form-item input-small">
          <el-select v-model="listQuery.eventType" placeholder="Active" clearable @change="handleFilter">
            <el-option v-for="item,index in activeList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item class="filter-form-item input-small">
          <el-select v-model="listQuery.eventSeverity" placeholder="Blacklisted" clearable @change="handleFilter">
            <el-option v-for="item,index in blacklistList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <!-- FILTER DIALOG FOR SMALL MEDIA -->
    <el-dialog title="Filter" :visible.sync="dialogFilter" class="dialog-small">
      <el-form>
        <el-form-item>
          <el-input v-model="listQuery.eventAdmUsrRegnum" placeholder="Aidigest" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.eventModule" placeholder="Device Type" clearable />
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="listQuery.lastLoginFrom" :picker-options="dateBetween" value-format="yyyy-MM-dd" type="date" clearable placeholder="Start enrolled"/>
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.eventType" placeholder="Active" clearable>
            <el-option v-for="item,index in activeList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.eventSeverity" placeholder="Blacklisted" clearable>
            <el-option v-for="item,index in blacklistList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="button-custom small primary" @click="handleFilter">Search</el-button>
      </div>
    </el-dialog>

    <!-- TABLE -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="dataList"
      fit
      @sort-change="sortChange"
    >
      <el-table-column label="Aidigest" prop="aidigest" sortable="custom" min-width="250px">
        <template slot-scope="{row}">
          <span>{{ row.enforcer_aidigest }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Device Type" prop="deviceType" sortable="custom" min-width="130px">
        <template slot-scope="{row}">
          <span>{{ row.enforcer_deviceType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Enrolled" prop="enrolled" sortable="custom" align="center" min-width="120px">
        <template slot-scope="{row}">
          <span>{{ row.enforcer_enrolled | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Active" prop="active" sortable="custom" align="center" min-width="110px">
        <template slot-scope="{row}">
          <span><i :class="row.enforcer_active|statusIconFilter" /></span>
        </template>
      </el-table-column>
      <el-table-column label="Blacklisted" prop="blacklisted" sortable="custom" align="center" min-width="130px">
        <template slot-scope="{row}">
          <span><i :class="row.enforcer_blacklisted|statusIconFilter" /></span>
        </template>
      </el-table-column>
      <el-table-column label="Action" align="center" width="150px">
        <template slot-scope="{row}">
          <el-tooltip content="Detail" placement="top">
            <router-link :to='"/enforcer-device/detail/"+row.enforcer_id' style="margin-right: 10px">
              <el-button class="table-icon-button primary"><i class="el-icon-search" /></el-button>
            </router-link>
          </el-tooltip>
          <el-tooltip content="Inactive" placement="top">
            <el-button class="table-icon-button warning" @click="handleInactive(row.enforcer_active)"><i class="el-icon-minus" /></el-button>
          </el-tooltip>
          <el-tooltip content="Blacklist" placement="top">
            <el-button class="table-icon-button danger" @click="handleBlacklist(row.enforcer_blacklisted)"><i class="fa-solid fa-ban"></i></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="getList" />
  </div>
</template>

<script>
import moment from 'moment'
import Pagination from '@/components/Pagination'
import { MessageBox } from 'element-ui'

export default {
  components:{Pagination},
  filters:{
    dateFilter: function(date) {
      if (moment(date).isValid()) {
        return moment(date).format('DD MMM YYYY')
      } else {
        return '-'
      }
    },
    statusIconFilter(status){
      const statusMap={
        'Active': 'el-icon-success table-icon-success',
        'Inactive': 'el-icon-error table-icon-danger',
        'True': 'el-icon-error table-icon-danger',
        'False': 'el-icon-success table-icon-success'
      }
      return statusMap[status]
    }
  },
  data(){
    return{
      // filter date
      dateBetween: {disabledDate: this.disabledOtherDate},

      // query var
      listQuery: {
        page: 1,
        pagesize: 15,
        order: ''
      },
      
      // table var
      tableKey: 0,
      listLoading: true,
      total: 0,
      dataList: [],

      // dropdown var
      activeList: ['Active','Inactive'],
      blacklistList: ['True','False'],

      // dialog var
      dialogFilter: false,
    }
  },
  created(){
    this.getList()
  },
  methods:{
    // DISABLE DATE
    disabledOtherDate(time) {
        var maxDate = moment()._d;                
        var isAfterMaxDate =  time.getTime() > maxDate; 
        return isAfterMaxDate;
    },
    getList(){
      this.listLoading = true
      this.dataList = [
        {
          enforcer_id:1,
          enforcer_aidigest:'2305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B83419798925',
          enforcer_deviceType: 'ANDROID',
          enforcer_enrolled: new Date(),
          enforcer_active: 'Active',
          enforcer_blacklisted: 'True',
        },
        {
          enforcer_id:2,
          enforcer_aidigest:'2305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B83419798925',
          enforcer_deviceType: 'ANDROID',
          enforcer_enrolled: new Date(),
          enforcer_active: 'Active',
          enforcer_blacklisted: 'False',
        },
        {
          enforcer_id:3,
          enforcer_aidigest:'2305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B83419798925',
          enforcer_deviceType: 'ANDROID',
          enforcer_enrolled: new Date(),
          enforcer_active: 'Inactive',
          enforcer_blacklisted: 'False',
        },
        {
          enforcer_id:4,
          enforcer_aidigest:'2305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B83419798925',
          enforcer_deviceType: 'ANDROID',
          enforcer_enrolled: new Date(),
          enforcer_active: 'Active',
          enforcer_blacklisted: 'True',
        },
        {
          enforcer_id:5,
          enforcer_aidigest:'2305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B83419798925',
          enforcer_deviceType: 'ANDROID',
          enforcer_enrolled: new Date(),
          enforcer_active: 'Inactive',
          enforcer_blacklisted: 'False',
        },
        {
          enforcer_id:6,
          enforcer_aidigest:'2305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B83419798925',
          enforcer_deviceType: 'ANDROID',
          enforcer_enrolled: new Date(),
          enforcer_active: 'Active',
          enforcer_blacklisted: 'False',
        },
        {
          enforcer_id:7,
          enforcer_aidigest:'2305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B83419798925',
          enforcer_deviceType: 'ANDROID',
          enforcer_enrolled: new Date(),
          enforcer_active: 'Active',
          enforcer_blacklisted: 'False',
        },
      ]
      this.total = this.dataList.length
      this.listLoading = false
    },

    // BUTTON ACTION
    handleInactive(status) {
      MessageBox.confirm(`Are you sure you want to ${status=='Active'?'inactivate':'activate'} this device? Your action can not be undone. `, 'Change Active Status', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(() => {})
    },
    handleBlacklist(status) {
      MessageBox.confirm(`Are you sure you want to ${status=='True'?'unblacklist':'blacklist'} this device? Your action can not be undone. `, 'Change Blacklist Status', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(() => {})
    },

    // SORT & FILTER
    handleFilter() {
      this.dialogFilter = false
      this.listQuery.page = 1
      this.getList()
    },

    sortChange(data) {
      const { prop, order } = data
      switch(order){
        case 'ascending':
          this.listQuery.order = `${prop} asc`
          break
        case 'descending':
          this.listQuery.order = `${prop} desc`
          break
        default:
          this.listQuery.order = ''
          break
      }
      this.handleFilter()
    }
  },
}
</script>