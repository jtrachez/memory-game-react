
export const shuffle = array => array.sort(() => 0.5 - Math.random())

export const post = async (endpoint, body) => {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

    return await response.json()
}


export const toJson = (array) => {
    return JSON.parse(JSON.stringify(array))
}