<template>
  <!-- TABLE -->
  <div>
    <el-table :key="tableKey" v-loading="listLoading" :data="dataList" fit @sort-change="sortChange">
      <el-table-column label="Capacity/Lot" prop="capacityPerLot" sortable="custom">
        <template slot-scope="{row}">
          <span>{{ row.license_capacity | numberFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Added at" prop="addedAt" sortable="custom" align="center">
        <template slot-scope="{row}">
          <span>{{ row.license_added_at | dateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Added by" prop="addedBy">
        <template slot-scope="{row}">
          <span>{{ row.license_added_by.toUpperCase() }}</span>
        </template>
      </el-table-column>
    </el-table>
    <p>
      <span>Total Capacity: <b class="colored-status success">{{ total_lot }}</b></span> |
      <span>Total Used: <b class="colored-status danger">{{ total_used }}</b></span> |
      <span>Remaining Capacity: <b class="colored-status warning">{{ parseInt(total_lot) - parseInt(total_used) }}</b></span>
    </p>
  </div>
</template>

<script>
import moment from 'moment'
import Pagination from '@/components/Pagination'
import { getLicenseServerDetail } from '@/api/license-server'

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
    numberFormat: function(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  props: {
    type: {
      type: String,
      default: 'qrcode'
    },
    hostname: {
      type: String,
      default: ''
    },
    hostip: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableKey: 1,
      dataList: [],
      total_lot: 0,
      total_used: 0,
      list: null,
      listQuery: {
        page: 1,
        pagesize: 10,
        order: '',
        type: this.type,
        sort: '+id',
        domainUrl: this.hostip,
        typeName: this.type
      },
      total: 0,
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.$emit('create') // for test
      getLicenseServerDetail(this.listQuery).then(response => {
        this.dataList = response.data.data.licenses
        this.total_lot = response.data.data.licenses_total_lot
        this.total_used = response.data.data.licenses_total_used
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
