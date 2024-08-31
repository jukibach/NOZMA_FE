import axios from 'axios'
import authHeader from './auth-header'
import { API_URLS } from '../constants/API_URLS'
import { REACT_APP_BE_BASE_URL } from '../constants/constant'
import { useMutation } from '@tanstack/react-query'
import {
  ApiResponse,
  IExercisePagePayload,
  IExerciseTableResponse,
} from '../types/ExerciseTableResponse'

// export const getPagingExercise = async (pagePayload: IExercisePagePayload) => {
//   const response = await axios.post(
//     REACT_APP_BE_BASE_URL + API_URLS.GET_EXERCISES,
//     {
//       pagePayload,
//     },
//     {
//       headers: authHeader(),
//     }
//   )
//   return response
// }

export function useGetPagingExercise() {
  return useMutation({
    mutationFn: async (pagePayload: IExercisePagePayload) => {
      const fetchUrl = new URL(API_URLS.GET_EXERCISES, REACT_APP_BE_BASE_URL)
      return await axios.post<ApiResponse<IExerciseTableResponse>>(
        fetchUrl.href,
        pagePayload,
        {
          headers: authHeader(),
        }
      )
    },
  })
}
