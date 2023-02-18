<template>
  <div class="app-container">
    <div class="title-container">
      <h1 class="page-title">Satpas Record</h1>
    </div>
    <el-row :gutter="40">
      <!-- CARD -->
      <el-col :sm="24" :md="8" :lg="6">
        <el-card class="card-square">
          <div class="card-title-number">1,029 Satpas</div>
          <div class="card-subtitle">Most Active Satpas</div>
          <div class="card-info" v-for="item,index in activeSatpasList" :key="index">{{item}}</div>
        </el-card>

        <el-card class="card-square">
          <div class="card-title">Add Satpas</div>
          <div class="button-container">
            <el-button class="button-custom small primary">Form</el-button>
            <el-button class="button-custom small success">Upload Excel</el-button>
          </div>
        </el-card>
      </el-col>

      <!-- TABLE -->
      <el-col :sm="24" :md="16" :lg="18">
        <div class="filter-container">
          <el-form class="filter-form" style="width:100%">
            <el-form-item class="filter-form-item input-small" style="width:100%">
              <el-input v-model="listQuery.satpasName" placeholder="Satpas Name" clearable @change="handleFilter" />
            </el-form-item>
          </el-form>
        </div>

        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="dataList"
          fit
          @sort-change="sortChange"
        >
          <el-table-column label="Satpas" prop="satpas" sortable="custom" min-width="150px">
            <template slot-scope="{row}">
              <span>{{ row.satpas_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Total QR" prop="totalQr" sortable="custom" min-width="130px">
            <template slot-scope="{row}">
              <span>{{ row.satpas_totalQr }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Last Active" prop="lastActive" sortable="custom" align="center" min-width="130px">
            <template slot-scope="{row}">
              <span>{{ row.satpas_lastActive | dateFilter}}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- Pagination -->
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize" @pagination="getList" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import moment from 'moment'

export default {
  components: {Pagination},
  filters:{
    dateFilter: function(date) {
      if (moment(date).isValid()) {
        return moment(date).format('DD MMM YYYY')
      } else {
        return '-'
      }
    },
  },
  data(){
    return{
      activeSatpasList:[],

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
    this.getList()
    this.getActiveList()
  },
  methods:{
    getList(){
      this.listLoading = true
      this.dataList = [
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
        {
          satpas_name: 'Satpas Polres Metro Tangerang Kota',
          satpas_totalQr: '357,098',
          satpas_lastActive: new Date()
        },
      ]
      this.total = this.dataList.length
      this.listLoading = false
    },
    getActiveList(){
      this.activeSatpasList = [
        'Satpas Jakarta Selatan',
        'Satpas Polda Metro Jaya',
        'Satpas Jakarta Pusat',
        'Satpas Polres Metro Tangerang Kota',
        'Satpas Polres Tangerang Selatan'
      ]
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

<style lang="scss" scoped>
.card-title{
  font-size: 44px;
  color: #D5E1E7;
  font-weight: 700;
  font-family: 'Roboto',sans-serif;
  text-align: center;
  margin-bottom: 15px;

  &-number{
    @extend .card-title;
    text-align: left;
    color: #85D3FF;
  }
}

.card-subtitle{
  color: #D5E1E7;
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 14px;
}

.card-info{
  margin-bottom: 10px;
  font-size: 14px;
}

.button-container{
  text-align: center;

  .button-custom{
    margin: 4px 5px;
    padding: 5px 30px;
  }
}
</style>