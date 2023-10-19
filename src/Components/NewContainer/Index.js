import React, { useState, useEffect } from "react";
import NewCard from "../NewCard";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Index.css";
const Base_url = "http://localhost:8080/api/buyphone";

const NewContainer = (props) => {
  const [data, setData] = useState([]);

  // todo
  // const{id} = useParams();

  useEffect(() => {
    const result = axios.get(Base_url + "/getOrder/3").then((result) => {
      setData(result.data);
      console.log(result.data);
    });
  }, {});
  return (
    <>
      <div className="container mx-auto my-12 w-1/3  h-3/4  bg-red-400 shadow shadow-2xl shadow-black px-7 py-7 rounded-xl overflow-hidden">
        <h1 className="text-6xl  py-5">{props.title}</h1>
        <NewCard
          image={data.device_img}
          title={data.device_name}
          variant={data.device_variant}
          deltime={data.device_dlv_time}
          price={data.device_price}
        />

        <NewCard
          image={data.accessory_img}
          title={data.accessory_name}
          deltime={data.accessory_dlv_time}
          price={data.accessory_price}
        />

        <hr />
        <table className="table-auto w-full mx-auto">
          <tbody>
            <tr>
              <td>
                <h1 className="text-white text-2xl font-bold px-5 py-5  ">
                  Subtotal
                </h1>
              </td>
              <td></td>
              <td>
                <h1 className="text-black font-bold text-lg  ">
                  {" "}
                  &#8377; {data.device_price + data.accessory_price}/-
                </h1>
              </td>
            </tr>
            {/* border-black border-solid border-2 */}
          </tbody>
        </table>

        <Link
          className="px-12 rounded-xl text-xl bg-black text-center my-5 py-2 hover:bg-red-100 hover:text-black hover:font-bold text-white "
          to="/address-details"
        >
          <button>Checkout</button>
        </Link>
      </div>
    </>
  );
};

export default NewContainer;
