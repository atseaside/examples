const fs = require('fs');

// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require('tencentcloud-sdk-nodejs');

const OcrClient = tencentcloud.ocr.v20181119.Client;

const clientConfig = {
    credential: {
        secretId: '',
        secretKey: '',
    },
    region: 'ap-beijing',
    profile: {
        httpProfile: {
            endpoint: 'ocr.tencentcloudapi.com',
        },
    },
};

const client = new OcrClient(clientConfig);

const res = fs.readFileSync('./images/word.jpg');
const params = {
    ImageBase64: res.toString('base64'),
};

client.EnglishOCR(params).then(
    (data) => {
        console.log(data);
        fs.writeFileSync(
            'glossary.txt',
            data.TextDetections.reduce((str, curr) => {
                str += curr.DetectedText + '\n'
                return str;
            }, '')
        );
    },
    (err) => {
        console.error('error', err);
    }
);
