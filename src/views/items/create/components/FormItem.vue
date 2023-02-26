<template>
    <el-row style="margin-top: 30px">
        <el-col :span="12">
            <el-form-item label="Nama Barang" class="filter-form-item input-small" prop="item_name">
                <el-input v-model="item_name" ref="item_name" placeholder="Masukkan nama barang" @input="emitInput" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="Deskripsi" class="filter-form-item input-small" prop="item_description">
                <el-input v-model="item_description" ref="item_description" placeholder="Masukkan deksripsi" @input="emitInput" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="Harga Beli" class="filter-form-item input-small" prop="item_purchase">
                <el-input v-model="item_purchase" ref="item_quantity" placeholder="Masukkan harga beli" @input="emitInput" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="Harga Jual" class="filter-form-item input-small" prop="item_sale_price">
                <el-input v-model="item_sale_price" ref="item_sale_price" placeholder="Masukkan harga jual" @input="emitInput" clearable />
            </el-form-item>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'FormItem',
    data() {
        return {
            item_name: "",
            item_description: "",
            item_purchase: "",
            item_sale_price: ""
        }
    },
    methods: {
        emitInput() {
            this.$emit('input', {
                item_name: this.item_name,
                item_description: this.item_description,
                item_purchase: this.item_purchase,
                item_sale_price: this.item_sale_price
            });
        }
    }
}
</script>