/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { CDKContext } from "../types";
import { CreatePipeLineStage } from "./add-stages";
import { BuildSpec, LinuxBuildImage } from "aws-cdk-lib/aws-codebuild";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DeployDevStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const devContext: CDKContext = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...scope.node
        .tryGetContext("environments")
        .find((e: any) => e.branchName === "develop"),
      ...scope.node.tryGetContext("globals"),
    };

    const buildCommands = [
      "echo Logging in to Amazon ECR...",
      "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com",
      "echo Build started on `date`",
      "echo Building the Docker image...",
      "docker build -t $IMAGE_REPO_NAME:$IMAGE_TAG .",
      "docker tag $IMAGE_REPO_NAME:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG",
      "echo Build completed on `date`",
      "echo Pushing the Docker image...",
      "docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG",
      "cd deploy",
      "npx cdk synth"
    ];

    const devSynthStep = new ShellStep("Synth", {
      input: CodePipelineSource.connection("intoaecin/intoaec-ui", "nextjs", {
        connectionArn:
          "arn:aws:codestar-connections:ap-south-1:666803772105:connection/579af0b8-45fd-43f5-9f7d-65ed14697b1a",
      }),
      commands: buildCommands,
      primaryOutputDirectory: "deploy/cdk.out",
    });

    const devPipeline = new CodePipeline(this, "intoaec-ui-dev-Pipeline", {
      pipelineName: `intoaec-ui-dev-Pipeline`,
      synth: devSynthStep,
      dockerEnabledForSelfMutation: true,
      dockerEnabledForSynth: true,
      codeBuildDefaults: {
        buildEnvironment: {
          privileged: true,
          buildImage: LinuxBuildImage.STANDARD_5_0,
          environmentVariables: {
            AWS_DEFAULT_REGION: {value: devContext.region},
            AWS_ACCOUNT_ID: {value: devContext.accountNumber},
            IMAGE_REPO_NAME: {value: devContext.imageRepoName},
            IMAGE_TAG: {value: "latest"}
          }
        },
        // partialBuildSpec: BuildSpec.fromSourceFilename('buildspec.yml')
      }
    });

    console.log(`printing the dev context: ${JSON.stringify(devContext)}`);

    const devStage = devPipeline.addStage(
      new CreatePipeLineStage(this, "intoaec-ui-develop", devContext, {
        env: {
          account: devContext.accountNumber,
          region: devContext.region,
        },
      })
    );
  }
}
