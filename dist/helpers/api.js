// Standard variation
export function api(url) {
    return fetch(url)
        .then(function (response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}
