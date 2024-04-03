import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Product {
    _id: string;
    productName: string;
    productDescription: string;
    quantity: number;
    price: number;
    image: string;
}

interface UserState{
  userStatus:boolean,
  user:any
}

const Product = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const { user } = useSelector((state:UserState) => state.user);

    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(
          "http://127.0.0.1:4000/product/viewproduct"
        );
        setProducts(response.data.products)
        console.log(response.data)
      };
      fetchData();
    }, []);

  if (!Array.isArray(products)) {
    return <div>Loading...</div>;
}

const handleBuyNow = async(id:string) =>{
    const response = await axios.post('http://127.0.0.1:4000/product/buyproduct',{productId:id,email:user.email},{withCredentials:true});
    console.log(response.data);
    alert('Order is sucessful')
}


  return (
    <div className="mx-auto max-w-screen-xl">
      <h1 className="text-center text-3xl font-bold py-5 pt-7">PRODUCTS</h1>
            
        <div className="flex gap-6 w-[100%]  flex-wrap">
            {
                products.map((product) => (
            <div className="w-full  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-200 dark:border-gray-200">
            <div className="flex justify-center">
                <img
                className="p-4  rounded-t-lg h-60"
                src={product.image}
                alt="product image"
                />
            </div>
            <div className="px-5 pb-5">
                <a href="#">
                <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-black">
                    {product.productName}
                </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                <p>{product.productDescription}</p>
                </div>
                <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-black">
                    ₹ {product.price}
                </span>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => handleBuyNow(product._id)}
                >
                    Buy Now
                </button>
                </div>
            </div>
            </div>
            )) }
        
      </div>
    </div>
  );
};

export default Product;
