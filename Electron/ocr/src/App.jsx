import React, { useState } from 'react';

import { Upload, message, Card, Image } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import './App.less';

const { Dragger } = Upload;

const App = () => {
    const [fileList, setFileList] = useState([]);

    const props = {
        name: 'file',
        multiple: false,
        // action: '',
        customRequest() {
            return true;
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                setFileList(info.file);
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <div>
            <Card title="拖拽上传图片识别英文单词" style={{ width: '50vw' }}>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">单击或拖动文件到此区域以上传</p>
                    <p className="ant-upload-hint">仅支持单个上传</p>
                </Dragger>
            </Card>
            <div>
                {fileList.map((item) => {
                    return <Image width={200} src={item.path} />;
                })}
            </div>
        </div>
    );
};

export default App;
