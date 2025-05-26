export function logError(error: any): void {
    if (error.response) {
        console.error(`❌ API Error [${error.response.status}]:`, error.response.data);
    } else if (error.request) {
        console.error('❌ No response received:', error.request);
    } else {
        console.error('❌ Error:', error.message);
    }
}
