import axios from 'axios'
// import { getSock } from '../utils/sock'

const baseUrl = 'http://localhost:8000/'
const headers = {
   'Content-Type': 'application/json',
}

export class Api {
   
   public static async getMatrixDistortioned(matrix: any, distortion: number){
      const response = await axios.post(baseUrl+'distort_matrix', { matrix, distortion }, { headers })
      return response.data
   }

   public static async getMLPAnswer(matrix: any, model: string){
      model = model+'.pickle'
      const response = await axios.post(baseUrl+'prediction', { matrix, model }, {headers})
      console.log(model)
      return response.data
   }

   public static async getMLPModels(){
      let response: any = await axios.get(baseUrl+'models', {headers})
      console.log(response.data)
      response = response.data.models.map((m: string)=>m.split('.pickle')[0])
      response = {models: response}
      
      return response
   }

   public static async trainMLP(train: any){
      const response = await axios.post(baseUrl+'train_model', train, {headers})
      return response.data
   }

   public static async generateDatasets(type: string){
      console.log(type)
      const response = await axios.post(baseUrl+'generate_datasets', { type }, {headers})
      return response.data
   }

   public static async deleteMLPModel(model: string){
      model = model+'.pickle'
      const response = await axios.post(baseUrl+'delete_model', { model }, {headers})
      return response.data
   }

   public static async testMLPModel(model: string){
      model = model+'.pickle'
      const response = await axios.post(baseUrl+'test_model', { model }, {headers})
      return response.data
   }
}

