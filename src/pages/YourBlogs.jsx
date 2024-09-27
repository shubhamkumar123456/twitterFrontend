import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const YourBlogs = () => {
    let ctx = useContext(UserContext)
    const [blogs, setblogs] = useState([]);

    let getBlogs = async()=>{
        let res = await axios.get('http://localhost:8080/posts/getSingleUser',{
            headers:{
                'Authorization':ctx.details.token
            }
        })
        console.log(res.data.data)
        setblogs(res.data.data)
    }

    useEffect(()=>{
        getBlogs()
    },[])

    const handleDelete = async(ans)=>{
        console.log(ans._id)
        let res = await axios.delete(`http://localhost:8080/posts/delete/${ans._id}`)
        let data = res.data
        if(data.success){
            toast.success(data.msg)
            getBlogs()
        }
        else{
            toast.error(data.msg);
        }
    }
  return (
    <div className='row m-0 p-0 justify-content-center gap-2 mt-3 '>
        {
            blogs.map((ele)=>{
                return <div className="card" style={{ width: '18rem' }}>
                {ele.file.split('/')[4]==='image' ?  <img src={ele.file} className="card-img-top" alt="..." /> :
                <video controls src={ele.file}></video>
                }
                  <div className="card-body">
                      <h6 className="card-title">{ele.title}</h6>
                      {/* <p className="card-text text-truncate">{ele.description}</p> */}
                      <a href="#" className="btn btn-primary">View full blog</a>

                <MdDelete onClick={()=>handleDelete(ele)} color='red' className='delIcon' size={25}/>
                    
                  </div>
              </div>
            })
        }
    </div>
  )
}

export default YourBlogs
