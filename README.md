# strapi-provider-upload-tp-minio

This upload provider uses the [JavaScript Minio.Client](https://docs.min.io/docs/javascript-client-api-reference.html) to upload files to a (self hosted) instance of [Minio](https://min.io/).

It's following the manual to create [upload providers](https://strapi.io/documentation/3.0.0-beta.x/plugins/upload.html#create-providers).

**Notice**
We currently use it in conjunction with Docker.

## Config

There are only a couple of settings one has to provide to make it work.
The following config settings are available:

| Config Label        | Internal Name | Value                                         |
| ------------------- | ------------- | --------------------------------------------- |
| Access API Token    | accessKey     | string                                        |
| Secret Access Token | secretKey     | string                                        |
| Bucket              | bucket        | string                                        |
| Endpoint            | endPoint      | string                                        |
| Port                | port          | string                                        |
| SSL                 | useSSL        | string(true for ssl, anything else for false) |

## Example Hash

The resulting configuration hash should look like the following:

```javascript
const cfg = {
  accessKey: 'minio',
  secretKey: 'MySuperSafeSecretKeyAsAHashedValue',
  bucket: 'my-bucket',
  endPoint: 'minio.example.com',
  port: 9000,
  useSSL: true,
};

// if you are using Docker the endPoint needs to resemble the container name (or the service name) of your minio instance
// ...
// endPoint: 'minio',
// useSSL: false,
// ...
```

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
