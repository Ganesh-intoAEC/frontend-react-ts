import { Duration, RemovalPolicy, Stack, Tags, CfnOutput } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as ec2 from "aws-cdk-lib/aws-ec2"
import { Construct } from "constructs";
import { CDKContext } from "types";

export class CreateCloudResources extends Stack {
  public readonly lambdaFunctions: {
    [Key: string]: NodejsFunction;
  } = {};

  constructor(scope: Construct, stage: string, context: CDKContext) {
    super(scope, stage);

    // IAM inline role - the service principal is required
    const ecstaskRole = new iam.Role(this, "intoaec-ui-fargate-task-role", {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com")
    });

    // Define a fargate task with the newly created execution and task roles
    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      "intoaec-ui-fargate-task-definition",
      {
        taskRole: ecstaskRole,
        executionRole: ecstaskRole
      }
    );

    // Import a local docker image and set up logger
    const container = taskDefinition.addContainer(
      "intoaec-ui-fargate-task-container",
      {
        image: ecs.ContainerImage.fromRegistry(
          "666803772105.dkr.ecr.ap-south-1.amazonaws.com/intoaec-ui-dev"
        ),
        logging: new ecs.AwsLogDriver({
          streamPrefix: "intoaec-ui-fargate-task-log-prefix"
        })
      }
    );

    container.addPortMappings({
      containerPort: 3000,
      hostPort: 3000,
      protocol: ecs.Protocol.TCP
    });

    const vpc = ec2.Vpc.fromLookup(this, 'VPC', {
          vpcId: context.vpc?.id
      });
  
      //import private subnets
      // const privateSubnets = context.vpc?.privateSubnetIds.map((id, index: any) => ec2.Subnet.fromSubnetId(this, `privateSubnet${index}`, id));
  
      // import security groups
      // const securityGroups = context.vpc?.securityGroupIds.map((id, index: any) => ec2.SecurityGroup.fromSecurityGroupId(this, `SecurityGroup${index}`, id));

    // Create the cluster
    const cluster = new ecs.Cluster(this, "fargate-test-task-cluster", { vpc });

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "intoaec-ui-fargate-service",
      {
        cluster: cluster, // Required
        cpu: 256, // Default is 256
        desiredCount: 2, // Default is 1
        taskDefinition: taskDefinition,
        memoryLimitMiB: 2048, // Default is 512
        publicLoadBalancer: true // Default is false
      }
    );
  }
}
