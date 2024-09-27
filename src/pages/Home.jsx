import React, { useContext, useRef, useState } from 'react'
import AllUserPost from '../components/AllUserPost'
import axios from 'axios';
import UserContext from '../context/UserContext';

const Home = () => {
  let ctx = useContext(UserContext);

  const [clicked,setClicked] = useState(false)
  const [files, setfiles] = useState("");
  let titleRef = useRef();
  let descriptionRef = useRef()
  
  const handleInputChanger = (e)=>{
    let value = e.target.files[0]
    console.log(value)
    setfiles(value)
  }

  const handleSubmit = async(e)=>{
    //method -2 using cloudinary to upload any file
      e.preventDefault();

      let formData = new FormData();

      formData.append('file',files);
      formData.append('upload_preset','social') //social is your cloudinary upload_preset name

      let data = await axios.post('https://api.cloudinary.com/v1_1/dsftyrbh0/upload',formData) // dsftyrbh0 is your cloudinary name
      // console.log(data.data.secure_url)

      let obj = {
            title:titleRef.current.value,
            description:descriptionRef.current.value,
            file:data.data.secure_url
          }

      let res = await axios.post('http://localhost:8080/posts/create',obj,{
        headers:{
          'Authorization':ctx.details.token
      }
    });
    console.log(res.data)
    setClicked(false)


  }


  // const handleSubmit = (e)=>{
    //method -1 using file reader
  //   e.preventDefault()

  //   let reader = new FileReader();
  //   reader.readAsDataURL(files);

  //   reader.onload=async()=>{
  //     // console.log(reader.result)
  //        let obj = {
  //     title:titleRef.current.value,
  //     description:descriptionRef.current.value,
  //     file:reader.result
  //   }
  //   console.log(obj)
  //   let res = await axios.post('http://localhost:8080/posts/create',obj,{
  //     headers:{
  //       'Authorization':ctx.details.token
  //     }
  //   });
  //   let data = res.data
  //   console.log(data)
  //   setClicked(false)
  //   }

  //   reader.onerror =()=>{
  //     console.log(reader.error)
  //   }
  // }

  return (
    <div className='row m-0 p-0 bg-warning mt-2'>
      <div className="col-1 ">
        <button onClick={()=>setClicked(true)}  className='btn btn-info'>Create</button>
      </div>
      <div className="col-11 ">
          <AllUserPost clicked={clicked} />
      </div>
{
    clicked &&  <div className="form">
      <button onClick={()=>setClicked(false)} type="button" class="btn-close bg-white btnCloseForm" aria-label="Close"></button>
    <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input ref={titleRef} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Desctiption</label>
    <div className="form-floating mb-3">
  <textarea ref={descriptionRef} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
  <label htmlFor="floatingTextarea">description</label>
</div>
  </div>
  <div className="mb-3">
  <label htmlFor="formFileSm" className="form-label">Upload Image/video</label>
  <input onChange={handleInputChanger} className="form-control form-control-sm" id="formFileSm" type="file"/>
</div>
 

  <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
</form>

      </div>}
    </div>
  )
}

export default Home
