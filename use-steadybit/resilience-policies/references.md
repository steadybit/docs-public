# References

References are found within policy bindings and policy definitions. These establish links and configure tasks for verification by the Steadybit platform. These references express an expectation that services will need to fulfill. The following excerpt shows how a policy binding could reference policies and tasks. Also, note that `parameters` are defined for both.

```yml
policies:
  - name: steadybit/definitions/kubernetes/deployments/policies/redundancy-pod
    version: 0.2.2
    parameters:
      httpEndpoint: http://demo.steadybit.io/products
tasks:
  - name: steadybit/definitions/kubernetes/deployments/experiments/loose-coupling-to-dependency
    version: 0.2.2
    parameters:
      httpEndpoint: http://demo.steadybit.io/products
    forEach:
      iterables:
        - dependency
      define:
        k8sDependencyClusterName: '{{dependency.mapping.kubernetes.cluster}}'
        k8sDependencyNamespaceName: '{{dependency.mapping.kubernetes.namespace}}'
        k8sDependencyDeploymentName: '{{dependency.mapping.kubernetes.deployment}}'
```

It is important to understand that task and policy references actually refer to files existing within a public GitHub repository. Tasks and policies are maintained and shared through GitHub. For example, the policy referenced by the YAML snippet above is resolved to the following GitHub URL:

https://github.com/steadybit/definitions/tree/0.2.2/kubernetes/deployments/policies/loose-coupling

This is helpful to know to create and share your own custom task and policy definitions. For example, you could use this mechanism to define and enforce resilience policies within your organization.
