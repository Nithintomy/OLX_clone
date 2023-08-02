import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import Header from '../Header/Header';
import { postContext } from '../../Store/PostContext';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import firebase from '../../firebase/config';

function View() {
  const { postDetails } = useContext(postContext);
  const sellerId = postDetails && postDetails[0].userId; // Add conditional check here
  const [seller, setSeller] = useState();
  const firestore = getFirestore(firebase);

  useEffect(() => {
    if (sellerId) {
      const q = query(collection(firestore, 'user'), where('id', '==', sellerId));
      getDocs(q).then((details) => {
        if (details.empty) {
          console.log('User not found');
        } else {
          setSeller(details.docs[0].data());
        }
      });
    }
  }, [firestore, sellerId]); // Include dependencies in the useEffect dependency array

  console.log(postDetails);

  return (
    <>
      <Header />
      {postDetails ? (
        <div className="viewParentDiv">
          <div className="imageShowDiv">
            <img width="200px" height="300px" src={postDetails[0].image} alt="" />
          </div>
          <div className="rightSection">
            <div className="productDetails">
              <p>&#x20B9; {postDetails[0].price} </p>
              <span>{postDetails[0].productName}</span>
              <p>{postDetails[0].category}</p>
              <span>{postDetails[0].CreatedAt}</span>
            </div>
            {seller && ( // Add conditional check for seller
              <div className="contactDetails">
                <p>Seller details</p>
                <p>{seller.name}</p>
                <p>{seller.mobile}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>No Data Please login</div>
      )}
    </>
  );
}

export default View;
