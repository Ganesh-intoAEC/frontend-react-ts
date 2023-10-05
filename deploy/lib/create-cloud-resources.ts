import { Duration, RemovalPolicy, Stack, Tags, CfnOutput } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { CDKContext } from "types";

export class CreateCloudResources extends Stack {
  public readonly lambdaFunctions: {
    [Key: string]: NodejsFunction;
  } = {};

  constructor(scope: Construct, stage: string, context: CDKContext) {
    super(scope, stage);
  }
}
