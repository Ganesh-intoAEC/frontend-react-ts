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
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DeployDevStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const buildCommands = [
      "docker-compose build"
    ];

    const devSynthStep = new ShellStep("Synth", {
      input: CodePipelineSource.connection("intoaecin/intoaec-ui", "nextjs", {
        connectionArn:
          "arn:aws:codestar-connections:ap-south-1:666803772105:connection/579af0b8-45fd-43f5-9f7d-65ed14697b1a",
      }),
      installCommands: [
        "curl -fsSL https://get.docker.com/ | sh",
      ],
      commands: buildCommands,
      primaryOutputDirectory: "deploy/cdk.out",
    });

    const devPipeline = new CodePipeline(this, "intoaec-ui-dev-Pipeline", {
      pipelineName: `intoaec-ui-dev-Pipeline`,
      synth: devSynthStep,
    });

    const devContext: CDKContext = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...scope.node
        .tryGetContext("environments")
        .find((e: any) => e.branchName === "develop"),
      ...scope.node.tryGetContext("globals"),
    };

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
