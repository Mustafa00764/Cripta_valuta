import React, { useContext, useRef, useState, useCallback, useEffect } from 'react'
import axios from 'axios';
import PanelHeader from './PanelHeader'
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

const AddAirdropPage = () => {
  const {setCategories,setMain,setImage,setPostered,conclusione,setConclusione,postered,setPubDate,setSubtitled,setTitled,image,main,categorie,pubDate,titled,subtitled} = useContext(AdminContext)
  const [minDate, setMinDate] = useState('');
  const [title, setTitle] = useState(titled);
  const [pool, setPool] = useState('');
  const [startDate, setStartDatel] = useState('');
  const [endDate, setEndDate] = useState('');

  const [url, setUrl] = useState(subtitled);
  const [conclusion, setConclusion] = useState(conclusione);
  const {theme, setTheme} = useContext(AdminContext)
  const [poster, setPoster] = useState(postered)
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState();
  const previewCanvasRef = useRef(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    updatePreview(poster, croppedAreaPixels);
  }, [poster]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];    
    if (file && /\.(jpe?g|png|gif|webp)$/i.test(file.name)) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('Image loaded:', reader.result);  // Убедитесь, что изображение загружено
        setPoster(reader.result);
      };
      reader.readAsDataURL(file);
      console.log(reader.readAsDataURL(file));
      
    } else {
      alert('Please upload a valid image (JPG, PNG, GIF, WebP).');
    }
  };

  const updatePreview = async (poster, croppedAreaPixels) => {
    try {
      const canvas = previewCanvasRef.current;
      const croppedImageUrl = await getCroppedImg(poster, croppedAreaPixels, canvas);
      setCroppedImage(croppedImageUrl);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  return (
    <div className='w-full h-auto'>
      <PanelHeader title={'Add / New Advertising'}/>
      <div className='w-full h-full px-[40px]'>
        <div className={`text-[24px] font-bold text-textMode transition-all`}>
          <p>New Airdrop</p>
        </div>
        <form >
            <div className={`text-textMode mt-[15px] transition-all`}>
              <label htmlFor="startDate" className='pl-[15px] flex gap-[5px] mb-[5px] items-center'>Start Date <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
              <input
                type="date"
                id="startDate"
                required
                min={startDate}
                className={`w-[300px] outline-none border h-[50px] border-[#262E34] px-[15px] bg-bgMode transition-all text-textMode rounded-[12px]`}
                onChange={(e) => setStartDatel(e)} // Установка даты публикации
              />
            </div>
            <div className={`text-textMode mt-[15px] transition-all`}>
              <label htmlFor="endDate" className='pl-[15px] flex gap-[5px] mb-[5px] items-center'>Edn Date <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
              <input
                type="date"
                id="endDate"
                required
                min={endDate}
                className={`w-[300px] outline-none border h-[50px] border-[#262E34] px-[15px] bg-bgMode transition-all text-textMode rounded-[12px]`}
                onChange={(e) => setEndDate(e)} // Установка даты публикации
              />
            </div>
          {/* Poster */}
          <div className={`text-textMode mt-[15px] flex items-end transition-all`}>
            <div>
            <label htmlFor="poster" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Poster <span className='text-[#FF8F00] text-[14px] '>(1:1)</span> <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <label htmlFor="poster" style={{backgroundImage: poster ? `url(${poster})` : `url(${theme?white_pattern:pattern})`}} className={` w-[288px] cursor-pointer h-[288px] bg-cover bg-no-repeat bg-center flex justify-center items-center rounded-[12px] border border-[#262E34]`}>
              <input type="file" id='poster' accept='image/*' required onChange={handleImageUpload} name='poster' className=' w-0 h-0'/>
              <svg className={poster?"hidden":""} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45.8334 14.0625C46.6963 14.0625 47.3959 13.3629 47.3959 12.5C47.3959 11.6371 46.6963 10.9375 45.8334 10.9375V14.0625ZM29.1667 10.9375C28.3038 10.9375 27.6042 11.6371 27.6042 12.5C27.6042 13.3629 28.3038 14.0625 29.1667 14.0625V10.9375ZM39.0625 4.16666C39.0625 3.30372 38.3629 2.60416 37.5 2.60416C36.6371 2.60416 35.9375 3.30372 35.9375 4.16666H39.0625ZM35.9375 20.8333C35.9375 21.6962 36.6371 22.3958 37.5 22.3958C38.3629 22.3958 39.0625 21.6962 39.0625 20.8333H35.9375ZM45.8334 10.9375H37.5V14.0625H45.8334V10.9375ZM37.5 10.9375H29.1667V14.0625H37.5V10.9375ZM35.9375 4.16666V12.5H39.0625V4.16666H35.9375ZM35.9375 12.5V20.8333H39.0625V12.5H35.9375Z" fill={theme?"#0C1013":"#FFFFFF"}/>
              <path d="M23.9584 6.25C14.6285 6.25 9.96354 6.25 7.0651 9.14842C4.16669 12.0469 4.16669 16.7118 4.16669 26.0417C4.16669 35.3715 4.16669 40.0365 7.0651 42.935C9.96354 45.8333 14.6285 45.8333 23.9584 45.8333C33.2881 45.8333 37.9531 45.8333 40.8517 42.935C43.75 40.0365 43.75 35.3715 43.75 26.0417V25" stroke={theme?"#0C1013":"#FFFFFF"} strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4.16669 29.4488C5.45631 29.2615 6.7601 29.169 8.06608 29.1723C13.591 29.0554 18.9805 30.7769 23.2731 34.0296C27.2542 37.0461 30.0515 41.1977 31.25 45.8333" stroke={theme?"#0C1013":"#FFFFFF"} strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M43.75 35.2006C41.3013 33.9604 38.7683 33.331 36.2212 33.3337C32.3635 33.3185 29.1698 33.7986 25.625 36.5625" stroke={theme?"#0C1013":"#FFFFFF"} strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </label>
            </div>
            <div className='w-full ml-5 flex gap-5'>
              {poster && (
                <div className="relative w-[288px] h-[288px] rounded-[12px] overflow-hidden">
                <Cropper
                  image={poster}
                  crop={crop}
                  zoom={zoom}
                  aspect={1} // Пропорции обрезки 1:1
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
                </div>
              )}

              {poster && (
                <div className="flex w-[288px] relative h-[288px] canvased">
                  <canvas ref={previewCanvasRef} className="w-full h-full rounded-[12px] border border-[#262E34]" />
                </div>
              )}
            </div>
          </div>
          <div className={` max-w-[1280px] w-full text-textMode mt-[15px] transition-all`}>
          <label htmlFor="title" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Title <span className='text-[#FF8F00] text-[14px] '>(100)</span> <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <input
              type="text"
              maxLength="100"
              value={title}
              id='title'
              placeholder='Enter asset title'
              onChange={(e) => setTitle(e.target.value)}
              required
              className={`w-full outline-none border h-[50px] border-[#262E34] px-[15px] bg-bgMode transition-all text-textMode rounded-[12px]`}
            />
          </div>
          <div className={` max-w-[1280px] w-full text-textMode mt-[15px] transition-all`}>
          <label htmlFor="pool" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Prize pool <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <input
              type="text"
              value={pool}
              id='pool'
              placeholder='Enter asset prize pool'
              onChange={(e) => setPool(e.target.value)}
              required
              className={`w-full outline-none border h-[50px] border-[#262E34] px-[15px] bg-bgMode transition-all text-textMode rounded-[12px]`}
            />
          </div>
          <div className={` max-w-[1280px] w-full text-textMode mt-[15px] transition-all`}>
          <label htmlFor="description" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Description <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
          <textarea name="" id="description" placeholder='Enter asset description' onChange={(e) => setUrl(e.target.value)} required  className={`w-full outline-none border p-4 min-h-[250px] transition-colors border-[#262E34] px-[15px] bg-bgMode text-textMode rounded-[12px]`}></textarea>
          </div>
        </form>

        <div>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white" >
            Отправить
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddAirdropPage;



// {
//   "name": "Campaign Name",
//   "description": "Campaign Description",
//   "startDate": "2023-01-01T00:00:00Z",
//   "endDate": "2023-12-31T23:59:59Z",
//   "prizePool": 1000000,
//   "tasks": [
//     {
//       "name": "Task 1",
//       "description": "Complete this task",
//       "type": "Social",
//       "openingDate": "2023-01-01T00:00:00Z"
//     }
//   ]
// }