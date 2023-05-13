import { useEffect, useState } from "react";
import { db } from "../firebase";
import "./Admin.css";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
const Admin = () => {
  const [pendingList, setPendingList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [viewPostStatus, setViewPost] = useState(false);
  const [postItem, setPostItem] = useState(null);
  const [statChange, setStatus] = useState(false)
  const [option, setOption] = useState("pending")
  const view_post = (post) => {
    setViewPost(!viewPostStatus)
    setPostItem(post)
  }

  const handlePostStatus = async (post) => {
    const postRef = doc(db, "posts", post.id);
    await updateDoc(postRef, {
        status: 'finish'
    }).then(setStatus(!statChange));

  }
  const handleOption = (item) => {
    setOption(item)
  }
  useEffect(() => {
    const sortPending = () => {
      const sorted = [...pendingList].sort((a, b) => (
        (a.date.year+a.date.month+a.date.day) < (b.date.year+b.date.month+b.date.day) ? -1 : 1))
      setPendingList([...sorted]);

    }
    const setPendingArray = (data) => {
      setPendingList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      //then(sortPending())

    }

    const getPending = async () => {
      const data = await getDocs(postsCollectionRef);
      setPendingArray(data)

      // if (pendingList != null){
      //   sortPending()
      //   console.log("sorting")
      // }
    }
    getPending()

  }, [statChange])
  return (
    <>
    <div className="admin_area">
      <div className="option_section">
        <h3>OPTIONS</h3>
        <ul className="option_list">
          <li className="option_item" onClick={()=> handleOption("pending")}>Pending</li>
          <li className="option_item" onClick={() => handleOption("finish")}>Finished</li>
        </ul>
      </div>
      {(option == "pending") && <div className="pending_section">
        <div className="title_row"> 
          <div className="title_item">ID</div>
          <div className="title_item">Date</div>
          <div className="title_item">Author</div>
          <div className="title_item">Category</div>
          <div className="title_item">Description</div>
          <div className="title_item">Action</div>
        </div>
        {(option == "pending") && pendingList.map((post) => {
          return (
            (post.status == "pending") && <div className="pending_Container" key={post.id}>
              <div className="pending_item">{post.id}</div>
              <div className="pending_item">{post.date.day}-{post.date.month}-{post.date.year}</div>
              <div className="pending_item">{post.author.email}</div>
              <div className="pending_item">{post.category}</div>
              <div className="pending_item view_post" onClick={() => view_post(post)}> View </div>
              <div className="pending_item " onClick={() => handlePostStatus(post)}>Mark as Done</div>
            </div>
          )
        })}
      </div>}
      {(option == "finish") && <div className="finish_section">
        <div className="title_row_finish"> 
          <div className="title_item_finish">ID</div>
          <div className="title_item_finish">Date</div>
          <div className="title_item_finish">Author</div>
          <div className="title_item_finish">Category</div>
          <div className="title_item_finish">Description</div>
        </div>
        {(option == "finish") && pendingList.map((post) => {
          return (
            (post.status == "finish") && <div className="finish_Container" key={post.id}>
              <div className="finish_item">{post.id}</div>
              <div className="finish_item">{post.date.day}-{post.date.month}-{post.date.year}</div>
              <div className="finish_item">{post.author.email}</div>
              <div className="finish_item">{post.category}</div>
              <div className="finish_item view_post" onClick={() => view_post(post)}> View </div>
            </div>
          )
        })}
      </div>}
    </div>
    {viewPostStatus && <div className="postModal" onClick={() => view_post(null)}>
      <div className="post_ContainerA">
        <div className="post_HeaderA">
          <div className="post_AuthorA">
            <h4>Author: {postItem.author.email}</h4>
          </div>
          <div className="post_CategoryA">
            <h5>{postItem.category}</h5>
          </div>
        </div>
        <div className="post_Text_ContainerA">
          {postItem.postMessage}
        </div>
        <div>
          <img className="post_Image" src={postItem.imageUrl}/>
        </div>
      </div>
    </div>}
    </>
  );
}

export default Admin;