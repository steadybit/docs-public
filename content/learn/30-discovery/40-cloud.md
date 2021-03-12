---
title: "Discovery in Cloud Context"
navTitle: "Cloud Context"
---

## AWS
If the agent is running on AWS it will query the AWS Metadata and add the following attributes to every target discovered:
 * AWS Account
 * AWS Region
 * AWS Zone
 * AWS Tags (needs IAM Role)
 * AWS EKS Info (needs IAM Role; if running as part of EKS)

> To read the metadata the IAM role `arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess` must be assigned to the EC2 instance running the steadybit agent.

## Azure

If the agent is running on Azure it will query the Azure VM Metadata and add the following attributes to every target discovered:
 * Azure Account
 * Azure Zone
 * Azure Region
 * Azure Environment
 * Azure Tags
 * Azure AKS Info (if running as part of AKS)


## Google Cloud

If the agent is running on Google Cloud it will query the Google Metadata and add the following attributes to every target discovered:
 * Google Project Id
 * Google Numeric Project Id
 * Google Zone
 * Google Tags
 * Google GKE Tags (if running as part of GKE)
