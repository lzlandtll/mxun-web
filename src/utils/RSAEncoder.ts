// 使用示例
const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5HbdPt4WacsqgvZpa28h
sqR9JUvMBw8NYL7VXUxknVZg07JFPKavhkEAUXZxqkeXXWVf5vAAB2o3EzG0xA07
FN/HpBoYJ3gsu4LRKQqM2wiIJccq2jzQoEcWgPWWJbgAD+Fo4WI7BBUq55J2t2eQ
caWSEuVxPj/4I82kY2VIW7A/OGt2P5JhsES7eiVyPTc2hutxWrg37NFt3h0e58S4
qIcApVwuM/Mp5Xe5T5mQRp2H7z0b4XJu+SPkroEk3oV6ecUCVtQ5qeniApKA44sq
N5bdxIAqkJb/SdZ2bDnXuzcHdMOZZQB4+BJfWhN9oFh0H/D4ydhAdytdwCToOghs
WwIDAQAB
-----END PUBLIC KEY-----`;

async function encryptData(data) {
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = publicKeyPem.substring(pemHeader.length, publicKeyPem.length - pemFooter.length);
    const binaryDerString = window.atob(pemContents);
    const binaryDer = str2ab(binaryDerString);

    const importedPublicKey = await window.crypto.subtle.importKey(
        "spki",
        binaryDer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["encrypt"]
    );

    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);

    const encryptedData = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        importedPublicKey,
        encodedData
    );
    return btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
}

function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}



// const password = "123456";
// encode(password).then(encryptedPassword => {
//     console.log("Encrypted Password:", encryptedPassword);
// });


export default {
    encode: (text) => encryptData(text)
}
