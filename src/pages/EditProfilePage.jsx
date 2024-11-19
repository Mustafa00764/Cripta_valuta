import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import LC_logo from '../assets/images/LC_logo.jpeg'
import Cropper from 'react-easy-crop';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { getCroppedImg } from '../admin/cropImage';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import api from '../components/axiosRefresh';
import { AuthContext } from '../context/AuthContext'    

const EditProfilePage = () => {
  const [posterPhoto, setPosterPhoto] = useState('https://cdn-edge.kwork.ru/files/cover/header11.jpg')
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState();
  const [textLength, setTextLength] = useState(0)
  const [hints, setHints] = useState('')
  const { isAuthenticated, user, setIsAuthenticated, setUser, handleLogin,refreshAccessToken } = useContext(AuthContext);
  const [photo, setPhoto] = useState(user?user.photo_url:LC_logo)
  const [name, setName] = useState(user?user.firstName:"");
  const [about, setAbout] = useState("");
  const [file, setFile] = useState(null);

  const handleImageUpload = async (e, setImage) => {
    const file = e.target.files[0];    
    if (file && /\.(jpe?g|png|gif|webp)$/i.test(file.name)) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
  }}

  const updatePreview = async (photo, croppedAreaPixels) => {
    try {
      const canvas = previewCanvasRef.current;
      const croppedImageUrl = await getCroppedImg(photo, croppedAreaPixels, canvas);
      setCroppedImage(croppedImageUrl);
      console.log(croppedAreaPixels);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    updatePreview(photo, croppedAreaPixels);
    console.log(croppedArea);
  }, [photo]);

  const lengthCheck = (e) => {
    let l = e.target.value
    setAbout(l)
    let length = 0
    for (let i = 0; i < l.length; i++) {
      let element = l[i];
      element === " "?'':length++
    }
    if (l === '') {
      length = 0
      setTextLength(length)
    }else{
      setTextLength(length)
    }
  }

  const hint = (el,vis) => {
    const hints = document.querySelector(".hints")
    if (el === 'name' && vis === 'over') {
      setHints('It will be visible to users, increases their trust in you.')
      hints.style.display = 'flex'
      hints.style.top = '20px'
    }else if (el === 'username' && vis === 'over') {
      setHints('This is your Telegram username, if you want to change it, change it in Telegram.')
      hints.style.display = 'flex'
      hints.style.top = '20px'
    }else if (el === 'photo' && vis === 'over') {
      setHints("High-quality personal photography strengthens readers' trust. You can also use other images. <br> Format: jpg, jpeg, png, webp.")
      hints.style.display = 'flex'
      hints.style.top = '150px'
    }else if (el === 'about you' && vis === 'over') {
      setHints("Tell people about yourself: how did you start your journey, what inspires you and what are your goals. Share stories of success and difficulties, because your experience can inspire others to new achievements!")
      hints.style.display = 'flex'
      hints.style.top = '372px'
    }else if (el === 'profile header' && vis === 'over') {
      setHints("The image at the top of your public profile page. This helps you stand out from the competition and form your own brand. <br> Formats: jpg, jpeg, png, webp.")
      hints.style.display = 'flex'
      hints.style.top = '568px'
    }else {
      hints.style.display = ''
    }
    
  }

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!croppedAreaPixels) {
      alert("Сначала обрежьте изображение!");
      return;
    }
  
    if (!photo || !posterPhoto) {
      alert("Выберите оба изображения для загрузки!");
      return;
    }
  
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userId = localStorage.getItem('userId');

    if (!accessToken || !refreshToken) {
      alert("Вы не авторизованы!");
      return;
    }
  
    try {
      // Создаем canvas для обрезки изображения
      const canvas = document.createElement("canvas");
      const croppedBlob = await getCroppedImg(photo, croppedAreaPixels, canvas);
  
      if (!croppedBlob) {
        throw new Error("Ошибка при обрезке изображения.");
      }
  
      // Преобразуем Blob в File
      const croppedFile = new File([croppedBlob], "cropped-image.jpg", { type: "image/jpeg" });
  
      // Проверяем, является ли posterPhoto строкой (URL)
      let posterFile = posterPhoto;
      if (typeof posterPhoto === "string") {
        const response = await fetch(posterPhoto);
        if (!response.ok) {
          throw new Error("Ошибка загрузки posterPhoto.");
        }
        const posterBlob = await response.blob();
        posterFile = new File([posterBlob], "poster-image.jpg", { type: "image/jpeg" });
      }
  
      // Создаем FormData
      const formData1 = new FormData();
      const formData2 = new FormData();

      formData1.append("file", croppedFile);
      formData2.append("file", posterFile);
  
      // Отправляем данные на /upload
      const uploadResponse1 = await api.post("/upload", formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(uploadResponse1.data);
      const uploadResponse2 = await api.post("/upload", formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(uploadResponse2.data);

      const image1Path = "https://legitcommunity.uz"+uploadResponse1.data;
      const image2Path = "https://legitcommunity.uz"+uploadResponse2.data;

      if (!image1Path || !image2Path) {
        throw new Error("Ошибка загрузки изображений на сервер.");
      }
  
      // Обновление профиля пользователя
      const userData = {
        firstName: name,
        about,
        lastName: user.lastName,
        username: user.username,
        isSubscribed: user.isSubscribed,
        photo_url: image1Path,
        profileHeader: image2Path,
      };
  
      const userResponse = await api.put(`/users/${userId}`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log("Профиль успешно обновлен:", userResponse.data);
      alert("Профиль обновлен!");
    } catch (error) {
      if (error.response) {
        console.error("Ответ сервера:", error.response.data); // Сообщение об ошибке от сервера
      } else {
        console.error("Ошибка:", error.message);
      }
    }
  };

  useEffect(()=>{
    const users = async () =>{
      if (user) {
        if(user.profileHeader != undefined){
          setPosterPhoto(user.profileHeader)
          setAbout(user.about)
        }
      }
      console.log(user);
    }
    users()
  },[user])
  
  return (
    <div className='w-full'>
      <div className="mx-auto max-w-[1012px] w-full py-5 px-3">
        <div className='mt-5'>
          <p className='text-[32px] text-textMode font-semibold leading-[42px] md:text-[24px] md:leading-[32px]'>Настройки</p>
        </div>
        <div className='flex w-full'>
        <div className='flex max-w-[684px] w-full flex-col border text-textMode bg-bgMode border-[#494E5B] py-[15px] px-6 rounded-[6px] mt-5'>
          <form className='w-full h-auto' onSubmit={handleSubmit}>
            <div className='flex w-full mb-[15px] gap-4 md:flex-col'>
              <div className='flex flex-col w-full' onMouseOver={()=>hint('name','over')} onMouseOut={()=>hint('name','out')}>
                <label htmlFor="name" className='text-[14px] font-semibold leading-6'>Name</label>
                <input type="text" required id='name' maxLength={15} onChange={(e)=>setName(e.target.value)} minLength={3} defaultValue={user?user.firstName:""} placeholder='Enter your name' className='w-full h-[50px] bg-bgMode border border-[#494E5B] rounded-[6px] outline-none px-3'/>
              </div>
              <div className='flex flex-col w-full' onMouseOver={()=>hint('username','over')} onMouseOut={()=>hint('username','out')}>
                <label htmlFor="username" className='text-[14px] font-semibold leading-6'>UserName</label>
                <input type="text" id='username' value={user?user.username:""} readOnly className='w-full h-[50px] bg-bgMode border border-[#494E5B] rounded-[6px] outline-none px-3'/>
              </div>
            </div>
            <label htmlFor="photo" className='text-[14px] relative font-semibold leading-6'>Photo</label>
            <div className={` flex gap-4 flex-wrap transition-all items-center`} onMouseOver={()=>hint('photo','over')} onMouseOut={()=>hint('photo','out')}>
            <div>
            <label htmlFor="photo" style={{backgroundImage: user ? `url(${user.photo_url})` : ``}} className={` w-[200px] [&>svg]:hover:opacity-[1] cursor-pointer h-[200px] bg-cover bg-no-repeat bg-center flex justify-center items-center rounded-[12px] border border-[#262E34]`}>
              <input type="file" id='photo' accept='image/*' required onChange={(e)=> handleImageUpload(e,setPhoto)} name='poster' className=' w-0 h-0'/>
              <svg className={photo?" opacity-0 transition-all md:hidden":"md:hidden"} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45.8334 14.0625C46.6963 14.0625 47.3959 13.3629 47.3959 12.5C47.3959 11.6371 46.6963 10.9375 45.8334 10.9375V14.0625ZM29.1667 10.9375C28.3038 10.9375 27.6042 11.6371 27.6042 12.5C27.6042 13.3629 28.3038 14.0625 29.1667 14.0625V10.9375ZM39.0625 4.16666C39.0625 3.30372 38.3629 2.60416 37.5 2.60416C36.6371 2.60416 35.9375 3.30372 35.9375 4.16666H39.0625ZM35.9375 20.8333C35.9375 21.6962 36.6371 22.3958 37.5 22.3958C38.3629 22.3958 39.0625 21.6962 39.0625 20.8333H35.9375ZM45.8334 10.9375H37.5V14.0625H45.8334V10.9375ZM37.5 10.9375H29.1667V14.0625H37.5V10.9375ZM35.9375 4.16666V12.5H39.0625V4.16666H35.9375ZM35.9375 12.5V20.8333H39.0625V12.5H35.9375Z" fill={"#FFFFFF"}/>
              <path d="M23.9584 6.25C14.6285 6.25 9.96354 6.25 7.0651 9.14842C4.16669 12.0469 4.16669 16.7118 4.16669 26.0417C4.16669 35.3715 4.16669 40.0365 7.0651 42.935C9.96354 45.8333 14.6285 45.8333 23.9584 45.8333C33.2881 45.8333 37.9531 45.8333 40.8517 42.935C43.75 40.0365 43.75 35.3715 43.75 26.0417V25" stroke={"#FFFFFF"} strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4.16669 29.4488C5.45631 29.2615 6.7601 29.169 8.06608 29.1723C13.591 29.0554 18.9805 30.7769 23.2731 34.0296C27.2542 37.0461 30.0515 41.1977 31.25 45.8333" stroke={"#FFFFFF"} strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M43.75 35.2006C41.3013 33.9604 38.7683 33.331 36.2212 33.3337C32.3635 33.3185 29.1698 33.7986 25.625 36.5625" stroke={"#FFFFFF"} strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </label>
            </div>
            <div className={` flex-wrap ${photo != LC_logo && photo != undefined && photo != user.photo_url ?"flex":"hidden"} gap-4`}>
              {photo != LC_logo && (
                <div className="relative w-[200px] h-[200px] rounded-[12px] overflow-hidden">
                <Cropper
                  image={photo}
                  crop={crop}
                  zoom={zoom}
                  aspect={1} // Пропорции обрезки 1:1
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
                </div>
              )}

              {photo != LC_logo && (
                <div className="flex w-[200px] relative h-[200px] canvased">
                  <canvas ref={previewCanvasRef} className="w-full h-full rounded-[12px] border border-[#262E34]" />
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col mt-5' onMouseOver={()=>hint('about you','over')} onMouseOut={()=>hint('about you','out')}>
            <label htmlFor="information_about_you" className='text-[14px] font-semibold leading-6'>Information about you</label>
            <textarea name="" value={about} required minLength={200} onChange={(e)=>lengthCheck(e)}  maxLength={1200} placeholder='Enter something about yourself' id="information_about_you" className='min-h-[206px] h-auto bg-bgMode outline-none border border-[#494E5B] rounded-[6px] p-3 text-[14px]'></textarea>
            <div className='w-full flex justify-end mt-1'>
              <p className='text-[#999] text-[12px] leading-4'>{textLength} из 1200 символов (минимум 200)</p>
            </div>
          </div>
          <div className='flex flex-col' onMouseOver={()=>hint('profile header','over')} onMouseOut={()=>hint('profile header','out')}>
            <label htmlFor="profile_header" className='text-[14px] font-semibold leading-6'>Profile Header</label>
            <label htmlFor="profile_header" style={{backgroundImage: `url(${posterPhoto})`}} className='w-full [&>svg]:hover:opacity-[1] rounded-[4px] cursor-pointer h-[74px] bg-cover bg-no-repeat bg-center flex justify-center items-center border border-[#262E34]'>
              <input type="file" name="" id="profile_header" onChange={(e)=>handleImageUpload(e,setPosterPhoto)} className=' w-0 h-0'/>
              <svg className={posterPhoto?" opacity-0 transition-all md:hidden":" md:hidden"} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45.8334 14.0625C46.6963 14.0625 47.3959 13.3629 47.3959 12.5C47.3959 11.6371 46.6963 10.9375 45.8334 10.9375V14.0625ZM29.1667 10.9375C28.3038 10.9375 27.6042 11.6371 27.6042 12.5C27.6042 13.3629 28.3038 14.0625 29.1667 14.0625V10.9375ZM39.0625 4.16666C39.0625 3.30372 38.3629 2.60416 37.5 2.60416C36.6371 2.60416 35.9375 3.30372 35.9375 4.16666H39.0625ZM35.9375 20.8333C35.9375 21.6962 36.6371 22.3958 37.5 22.3958C38.3629 22.3958 39.0625 21.6962 39.0625 20.8333H35.9375ZM45.8334 10.9375H37.5V14.0625H45.8334V10.9375ZM37.5 10.9375H29.1667V14.0625H37.5V10.9375ZM35.9375 4.16666V12.5H39.0625V4.16666H35.9375ZM35.9375 12.5V20.8333H39.0625V12.5H35.9375Z" fill={"#FFFFFF"}/>
              <path d="M23.9584 6.25C14.6285 6.25 9.96354 6.25 7.0651 9.14842C4.16669 12.0469 4.16669 16.7118 4.16669 26.0417C4.16669 35.3715 4.16669 40.0365 7.0651 42.935C9.96354 45.8333 14.6285 45.8333 23.9584 45.8333C33.2881 45.8333 37.9531 45.8333 40.8517 42.935C43.75 40.0365 43.75 35.3715 43.75 26.0417V25" stroke={"#FFFFFF"} strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4.16669 29.4488C5.45631 29.2615 6.7601 29.169 8.06608 29.1723C13.591 29.0554 18.9805 30.7769 23.2731 34.0296C27.2542 37.0461 30.0515 41.1977 31.25 45.8333" stroke={"#FFFFFF"} strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M43.75 35.2006C41.3013 33.9604 38.7683 33.331 36.2212 33.3337C32.3635 33.3185 29.1698 33.7986 25.625 36.5625" stroke={"#FFFFFF"} strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </label>
          </div>
          <div className='w-full flex items-center py-5 justify-between md:flex-col gap-5'>
            <button type='submit' className='bg-[#2F2F2F] text-[#fff] text-[14px] py-[18px] px-[31px] md:w-full rounded-[8px] transition-all hover:bg-[#2f2f2fe6]'>Save changes</button>
            <Link to={'/profile'}>
              <p className='text-[#177DE5] hover:text-[#177de5cc] leading-5 border-b border-[#177DE5]'>View profile</p>
            </Link>
          </div>
          </form>
        </div>
        <div className='max-w-[304px] w-full pt-5 pl-6 rs:hidden'>
          <div className='hints hidden p-5 relative rounded-[6px] text-textMode bg-bgMode' dangerouslySetInnerHTML={{ __html: hints }}></div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfilePage