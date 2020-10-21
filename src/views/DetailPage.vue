<template>
  <article> 
    <h1 class="heading">Detail Page</h1>
    <EmployeeCard :employee="store.state.selectedEmployee"></EmployeeCard>
    <h3>Relevant employees:</h3>
    <!-- Relevant empployee loop -->
    <div class="multiple-employee-card">
      <EmployeeCard 
        v-for="employee in randomEmployees" 
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

  @Component({
    components: {
      EmployeeCard
    }
  })
  export default class HomePage extends Vue {

    private store = store;
    private count = 3;
    randomEmployees: Employee[] = [];

    /**
     * Select a random employee from an array
     * If we do not have any data store in store, return back to home page
     */
    created() {
      if (store.state.selectedEmployee.id) {
        this.randomEmployees = this.sliceArray(this.count, this.shuffleArray(this.removeCurrentEmployee(store.state.selectedEmployee.id)));
      } else {
        router.push({ path: "/"});
      }
    }


    /**
     * @description removes the current employee from an array of all employees in order to do ot display the same data twice
     * @param employeeId the ID f the currently selected employee
     * @returns an arra of all employees apart the currenly selected one
     */
    removeCurrentEmployee = (employeeId: number): Employee[] => {
      return store.state.employees.filter(employee => {
        if (employee.id !== employeeId) {
          return employee;
        }
      });
    }


    /**
     * @description Shuffles the array
     * @param employees array of all employees
     * @returns shuffled array
     */
    shuffleArray = (employees: Employee[]): Employee[] => {
      return employees.sort(() => 0.5 - Math.random());
    }

    /**
     * @description slice the array to required length
     * @param count the required number of items to be seleected fomr the array
     * @param employees array of all employees
     * @returns sliced array of required length
     */
    sliceArray = (count: number, employees: Employee[]): Employee[] => {
      return employees.slice(0, count);
    }

  }
</script>

<style scoped lang="scss">
  @import "../styles/variables.scss";

  h3 {
    border-bottom: 4px solid $aquamarine;
    margin-top: 100px;
  }
</style>
