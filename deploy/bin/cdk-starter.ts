#!/usr/bin/env node
import "source-map-support/register";
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import gitBranch from "git-branch";
import { DeployDevStack } from "../lib/deploy-dev-stack";
import { DeployQaStack } from "../lib/deploy-qa-stack";

const app = new cdk.App();

// Get CDK Context based on git branch
export const getContext = async (app: cdk.App) => {
  try {
    const currentBranch = await gitBranch();
    console.log(`logging the branch name:${currentBranch}`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const environment = app.node
      .tryGetContext("environments")
      .find((e: any) => e.branchName === currentBranch);

    const globals = app.node.tryGetContext("globals");

    return { ...globals, ...environment };
  } catch (error) {
    console.error(error);
  }
};

new DeployDevStack(app, "intoaec-ui-dev-stack", {
  /* want to deploy the stack to. */
  env: { account: "666803772105", region: "ap-south-1" },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

new DeployQaStack(app, "intoaec-ui-qa-stack", {
  /* want to deploy the stack to. */
  env: { account: "666803772105", region: "ap-south-1" },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

// new DeployProdStack(app, 'leadmanager-prod-stack', {

//   /* want to deploy the stack to. */
//   env: { account: '666803772105', region: 'ap-south-1' },

//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });
