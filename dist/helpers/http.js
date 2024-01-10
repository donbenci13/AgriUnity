/**
 * Extending fetch to add generic typing
 * @param url
 * @returns
 */
export function http(url) {
    return fetch(url)
        .then(function (response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}
