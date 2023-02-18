<template>
  <div class="app-container">
    <!-- HEADER -->
    <div class="title-container">
      <h1 class="page-title">Enforcer Device Detail</h1>
      <el-button class="page-button button-custom primary small" @click="$router.go(-1)">Back</el-button>
    </div>
    <div class="info-wrapper">
      <table class="form-table">
        <tr>
          <td class="form-table-label">Aidigest</td>
          <td class="form-table-info">{{dataList.enforcer_aidigest}}</td>
        </tr>
        <tr>
          <td class="form-table-label">Device Type</td>
          <td class="form-table-info">{{dataList.enforcer_deviceType}}</td>
        </tr>
        <tr>
          <td class="form-table-label">Enrolled at</td>
          <td class="form-table-info">{{dataList.enforcer_enrolled | dateTimeFilter}}</td>
        </tr>
        <tr>
          <td class="form-table-label">Last updated</td>
          <td class="form-table-info">{{dataList.enforcer_lastUpdate | dateTimeFilter}}</td>
        </tr>
      </table>
      <el-button class="button-custom small" :class="dataList.enforcer_active | statusColor" @click="handleInactive">{{dataList.enforcer_active}}</el-button>
      <el-button class="button-custom small" :class="dataList.enforcer_blacklisted | statusColor" @click="handleBlacklist">{{dataList.enforcer_blacklisted| statusFormat}}</el-button>
    </div>

    <div class="card-title">X509 SIM</div>
    <div class="card-date"><strong>Created time: </strong>{{dataList.x509_sim_createdTime | dateTimeFilter}}</div>
    <el-card class="card-square">
      {{dataList.x509_sim_string}}
    </el-card>
    <div class="card-title">X509 STNK</div>
    <div class="card-date"><strong>Created time: </strong>{{dataList.x509_stnk_createdTime | dateTimeFilter}}</div>
    <el-card class="card-square">
      {{dataList.x509_stnk_string}}
    </el-card>
    <div class="card-title">X509 BPKB</div>
    <div class="card-date"><strong>Created time: </strong>{{dataList.x509_bpkb_createdTime | dateTimeFilter}}</div>
    <el-card class="card-square">
      {{dataList.x509_bpkb_string}}
    </el-card>

    <!-- TABLE -->
    <div class="title-container">
      <h1 class="page-title">Device Certificate</h1>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="certList"
      fit
    >
      <el-table-column label="User DocID" prop="user_docID">
        <template slot-scope="{row}">
          <span>{{ row.user_docID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Issuer" prop="issuer">
        <template slot-scope="{row}">
          <span>{{ row.issuer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Valid from" prop="validFrom" align="center">
        <template slot-scope="{row}">
          <span>{{ row.validFrom | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Valid to" prop="validTo" align="center">
        <template slot-scope="{row}">
          <span>{{ row.validTo | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Revoked" prop="revoked" align="center">
        <template slot-scope="{row}">
          <span><i :class="row.revoked|statusIconFilter" /></span>
        </template>
      </el-table-column>
      <el-table-column label="Generated" prop="generated" align="center">
        <template slot-scope="{row}">
          <span>{{ row.generated | dateTimeFilter}}</span>
        </template>
      </el-table-column>
    </el-table>
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
    dateTimeFilter: function(date) {
      if (moment(date).isValid()) {
        return moment(date).format('DD MMM YYYY HH:mm')
      } else {
        return '-'
      }
    },
    statusIconFilter(status){
      const statusMap={
        'true': 'el-icon-error table-icon-danger',
        'false': 'el-icon-success table-icon-success'
      }
      return statusMap[status]
    },
    statusColor(status){
      const statusMap={
        'Active' : 'success',
        'Inactive' : 'danger',
        'True' : 'danger',
        'False': 'true'
      }
      return statusMap[status]
    },
    statusFormat(status){
      const statusMap={
        'True' : 'Blacklisted',
        'False': 'Not blacklisted'
      }
      return statusMap[status]
    }
  },
  data(){
    return{
      // data var
      dataList:null,
      certList:[],

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
    }
  },
  created(){
    this.getList();
    this.getCertificateList();
  },
  methods: {
    getList(){
      // get id from route
      // this.$route.param.id
      this.dataList = {
        enforcer_id:1,
        enforcer_aidigest:'2305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B83419798925',
        enforcer_deviceType: 'ANDROID',
        enforcer_enrolled: new Date(),
        enforcer_lastUpdate: new Date(),
        enforcer_active: 'Active',
        enforcer_blacklisted: 'True',
        x509_sim_string:'2305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B83419798925',
        x509_sim_createdTime: new Date(),
        x509_stnk_string:'2305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B83419798925',
        x509_stnk_createdTime: new Date(),
        x509_bpkb_string:'2305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B834197989252305D12EDB8298F3BFB7CF52982159LCE072B6F75BE8AADCACD5B83419798925',
        x509_bpkb_createdTime: new Date(),
      }
    },
    getCertificateList(){
      this.listLoading = true
      this.certList = [
        {
          user_docID: '0128snu182e91e19',
          issuer: 'KORLANTAS-QR',
          validFrom: new Date(),
          validTo: new Date(),
          revoked: 'false',
          generated: new Date()
        },
        {
          user_docID: '0128snu182e91e19',
          issuer: 'KORLANTAS-QR',
          validFrom: new Date(),
          validTo: new Date(),
          revoked: 'false',
          generated: new Date()
        },
        {
          user_docID: '0128snu182e91e19',
          issuer: 'KORLANTAS-QR',
          validFrom: new Date(),
          validTo: new Date(),
          revoked: 'true',
          generated: new Date()
        },
      ]
      this.listLoading = false
    },

    // BUTTON ACTION
    handleInactive() {
      MessageBox.confirm(`Are you sure you want to ${this.dataList.enforcer_active=='Active'?'inactivate':'activate'} this device? Your action can not be undone. `, 'Change Active Status', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(() => {})
    },
    handleBlacklist() {
      MessageBox.confirm(`Are you sure you want to ${this.dataList.enforcer_blacklisted=='True'?'unblacklist':'blacklist'} this device? Your action can not be undone. `, 'Change Blacklist Status', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.info-wrapper{
  margin-bottom: 20px;
  .button-custom{
    margin-right: 10px;
  }
}

.card-title{
  font-weight: 700;
  float: left;
  margin: 20px 0 10px;
}

.card-date{
  float: right;
  margin: 20px 0 10px;
}

.el-card{
  padding: 5px 10px;
  word-wrap: break-word;
  line-height: 24px;
  width: 100%;
}
</style>