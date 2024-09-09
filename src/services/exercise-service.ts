import { API_URLS } from '@constants/API_URLS'
import { useMutation } from '@tanstack/react-query'
import {
  ApiResponse,
  ExercisePagePayload,
  ExerciseTableResponse,
} from '@interfaces/ExerciseTableResponse'
import { AppAxios } from '@utils/axios'

// export function useGetPagingExercise() {
//   return useMutation({
//     mutationFn: async (pagePayload: ExercisePagePayload) => {
//       return await AppAxios().post<ApiResponse<ExerciseTableResponse>>(
//         API_URLS.GET_EXERCISES,
//         pagePayload
//       )
//     },
//   })
// }

// export function useGetPagingExerciseForGuest() {
//   return useMutation({
//     mutationFn: async (pagePayload: ExercisePagePayload) => {
//       return await AppAxios().post<ApiResponse<ExerciseTableResponse>>(
//         API_URLS.GET_EXERCISES_GUEST,
//         pagePayload
//       )
//     },
//   })
// }
