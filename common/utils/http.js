import { browserHistory } from 'react-router';

// Interceptor to check http status code
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401) {
    browserHistory.push('/login');
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}
