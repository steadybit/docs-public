```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeTags",
        "ec2:StopInstances",
        "ec2:TerminateInstances",
        "ec2:StartInstances",
        "ec2:RebootInstances",
        "ec2:CreateTags"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```
