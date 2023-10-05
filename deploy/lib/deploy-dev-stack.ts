/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from "constructs";
import { Pipeline, Artifact } from 'aws-cdk-lib/aws-codepipeline';
import { CodeStarConnectionsSourceAction, CodeBuildAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { PipelineProject, LinuxBuildImage, BuildSpec } from 'aws-cdk-lib/aws-codebuild';
import { Repository } from 'aws-cdk-lib/aws-codecommit';

export class DeployDevStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create a CodePipeline artifact to store intermediate build artifacts
    const outputArtifact = new Artifact();

    // Create a CodeStar Connections source action to connect to the GitHub repository
    const sourceAction = new CodeStarConnectionsSourceAction({
      actionName: 'GitHubSource',
      owner: 'intoaecin',
      repo: 'intoaec-ui',
      branch: 'nextjs',
      connectionArn: 'arn:aws:codestar-connections:ap-south-1:666803772105:connection/579af0b8-45fd-43f5-9f7d-65ed14697b1a',
      output: outputArtifact,
    });

    // Create a CodeBuild project for the build step
    const project = new PipelineProject(this, 'BuildProject', {
      projectName: 'MyBuildProject',
      buildSpec: BuildSpec.fromSourceFilename('../buildspec.yml'),
      environment: {
        buildImage: LinuxBuildImage.STANDARD_5_0,
      },
      environmentVariables: {
        AWS_DEFAULT_REGION: {value: "ap-south-1"},
        IMAGE_REPO_NAME: {value: "intoaec-ui-dev"},
        IMAGE_TAG: {value: "latest"},
        AWS_ACCOUNT_ID: {value: "666803772105"}
      }
    });

    // Create a CodeBuild action for the build step
    const buildAction = new CodeBuildAction({
      actionName: 'Build',
      project,
      input: outputArtifact,
      outputs: [new Artifact()],
    });

    // Create the CodePipeline
    const pipeline = new Pipeline(this, 'MyPipeline', {
      pipelineName: 'MyPipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'Build',
          actions: [buildAction],
        },
      ],
    });
  }
}