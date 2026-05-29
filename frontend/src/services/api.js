const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function request(endpoint, options = {}) {
  const apiBaseUrl = (API_BASE_URL && API_BASE_URL !== '/'
    ? API_BASE_URL
    : import.meta.env.DEV
      ? 'http://localhost:5000/api'
      : '/api'
  ).replace(/\/$/, '')

  const response = await fetch(`${apiBaseUrl}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const text = await response.text()
  const contentType = response.headers.get('content-type') || ''
  let data = null

  if (text) {
    if (contentType.includes('application/json')) {
      try {
        data = JSON.parse(text)
      } catch (err) {
        throw new Error(`Invalid JSON response from API. Ensure the backend is running and returning JSON. Response body: ${text.slice(0, 200)}`, { cause: err })
      }
    } else {
      throw new Error(`Unexpected API response type: ${contentType || 'unknown'}. The backend may be returning HTML. Response body: ${text.slice(0, 200)}`)
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Something went wrong')
  }

  return data
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
}
