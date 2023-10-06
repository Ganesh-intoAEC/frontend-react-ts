import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CDKContext } from '../types';
import { CreateCloudResources } from './create-cloud-resources';

export class CreatePipeLineStage extends cdk.Stage{
    constructor(scope: Construct, stageName: string, context: CDKContext, props?: cdk.StageProps) {
        super(scope, stageName ,props);
        
        //new CreateCloudResources(this, stageName, context);
    }
}