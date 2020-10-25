<template>
  <article>
    <div v-if="!loading">
      <h1 class="heading">Category Page</h1>
      <h2>The most paid employees</h2>
      <div class="multiple-employee-card">
        <EmployeeCard 
            v-for="employee in mostPaidEmployees" 
            v-bind:key="employee.id" 
            :employee=employee
            :multiple=true>
          </EmployeeCard>
      </div>
      <h2>The least paid employees</h2>
      <div class="multiple-employee-card">
        <EmployeeCard 
            v-for="employee in leastPaidEmployees" 
            v-bind:key="employee.id" 
            :employee=employee
            :multiple=true>
          </EmployeeCard>
      </div>
      <h2>The oldest employees</h2>
      <div class="multiple-employee-card">
        <EmployeeCard 
            v-for="employee in oldestEmployees" 
            v-bind:key="employee.id" 
            :employee=employee
            :multiple=true>
          </EmployeeCard>
      </div>
      <h2>The youngest employees</h2>
      <div class="multiple-employee-card">
        <EmployeeCard 
            v-for="employee in youngestEmployees" 
            v-bind:key="employee.id" 
            :employee=employee
            :multiple=true>
          </EmployeeCard>
      </div>
    </div>
    <div v-else>
      <Loading></Loading>
    </div>
  </article>
</template>

<script lang="ts">
  import { Employee } from '@/interfaces/employee.interface';
  import { Component, Vue } from 'vue-property-decorator';
  import EmployeeCard from '../components/EmployeeCard.vue';
  import { main } from '../enums/main.enum';
  import Loading from '../components/Loading.vue'

  @Component({
    components: {
      EmployeeCard,
      Loading
    }
  })
  export default class CategoryPage extends Vue {

    mostPaidEmployees: Employee[] = [];
    leastPaidEmployees: Employee[] = [];
    youngestEmployees: Employee[] = [];
    oldestEmployees: Employee[] = [];
    loading = true;

    /**
     * Fill all the relevant arrays with appropriate data and use only 3 to display
     * If we do not have any data store in store, return back to home page
     */
    created() {
      if (this.$store.getters.getAllEmployeesLength > 0) {
        this.initilize();
      } else {
        this.$store.dispatch('assignEmployeesFromSession').then(response => {
          (response) ? this.initilize() : this.apiCall();
        });
      }
    }

    initilize(): void {
      this.mostPaidEmployees = Vue.lodash.orderBy(this.$store.getters.getAllEmployees, [main.SALARY], [main.DESC]).slice(0,3);
      this.leastPaidEmployees = Vue.lodash.orderBy(this.$store.getters.getAllEmployees, [main.SALARY], [main.ASC]).slice(0,3);
      this.oldestEmployees = Vue.lodash.orderBy(this.$store.getters.getAllEmployees, [main.AGE], [main.DESC]).slice(0,3);
      this.youngestEmployees = Vue.lodash.orderBy(this.$store.getters.getAllEmployees, [main.AGE], [main.ASC]).slice(0,3);
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
  }
</script>

<style scoped lang="scss">
  h2 {
    margin-top: 50px;
  }
</style>
