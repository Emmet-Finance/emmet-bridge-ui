declare global {
    interface Window {
        ethereum: any
    }
}

export default window || {};