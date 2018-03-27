const stockApi = "http://localhost:9000/ehs/v1/stock";
const userApi = "http://localhost:9000/ehs/v1/user";

// Generate a unique token for storing your bookshelf data on the backend server.
// let token = localStorage.token
// if (!token)
//   token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json'
}

const jwtHeader = {
    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
}

// Returns array of earning date data
export const getStockData = (ticker) => 
    fetch(`${stockApi}/${ticker}`, { headers })
    .then(res => res.json())
    .then(data => {
        return (
        { 
            metadata: data.metadata,
            currentPrice: data.currentPrice,
            stockPrices: data.stockPrices
        }
        )
    })

export const getStockSelections = () => 
    fetch(`${stockApi}/selections`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getCurrentStockPrice = (ticker) => 
    fetch(`${stockApi}/${ticker}/current`, { headers })
    .then(res => res.json())
    .then(data => data)

export const auth = () =>
    fetch(`${userApi}/auth`, { jwtHeader })
    .then(res => res.json())
    .then(data => data)

// export const search = (query, maxResults) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query, maxResults })
//   }).then(res => res.json())
//     .then(data => data.books)
