export const shuffle = array => array.sort(() => 0.5 - Math.random())

export const fetcher = (url) => fetch(url).then((res) => res.json())