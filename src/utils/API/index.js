import axios from 'axios'
export async function render () {
 let result = await axios.get('http://localhost:3000/render')
 return result.data
}
