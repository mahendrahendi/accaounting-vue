<template>
    <el-row style="margin-top: 30px">
        <el-col :span="12">
            <el-form-item label="Nama Barang" class="filter-form-item input-small" prop="item_name">
                <el-input v-model="list.item_name" ref="item_name" placeholder="Masukkan nama barang" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="Deskripsi" class="filter-form-item input-small" prop="item_description">
                <el-input v-model="list.item_description" ref="item_description" placeholder="Masukkan deksripsi" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="Harga Beli" class="filter-form-item input-small" prop="item_purchase">
                <el-input v-model="list.item_purchase" ref="item_quantity" placeholder="Masukkan harga beli" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="Harga Jual" class="filter-form-item input-small" prop="item_sale_price">
                <el-input v-model="list.item_sale_price" ref="item_sale_price" placeholder="Masukkan harga jual" clearable />
            </el-form-item>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'FormItem',
    props: {
        item_name: {
            type: String,
            default: ''
        },
        item_description: {
            type: String,
            default: ''
        },
        item_quantity: {
            type: String,
            default: ''
        },
        item_price: {
            type: String,
            default: ''
        },
        item_total: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            list: {
                item_name: this.item_name,
                item_description: this.item_description,
                item_quantity: this.item_quantity,
                item_price: this.item_price,
                item_total: this.item_total
            }
        }
    },
}
</script>