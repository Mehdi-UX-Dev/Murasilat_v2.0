import React from "react";

function List() {

  return (
    <table className="table-auto w-full max-w-4xl mx-auto mt-10 border ">
      <thead className="bg-primary-300">
        <tr>
          <th>Id</th>
          <th>Full Name</th>
          <th>Faculty</th>
          <th>role</th>
        </tr>
      </thead>
      <tbody className="text-center ">
        <tr>
          <td>1</td>
          <td>Mohammad Mehdi Wahid</td>
          <td>Computer Science</td>
          <td>Assistant Professor</td>
        </tr>
        <tr className="even:bg-primary-200">
          <td>2</td>
          <td>Mohammad Mehdi Wahid</td>
          <td>Computer Science</td>
          <td>Assistant Professor</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Mohammad Mehdi Wahid</td>
          <td>Computer Science</td>
          <td>Assistant Professor</td>
        </tr>
      </tbody>
    </table>
  );
}

export default List;
