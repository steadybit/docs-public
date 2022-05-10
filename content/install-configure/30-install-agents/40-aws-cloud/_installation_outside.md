You can also dedicate any agent running outside of your AWS infrastructure to communicate with the AWS API. In this case you need to setup an IAM with API
credentials which is allowed to access the resources already described in the section above.

The following variables needs to be added to the environment configuration:

```
AWS_REGION=<replace-with-region-to-attack>
AWS_ACCESS_KEY_ID=<replace-with-aws-access-key>
AWS_SECRET_ACCESS_KEY=<replace-with-aws-secret-access-key>
```
