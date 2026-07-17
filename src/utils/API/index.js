import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

export async function render () {
  let result = await axios.get(`${BASE_URL}/render`)
  return result.data
}
