import PaginationBox from "@/Common/PaginationBox";
import ReviewUsers from "@/Common/ReviewUsers";


const Reviews = () => {
  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header">
          <h5>Reviews</h5>
        </div>
        <div className="card-body">
          <ReviewUsers image={1} />
          <ReviewUsers image={2} />
          <ReviewUsers image={3} />
          <ReviewUsers image={4} />
        </div>
        <PaginationBox />
      </div>
    </div>
  );
};

export default Reviews;
