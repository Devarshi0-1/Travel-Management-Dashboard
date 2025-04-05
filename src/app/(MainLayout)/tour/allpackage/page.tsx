"use client";
import CommonCardHeader from "@/Common/CommonCardHeader";
import PaginationBox from "@/Common/PaginationBox";
import TourAllPackageDetails from "@/components/Tour/TourAllPackageDetails";
import React from "react";

const TourAllPackage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <CommonCardHeader
              navigate="/tour/addpackage"
              tittle="All Packages"
            />
            <div className="card-body">
              <div className="table-responsive">
                <table className=" table table-striped all-package">
                  <thead>
                    <tr>
                      <th>Tour Image</th>
                      <th>Tour Name</th>
                      <th>Price</th>
                      <th>No. Of Days</th>
                      <th>View</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <TourAllPackageDetails />
                </table>
              </div>
            </div>
            <PaginationBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourAllPackage;
