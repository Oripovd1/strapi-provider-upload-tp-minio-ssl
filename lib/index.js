'use strict';

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// Public node modules.
const _ = require('lodash');
const Minio = require('minio');

module.exports = {
  provider: 'minio',
  name: 'Minio Server',
  auth: {
    accessKey: {
      label: 'Access API Token',
      type: 'string',
    },
    secretKey: {
      label: 'Secret Access Token',
      type: 'string',
    },
    bucket: {
      label: 'Bucket',
      type: 'string',
    },
    endPoint: {
      label: 'Endpoint',
      type: 'string',
    },
    port: {
      label: 'Port',
      type: 'string',
    },
    useSSL: {
      label: 'SSL (true for ssl, anything else for false)',
      type: 'string',
    },
  },
  init: config => {
    const MINIO = new Minio.Client({
      endPoint: config.endPoint,
      port: parseInt(config.port, 10),
      useSSL: config.useSSL && config.useSSL === 'true',
      accessKey: config.accessKey,
      secretKey: config.secretKey,
    });

    return {
      upload: file => {
        return new Promise((resolve, reject) => {
          // upload file on S3 bucket
          const path = file.path ? `${file.path}/` : '';

          MINIO.putObject(
            config.bucket,
            `${path}${file.hash}${file.ext}`,
            new Buffer(file.buffer, 'binary'),
            (err, _etag) => {
              if (err) {
                return reject(err);
              }

              // set the bucket file url
              file.url = `${MINIO.protocol}//${MINIO.host}:${MINIO.port}/${config.bucket}/${path}${file.hash}${file.ext}`;

              resolve();
            }
          );
        });
      },
      delete: file => {
        return new Promise((resolve, reject) => {
          // delete file on S3 bucket
          const path = file.path ? `${file.path}/` : '';
          MINIO.removeObject(config.bucket, `${path}${file.hash}${file.ext}`, err => {
            if (err) {
              return reject(err);
            }

            resolve();
          });
        });
      },
    };
  },
};
