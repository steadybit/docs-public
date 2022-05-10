You can use our helm-chart with the parameter `agent.mode=aws`.

### Authorization in EKS with WebIdentityTokenFileCredentialsProvider

Compare to [AWS: IAM roles for service accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)

1. Create an OIDC Provider
2. Create an IAM Role with the Policy from above
3. Allow the Role to be "assumed" by the OIDC Provider

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::<ACCOUNT>:oidc-provider/oidc.eks.<REGION>.amazonaws.com/id/<ID>"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "oidc.eks.<REGION>.amazonaws.com/id/<ID>:aud": "sts.amazonaws.com",
                    "oidc.eks.<REGION>.amazonaws.com/id/<ID>:sub": "system:serviceaccount:<SERVICE-ACCOUNT-NAMESPACE>:<SERVICE-ACCOUNT-NAME>"
                }
            }
        }
    ]
}
```

4. Associate the IAM Role to your Kubernetes Service Account. If you are using our helm charts to create the Service Account, you can use the
   parameter `serviceAccount.eksRoleArn`.
