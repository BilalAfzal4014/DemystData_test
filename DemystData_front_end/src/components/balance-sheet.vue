<template>
  <div>
    <ul>
      <li v-for="entry in accountingProviderSheet">
        <h5>year: {{ entry.year }}</h5>
        <h5>month: {{ entry.month }}</h5>
        <h5>profitOrLoss: {{ entry.profitOrLoss }}</h5>
        <h5>assetsValue: {{ entry.assetsValue }}</h5>
      </li>
    </ul>
  </div>
</template>

<script>
import {fetchBalanceSheetByProviderName} from '../api/account-provider-sheet';

export default {
  name: 'BalanceSheet',
  props: ['accountProvider'],
  data() {
    return {
      accountingProviderSheet: [],
    }
  },
  mounted() {
    this.fetchAccountProviderSheet();
  },
  methods: {
    fetchAccountProviderSheet() {
      fetchBalanceSheetByProviderName(this.accountProvider)
        .then((accountingProviderSheet) => {
          this.accountingProviderSheet = accountingProviderSheet
        });
    }
  }
}
</script>

<style scoped>
ul {
  display: inline;
  list-style: none;
}

ul li {
  display: inline-block;
  margin: 0 10px;
  border: 1px solid black;
  padding: 0 10px;
  border-radius: 5px;
}
</style>
