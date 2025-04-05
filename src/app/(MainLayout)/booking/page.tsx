import PaginationBox from "@/Common/PaginationBox";
import { bookingTableData } from "@/data/booking";
import { Href } from "../../../utils/Constant";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import TooltipCommon from "@/Common/TooltipCommon";

const Booking = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header  card-header--2">
              <h5>All Bookings</h5>
            </div>
            <div className="card-body">
              <div>
                <div className="table-responsive table-desi">
                  <table className="Booking-table table table-striped">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingTableData.map((data, index) => (
                        <tr key={index}>
                          <td>
                            <i className={`fa fa-${data.type}`}> </i>
                          </td>
                          <td>
                            <a href={Href}>
                              <span className="d-block ">{data.title}</span>
                            </a>
                          </td>
                          <td>$2500</td>
                          <td> 20 Oct, 2023</td>
                          <td>
                            <span className={`status status--${data.status}`}>
                              {data.status}
                            </span>
                          </td>
                          <td>
                            <div id={`TooltipExample-${index + 1}`}>
                              <DynamicFeatherIcon iconName="X" />
                            </div>
                            <TooltipCommon id={`TooltipExample-${index + 1}`} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <PaginationBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
