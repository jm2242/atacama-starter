

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

export const bookListsApi = (url) => {
  return fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }}).then((response) => response.json())
}
