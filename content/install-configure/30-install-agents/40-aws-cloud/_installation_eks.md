### Installation in EKS

You can use our [helm-chart](https://github.com/steadybit/helm-charts/blob/main/charts/steadybit-agent/README.md) with the parameter `agent.mode=aws`.

#### Authorization in EKS with WebIdentityTokenFileCredentialsProvider

If you installed the agent into an EKS cluster, the recommend way to provide credentials is to use the 3th option from
the [default credentials provider chain](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html#credentials-chain), namely
the [WebIdentityTokenFileCredentialsProvider](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/auth/credentials/WebIdentityTokenFileCredentialsProvider.html)
.

With this option you need to [associate an IAM role with a Kubernetes service account](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html).

1. [Create an OIDC Provider for your cluster](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html)
2. Create an IAM Role with the required permissions.
3. Allow the Role to be assumed by the OIDC Provider. Add the following trust relationship to the IAM Role-
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
