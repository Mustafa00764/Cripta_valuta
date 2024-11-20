import PanelHeader from './PanelHeader'
import React, { useContext, useRef, useState, useCallback, useEffect } from 'react'
import axios from 'axios';
import { AdminContext } from '../context/AdminContext'
import chevronDown from "../assets/svg/ChevronDown.svg"
import pattern from "../assets/images/pattern.png"
import white_pattern from "../assets/images/white_pattern.png"
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaQuoteLeft } from 'react-icons/fa';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './cropImage';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Editor, EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw, ContentState, convertFromHTML, CompositeDecorator, Modifier } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { DefaultDraftBlockRenderMap } from 'draft-js';
import { Map } from 'immutable';
import 'draft-js/dist/Draft.css';
import DemoCard from './DemoCard.jsx';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ArticleDemo from './ArticleDemo.jsx';
import ADCard from './ADCard.jsx';
import CCard from './CCard.jsx';
import api from '../components/axiosRefresh.js'


const CategoriesPage = () => {
  const {setCategories,setMain,setImage,setPostered,conclusione,setConclusione,postered,setPubDate,setSubtitled,setTitled,image,main,categories,pubDate,titled,subtitled} = useContext(AdminContext)
  const [minDate, setMinDate] = useState('');
  const [name, setName] = useState(titled);
  const [description, setDescription] = useState(subtitled);
  const [conclusion, setConclusion] = useState(conclusione);
  const {theme, setTheme} = useContext(AdminContext)
  const [poster, setPoster] = useState(postered)

  const handleRestore = async () => {

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      alert("Вы не авторизованы!");
      return;
    }

    try {
      
      const response = await api.get("/categories",{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setCategories(response.data)
    } catch (error) {

      console.log(error);

    }
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];    
    if (file && /\.(jpe?g|png|gif|webp|svg)$/i.test(file.name)) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('Image loaded:', reader.result);  // Убедитесь, что изображение загружено
        setPoster(reader.result);
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

      let posterFile = poster;
      if (typeof poster === "string") {
        const response = await fetch(poster);
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
        name: name,
        description: description,
        icon: image1Path,
      };

      const response = await api.post('/categories', categoryData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log("Профиль успешно обновлен:", response.data);
      alert("Профиль обновлен!");
    } catch (error) {

      console.log(error);

    }
  }

  useEffect(()=>{
    handleRestore()
  },[categories])

  return (
    <div className='w-full h-auto'>
      <PanelHeader title={'Categories'}/>
      <div className='w-full h-full px-[40px]'>
      <div className='h-[78px] py-[14px] max-w-[150px]'>
          <label htmlFor="Articles">
            <input type="radio" id='Articles' name='category' className='hidden'/>
            <div className={`min-w-[100px] gap-5 cursor-pointer relative w-auto h-[50px] justify-between rounded-[15px] flex items-center ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} px-5`}>
              <p>Categories</p>
              <p>5</p>
            </div>
          </label>
        </div>
        <div className='max-w-[1200px] mt-5 text-sideBarTextLight w-full max-h-[550px] relative h-auto  '>
          <div className=' h-[50px] flex items-center text-center bg-[#151B1F] rounded-t-[12px]'>
            <div className='w-[100px]'>
              <p>#</p>
            </div>
            <div className='w-[150px]'>
              <p>icon</p>
            </div>
            <div className='w-[300px]'>
              <p>name</p>
            </div>
            <div className='flex-auto'>
              <p>description</p>
            </div>
            <div className='w-[200px]'>
              <p>options</p>
            </div>
          </div>
          <div className=' relative'>
            {
              categories.map(v=>{
                return (
                  <>
                  <CCard name={v.name} icon={v.icon} description={v.description} />
                  </>
                )
              })
            }
          </div>
        </div>
        <div className={`text-[24px] mt-4 font-bold ${theme?"text-[#0C1013]":"text-[#fff]"} transition-all`}>
          <p>New Category</p>
        </div>
        <form onSubmit={handleSubmite}>
          <div className={`${theme?'text-sideBarTextDark':'text-[#fff]'} transition-all mt-[5px] `}>
          </div>
          {/* Poster */}
          <div className={`${theme?'text-sideBarTextDark':'text-[#fff]'} mt-[15px] flex items-end transition-all`}>
            <div>
            <label htmlFor="poster" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Poster <span className='text-[#FF8F00] text-[14px] '>(1:1)</span> <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <label htmlFor="poster" style={{backgroundImage: poster ? `url(${poster})` : `url(${theme?white_pattern:pattern})`}} className={` w-[288px] cursor-pointer h-[288px] bg-cover bg-no-repeat bg-center flex justify-center items-center rounded-full border border-[#262E34]`}>
              <input type="file" id='poster' accept='image/*' required onChange={handleImageUpload} name='poster' className=' w-0 h-0'/>
              <svg className={poster?"hidden":""} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45.8334 14.0625C46.6963 14.0625 47.3959 13.3629 47.3959 12.5C47.3959 11.6371 46.6963 10.9375 45.8334 10.9375V14.0625ZM29.1667 10.9375C28.3038 10.9375 27.6042 11.6371 27.6042 12.5C27.6042 13.3629 28.3038 14.0625 29.1667 14.0625V10.9375ZM39.0625 4.16666C39.0625 3.30372 38.3629 2.60416 37.5 2.60416C36.6371 2.60416 35.9375 3.30372 35.9375 4.16666H39.0625ZM35.9375 20.8333C35.9375 21.6962 36.6371 22.3958 37.5 22.3958C38.3629 22.3958 39.0625 21.6962 39.0625 20.8333H35.9375ZM45.8334 10.9375H37.5V14.0625H45.8334V10.9375ZM37.5 10.9375H29.1667V14.0625H37.5V10.9375ZM35.9375 4.16666V12.5H39.0625V4.16666H35.9375ZM35.9375 12.5V20.8333H39.0625V12.5H35.9375Z" fill={theme?"#0C1013":"#FFFFFF"}/>
              <path d="M23.9584 6.25C14.6285 6.25 9.96354 6.25 7.0651 9.14842C4.16669 12.0469 4.16669 16.7118 4.16669 26.0417C4.16669 35.3715 4.16669 40.0365 7.0651 42.935C9.96354 45.8333 14.6285 45.8333 23.9584 45.8333C33.2881 45.8333 37.9531 45.8333 40.8517 42.935C43.75 40.0365 43.75 35.3715 43.75 26.0417V25" stroke={theme?"#0C1013":"#FFFFFF"} strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4.16669 29.4488C5.45631 29.2615 6.7601 29.169 8.06608 29.1723C13.591 29.0554 18.9805 30.7769 23.2731 34.0296C27.2542 37.0461 30.0515 41.1977 31.25 45.8333" stroke={theme?"#0C1013":"#FFFFFF"} strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M43.75 35.2006C41.3013 33.9604 38.7683 33.331 36.2212 33.3337C32.3635 33.3185 29.1698 33.7986 25.625 36.5625" stroke={theme?"#0C1013":"#FFFFFF"} strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </label>
            </div>
          </div>
          <div className={` max-w-[1280px] w-full ${theme?'text-sideBarTextDark':'text-[#fff]'} mt-[15px] transition-all`}>
          <label htmlFor="name" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Categories Name <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <input
              type="text"
              maxLength="100"
              value={name}
              id='name'
              placeholder='Enter asset name'
              onChange={(e) => setName(e.target.value)}
              required
              className={`w-full outline-none border h-[50px] border-[#262E34] px-[15px] ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} rounded-[12px]`}
            />
          </div>
          <div className={` max-w-[1280px] w-full ${theme?'text-sideBarTextDark':'text-[#fff]'} mt-[15px] transition-all`}>
          <label htmlFor="description" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Description <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
          <textarea
              type="text"
              minLength="100"
              value={description}
              id='description'
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

export default CategoriesPage