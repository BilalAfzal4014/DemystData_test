<template>
  <form>
    <div>
      <label for="applicant-name">Applicant name:</label>
      <input type="text" id="applicant-name" name="applicant-name" v-model="details.applicantName">
    </div>
    <div>
      <label for="details">Business Details:</label>
      <textarea id="details" name="details" required v-model="details.businessDetails"></textarea>
    </div>
    <div>
      <label for="loan">Loan amount:</label>
      <input type="number" id="loan" name="loan" required v-model="details.appliedLoanValue">
    </div>
    <div>
      <label for="Accounting-provider">Accounting provider:</label>
      <select id="Accounting-provider" name="Accounting-provider" v-model="details.selectedAccountingProvider">
        <option v-for="accountProvider in accountingProviders" v-bind:key="accountProvider.id"
                v-bind:value="accountProvider.id">{{ accountProvider.name }}
        </option>
      </select>
    </div>
    <div>
      <label for="Establish-year">Establish year:</label>
      <select id="Establish-year" name="Establish-year" v-model="details.selectedEstablishedYear">
        <option v-for="establishedYear in establishedYears" v-bind:key="establishedYear" v-bind:value="establishedYear">
          {{ establishedYear }}
        </option>
      </select>
    </div>
  </form>
</template>

<script>
import {fetchAccountProviders} from '../api/account-provider';

export default {
  name: 'Details',
  props: ['details'],
  data() {
    return {
      accountingProviders: [],
      establishedYears: (function () {
        const years = [];
        for (let i = 2023; i >= 1950; i--) {
          years.push(i);
        }
        return years
      })(),
    }
  },
  mounted() {
    this.fetchAccountProviders();
  },
  methods: {
    fetchAccountProviders() {
      fetchAccountProviders()
        .then((accountingProviders) => {
          this.accountingProviders = accountingProviders
        });
    }
  }
}
</script>

<style scoped>
form div {
  margin: 20px 0px;
}

form label {
  display: block;
  text-align: inherit;
}
</style>
