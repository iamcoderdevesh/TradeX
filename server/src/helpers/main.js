export function encrypt(id) {
    const str = `id=${id}`;
    let encoded = Buffer.from(str).toString('base64');
    encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return encoded;
}

export function decrypt(encryptedId) {
    let decoded = encryptedId.replace(/-/g, '+').replace(/_/g, '/');
    const padding = 4 - (decoded.length % 4);
    if (padding < 4) {
        decoded += '='.repeat(padding);
    }
    const decodedStr = Buffer.from(decoded, 'base64').toString('utf-8');
    const params = {};
    decodedStr.split('&').forEach(part => {
        const [key, value] = part.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params?.id;
}
