import { useEffect, useState } from "react";
import "./Board.css";
import Navbar from "./Navbar";
import Footer from "./footer";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, auth, storage } from "../firebase"
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const Board = () => {

  const [category, setCategory] = useState('improper waste disposal');
  const [postMessage, setMessage] = useState('');
  const [overlayActive, setOverlayActive] = useState({display: "none"});
  const [postActive, setpostActive] = useState({display: "none"});
  const [postsList, setPostsList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [imageUpload, setImageUpload] = useState(null)
  const [imageUrl, setImageUrls] = useState("");
  const navigate = useNavigate();

  const uploadFile = async () => {
    await delay(1000);
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("uploading")
        writePost(url);
        console.log(url)
      });
    })
  };

  const writePost = async (url) => {
    const current = new Date();
    await addDoc(postsCollectionRef, {
      category: category, 
      postMessage: postMessage,
      status: "pending",
      imageUrl: url,
      author: { email: auth.currentUser.email, id: auth.currentUser.uid, name: auth.currentUser.displayName},
      date: { day: current.getDate(), month:current.getMonth()+1, year:current.getFullYear() }
    }).then(() => {
      setCategory('improper waste disposal');
      setMessage('');
    }).catch((error) => {
      console.log(error)
    });
    closeWrite();
  }

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }
  const handlePostMessage = (e) => {
    setMessage(e.target.value);
  }

  const openWrite = () => {
    setOverlayActive({display: "block"})
    setpostActive({display: "flex"})
  }

  const closeWrite = () => {
    setOverlayActive({display: "none"})
    setpostActive({display: "none"})
  }

  useEffect(() => {
    const getPosts = async () => {
      await delay(1000);
      const data = await getDocs(postsCollectionRef);
      setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();

  }, [postActive])

  return (
    <>
      <Navbar />
      <div className='board_div'>
        <button onClick={() => openWrite ()}>Write post</button>
        <div className="write_overlay"
          style={overlayActive}
          onClick={()=> closeWrite ()}>
        </div>
        <div className="write_div" 
          style={postActive}>
          <button className="close_write" onClick={()=> closeWrite ()}>X</button>
          <div className="cat_div">
            <label className="cat_Label"> Category: </label>
            <select className="cat_Option" value={category} onChange={(e)=>handleCategory(e)}>
              <option value='improper waste disposal'>improper waste disposal</option>
              <option value='dirty clogged canals'>dirty clogged canals</option>
              <option value='illegal parking'>illegal parking</option>
            </select>
          </div>
          <textarea
            onChange={(e) => handlePostMessage(e)}
            type="text" 
            placeholder="Write something . . ."
            value={postMessage}
          />
          <input type="file"
            onChange={(e => {
              setImageUpload(e.target.files[0])
            })}/>
          <button className="submit_write"onClick={() => uploadFile()}>Submit</button>
        </div>
        {postsList.map((post) => {
          return (
            <div className="post_Container" key={post.id}>
              {console.log(post.id)}
              <div className="post_Header">
                <div className="post_Author">
                  <h4>Author: {post.author.name}</h4>
                </div>
                <div className="post_Category">
                  <h5>{post.category}</h5>
                </div>
                <div className="post_Category">
                  <h5>{post.status}</h5>
                </div>
              </div>
              <div className="post_Text_Container">
                {post.postMessage}
              </div>
              <div>
                <img className="post_Image" alt="" src={post.imageUrl}/>
              </div>
            </div>
          )
        })}
      </div>
      <Footer />
    </>
  );
}

export default Board;