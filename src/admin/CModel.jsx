import React, { useContext, useEffect, useState } from 'react'
import api from '../components/axiosRefresh.js'
import { AdminContext } from '../context/AdminContext.jsx';
import pattern from "../assets/images/pattern.png"
import white_pattern from "../assets/images/white_pattern.png"
const CModel = () => {
  const {setCategory,category,model,setModel} = useContext(AdminContext)
  const [namee, setName] = useState(category.name);
  const [descriptione, setDescription] = useState(category.description);
  const [postere, setPostere] = useState(category.icon)
  const {setCategories,setMain,setImage,setPostered,theme,handleRestore,conclusione,setConclusione,postered,setPubDate,setSubtitled,setTitled,image,main,categories,pubDate,titled,subtitled} = useContext(AdminContext)


  const handleImageUploade = async (event) => {
    const file = event.target.files[0];    
    if (file && /\.(jpe?g|png|gif|webp|svg)$/i.test(file.name)) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('Image loaded:', reader.result);  // Убедитесь, что изображение загружено
        setPostere(reader.result);
      };
      reader.readAsDataURL(file);      
    } else {
      alert('Please upload a valid image (JPG, PNG, GIF, WebP).');
    }
  };

  const handleSubmite = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      alert("Вы не авторизованы!");
      return;
    }
    try {

      let posterFile = postere;
      if (typeof postere === "string") {
        const response = await fetch(postere);
        if (!response.ok) {
          throw new Error("Ошибка загрузки posterPhoto.");
        }
        const posterBlob = await response.blob();
        posterFile = new File([posterBlob], "poster-image.jpg", { type: "image/jpeg" });
      }
  
      // Создаем FormData
      const formData1 = new FormData();

      formData1.append("file", posterFile);
  
      // Отправляем данные на /upload
      const uploadResponse1 = await api.post("/upload", formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(uploadResponse1.data);

      const image1Path = "https://legitcommunity.uz"+uploadResponse1.data;

      if (!image1Path) {
        throw new Error("Ошибка загрузки изображений на сервер.");
      }

      const categoryData = {
        name: namee,
        description: descriptione,
        icon: image1Path,
      };

      const response = await api.put(`/categories/${category.id}`, categoryData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      handleRestore()
      console.log("Категория успешно обновлен:", response.data);
      alert("The category has been successfully updated!");
    } catch (error) {

      console.log(error);

    }
  }
  useEffect(()=>{

  },[category,model,namee,descriptione,postere])

  return (
    <div className={model?'w-full h-full absolute top-0 left-0 flex justify-center transition-all bg-[rgba(0,0,0,.5)] items-center z-[25] opacity-[1]':'w-full h-full absolute top-0 left-0 flex justify-center transition-all bg-[rgba(0,0,0,.5)] items-center -z-10 opacity-0'}>
      <div className='max-w-[1024px] w-full h-auto p-6 bg-bgMode '>
        <div className={`text-[24px] mt-4 font-bold text-textMode transition-all`}>
          <p>Edit Category</p>
        </div>
        <form onSubmit={handleSubmite}>
          <div className={`text-textMode transition-all mt-[5px] `}>
          </div>
          {/* Postere */}
          <div className={`text-textMode mt-[15px] flex items-end transition-all`}>
            <div>
            <label htmlFor="postere" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Poster <span className='text-[#FF8F00] text-[14px] '>(1:1)</span> <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <label htmlFor="postere" style={{backgroundImage: postere ? `url(${postere})` : `url(${theme?white_pattern:pattern})`}} className={` w-[288px] cursor-pointer h-[288px] bg-cover bg-no-repeat bg-center flex justify-center items-center rounded-full border border-[#262E34]`}>
              <input type="file" id='postere' accept='image/*' required onChange={handleImageUploade} name='poster' className=' w-0 h-0'/>
              <svg className={postere?"hidden":""} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45.8334 14.0625C46.6963 14.0625 47.3959 13.3629 47.3959 12.5C47.3959 11.6371 46.6963 10.9375 45.8334 10.9375V14.0625ZM29.1667 10.9375C28.3038 10.9375 27.6042 11.6371 27.6042 12.5C27.6042 13.3629 28.3038 14.0625 29.1667 14.0625V10.9375ZM39.0625 4.16666C39.0625 3.30372 38.3629 2.60416 37.5 2.60416C36.6371 2.60416 35.9375 3.30372 35.9375 4.16666H39.0625ZM35.9375 20.8333C35.9375 21.6962 36.6371 22.3958 37.5 22.3958C38.3629 22.3958 39.0625 21.6962 39.0625 20.8333H35.9375ZM45.8334 10.9375H37.5V14.0625H45.8334V10.9375ZM37.5 10.9375H29.1667V14.0625H37.5V10.9375ZM35.9375 4.16666V12.5H39.0625V4.16666H35.9375ZM35.9375 12.5V20.8333H39.0625V12.5H35.9375Z" fill={theme?"#0C1013":"#FFFFFF"}/>
              <path d="M23.9584 6.25C14.6285 6.25 9.96354 6.25 7.0651 9.14842C4.16669 12.0469 4.16669 16.7118 4.16669 26.0417C4.16669 35.3715 4.16669 40.0365 7.0651 42.935C9.96354 45.8333 14.6285 45.8333 23.9584 45.8333C33.2881 45.8333 37.9531 45.8333 40.8517 42.935C43.75 40.0365 43.75 35.3715 43.75 26.0417V25" stroke={theme?"#0C1013":"#FFFFFF"} strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4.16669 29.4488C5.45631 29.2615 6.7601 29.169 8.06608 29.1723C13.591 29.0554 18.9805 30.7769 23.2731 34.0296C27.2542 37.0461 30.0515 41.1977 31.25 45.8333" stroke={theme?"#0C1013":"#FFFFFF"} strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M43.75 35.2006C41.3013 33.9604 38.7683 33.331 36.2212 33.3337C32.3635 33.3185 29.1698 33.7986 25.625 36.5625" stroke={theme?"#0C1013":"#FFFFFF"} strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </label>
            </div>
          </div>
          <div className={` max-w-[1280px] w-full text-textMode mt-[15px] transition-all`}>
          <label htmlFor="name" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Categories Name <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <input
              type="text"
              maxLength="100"
              value={namee}
              id='name'
              defaultValue={namee}
              placeholder='Enter asset name'
              onChange={(e) => setName(e.target.value)}
              required
              className={`w-full outline-none border h-[50px] border-[#262E34] px-[15px] bg-bgMode transition-all text-textMode rounded-[12px]`}
            />
          </div>
          <div className={` max-w-[1280px] w-full text-textMode mt-[15px] transition-all`}>
          <label htmlFor="description" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Description <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
          <textarea
              type="text"
              minLength="100"
              value={descriptione}
              id='description'
              defaultValue={descriptione}
              placeholder='Enter asset description'
              onChange={(e) => setDescription(e.target.value)}
              required
              className={`w-full outline-none border min-h-[150px] border-[#262E34] p-[15px] bg-bgMode transition-all text-textMode rounded-[12px]`}
            ></textarea>
          </div>
          <div>
          <button type='submit' className="mt-4 px-4 py-2 bg-blue-500 text-white" >
            PUSH
          </button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default CModel