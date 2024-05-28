export default class Synthetic {
    API_ENDPOINT = 'https://app.acumenlogs.com'

    startSynthetic(url) {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
    }

    getBatch(syntheticToken, batchId) {
        return fetch(`https://app.acumenlogs.com/status/watcher/${syntheticToken}/${batchId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
    }
}