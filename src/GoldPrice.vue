<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'name', order: 'ascending'}"
    :row-class-name="tableRowClassName"
    >
    <el-table-column
      prop="name"
      :label="this.$t('name')"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="price"
      :label="this.$t('price')"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="ratio"
      :label="this.$t('ratio')"
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
                'XAU/CNY': this.$t("RMBGold"),
                'XAU/USD': this.$t("USDGold"),
                'XAG/CNY': this.$t("RMBSilver"),
                'XAG/USD': this.$t("USDSilver")
            };
            var tableData = [];
            for(let i = 0; i < goldData.length; i++) {
                var gold = {
                    name: goldType[goldData[i].productId],
                    price: goldData[i].midRate,
                    ratio: ((goldData[i].midRate - goldData[i].openRate) / goldData[i].openRate * 100).toFixed(2)
                };

                tableData.push(gold);
            }
            this.tableData = tableData;
        },
        getGoldPrice() {
            axios.get('https://129.226.129.39:8443/gold-price').then((response) => {
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
            this.getGoldPrice();
        }, 1000);
    }
}
</script>
<style>
    .el-table .up-row {
        color: red;
    }

    .el-table .down-row {
        color: green;
    }
</style>
