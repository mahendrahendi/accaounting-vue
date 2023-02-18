<template>
  <div class="app-container">
    <!-- HEADER -->
    <div class="title-container">
      <div style="display: flex;">
        <el-button
          class="button-icon primary"
          style="margin-right: 20px"
          icon="el-icon-arrow-left"
          @click="$router.push('/license-server/list')"
        />
        <h1 class="page-title">
          Details of {{ paramsData.host_name }}<h6 style="margin: 0">Host IP: {{ paramsData.host_ip }}</h6>
        </h1>
      </div>
      <div class="page-button">
        <!-- <el-button class="button-custom small primary" @click="$router.go(-1)">Back</el-button> -->
        <el-tooltip content="Add License" placement="top">
          <el-button class="button-icon info" icon="el-icon-plus" @click="dialogAddLicense = true" />
        </el-tooltip>
      </div>
    </div>

    <el-tabs v-model="activeTab">
      <el-tab-pane
        v-for="item, index in dataLicenseTypesList"
        :key="item.license_type_name"
        :label="item.license_type_name.toUpperCase()"
        :name="item.license_type_name"
      >
        <keep-alive>
          <tab-pane
            v-if="activeTab == item.license_type_name"
            :type="item.license_type_name"
            :hostname="paramsData.host_name"
            :hostip="paramsData.host_ip"
          />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

    <!-- DIALOG ADD LICENSE -->
    <el-dialog title="Add License" :visible.sync="dialogAddLicense" :close-on-click-modal="false" class="dialog-small">
      <el-form ref="addLicenseListForm" :model="addLicenseListForm" label-position="left">
        <el-form-item label="Hostname">
          <el-input v-model="addLicenseListForm.hostname" type="text" readonly />
        </el-form-item>
        <el-form-item label="Host IP">
          <el-input v-model="addLicenseListForm.hostip" type="text" readonly />
        </el-form-item>
        <el-form-item label="License Type">
          <el-input v-model="addLicenseListForm.license_type" type="text" readonly />
        </el-form-item>
        <el-form-item label="License String">
          <el-input v-model="addLicenseListForm.license_string" type="textarea" :rows="10" placeholder="Input License String here.." />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="button-custom small info" @click="dialogAddLicense = false">Cancel</el-button>
        <el-button class="button-custom small success">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { MessageBox } from 'element-ui'
import { getLicenseTypesList } from '@/api/license-server'
import TabPane from './components/TabPane'

export default {
  components: { TabPane },
  filters: {
    dateFilter: function(date) {
      if (moment(date).isValid()) {
        return moment(date).format('DD MMM YYYY')
      } else {
        return '-'
      }
    },
    numberFormat: function(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },

  props: {
    pageNumber: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      // tab var
      activeTab: '',

      // query var
      listQuery: {
        page: 1,
        pagesize: 10,
        order: ''
      },

      // table var
      tableKey: 0,
      listLoading: true,
      total: 0,
      dataLicenseTypesList: [],
      dataList: [],

      addLicenseListForm: {
        hostname: this.$attrs['host_name'],
        hostip: this.$attrs['host_ip'],
        license_type: '',
        license_string: ''
      },

      // dropdown var
      serverList: ['Server 1', 'Server 2'],

      // dialog var
      dialogAddLicense: false,
      paramsData: {
        host_name: this.$attrs['host_name'],
        host_ip: this.$attrs['host_ip']
      }
    }
  },
  watch: {
    activeTab(val) {
      this.addLicenseListForm.license_type = val.toUpperCase()
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    if (!this.paramsData.host_name && !this.paramsData.host_ip) {
      this.$router.push('/license-server/list')
    }
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeTab = tab
    }

    this.listQuery.page = this.pageNumber

    // this.getList()
    this.getTabs()
  },
  methods: {
    getTabs() {
      this.listLoading = true

      getLicenseTypesList(this.paramsData.host_ip).then(response => {
        this.dataLicenseTypesList = response.data
        this.activeTab = this.dataLicenseTypesList[0].license_type_name
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },

    // BUTTON ACTION
    handleDeactivate() {
      MessageBox.confirm(`Are you sure you want to deactivate this server? Your action can not be undone. `, 'Deactivate Confirmation', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(() => { })
    }

  }
}
</script>
