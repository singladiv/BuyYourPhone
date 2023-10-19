import React, { useState, useEffect, useContext } from 'react'
import NewCard from './NewCard'
import { Link } from 'react-router-dom'
import axios from 'axios'
import IdContext from '../Context/IdContext';

const Base_url = "http://localhost:8080/api/buyphone"

const NewContainer = () => {
  const [data, setData] = useState([]);
  const a = useContext(IdContext);

  useEffect(() => {
    const result = axios.get(Base_url + `/getOrder/${a.id}`).then((result) => {
      setData(result.data);
      console.log(result.data);
    });
  }, []);
  return (
    <>
      <div className='container mx-auto my-12 w-1/3  h-3/4  bg-red-400  shadow-2xl shadow-black px-7 py-7 rounded-xl overflow-hidden'>
        <h1 className='text-6xl  py-5'>Order Summary</h1>
          <NewCard image={data.deviceImg} title={data.deviceName} variant={data.deviceVariant} deltime={data.deviceDlvTime} price={data.devicePrice} />
          
          <NewCard image={data.accessoryImg} title={data.accessoryName}  deltime={data.accessoryDlvTime} price={data.accessoryPrice} />
         
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
                  &#8377; {data.devicePrice + data.accessoryPrice}/-
                </h1>
              </td>
            </tr>
           
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
