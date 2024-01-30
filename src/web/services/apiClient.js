/* eslint-disable no-shadow */
/* eslint-disable padding-line-between-statements */
import axios from "axios"
import config from "@/web/config"

export class ApiClientError extends Error {
  constructor(err) {
    super()

    if (err && err.response && err.response.data) {
      if (typeof err.response.data === "string") {
        this.message = err.response.data
      } else {
        this.message =
          err.response.data.error?.message ||
          err.response.data.error ||
          "An error occurred"
      }
    } else {
      this.message = "An error occurred"
    }
  }
}
const client = axios.create({
  baseURL: config.api.baseUrl,
})
const handleResponse = (response) => response.data

const handleError = (error) => {
  if (error.response) {
    throw new ApiClientError(error)
  }
  throw error
}

const apiClient = {
  get: (url, config) =>
    client.get(url, config).then(handleResponse).catch(handleError),
  post: (url, data, config) =>
    client.post(url, data, config).then(handleResponse).catch(handleError),
  patch: (url, data, config) =>
    client.patch(url, data, config).then(handleResponse).catch(handleError),
  delete: (url, config) =>
    client.delete(url, config).then(handleResponse).catch(handleError),
}

export default apiClient
