import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../Store/Context';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import firebase from '../../firebase/config';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Create = () => {
  const { user } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState([])
  const [imageDataUrl, setImageDataUrl] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const blob = new Blob([file], { type: file.type });
    setImage(file)
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      setImageDataUrl(url);
    };
    reader.readAsDataURL(blob);
  };

  const firestorage=getStorage(firebase)
  const firestore = getFirestore(firebase)
  const nav = useNavigate()

  const handleSubmit = () => {
    const date=new Date()
    if(user){
      const storageRef = ref(firestorage, `/images/${image.name}`)
      const imageBlob = new Blob([image], {type:image.type});
        uploadBytes(storageRef, imageBlob).then((snapshot) => {
          getDownloadURL(ref(firestorage, `/images/${image.name}`))
          .then(async(url) => {
            console.log(url);
            await addDoc(collection(firestore, "products"), {
              productName: name,
              category: category,
              price: price,
              image: url,
              CreatedAt:date.toDateString(),
              userId:user.id
            }); 
            console.log("User updated successfully!");
            nav('/')
          })
    
        });
    }else{
      console.log('please Login');
    }
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          {/* <form> */}
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" type="number" id="fname" name="Price" required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          {/* </form> */}
          <br />
          <img alt="Posts" width="200px" height="200px" src={imageDataUrl ? imageDataUrl : ''}></img>
          {/* <form> */}
          <br />
          <input onChange={handleImageChange} type="file" />
          <br />
          <button
            onClick={handleSubmit}
            className="uploadBtn">upload and Submit</button>
          {/* </form> */} 
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
