import Vue from 'vue'
import Vuex from 'vuex'
import { Employee } from '../interfaces/employee.interface';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    employees: Array<Employee>(),
    selectedEmployee: Object({}) as Employee,
    randomEmployee: Object({}) as Employee
  },
  mutations: {
    assigneEmployees(state, employees: Employee[]) {
      state.employees = [...employees];
    },
    selectEmployee(state, employee: Employee) {
      state.selectedEmployee = {...employee};
    },
    assignRadnomEmployee(state, employee: Employee) {
      state.randomEmployee = {...employee};
    }
  }
})
