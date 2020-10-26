<template>
  <article>
    <div v-if="!loading">
      <div class="heading-holder">
        <h1 class="heading">Detail Page</h1>
        <div class="fancy-cards first"></div>
        <div class="fancy-cards second"></div>
      </div>
      <EmployeeCard :employee="this.$store.getters.getSelectedEmployee"></EmployeeCard>
      <h3>Relevant employees:</h3>
      <!-- Relevant empployee loop -->
      <div class="multiple-employee-card">
        <EmployeeCard 
          v-for="(employee, index) in randomEmployees" 
          v-bind:class="'card-'+index"
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
     * @description check whether we have values stored in store, if so then initialize
     * If not try to check if values saved in session storage
     * If nothing there then do the API call again and fill initialize
     */
    created() {
      if (this.$store.getters.getSelectedEmployeeId) {
        this.initialize();
      } else {
        this.$store.dispatch(storeValues.ASSIGNE_EMPLOYEES_FROM_SESSION).then(response => {
          (response) ? this.initialize(true) : this.getAllEmployeesFromAPI();
        });
      }
    }


    /**
     * @description initialize values
     * @param {*} commitValueToStore if true store the value into the store
     */
    initialize(commitValueToStore = false): void {
      if (commitValueToStore) {
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

   /**
   * @description dispatch data to store, and wait to the resulr from API, if success then initialize
   */
    getAllEmployeesFromAPI() {
      this.$store.dispatch(storeValues.GET_ALL_EMPLOYEES_FROM_API)
        .then(() => {
          this.initialize(true);
        })
        .catch(error => {
          window.alert(`Unexpected error, please refresh the page: ${error}`);
          this.loading = false;
        });
    }

  }
</script>

<style scoped lang="scss">
  @import "../styles/variables.scss";

  h3 {
    border-bottom: 4px solid $coral;
    margin-top: 100px;
  }
</style>
