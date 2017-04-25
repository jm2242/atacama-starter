

export const facetsApi = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }}).then((response) => response.json())
}


export const recentBooksApi = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }}).then((response) => response.json())
}
