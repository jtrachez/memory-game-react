
export const shuffle = array => array.sort(() => 0.5 - Math.random())

export const fetcher = (endpoint) => fetch(process.env.DOMAIN + endpoint).then((res) => res.json())

export const post = async (endpoint, body) => {
    const response = await fetch(process.env.DOMAIN + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

    return await response.json()
}
