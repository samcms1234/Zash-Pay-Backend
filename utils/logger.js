function logWithTimestamp(message) {
    const timestamp = new Date().toString();
    console.log(`[${timestamp}] ${message}`);
}

module.exports = {
    logWithTimestamp
}