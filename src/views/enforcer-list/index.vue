<template>
  <div class="app-container">
    <!-- HEADER -->
    <div class="title-container">
      <h1 class="page-title">Enforcer List</h1>
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
        <el-form-item class="filter-form-item input-small">
          <el-input v-model="listQuery.eventAdmUsrRegnum" placeholder="ID" clearable @change="handleFilter" />
        </el-form-item>
        <el-form-item class="filter-form-item input-small">
          <el-input v-model="listQuery.eventModule" placeholder="Name" clearable @change="handleFilter" />
        </el-form-item>
        <el-form-item class="filter-form-item input-small">
          <el-input v-model="listQuery.eventFunction" placeholder="Issued By" clearable @change="handleFilter" />
        </el-form-item>
        <el-form-item class="filter-form-item input-small">
          <el-select v-model="listQuery.eventType" placeholder="Status" clearable @change="handleFilter">
            <el-option v-for="item,index in statusList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item class="filter-form-item input-small">
          <el-select v-model="listQuery.eventSeverity" placeholder="Blacklisted" clearable @change="handleFilter">
            <el-option v-for="item,index in blacklistList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item class="filter-form-item input-small">
          <el-date-picker v-model="listQuery.lastLoginFrom" :picker-options="dateBetween" value-format="yyyy-MM-dd" type="date" clearable placeholder="Start Expiry" @change="handleFilter"/>
        </el-form-item>
      </el-form>
    </div>

    <!-- FILTER DIALOG FOR SMALL MEDIA -->
    <el-dialog title="Filter" :visible.sync="dialogFilter" class="dialog-small">
      <el-form>
        <el-form-item>
          <el-input v-model="listQuery.eventAdmUsrRegnum" placeholder="ID" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.eventModule" placeholder="Name" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.eventFunction" placeholder="Issued By" clearable />
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.eventType" placeholder="Status" clearable>
            <el-option v-for="item,index in statusList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.eventSeverity" placeholder="Blacklisted" clearable>
            <el-option v-for="item,index in blacklistList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="listQuery.lastLoginFrom" :picker-options="dateBetween" value-format="yyyy-MM-dd" type="date" clearable placeholder="Start Expiry"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="button-custom small primary" @click="handleFilter">Search</el-button>
      </div>
    </el-dialog>

    <!-- APPROVAL TABLE -->
    <el-table
      :key="approvalTableKey"
      v-loading="approvalListLoading"
      :data="approvalList"
      fit
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.enforcer_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Name" prop="name" sortable="custom">
        <template slot-scope="{row}">
          <span>{{ row.enforcer_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Issued By" prop="issuedBy" sortable="custom">
        <template slot-scope="{row}">
          <span>{{ row.enforcer_issuedBy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" prop="status" sortable="custom" align="center">
        <template>
          <el-button class="button-custom small primary" @click="dialogApproval = true">Approval</el-button>
        </template>
      </el-table-column>
      <el-table-column label="Blacklisted" prop="blacklisted" sortable="custom" align="center">
        <template slot-scope="{row}">
          <span>{{ row.enforcer_blacklisted }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Expiry Date" prop="expDate" sortable="custom" align="center"/>
      <el-table-column label="Action" align="center" width="150px" />
    </el-table>

    <!-- INQUIRY TABLE -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="dataList"
      fit
    >
      <el-table-column min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.enforcer_id }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="{row}">
          <span>{{ row.enforcer_name }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="{row}">
          <span>{{ row.enforcer_issuedBy }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="{row}">
          <span><i :class="row.enforcer_status|statusIconFilter" /></span>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="{row}">
          <span><i :class="row.enforcer_blacklisted|statusIconFilter" /></span>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="{row}">
          <span>{{ row.enforcer_expDate | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150px">
        <template slot-scope="{row}">
          <el-tooltip content="Re-enroll" placement="top">
            <el-button class="table-icon-button primary" @click="handleReenroll"><i class="el-icon-minus" /></el-button>
          </el-tooltip>
          <el-tooltip content="Reset Password" placement="top">
            <el-button class="table-icon-button info" @click="handleResetPassword"><i class="el-icon-lock" /></el-button>
          </el-tooltip>
          <el-tooltip content="Blacklist" placement="top">
            <el-button class="table-icon-button danger" @click="handleBlacklist(row.enforcer_blacklisted)"><i class="fa-solid fa-ban"></i></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- APPROVAL DIALOG -->
    <el-dialog title="Enforcer Approval" :visible.sync="dialogApproval" class="dialog-small">
      <el-form>
        <el-form-item class="form-input">
          <el-select
            placeholder="Action"
          >
            <el-option
              v-for="item,index in actionList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="form-input">
          <el-input
            placeholder="Reason"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="button-custom small info">Cancel</el-button>
        <el-button class="button-custom small success">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { MessageBox } from 'element-ui'

export default {
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
      approvalTableKey: 1,
      listLoading: true,
      approvalListLoading: true,
      total: 0,
      approvalList: [],
      dataList: [],
      
      // dropdown var
      statusList: ['Active','Inactive'],
      blacklistList: ['True','False'],
      actionList: ['Approve','Reject'],

      // dialog var
      dialogFilter: false,
      dialogApproval: false,
    }
  },
  created(){
    this.getList()
    this.getApprovalList()
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
          enforcer_id:'2305D12EDB8298F3BFB7CF52982159',
          enforcer_name:'John Doe',
          enforcer_issuedBy:'Jane Doe',
          enforcer_status:'Active',
          enforcer_blacklisted:'False',
          enforcer_expDate: new Date(),
        },
        {
          enforcer_id:'2305D12EDB8298F3BFB7CF52982159',
          enforcer_name:'John Doe',
          enforcer_issuedBy:'Jane Doe',
          enforcer_status:'Active',
          enforcer_blacklisted:'True',
          enforcer_expDate: new Date(),
        },
        {
          enforcer_id:'2305D12EDB8298F3BFB7CF52982159',
          enforcer_name:'John Doe',
          enforcer_issuedBy:'Jane Doe',
          enforcer_status:'Inactive',
          enforcer_blacklisted:'False',
          enforcer_expDate: new Date(),
        },
        {
          enforcer_id:'2305D12EDB8298F3BFB7CF52982159',
          enforcer_name:'John Doe',
          enforcer_issuedBy:'Jane Doe',
          enforcer_status:'Active',
          enforcer_blacklisted:'False',
          enforcer_expDate: new Date(),
        },
        {
          enforcer_id:'2305D12EDB8298F3BFB7CF52982159',
          enforcer_name:'John Doe',
          enforcer_issuedBy:'Jane Doe',
          enforcer_status:'Inactive',
          enforcer_blacklisted:'True',
          enforcer_expDate: new Date(),
        },
        {
          enforcer_id:'2305D12EDB8298F3BFB7CF52982159',
          enforcer_name:'John Doe',
          enforcer_issuedBy:'Jane Doe',
          enforcer_status:'Active',
          enforcer_blacklisted:'False',
          enforcer_expDate: new Date(),
        },
      ]
      this.listLoading = false
    },

    getApprovalList(){
      this.approvalListLoading = true
      this.approvalList = [
        {
          enforcer_id:'2305D12EDB8298F3BFB7CF52982159',
          enforcer_name:'John Doe',
          enforcer_issuedBy:'Jane Doe',
          enforcer_status:'',
          enforcer_blacklisted:'',
          enforcer_expDate:'',
        },
        {
          enforcer_id:'2305D12EDB8298F3BFB7CF52982159',
          enforcer_name:'John Doe',
          enforcer_issuedBy:'Jane Doe',
          enforcer_status:'',
          enforcer_blacklisted:'',
          enforcer_expDate:'',
        },
      ]
      this.approvalListLoading = false
    },

    // BUTTON ACTION
    handleReenroll() {
      MessageBox.confirm('Are you sure you want to send request to re-enroll for this user? Your action can not be undone.?', 'Request to Re-enroll', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(() => {})
    },
    handleResetPassword() {
      MessageBox.confirm('Are you sure you want to send request to reset password for this user? Your action can not be undone.', 'Request to Reset Password', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(() => {})
    },
    handleBlacklist(status) {
      MessageBox.confirm(`Are you sure you want to ${status=='True'?'unblacklist':'blacklist'} this enforcer? Your action can not be undone. `, 'Change Blacklist Status', {
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