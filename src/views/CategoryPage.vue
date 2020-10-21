<template>
  <article>
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
  </article>
</template>

<script lang="ts">
  import { Employee } from '@/interfaces/employee.interface';
  import { Component, Vue } from 'vue-property-decorator';
  import EmployeeCard from '../components/EmployeeCard.vue';
  import store from '../store/store';
  import router from '@/router';
  import { main } from '../enums/main.enum';

  @Component({
    components: {
      EmployeeCard
    }
  })
  export default class CategoryPage extends Vue {

    mostPaidEmployees: Employee[] = [];
    leastPaidEmployees: Employee[] = [];
    youngestEmployees: Employee[] = [];
    oldestEmployees: Employee[] = [];

    /**
     * Fill all the relevant arrays with appropriate data and use only 3 to display
     * If we do not have any data store in store, return back to home page
     */
    created(): void {
      if (store.state.employees.length > 0) {
        this.mostPaidEmployees = Vue.lodash.orderBy(store.state.employees, [main.SALARY], [main.DESC]).slice(0,3);
        this.leastPaidEmployees = Vue.lodash.orderBy(store.state.employees, [main.SALARY], [main.ASC]).slice(0,3);
        this.oldestEmployees = Vue.lodash.orderBy(store.state.employees, [main.AGE], [main.DESC]).slice(0,3);
        this.youngestEmployees = Vue.lodash.orderBy(store.state.employees, [main.AGE], [main.ASC]).slice(0,3);
      } else {
        router.push({ path: "/"});
      }
    }
  }
</script>

<style scoped lang="scss">
  h2 {
    margin-top: 50px;
  }
</style>
