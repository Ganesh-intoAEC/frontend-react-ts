import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { CDKContext } from "../types";
import { CreatePipeLineStage } from "./add-stages";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DeployQaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const buildCommands = [
      "npm ci",
      "npm run build",
      "cd deploy",
      "npm ci",
      "npm run build",
      "npx cdk synth",
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
    });

    const qaContext: CDKContext = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...scope.node
        .tryGetContext("environments")
        .find((e: any) => e.branchName === "qa"),
      ...scope.node.tryGetContext("globals"),
    };

    console.log(`printing the qa context: ${JSON.stringify(qaContext)}`);

    const qaStage = qaPipeline.addStage(
      new CreatePipeLineStage(this, "intoaec-ui-qa", qaContext, {
        env: {
          account: qaContext.accountNumber,
          region: qaContext.region,
        },
      })
    );
  }
}
