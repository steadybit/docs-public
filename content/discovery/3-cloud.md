---
title: "Cloud Discovery"
navTitle: "Cloud"
---

## AWS
If the agent is running on AWS it will query the AWS Metadata and add the following attributes to every target discovered:
 * AWS Account
 * AWS Region
 * AWS Zone
 * AWS Tags (needs IAM Role)
 * AWS EKS Tags (needs IAM Role; if running as part of EKS)

> To read the metadata the IAM role `arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess` must be assigned to the EC2 instance running the chaosmesh agent.

## Azure

If the agent is running on Azure it will query the Azure VM Metadata and add the following attributes to every target discovered:
 * Azure Account
 * Azure Zone
 * Azure Region
 * Azure Environment
 * Azure Tags
 * Azure AKS Tags (if running as part of AKS)
