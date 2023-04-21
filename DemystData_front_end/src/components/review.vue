<template>
  <div>
    <span><strong>Business details:</strong> {{ submittedApplication.businessDetails }}</span>
    <span><strong>Business established year:</strong> {{ submittedApplication.establishedYear }}</span>
    <span><strong>Latest profit of loss summary of the last month:</strong> {{ submittedApplication.latestProfitOrLossSummary }}</span>
    <span><strong>Loan approved in percentage:</strong> {{ submittedApplication.preAssessment }}%</span>
    <span><strong>Loan approved in value:</strong> {{ submittedApplication.proposedLoanValue }}</span>
  </div>
</template>

<script>
export default {
  props: ['submittedApplication']
}
</script>

<style scoped>
  div span{
    display: block;
    margin: 5px 0;
  }
</style>
