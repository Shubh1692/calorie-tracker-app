
/**
 * This method user for create a wrapper to get api call
 * @param url get api url
 */
export async function get(url) {
    try {
        const headers = new Headers({});
        const request = await fetch(url, {
            method: 'GET',
            headers,
        });
        const response = await request.json();
        if (response.status === 200 && response.success) {
            return response;
        } else if (!response.success || !response) {
            alert(response.message);
        }
        return null;
    } catch (error) {
        return null;
    }
}

/**
 * This method user for create a wrapper to post api call
 * @param url get api url
 * @param body request body
 */
export async function post(url, body) {
    try {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        const request = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
        const response = await request.json();
        if (response.status === 200 && response.success) {
            return response;
        } else if (!response.success || !response) {
            alert(response.message);
        }
        return null;
    } catch (error) {
        return null;
    }
}

/**
 * This method user for create a wrapper to put api call
 * @param url get api url
 * @param body request body
 */
export async function put(url, body) {
    try {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        const request = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
        });
        const response = await request.json();
        if (response.status === 200 && response.success) {
            return response;
        } else if (!response.success || !response) {
            alert(response.message);
        }
        return null;
    } catch (error) {
        return null;
    }
}


/**
 * This method user for create a wrapper to delete api call
 * @param url get api url
 * @param body request body
 */
export async function deleteApi(url, body = {}) {
    try {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        const request = await fetch(url, {
            method: 'DELETE',
            headers,
            body: JSON.stringify(body )
        });
        const response = await request.json();
        if (response.status === 200 && response.success) {
            return response;
        } else if (!response.success || !response) {
            alert(response.message);
        }
        return null;
    } catch (error) {
        return null;
    }
}