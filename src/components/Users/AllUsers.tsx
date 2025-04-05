import { userData } from "@/data/Users";
import { ImagePath } from "@/utils/Constant";
import Image from "next/image";
import { Href } from "../../utils/Constant";

const AllUsersTable = () => {
  return (
    <table className="user-table table table-striped">
      <thead>
        <tr>
          <th>User</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Country</th>
          <th>Listings</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((data, index) => (
          <tr key={index}>
            <td>
              <span>
                <Image height={45} width={45} src={`${ImagePath}/users/${index + 1}.jpg`} alt="users"/>
              </span>
            </td>
            <td>
              <a href={Href}>
                <span className="d-block ">{data.name}</span>
                <span>{data.address}</span>
              </a>
            </td>
            <td>{data.phone}</td>
            <td>{data.email}</td>
            <td className="font-primary">{data.location}</td>
            <td><span>02</span></td>
            <td><a href={Href}><i className="fa fa-eye" /></a></td>
            <td><a href={Href}><i className="fa fa-pencil-square-o" /></a></td>
            <td><a href={Href}><i className="fa fa-trash-o" /></a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllUsersTable;
