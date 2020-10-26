import Vue from 'vue'
import Vuex from 'vuex'
import { Employee } from '../interfaces/employee.interface';
import axios from 'axios';
import { api } from '@/enums/api.enum';
import { sessionStorage } from '@/enums/session-storage.enum';
import { storeValues } from '@/enums/store.enum';

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
  },
  actions: {
    getAllEmployeesFromApi({commit}) {
      return axios.get(api.GET_EMPLOYEES)
        .then(result =>  {
          commit(storeValues.ASSIGNE_EMPLOYEES, result.data.data);
          window.sessionStorage.setItem(sessionStorage.ALL_EMPLOYEES, JSON.stringify(result.data.data));
        })
        .catch(error => { 
          throw new Error(`API ${error}`);
        });
    },
    assignEmployeesFromSession({commit}) {
      const allEmployees: string | null = window.sessionStorage.getItem(sessionStorage.ALL_EMPLOYEES);
      if (typeof allEmployees === 'string') {
        commit(storeValues.ASSIGNE_EMPLOYEES, JSON.parse(allEmployees));
        return true;
      } else {
        return false;
      }
    }
  },
  getters: {
    getAllEmployees(state): Employee[] {
      return state.employees;
    },
    getAllEmployeesLength(state): number {
      return state.employees.length;
    },
    getOnlyTenEmployees: (state) => (size: number): Employee[] => {
      return state.employees.slice(0, size);
    },
    getRandomEmployee(state): Employee {
      return state.randomEmployee;
    },
    getSelectedEmployee(state): Employee {
      return state.selectedEmployee;
    },
    getSelectedEmployeeId(state): number {
      return state.selectedEmployee.id;
    },
    getEmployeeById: (state) => (id: number): Employee => {
      return state.employees.filter(employee => {
        if (employee.id === id) {
          return employee;
        }
      })[0]
    }
  }
})
