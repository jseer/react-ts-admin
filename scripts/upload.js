const Oss = require('@zjseer/qiniu-oss').default;
const path = require('path');

const start = async () => {
  const oss = new Oss({
    getUploadTokenUrl: 'http://localhost:3000/api/oss/getToken',
    includeDirs: [path.resolve(__dirname, '../build')]
  });
  await oss.uploadByStream();
};

start();
