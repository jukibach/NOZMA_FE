import axios from 'axios'
import authHeader from './auth-header'
import { API_URLS } from '../constants/API_URLS'
import { REACT_APP_BE_BASE_URL } from '../constants/constant'

export interface IExercisePagePayload {
  pageSize: number
  pageIndex: number
}
export const getPagingExercise = async (pagePayload: IExercisePagePayload) => {
  const response = await axios.post(
    REACT_APP_BE_BASE_URL + API_URLS.GET_EXERCISES,
    {
      pagePayload,
    },
    {
      headers: authHeader(),
    }
  )
  return response
}
