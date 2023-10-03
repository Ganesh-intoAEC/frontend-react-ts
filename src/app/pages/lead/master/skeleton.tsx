import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

export default function SkeletonMasterGrid() {
  return (
    <div>
        
      <div className="container mx-2 mt-5 pt-3">
        <div className="row mt-5 justify-content-between mb-1">
          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
            <div className="row align-item-center mb-4">
              <div className="mr-3">
                <Skeleton variant="rectangular" width={210} height={40} />
              </div>
              <div>
                <Skeleton variant="rectangular" width={100} height={20} />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 text-right">
            <Skeleton
              className="float-right"
              variant="rectangular"
              width={210}
              height={50}
            />
          </div>
        </div>
        <div>
          <div>
            <Box>
              <div className="d-flex mb-5 pb-5">
                <Skeleton
                  className="mr-3"
                  variant="rounded"
                  width={210}
                  height={60}
                />
                <Skeleton
                  className="mr-3"
                  variant="rounded"
                  width={210}
                  height={60}
                />
                <Skeleton
                  className="mr-3"
                  variant="rounded"
                  width={210}
                  height={60}
                />
                <Skeleton
                  className="mr-3"
                  variant="rounded"
                  width={210}
                  height={60}
                />
                <Skeleton
                  className="mr-3"
                  variant="rounded"
                  width={210}
                  height={60}
                />
              </div>
              <Skeleton
                className="mt-5 pt-5"
                variant="rectangular"
                width={"100%"}
                height={"40vh"}
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
