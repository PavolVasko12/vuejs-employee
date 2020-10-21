import { Employee } from '@/interfaces/employee.interface';
import axios from 'axios';
import { api } from '../enums/api.enum';

class Api {

  /**
   * @description Get all employees data from external API
   * @return Promise with all employess array
   */
  getAllEmployees(): Promise<Employee[]> {
    return axios
      .get(api.GET_EMPLOYEES)
      .then(response => { 
        return response.data.data 
      })
      .catch(error => console.log(error))
  }
}

export default new Api();