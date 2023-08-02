import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import firebase from '../../firebase/config';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { postContext } from '../../Store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([])
  const {setPostDetails}=useContext(postContext)
  const firestore = getFirestore(firebase)
  const nav = useNavigate()
  useEffect(() => {
    const fetchedProducts = [];
    getDocs(collection(firestore, "products")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const productData = {
          ...doc.data(),
          id: doc.id
        };
        fetchedProducts.push(productData);
      });
      setProducts(fetchedProducts);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(products);

  function handleClick(params) {
    const filteredProducts = products.filter(product => product.id === params);
    setPostDetails(filteredProducts)
    nav('/view')
  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {products.map((product, index) => (
            <div className="card" onClick={()=>{
              handleClick(product.id)
            }} key={index}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.image} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.productName}</p>
              </div>
              <div className="date">
                <span>{product.CreatedAt}</span>
              </div>
            </div>
          ))}

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
