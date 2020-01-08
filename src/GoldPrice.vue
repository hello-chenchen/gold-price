<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'name', order: 'descending'}"
    :row-class-name="tableRowClassName"
    >
    <el-table-column
      prop="name"
      label="name"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="price"
      label="price"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="ratio"
      label="Price ratio"
      sortable
      width="180">
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios';
export default {
    name: "GoldPrice",
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        tableRowClassName({row, rowIndex}) {
            if(this.tableData[rowIndex].ratio > 0) {
                return 'up-row';
            } else {
                return 'down-row';
            }
        },
        formaterData(goldData) {
            var goldType = {
                'XAU/CNY': 'RMB Gold',
                'XAU/USD': 'USD Gold',
                'XAG/CNY': 'RMB Silver',
                'XAG/USD': 'USD Silver'
            };
            var tableData = [];
            for(let i = 0; i < goldData.length; i++) {
                var gold = {
                    name: goldType[goldData[i].productId],
                    price: goldData[i].midRate,
                    ratio: ((goldData[i].midRate - goldData[i].minRate) / goldData[i].minRate * 100).toFixed(2)
                };

                tableData.push(gold);
            }
            this.tableData = tableData;
        },
        getGoldPrice() {
            axios.get('https://129.226.121.194:8443/gold-price').then((response) => {
                if(200 != response.status) {
                    console.error('gold-price error response');
                    return;
                }
                let goldData = response.data.data.result.datals;
                this.formaterData(goldData);
            });
        }
    },
    mounted () {
        setInterval(() => {
            axios.get('https://129.226.121.194:8443/gold-price').then((response) => {
                if(200 != response.status) {
                    console.error('gold-price error response');
                    return;
                }
                let goldData = response.data.data.result.datals;
                this.formaterData(goldData);
            });
        }, 1000);
    }
}
</script>
<style>
    .el-table .up-row {
        background: red;
        color: white;
    }

    .el-table .down-row {
        background: green;
        color: white;
    }
</style>