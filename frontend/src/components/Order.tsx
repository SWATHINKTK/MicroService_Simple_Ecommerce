
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Order {
    product: {
        _id: string;
        productName: string;
        productDescription: string;
        quantity: number;
        price: number;
        image: string;
    };
    username: string;
}

interface UserState{
  userStatus:boolean,
  user:any
}



const Order = () => {

    const [orders, setOrders] = useState<Order[]>([]);
    const { user } = useSelector((state:UserState) => state.user);

    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/vieworders?email=${user.email}`
        );
        setOrders(response.data.orders)
        console.log(response.data.orders)
      };
      fetchData();
    }, []);
  
    if (!Array.isArray(orders)) {
      return <div>Loading...</div>;
  }
    
    
  return (
    <div className="pt-6 mx-auto max-w-screen-xl">
        <h1 className="py-4 text-2xl font-bold text-center">ORDERS</h1>
        <div className=" flex  flex-wrap gap-6">
            {orders.map((order) => (
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-500 dark:border-gray-200 dark:bg-gray-200 dark:hover:bg-gray-300"
      >
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src={order.product.image}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
            {order.product.productName}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-900">
            {order.product.productDescription}
          </p>
        </div>
      </a>
))}
    
      </div>
    </div>
  );
};

export default Order;
