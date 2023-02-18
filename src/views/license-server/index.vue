<template>
  <div class="app-container">
    <!-- HEADER -->
    <div class="title-container">
      <div style="display: flex;">
        <h1 class="page-title">License Server</h1>
      </div>
    </div>

    <!-- TABLE -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="dataList"
      fit
      @sort-change="sortChange"
    >
      <el-table-column label="No" prop="no" align="center">
        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Host Name" prop="hostName">
        <template slot-scope="{row}">
          <span>{{ row.server_hostname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Host IP" prop="hostIP">
        <template slot-scope="{row}">
          <span>{{ row.server_ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" prop="status" sortable="custom" align="center">
        <template slot-scope="{row}">
          <span><i :class="row.server_status|statusIconFilter" /></span>
        </template>
      </el-table-column>
      <el-table-column label="Last update" prop="lastUpdate" sortable="custom" align="center">
        <template slot-scope="{row}">
          <span>{{ row.server_last_update | dateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Updated by" prop="updatedBy" sortable="custom">
        <template slot-scope="{row}">
          <span>{{ row.server_updated_by }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Action" align="center" width="150px">
        <template slot-scope="{row}">
          <el-tooltip content="Detail" placement="top">
            <router-link :to="{ name: 'LicenseServerDetail', params: { host_name: row.server_hostname, host_ip: row.server_ip } }">
              <!-- <router-link :to='"/license-server/detail/"+row.server_hostname'> -->
              <el-button class="table-icon-button primary"><i class="el-icon-view" /></el-button>
            </router-link>
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
import { getLicenseServerList } from '@/api/license-server'

export default {
  components: { Pagination },
  filters: {
    dateFilter: function(date) {
      if (moment(date).isValid()) {
        return moment(date).utc().format('DD MMM YYYY HH:mm:ssa')
      } else {
        return '-'
      }
    },
    statusIconFilter(status) {
      const statusMap = {
        'ACTIVE': 'el-icon-success table-icon-success',
        'INACTIVE': 'el-icon-error table-icon-danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // filter date
      dateBetween: { disabledDate: this.disabledOtherDate },

      // query var
      listQuery: {
        page: 1,
        pagesize: 10,
        order: '',
        start: 1
      },

      // table var
      tableKey: 0,
      listLoading: true,
      total: 0,
      dataList: [],

      // dropdown var
      activeList: ['Active', 'Inactive']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      if (this.listQuery.page == 1) {
        this.listQuery.start = 1
      } else {
        this.listQuery.start = this.listQuery.pagesize * this.listQuery.page + 1
      }

      getLicenseServerList(this.listQuery).then(response => {
        this.dataList = response.data.data
        this.total = response.data.total_records
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },

    // SORT
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
          this.listQuery.order = ''
          break
      }
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
