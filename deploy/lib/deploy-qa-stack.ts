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

export class DeployQaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const qaContext: CDKContext = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...scope.node
        .tryGetContext("environments")
        .find((e: any) => e.branchName === "qa"),
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
      "docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG"
    ];

    const qaSynthStep = new ShellStep("Synth", {
      input: CodePipelineSource.connection("intoaecin/intoaec-ui", "nextjs", {
        connectionArn:
          "arn:aws:codestar-connections:ap-south-1:666803772105:connection/579af0b8-45fd-43f5-9f7d-65ed14697b1a",
      }),
      commands: buildCommands,
      primaryOutputDirectory: "deploy/cdk.out",
    });

    const qaPipeline = new CodePipeline(this, "intoaec-ui-qa-Pipeline", {
      pipelineName: `intoaec-ui-qa-Pipeline`,
      synth: qaSynthStep,
      dockerEnabledForSelfMutation: true,
      dockerEnabledForSynth: true,
      codeBuildDefaults: {
        buildEnvironment: {
          privileged: true,
          buildImage: LinuxBuildImage.STANDARD_5_0,
          environmentVariables: {
            AWS_DEFAULT_REGION: {value: qaContext.region},
            AWS_ACCOUNT_ID: {value: qaContext.accountNumber},
            IMAGE_REPO_NAME: {value: qaContext.imageRepoName},
            IMAGE_TAG: {value: "latest"}
          }
        },
        // partialBuildSpec: BuildSpec.fromSourceFilename('buildspec.yml')
      }
    });

    console.log(`printing the qa context: ${JSON.stringify(qaContext)}`);

    // const qaStage = qaPipeline.addStage(
    //   new CreatePipeLineStage(this, "intoaec-ui-qa", qaContext, {
    //     env: {
    //       account: qaContext.accountNumber,
    //       region: qaContext.region,
    //     },
    //   })
    // );
  }
}
