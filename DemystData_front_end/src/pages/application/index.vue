<template>
  <div>
    <div class="main-container">
      <h3>{{ allTabsHeadings[getActiveTabIndex()] }}</h3>
      <keep-alive>
        <component
          v-bind:is="activeTab"
          v-bind:details="application.details"
          v-bind:accountProvider="application.details.selectedAccountingProvider"
          v-bind:submittedApplication="submittedApplication"
        >
        </component>
      </keep-alive>
      <div class="buttons">
        <button v-on:click="goBack" v-if="canShowBackButton">Back</button>
        <button v-on:click="goNext" v-if="canShowButtons">
          {{ getActiveTabIndex() < allTabs.length - 2 ? 'Next' : 'Submit' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr';
import Details from '../../components/details';
import BalanceSheet from '../../components/balance-sheet';
import Review from '../../components/review';
import {createApplication} from '../../api/application';

export default {
  name: "Application",
  components: {
    Details,
    BalanceSheet,
    Review
  },
  data() {
    return {
      allTabs: ['Details', 'BalanceSheet', 'Review'],
      allTabsHeadings: ['Details', 'Review balance sheet', 'Submitted application details'],
      activeTab: 'Details',
      application: {
        details: {
          applicantName: '',
          businessDetails: '',
          appliedLoanValue: 0,
          selectedAccountingProvider: 'Xero',
          selectedEstablishedYear: 2023
        }
      },
      submittedApplication: {}
    };
  },
  computed: {
    canShowButtons() {
      return this.getActiveTabIndex() < this.allTabs.length - 1;
    },
    canShowBackButton() {
      return this.getActiveTabIndex() > 0 && this.canShowButtons;
    }
  },
  methods: {
    goNext() {
      const activeTabIndex = this.getActiveTabIndex();
      this.performRequiredAction()
        .then(() => {
          if (activeTabIndex < this.allTabs.length - 1) {
            this.activeTab = this.allTabs[activeTabIndex + 1];
          }
        });
    },
    goBack() {
      const activeTabIndex = this.getActiveTabIndex();
      if (activeTabIndex > 0) {
        this.activeTab = this.allTabs[activeTabIndex - 1];
      }
    },
    getActiveTabIndex() {
      return this.allTabs.indexOf(this.activeTab);
    },
    performRequiredAction() {
      let promise;
      switch (this.activeTab) {
        case 'Details':
          promise = this.validateDetails() ? Promise.resolve() : Promise.reject();
          break;
        case 'BalanceSheet':
          promise = this.submitApplication();
          break;
      }
      return promise;
    },
    validateDetails() {
      toastr.remove();
      if (!this.application.details.applicantName) {
        toastr.error('Applicant name is required');
        return false
      }

      if (!this.application.details.businessDetails) {
        toastr.error('Business detail is required');
        return false
      }

      if (this.application.details.appliedLoanValue <= 0) {
        toastr.error('Loan should be greater than zero');
        return false
      }
      return true;
    },
    submitApplication() {
      const application = {
        name: this.application.details.applicantName,
        establishedYear: this.application.details.selectedEstablishedYear,
        accountingProvider: this.application.details.selectedAccountingProvider,
        appliedLoanValue: this.application.details.appliedLoanValue,
        businessDetails: this.application.details.businessDetails
      };
      return createApplication(application)
        .then((submittedApplication) => {
          this.submittedApplication = submittedApplication;
        });
    }
  }
}
</script>

<style scoped>
.main-container {
  text-align: center;
}

.buttons {
  margin-top: 5px;
}

</style>
