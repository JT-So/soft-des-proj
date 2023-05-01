import { useEffect, useState } from "react";
import "./Board.css";
import Navbar from "./Navbar";
import Footer from "./footer";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase"
import { useNavigate } from "react-router-dom";

const Board = () => {

  const [category, setCategory] = useState('Category1');
  const [postMessage, setMessage] = useState('');
  const [overlayActive, setOverlayActive] = useState({display: "none"});
  const [postActive, setpostActive] = useState({display: "none"});
  const [postsList, setPostsList] = useState([]);
  const [commentOverlay, setCommentOverlay] = useState({display: "none"});
  const [commentActive, setCommentActive] = useState({display: "none"});
  const postsCollectionRef = collection(db, "posts");
  const navigate = useNavigate();

  const writePost = async () => {
    console.log (category)
    console.log (postMessage)
    console.log (auth.currentUser.email)
    console.log (auth.currentUser.uid)
    await addDoc(postsCollectionRef, {
      category: category, 
      postMessage: postMessage, 
      author: { email: auth.currentUser.email, id: auth.currentUser.uid}
    });

    navigate("/board");
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

  const closeComment = () => {
    setCommentActive({display: "none"})
    setCommentOverlay({display: "none"})
  }

  const openComment = (post_id) => {
    setCommentActive({display: "flex"})
    setCommentOverlay({display: "block"})
    console.log(post_id)

  }


  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  })

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
              <option value='Category1'>Category1</option>
              <option value='Category2'>Category2</option>
              <option value='Category3'>Category3</option>
              <option value='Category4'>Category4</option>
            </select>
          </div>
          <textarea 
            onChange={(e) => handlePostMessage(e)}
            type="text" 
            placeholder="Write something . . ."
          />
          <button className="submit_write"onClick={() => writePost()}>Submit</button>
        </div>
        {postsList.map((post) => {
          return (
            <div className="post_Container">
              <div className="post_Header">
                <div className="post_Author">
                  <h4>Author: {post.author.email}</h4>
                </div>
                <div className="post_Category">
                  <h5>{post.category}</h5>
                </div>
              </div>
              <div className="post_Text_Container">
                {post.postMessage}
              </div>
              <div className="post_Buttons">
                <button className="up_Btn">Like</button>
                <button className="comment_Btn" onClick={()=>openComment(post.id)}>Comment</button>
              </div>
            </div>
          )
        })}
        <div className="comment_overlay"
          style={commentOverlay}
          onClick={()=> closeComment ()}>
            HELLO
        </div>
        <div className="post_View"
          style={commentActive}>
          HELLO
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Board;