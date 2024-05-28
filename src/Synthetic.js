export default class Synthetic {
    API_ENDPOINT = 'https://app.acumenlogs.com/'

    startSynthetic(url) {
        return fetch(url);
    }

    getBatch(syntheticToken, batchId) {
        return fetch(`${this.API_ENDPOINT}/status/watcher/${syntheticToken}/${batchId}`);
    }
}