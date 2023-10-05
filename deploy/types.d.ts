import { StackProps } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export type CDKContext = {
  appName: string;
  region: string;
  environment: string;
  branchName: string;
  accountNumber: string;
  dbName: string;
  dbPort: string;
  dbPassword: string;
  dbAccessKey: string;
  dbResourceArn: string;
  dbSecretArn: string;
  dbUser: string;
  dbHost: string;
  cloudAccessId: string;
  cloudSecretKey: string;
  userhubAccessKey: string;
  cognitoUserPoolId: string;
  cognitoClientId: string;
  cognitoSecretHash: string;
  redisHost: string;
  redisPort: string;
  vpc?: {
    id: string;
    cidr: string;
    privateSubnetIds: string[];
    securityGroupIds: string[];
  };
  // baseDomain: string;
  // apiDomain: string;
  // hostedZondId: string;
  // regionalCertArn: string;
};

export type LambdaDefinition = {
  name: string;
  memoryMB?: number;
  timeoutMins?: number;
  environment?: {
    [key: string]: string;
  };
  isPrivate?: boolean;
  api?: {
    path: string;
    methods: string;
  };
};

export interface APIStackProps extends StackProps {
  lambdaFunctions: {
    [Key: string]: NodejsFunction;
  };
}
