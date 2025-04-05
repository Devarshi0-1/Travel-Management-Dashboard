import { Href, Next, Previous } from "@/utils/Constant";
import React from "react";

const PaginationBox = () => {
  return (
    <div className=" pagination-box">
      <nav className="ms-auto me-auto ">
        <ul className="pagination pagination-primary">
          <li className="page-item disabled">
            <a className="page-link" href={Href}>{Previous}</a>
          </li>
          <li className="page-item">
            <a className="page-link" href={Href}>
              1
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href={Href}>
              2 <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href={Href}>
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href={Href}>
              {Next}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationBox;
