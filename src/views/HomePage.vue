<template>
  <article>
    <!-- Display only when not loading from the API -->
    <div  class="home-page" v-if="!loading">
      <h1 class="heading">Home Page</h1>
      <div class="home-page__header">
        <label for="order-select">Order by</label>
        <select id="order-select" name="sortOptions" v-model="orderBy" @change="onChangeOrderBy()">
          <option disabled value="">Choose</option>
          <option value="employee_name">Name</option>
          <option value="employee_salary">Salary</option>
          <option value="employee_age">Age</option>
        </select>
      </div>
      <!-- Loop over the employees array, each card is clickable (Takes you to detail page) -->
      <div class="home-page__card" v-for="employee in employees" v-bind:key="employee.id" @click="goToDetailPage(employee)">
        <p><span>Name:</span> {{ employee.employee_name }}</p>
        <p><span>Salary:</span> {{ employee.employee_salary }}</p>
        <p><span>Age:</span> {{ employee.employee_age }}</p>
      </div>
    </div>
    <div v-else>
      <Loading></Loading>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Employee } from '../interfaces/employee.interface';
import Loading from '../components/Loading.vue';
import { storeValues } from '../enums/store.enum';

@Component({
  components: {
    Loading
  }
})
export default class HomePage extends Vue {
  employees: Employee[] = [];
  loading = true;
  orderBy = '';


  created(): void {
    if (this.$store.getters.getAllEmployeesLength > 0) {
        this.initilize();
    } else {
      this.$store.dispatch('assignEmployeesFromSession').then(response => {
        (response) ? this.initilize() : this.apiCall();
      });
    }
  }

  initilize() {
    this.employees = this.$store.getters.getOnlyTenEmployees(10);
    this.loading = false;
  }

  apiCall() {
    this.$store.dispatch('getAllEmployeesFromApi')
      .then(() => {
        this.initilize();
      })
      .catch(error => {
        window.alert(`Unexpected error, please refresh the page: ${error}`);
        this.loading = false;
      });
  }

  /**
   * @description go to the details page after a click on an employee item, and set selected employee in VUEX store
   * @param employee the selected employee
   */
  goToDetailPage = (employee: Employee): void => {
    this.$store.commit(storeValues.SELECT_EMPLOYEE, employee);
    this.$router.push({ path: `/detail/${employee.id}`});
  }

  /**
   * @description re-order the display data
   */
  onChangeOrderBy(): void {
    this.employees = Vue.lodash.orderBy(this.employees, this.orderBy);
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/variables.scss";

  .home-page {

    &__header {
      display: flex;
      justify-content: flex-end;
      background-color: $gray;
      border-radius: 3px;
      margin: 20px 0;
      align-items: center;
      padding: 8px;

      label {
        padding-right: 10px;
        font-size: 1em;
        font-weight: 800;
      }

      select {
        width: 100%;
        max-width: 200px;
        font-size: 1em;
        padding: 10px 5px;
        border: 2px solid $primary-color;
        border-radius: 3px;
        transition: 300ms ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;

        &:hover {
          border: 2px solid $aquamarine;
          cursor: pointer;
        }

        &:focus {
          outline: none;
        }
      }
    }


    &__card {
      padding: 15px;
      box-shadow: 1px 1px 4px rgb(239, 239, 239);
      margin-bottom: 20px;
      transition: 200ms ease-in-out;
      border-radius: 3px;
      background-color: $light-gray;

      span {
        font-weight: 800;
      }

      &:hover {
        box-shadow: 2px 2px 14px lightgray;
        background-color: rgb(239, 239, 239);
        cursor: pointer;
      }
    }
  }
</style>