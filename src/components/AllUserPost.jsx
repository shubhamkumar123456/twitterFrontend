import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { RiMessage2Line } from "react-icons/ri";
import UserContext from '../context/UserContext';
import GetpostComments from './GetpostComments';
import { FaRegEye } from "react-icons/fa";
// import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { pink, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IoEye } from "react-icons/io5";
import ShowSingleBlog from './ShowSingleBlog';
import { Card } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import AddComment from './AddCommentComponent';
import { jwtDecode } from "jwt-decode";

const AllUserPost = (props) => {
  const [allPosts, setallPosts] = useState([]);

  let ctx = useContext(UserContext)
  let token = ctx.details.token
  const decoded = jwtDecode(token);
  console.log(decoded)
  // console.log(token)
  const [heartClick, setheartClick] = useState(false);
  // const [postSubmited, setPostSubmited] = useState(false);
  const [selectedPostId, setselectedPostId] = useState("");

  // let commentRef = useRef()

  let getAllData = async () => {
    let res = await axios.get('http://localhost:8080/posts/getall')
    let data = res.data;
    console.log(data.data)
    setallPosts(data.data)
  }
  useEffect(() => {
    getAllData()
  }, [props.clicked])

  const handleHeart = () => {
    setheartClick(!heartClick)
  }

  const showForm = (id) => {
    // if(selectedPostId){
    //   setselectedPostId('')
    // }else{
    //   setselectedPostId(id)

    // }
    setselectedPostId(id)
    setIsModalOpen(true);
    // onClick={showModal}
  }

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

const [selectedEle, setselectedEle] = useState("");
  const showLoading = (ele) => {
    setOpen(true);
    setLoading(true);
    setselectedEle(ele)

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };


  // add comment section tools starts here

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
// add comment section tools ends here

//likes section starts here******************************************************
      const handleLikes = async(postId)=>{
          console.log(postId)
          let res = await fetch(`http://localhost:8080/posts/updatelike/${postId}`,{
            method:"PUT",
            headers:{
              'content-type':'application/json',
              'Authorization':token
            }
          })
          let data = await res.json();
          console.log(data)
          getAllData()
      }
//likes section ends here
  return (
    <div className='row justify-content-center gap-2'>
      {


        allPosts.map((ele) => {
          return <Card  key={ele._id} sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {ele.userId.name[0]}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={ele.userId.name}
              subheader="September 14, 2016"
            />

            {ele.file.split('/')[4] === 'image' ?
              <CardMedia
                component="img"
                height="194"
                image={ele.file}
                alt="Paella dish"
              />
              :
              <CardMedia
                component="video"
                height="194"
                image={ele.file}
                alt="Paella dish"
                controls
              />
            }


            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {ele.title}
              </Typography>
            </CardContent>
            <CardActions className='d-flex justify-content-between' disableSpacing>
              <IconButton onClick = {()=>handleLikes(ele._id)} aria-label="add to favorites">
                <FavoriteIcon sx={{ color: ele.likes.includes(decoded._id)&&`${red[500]}` }} /> <sup>{ele.likes.length>0?ele.likes.length:''}</sup>
              </IconButton>
              <IconButton aria-label="share">
                <RiMessage2Line   onClick={()=>showForm(ele._id)}/>
              </IconButton>
              <IconButton aria-label="share">
                <FaRegEye  onClick={()=>showLoading(ele)}/>
               {ele._id===selectedEle._id && <ShowSingleBlog ele={selectedEle}  open={open} setOpen={setOpen} loading={loading} showLoading={showLoading}/>}
              </IconButton>

            </CardActions>

        {ele._id===selectedPostId && <div className=' col-md-3'>
          <AddComment token={token} getAllData={getAllData} isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} ele={ele}/>
         </div>}

          </Card>
        })
      }
    </div>
  )
}

export default AllUserPost
