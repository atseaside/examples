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

const EnglishOCR = async (params) => {
    const englishOCRResult = await client.EnglishOCR(params);
    const result = englishOCRResult.TextDetections.reduce((str, curr) => {
        str += curr.DetectedText + '\n';
        return str;
    }, '');
    fs.writeFile(`glossary.txt`, result, (err, res) => {
        if (err) throw err;
        console.log('写入文件 成功');
    });
    return result;
};

module.exports = {
    EnglishOCR,
};
