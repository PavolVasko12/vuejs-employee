<template>
  <article>
    <div v-if="!loading">
      <h1 class="heading">Detail Page</h1>
      <EmployeeCard :employee="this.$store.getters.getSelectedEmployee"></EmployeeCard>
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
    </div>
    <div v-else>
      <Loading></Loading>
    </div>
  </article>
</template>

<script lang="ts">
import { storeValues } from '@/enums/store.enum';
  import { Employee } from '@/interfaces/employee.interface';
  import { Component, Vue } from 'vue-property-decorator';
  import EmployeeCard from '../components/EmployeeCard.vue';
  import Loading from '../components/Loading.vue';

  @Component({
    components: {
      EmployeeCard,
      Loading
    }
  })
  export default class HomePage extends Vue {

    private count = 3;
    randomEmployees: Employee[] = [];
    loading = true;

    /**
     * Select a random employee from an array
     * If we do not have any data store in store try to retrive them from the session storage
     * If session storage empty only then return to home page
     */
    created() {
      if (this.$store.getters.getSelectedEmployeeId) {
        this.initilize();
      } 
      else {
        this.$store.dispatch('assignEmployeesFromSession');
        if (this.$store.getters.getAllEmployeesLength > 0) {
          this.initilize(true);
        } 
        else {
          this.$store.dispatch('getAllEmployeesFromApi')
          .then(() => {
            this.initilize(true);
          })
          .catch(error => {
            window.alert(`Unexpected error, please refresh the page: ${error}`);
            this.loading = false;
          });
        }
      }
    }


    initilize(alreadySelected = false): void {
      if (alreadySelected) {
        this.$store.commit(storeValues.SELECT_EMPLOYEE, this.$store.getters.getEmployeeById(Number(this.$router.currentRoute.params.id)));
      }
      this.randomEmployees = this.sliceArray(this.count, this.shuffleArray(this.removeCurrentEmployee(this.$store.getters.getSelectedEmployeeId)));
      this.loading = false;
    }


    /**
     * @description removes the current employee from an array of all employees in order to do ot display the same data twice
     * @param employeeId the ID f the currently selected employee
     * @returns an arra of all employees apart the currenly selected one
     */
    removeCurrentEmployee = (employeeId: number): Employee[] => {
      return this.$store.getters.getAllEmployees.filter((employee: Employee) => {
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
