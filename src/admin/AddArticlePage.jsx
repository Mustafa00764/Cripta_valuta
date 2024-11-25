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
import api from '../components/axiosRefresh';
const ImageComponent = ({ block, blockProps }) => {
  const { src } = blockProps;

  return (
    <div style={{ display: 'inline-block', position: 'relative', marginBottom: '10px' }}>
      <img src={src} alt="Uploaded" className='w-[512px] object-cover max-h-[288px]' />
      <div>
        <button onClick={() => blockProps.removeImage(block.key)}>Удалить</button>
      </div>
    </div>
  );
};

const findImageEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE';
    },
    callback
  );
};

// Декоратор для обработки изображений
const imageDecorator = new CompositeDecorator([
  {
    strategy: findImageEntities,
    component: ImageComponent,
  },
]);

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    },
    callback
  );
};

// Компонент для рендеринга ссылок
const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();

  const handleClick = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение
    window.open(url, '_blank'); // Открываем ссылку в новой вкладке
  };

  return (
    <a href={url} onClick={handleClick} style={{ color: 'blue', textDecoration: 'underline' }}>
      {props.children}
    </a>
  );
};

// Декоратор для рендеринга ссылок
const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

// Функция для конвертации HTML в редакторское состояние
const htmlToEditorState = (html) => {
  const blocksFromHTML = convertFromHTML(html);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  return EditorState.createWithContent(contentState, decorator);
};

const combinedDecorator = new CompositeDecorator([
  {
    strategy: findImageEntities,
    component: ImageComponent,
  },
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);


const AddArticlePage = () => {
  const {setCategories,setMain,setImage,setSelectedCategory,selectedCategory,setPostered,conclusione,setConclusione,postered,setPubDate,setSubtitled,setTitled,image,main,categories,pubDate,titled,subtitled} = useContext(AdminContext)
  const [minDate, setMinDate] = useState('');
  const [title, setTitle] = useState(titled);
  const [subtitle, setSubtitle] = useState(subtitled);
  const [conclusion, setConclusion] = useState(conclusione);
  const {theme, setTheme} = useContext(AdminContext)
  const [poster, setPoster] = useState(postered)
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(image);
  const previewCanvasRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const contentState = stateFromHTML(main);
  const editorStates = EditorState.createWithContent(contentState, combinedDecorator);

  const [editorState, setEditorState] = useState(editorStates);
  const fileInputRef = useRef(null);
  const [fontSize, setFontSize] = useState(16);
  const [imagesList, setImagesList] = useState([]);
  const [publishDate, setPublishDate] = useState(pubDate.split("-").reverse().join("-"));
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [imgUrl, setImgUrl] = useState([])
  const [cid, setCid] = useState()


  // Добавление тега по нажатию клавиши Enter
  const handleAddTag = (e) => {
    if (e.key === "Enter" && input.trim()) {
      if (!tags.includes(input)) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    }
  };

  // Удаление тега
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  const handleCategoryClick = (category,id) => {
    setCategory(category);
    setCid(id)
    setIsOpen(false);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // Применение стилей к тексту (жирный, курсив и т.д.)
  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Обработка блоков (цитаты, списки и т.д.)
  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // Вставка ссылки на выделенный текст
  const promptForLink = () => {
    const selection = editorState.getSelection();

    if (!selection.isCollapsed()) {
      const url = prompt('Введите ссылку:');

      if (url) {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        const newContentState = Modifier.applyEntity(contentState, selection, entityKey);
        const newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');
        setEditorState(newEditorState);
      }
    } else {
      alert('Выделите текст, чтобы добавить ссылку');
    }
  };

  // Удаление ссылки с выделенного текста
  const removeLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const newEditorState = RichUtils.toggleLink(editorState, selection, null);
      setEditorState(newEditorState);
    }
  };
  const handleImageUploade = (e) => {
    const files = e.target.files;
  
    // Пробегаемся по каждому файлу
    Array.from(files).forEach((file) => {
      // Для каждого файла создаем новый FileReader
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const contentState = editorState.getCurrentContent();
  
        // Создаем сущность для изображения
        const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: event.target.result });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  
        // Вставляем атомный блок изображения в редактор
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
        setEditorState(newEditorState);
  
        // Добавляем изображение в список
        setImagesList([...imagesList, event.target.result]);
  
        // Выводим загруженное изображение в консоль
        console.log(event.target.result);
      };
  
      // Чтение файла как Data URL
      reader.readAsDataURL(file);
    });
  };
  

  // Удаление изображения
  const removeImage = (blockKey) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap().filter((block) => block.getKey() !== blockKey);
    
    // Обновляем содержимое состояния
    const newContentState = contentState.merge({
      blockMap,
      selectionBefore: contentState.getSelectionBefore(),
      selectionAfter: contentState.getSelectionAfter(),
    });
    
    // Создаём новое состояние редактора с изменениями
    const newEditorState = EditorState.push(editorState, newContentState, 'remove-image');
    setEditorState(newEditorState);
    // const contentState = editorState.getCurrentContent();
    // const blockMap = contentState.getBlockMap().filter((block) => block.getKey() !== blockKey);
    // const newContentState = contentState.merge({
    //   blockMap,
    // });
    // const newEditorState = EditorState.push(editorState, newContentState, 'remove-range');
    // setEditorState(newEditorState);
  };

  const blockRendererFn = (block) => {
    if (block.getType() === 'atomic') {
      const entity = block.getEntityAt(0);
      const { src } = editorState.getCurrentContent().getEntity(entity).getData();
      return {
        component: ImageComponent,
        editable: false,
        props: {
          src,
          removeImage,
        },
      };
    }
    return null;
  };

  // Загрузка данных из бэкенда
  const loadFromBackend = () => {
    // const content = {__html: main }
    setEditorState(EditorState.createWithContent(stateFromHTML(main))); // Конвертируем HTML в состояние редактора
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    updatePreview(poster, croppedAreaPixels);
  }, [poster]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    
    if (file && /\.(jpe?g|png|gif|webp)$/i.test(file.name)) {
      const reader = new FileReader();
  
      reader.onload = () => {
        console.log("Image loaded:", reader.result); // Убедитесь, что изображение загружено
        setPoster(reader.result); // Устанавливаем результат в poster
      };
  
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
  
      reader.readAsDataURL(file); // Читаем файл как DataURL
  
    } else {
      alert("Please upload a valid image (JPG, PNG, GIF, WebP).");
    }
  };
  

  const updatePreview = async (poster, croppedAreaPixels) => {
    try {
      const canvas = previewCanvasRef.current;
      const croppedImageUrl = await getCroppedImg(poster, croppedAreaPixels, canvas);
      const url = URL.createObjectURL(croppedImageUrl);
      setCroppedImage(url);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  // Изменение размера шрифта
  const handleEditorStateChange = (state) => {
    setEditorState(state);
  };


  const toggleBlockTypes = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    switch (blockType) {
      case "header-one": setFontSize(24);break;
      case "header-two": setFontSize(20);break;
      case "header-three": setFontSize(18);break;
      case "header-four": setFontSize(16);break;
      case "header-five": setFontSize(14);break;
      case "header-six": setFontSize(12);break;
      default:setFontSize(16)
        break;
    }
  };

  const getContentAsHTML = () => {
    const contentState = editorState.getCurrentContent();
    return stateToHTML(contentState); // Преобразование контента в HTML
  };

  const newDate = (e) => {
    const date = e.target.value
    setPublishDate(date.split("-").reverse().join("-"))
  } 

  useEffect(()=>{
    setImage(croppedImage)
    setPubDate(publishDate)
    setSubtitled(subtitle)
    setTitled(title)
    setSelectedCategory(category)
    setConclusione(conclusion)
    setPostered(poster)
    setMain(getContentAsHTML());
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(today.getDate()).padStart(2, '0');
    setMinDate(`${year}-${month}-${day}`);
    // setCategory(categories[0]);
    
  },[selectedCategory,croppedImage,poster,publishDate,subtitle,title,conclusion, main,setMain,categories,getContentAsHTML()])

  const sendToBackend = async (event) => {
    event.preventDefault();
  
    // Проверяем авторизацию
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userId = Number(localStorage.getItem("userId"));
  
    if (!accessToken || !refreshToken) {
      alert("Вы не авторизованы!");
      return;
    }
  
    // Получаем HTML-контент из редактора
    const htmlContent = getContentAsHTML();
  
    try {
      // Обрезка основного изображения (poster)
      const canvas = document.createElement("canvas");
      const croppedBlob = await getCroppedImg(poster, croppedAreaPixels, canvas);
      if (!croppedBlob) {
        throw new Error("Ошибка при обрезке изображения.");
      }
  
      const croppedFile = new File([croppedBlob], "cropped-image.jpg", { type: "image/jpeg" });
      const formDataPoster = new FormData();
      formDataPoster.append("file", croppedFile);
  
      const uploadPosterResponse = await api.post("/upload", formDataPoster, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const posterUrl = "https://legitcommunity.uz" + uploadPosterResponse.data;
      console.log("Poster uploaded:", posterUrl);
  
      // Загрузка остальных изображений
      const updatedImgUrls = [];
      for (let image of imagesList) {
        let imageFile = image;
  
        // Если элемент — строка (URL), загружаем его как blob
        if (typeof image === "string") {
          const response = await fetch(image);
          if (!response.ok) throw new Error("Ошибка загрузки изображения.");
          const blob = await response.blob();
          imageFile = new File([blob], "uploaded-image.jpg", { type: blob.type });
        }
  
        const formDataImage = new FormData();
        formDataImage.append("file", imageFile);
  
        const uploadImageResponse = await api.post("/upload", formDataImage, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const uploadedUrl = "https://legitcommunity.uz" + uploadImageResponse.data;
        updatedImgUrls.push(uploadedUrl);
        console.log("Image uploaded:", uploadedUrl);
      }
  
      // Обновление HTML-контента с новыми ссылками на изображения
      const imgIterator = updatedImgUrls[Symbol.iterator]();
      const updatedHTML = htmlContent.replace(/<img[^>]*src="([^"]*)"[^>]*>/g, (match, src) => {
        const { value: newSrc, done } = imgIterator.next();
        return !done ? match.replace(src, newSrc) : match;
      });
  
      console.log("Updated HTML content:", updatedHTML);
  
      // Подготовка данных для отправки статьи
      const articleData = {
        title,
        subtitle,
        content: updatedHTML,
        conclusion,
        pubDate: publishDate,
        authorId: userId,
        status: "Draft",
        mediaUrls: updatedImgUrls,
        tags,
        categories: [cid],
      };
  
      // Отправка статьи на сервер
      const response = await api.post("/articles", articleData,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log("Статья успешно добавлена:", response.data);
      alert("The article has been added successfully!");
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      alert(`Ошибка: ${error.message}`);
    }
  };
  

  return (
    <div className='w-full h-auto'>
      <PanelHeader title={'Add / New Article'}/>
      <div className='w-full h-full px-[40px]'>
        <div className={`text-[24px] font-bold ${theme?"text-[#0C1013]":"text-[#fff]"} transition-all`}>
          <p>New Article</p>
        </div>
        <form onSubmit={sendToBackend}>
          <div className={`${theme?'text-sideBarTextDark':'text-[#fff]'} transition-all mt-[5px] `}>
          <div>
          <label htmlFor="category" className='pl-[15px] flex gap-[5px] items-center'>Category <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <div className="relative mt-1">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-[300px] mt-[5px] gap-[15px] relative h-[50px] flex items-center border border-[#262E34] px-[15px] ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} rounded-[12px]`}
              >
                <span className="block truncate">{category}</span>
                <span className="absolute inset-y-0 right-[15px] flex items-center  pointer-events-none">
                <img src={chevronDown} alt="chevrodDown"  className=' cursor-pointer'/>
                </span>
              </button>

              {isOpen && (
                <ul className={`absolute w-[300px] z-[1] mt-1 ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} shadow-lg max-h-60 rounded-[12px]  text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`}>
                  {categories.map((v) => (
                    <li
                      key={v.id}
                      onClick={() => handleCategoryClick(v.name,v.id)}
                      className={`cursor-pointer select-none h-[50px]  flex items-center px-[15px] ${
                      category === v.name ? `${theme?'bg-sideBarTextLight':'bg-[#151B1F]'}` : `${theme?'text-sideBarTextDark':'text-sideBarTextLight'}`
                      } ${theme?'hover:bg-sideBarTextLight':'hover:bg-[#151B1F]'}`}
                    >
                      <span className="block truncate">{v.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="tags" className='pl-[15px] mt-[15px] flex gap-[5px] items-center'>Tags <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
              <div className="flex flex-col mt-[5px]">
              <input
                  type="text"
                  className="w-[300px] outline-none border h-[50px] border-[#262E34] px-[15px] bg-bgMode transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} rounded-[12px]"
                  placeholder="Введите тег и нажмите Enter"
                  value={input}
                  id='tags'
                  maxLength={30}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleAddTag}
                />
                <div className='flex flex-wrap gap-2 mt-[15px] bg-bgMode rounded-[8px] p-2 min-h-[54px] w-[300px]'>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center bg-pageMode justify-center text-textMode px-2 gap-1 py-1 rounded-lg"
                  >
                    {tag}
                    <button
                      type="button"
                      className=" text-[20px] text-[red] hover:text-red-900"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
                </div>

              </div>
            </div>
            {/* Поле для ввода даты публикации */}
            <div className={`${theme?'text-sideBarTextDark':'text-[#fff]'} mt-[15px] transition-all`}>
              <label htmlFor="publishDate" className='pl-[15px] flex gap-[5px] mb-[5px] items-center'>Pub Date <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
              <input
                type="date"
                id="publishDate"
                required
                min={minDate}
                className={`w-[300px] outline-none border h-[50px] border-[#262E34] px-[15px] ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} rounded-[12px]`}
                onChange={(e) => newDate(e)} // Установка даты публикации
              />
            </div>

          </div>
          </div>
          {/* Poster */}
          <div className={`${theme?'text-sideBarTextDark':'text-[#fff]'} mt-[15px] flex items-end flex-wrap gap-5 transition-all`}>
            <div className='max-w-[512px] w-full'>
            <label htmlFor="poster" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Poster <span className='text-[#FF8F00] text-[14px] '>(16:9)</span> <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <label htmlFor="poster" style={{backgroundImage: poster ? `url(${poster})` : `url(${theme?white_pattern:pattern})`}} className={` w-full cursor-pointer h-[288px] bg-cover bg-no-repeat bg-center flex justify-center items-center rounded-[12px] border border-[#262E34]`}>
              <input type="file" id='poster' accept='image/*' required onChange={handleImageUpload} name='poster' className=' w-0 h-0'/>
              <svg className={poster?"hidden":""} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45.8334 14.0625C46.6963 14.0625 47.3959 13.3629 47.3959 12.5C47.3959 11.6371 46.6963 10.9375 45.8334 10.9375V14.0625ZM29.1667 10.9375C28.3038 10.9375 27.6042 11.6371 27.6042 12.5C27.6042 13.3629 28.3038 14.0625 29.1667 14.0625V10.9375ZM39.0625 4.16666C39.0625 3.30372 38.3629 2.60416 37.5 2.60416C36.6371 2.60416 35.9375 3.30372 35.9375 4.16666H39.0625ZM35.9375 20.8333C35.9375 21.6962 36.6371 22.3958 37.5 22.3958C38.3629 22.3958 39.0625 21.6962 39.0625 20.8333H35.9375ZM45.8334 10.9375H37.5V14.0625H45.8334V10.9375ZM37.5 10.9375H29.1667V14.0625H37.5V10.9375ZM35.9375 4.16666V12.5H39.0625V4.16666H35.9375ZM35.9375 12.5V20.8333H39.0625V12.5H35.9375Z" fill={theme?"#0C1013":"#FFFFFF"}/>
              <path d="M23.9584 6.25C14.6285 6.25 9.96354 6.25 7.0651 9.14842C4.16669 12.0469 4.16669 16.7118 4.16669 26.0417C4.16669 35.3715 4.16669 40.0365 7.0651 42.935C9.96354 45.8333 14.6285 45.8333 23.9584 45.8333C33.2881 45.8333 37.9531 45.8333 40.8517 42.935C43.75 40.0365 43.75 35.3715 43.75 26.0417V25" stroke={theme?"#0C1013":"#FFFFFF"} strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4.16669 29.4488C5.45631 29.2615 6.7601 29.169 8.06608 29.1723C13.591 29.0554 18.9805 30.7769 23.2731 34.0296C27.2542 37.0461 30.0515 41.1977 31.25 45.8333" stroke={theme?"#0C1013":"#FFFFFF"} strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M43.75 35.2006C41.3013 33.9604 38.7683 33.331 36.2212 33.3337C32.3635 33.3185 29.1698 33.7986 25.625 36.5625" stroke={theme?"#0C1013":"#FFFFFF"} strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </label>
            </div>
            <div className='max-w-[512px] w-full'>
              {poster && (
                <div className="relative w-full h-[288px] rounded-[12px] overflow-hidden">
                <Cropper
                  image={poster}
                  crop={crop}
                  zoom={zoom}
                  aspect={16 / 9} // Пропорции обрезки 1:1
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
                </div>
              )}
           </div>          
           <div className='max-w-[512px] w-full'>
              {poster && (
                <div className="flex w-full relative h-[288px] canvased">
                  <canvas ref={previewCanvasRef} className="w-full h-full rounded-[12px] border border-[#262E34]" />
                </div>
              )}
           </div>
          </div>
          <div className={` max-w-[1280px] w-full ${theme?'text-sideBarTextDark':'text-[#fff]'} mt-[15px] transition-all`}>
          <label htmlFor="title" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Title <span className='text-[#FF8F00] text-[14px] '>(100)</span> <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <input
              type="text"
              maxLength="100"
              value={title}
              id='title'
              placeholder='Enter asset title'
              onChange={(e) => setTitle(e.target.value)}
              required
              className={`w-full outline-none border h-[50px] border-[#262E34] px-[15px] ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} rounded-[12px]`}
            />
          </div>
          <div className={` max-w-[1280px] w-full ${theme?'text-sideBarTextDark':'text-[#fff]'} mt-[15px] transition-all`}>
          <label htmlFor="subtitle" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Subtitle <span className='text-[#FF8F00] text-[14px] '>(200)</span> <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <input
              type="text"
              maxLength="200"
              value={subtitle}
              id='subtitle'
              placeholder='Enter asset subtitle'
              onChange={(e) => setSubtitle(e.target.value)}
              required
              className={`w-full outline-none border h-[50px] border-[#262E34] px-[15px] ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} rounded-[12px]`}
            />
          </div>
          <div className={`mt-[15px] ${theme?'text-sideBarTextDark':'text-[#fff]'} transition-all`}>
          <label htmlFor="" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Main Content <span className='text-[#FF8F00] text-[14px] '>(unlimited)</span> <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
          <div className={`w-full max-w-[1280px] `}>
            <div className={`border flex flex-wrap gap-1 border-b-0 cursor-pointer h-auto border-[#262E34] ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} rounded-t-[12px] overflow-hidden`}>
              <button form="" className={` w-[40px] flex justify-center items-center h-[40px]`} onClick={() => toggleInlineStyle('BOLD')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.315 19.5C15.474 19.5 17.433 17.8695 17.433 15.2655C17.433 13.3065 15.957 11.841 13.947 11.6865V11.604C14.7168 11.4881 15.4198 11.1009 15.9292 10.5123C16.4386 9.9237 16.7208 9.17242 16.725 8.394C16.725 6.129 14.982 4.704 12.204 4.704H5.76453V19.5H12.315ZM8.86203 7.011H11.406C12.8505 7.011 13.6815 7.6875 13.6815 8.877C13.6815 10.128 12.738 10.857 11.0865 10.857H8.86203V7.011ZM8.86203 17.193V12.897H11.457C13.2825 12.897 14.277 13.635 14.277 15.0195C14.277 16.434 13.3125 17.193 11.529 17.193H8.86203Z" fill={theme?"#0C1013":"#FFFFFF"}/>
                </svg>
              </button>
              <button form="" className={` w-[40px] flex justify-center items-center h-[40px]`} onClick={() => toggleInlineStyle('ITALIC')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9865 17.511L14.295 6.6825C14.4795 5.79 14.664 5.6175 16.3155 5.472L16.4805 4.692H10.8165L10.6515 5.472C12.2415 5.616 12.3435 5.79 12.159 6.6825L9.85502 17.511C9.67052 18.4035 9.48602 18.576 7.83602 18.72L7.67102 19.5H13.332L13.497 18.72C11.907 18.5775 11.802 18.4035 11.9865 17.511Z" fill={theme?"#0C1013":"#FFFFFF"}/>
                </svg>
              </button>
              <button form="" className={` w-[40px] flex justify-center items-center h-[40px]`} onClick={() => toggleInlineStyle('UNDERLINE')}>
                <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.41733 0H0.777334V8.63655C0.777334 11.4754 2.73733 13.5226 6 13.5226C9.26267 13.5226 11.2227 11.4754 11.2227 8.63655V0H9.58267V8.52731C9.58267 10.5367 8.27867 11.9933 6 11.9933C3.72133 11.9933 2.41733 10.5367 2.41733 8.52731V0ZM12 16H0V14.6514H12V16Z" fill={theme?"#0C1013":"#FFFFFF"}/>
                </svg>
              </button>
              <button form="" className={` w-[40px] flex justify-center items-center h-[40px]`} onClick={() => toggleInlineStyle('STRIKETHROUGH')}>
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.61857 4.2606C7.61857 4.74725 7.73714 5.17269 8.00429 5.53846H5.95143C5.85474 5.14977 5.80716 4.74831 5.81 4.34537C5.81 1.79121 7.86143 0 10.7814 0C13.5943 0 15.6243 1.84458 15.7029 4.4741H13.9457C13.7886 2.77865 12.5686 1.73783 10.7314 1.73783C8.97429 1.73783 7.61714 2.68289 7.61714 4.2606H7.61857ZM10.7529 16C7.67714 16 5.62571 14.2622 5.46 11.5887H7.21714C7.42286 13.2527 8.83 14.2622 10.8514 14.2622C12.7657 14.2622 14.1514 13.1554 14.1514 11.6327C14.1514 10.3344 13.37 9.47567 11.4171 9.00314L10.0657 8.67818H0V7.10832H20V8.67818H14.9943C15.6629 9.36421 15.9586 10.2386 15.9586 11.3422C15.9586 14.2088 13.9071 16 10.7529 16Z" fill={theme?"#0C1013":"#FFFFFF"}/>
                </svg>
              </button>
              <button form="" className={` w-[40px] flex justify-center items-center h-[40px]`} onClick={() => toggleBlockType('blockquote')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.75 12H18V9C18 7.34531 19.3453 6 21 6H21.375C21.9984 6 22.5 5.49844 22.5 4.875V2.625C22.5 2.00156 21.9984 1.5 21.375 1.5H21C16.8562 1.5 13.5 4.85625 13.5 9V20.25C13.5 21.4922 14.5078 22.5 15.75 22.5H21.75C22.9922 22.5 24 21.4922 24 20.25V14.25C24 13.0078 22.9922 12 21.75 12ZM8.25 12H4.5V9C4.5 7.34531 5.84531 6 7.5 6H7.875C8.49844 6 9 5.49844 9 4.875V2.625C9 2.00156 8.49844 1.5 7.875 1.5H7.5C3.35625 1.5 0 4.85625 0 9V20.25C0 21.4922 1.00781 22.5 2.25 22.5H8.25C9.49219 22.5 10.5 21.4922 10.5 20.25V14.25C10.5 13.0078 9.49219 12 8.25 12Z" fill={theme?"#0C1013":"#FFFFFF"}/>
                </svg> 
              </button>
              <button form="" className={` w-[40px] flex justify-center items-center transition-all h-[40px]`} onClick={() => toggleBlockType('unordered-list-item')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.5 17.25C7.5 17.0511 7.57902 16.8603 7.71967 16.7197C7.86032 16.579 8.05109 16.5 8.25 16.5H21.75C21.9489 16.5 22.1397 16.579 22.2803 16.7197C22.421 16.8603 22.5 17.0511 22.5 17.25C22.5 17.4489 22.421 17.6397 22.2803 17.7803C22.1397 17.921 21.9489 18 21.75 18H8.25C8.05109 18 7.86032 17.921 7.71967 17.7803C7.57902 17.6397 7.5 17.4489 7.5 17.25ZM7.5 11.25C7.5 11.0511 7.57902 10.8603 7.71967 10.7197C7.86032 10.579 8.05109 10.5 8.25 10.5H21.75C21.9489 10.5 22.1397 10.579 22.2803 10.7197C22.421 10.8603 22.5 11.0511 22.5 11.25C22.5 11.4489 22.421 11.6397 22.2803 11.7803C22.1397 11.921 21.9489 12 21.75 12H8.25C8.05109 12 7.86032 11.921 7.71967 11.7803C7.57902 11.6397 7.5 11.4489 7.5 11.25ZM7.5 5.25C7.5 5.05109 7.57902 4.86032 7.71967 4.71967C7.86032 4.57902 8.05109 4.5 8.25 4.5H21.75C21.9489 4.5 22.1397 4.57902 22.2803 4.71967C22.421 4.86032 22.5 5.05109 22.5 5.25C22.5 5.44891 22.421 5.63968 22.2803 5.78033C22.1397 5.92098 21.9489 6 21.75 6H8.25C8.05109 6 7.86032 5.92098 7.71967 5.78033C7.57902 5.63968 7.5 5.44891 7.5 5.25ZM3 6.75C3.39782 6.75 3.77936 6.59196 4.06066 6.31066C4.34196 6.02936 4.5 5.64782 4.5 5.25C4.5 4.85218 4.34196 4.47064 4.06066 4.18934C3.77936 3.90804 3.39782 3.75 3 3.75C2.60218 3.75 2.22064 3.90804 1.93934 4.18934C1.65804 4.47064 1.5 4.85218 1.5 5.25C1.5 5.64782 1.65804 6.02936 1.93934 6.31066C2.22064 6.59196 2.60218 6.75 3 6.75ZM3 12.75C3.39782 12.75 3.77936 12.592 4.06066 12.3107C4.34196 12.0294 4.5 11.6478 4.5 11.25C4.5 10.8522 4.34196 10.4706 4.06066 10.1893C3.77936 9.90804 3.39782 9.75 3 9.75C2.60218 9.75 2.22064 9.90804 1.93934 10.1893C1.65804 10.4706 1.5 10.8522 1.5 11.25C1.5 11.6478 1.65804 12.0294 1.93934 12.3107C2.22064 12.592 2.60218 12.75 3 12.75ZM3 18.75C3.39782 18.75 3.77936 18.592 4.06066 18.3107C4.34196 18.0294 4.5 17.6478 4.5 17.25C4.5 16.8522 4.34196 16.4706 4.06066 16.1893C3.77936 15.908 3.39782 15.75 3 15.75C2.60218 15.75 2.22064 15.908 1.93934 16.1893C1.65804 16.4706 1.5 16.8522 1.5 17.25C1.5 17.6478 1.65804 18.0294 1.93934 18.3107C2.22064 18.592 2.60218 18.75 3 18.75Z" fill={theme?"#0C1013":"#FFFFFF"}/>
                </svg> 
              </button>
              <button form="" className={` w-[40px] flex justify-center items-center transition-all h-[40px]`} onClick={() => toggleBlockType('ordered-list-item')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.5 17.25C7.5 17.0511 7.57902 16.8603 7.71967 16.7197C7.86032 16.579 8.05109 16.5 8.25 16.5H21.75C21.9489 16.5 22.1397 16.579 22.2803 16.7197C22.421 16.8603 22.5 17.0511 22.5 17.25C22.5 17.4489 22.421 17.6397 22.2803 17.7803C22.1397 17.921 21.9489 18 21.75 18H8.25C8.05109 18 7.86032 17.921 7.71967 17.7803C7.57902 17.6397 7.5 17.4489 7.5 17.25ZM7.5 11.25C7.5 11.0511 7.57902 10.8603 7.71967 10.7197C7.86032 10.579 8.05109 10.5 8.25 10.5H21.75C21.9489 10.5 22.1397 10.579 22.2803 10.7197C22.421 10.8603 22.5 11.0511 22.5 11.25C22.5 11.4489 22.421 11.6397 22.2803 11.7803C22.1397 11.921 21.9489 12 21.75 12H8.25C8.05109 12 7.86032 11.921 7.71967 11.7803C7.57902 11.6397 7.5 11.4489 7.5 11.25ZM7.5 5.25C7.5 5.05109 7.57902 4.86032 7.71967 4.71967C7.86032 4.57902 8.05109 4.5 8.25 4.5H21.75C21.9489 4.5 22.1397 4.57902 22.2803 4.71967C22.421 4.86032 22.5 5.05109 22.5 5.25C22.5 5.44891 22.421 5.63968 22.2803 5.78033C22.1397 5.92098 21.9489 6 21.75 6H8.25C8.05109 6 7.86032 5.92098 7.71967 5.78033C7.57902 5.63968 7.5 5.44891 7.5 5.25Z" fill={theme?"#0C1013":"#FFFFFF"}/>
                  <path d="M2.5695 17.7975V17.0865H3C3.3255 17.0865 3.5445 16.881 3.5445 16.611C3.5445 16.3335 3.3075 16.146 3.003 16.146C2.6685 16.146 2.4525 16.374 2.4435 16.611H1.5585C1.5825 15.9105 2.118 15.4305 3.0375 15.4305C3.9195 15.4275 4.4685 15.867 4.473 16.485C4.47584 16.697 4.40314 16.903 4.26792 17.0663C4.1327 17.2295 3.94379 17.3393 3.735 17.376V17.4255C3.97171 17.4432 4.19251 17.5514 4.35148 17.7277C4.51044 17.904 4.59533 18.1347 4.5885 18.372C4.593 19.1715 3.8355 19.572 3.012 19.572C2.028 19.572 1.512 19.017 1.5 18.381H2.373C2.385 18.648 2.652 18.84 3.006 18.8445C3.387 18.8445 3.642 18.627 3.639 18.3195C3.636 18.027 3.4065 17.7975 3.018 17.7975H2.568H2.5695ZM2.5635 10.749H1.6575V10.6965C1.6575 10.0845 2.1 9.43051 3.0945 9.43051C3.969 9.43051 4.5345 9.91951 4.5345 10.5645C4.5345 11.148 4.149 11.49 3.8205 11.8365L3.015 12.6945V12.7395H4.596V13.5H1.7145V12.9075L3.15 11.4225C3.357 11.2095 3.5895 10.9665 3.5895 10.6605C3.5895 10.3905 3.369 10.1805 3.0765 10.1805C3.00897 10.178 2.94166 10.1894 2.87869 10.2139C2.81573 10.2385 2.75845 10.2756 2.71039 10.3231C2.66233 10.3706 2.62451 10.4274 2.59924 10.4901C2.57398 10.5528 2.56182 10.62 2.5635 10.6875V10.749ZM3.846 7.50001H2.8935V4.38601H2.847L1.95 5.01601V4.16551L2.8935 3.50101H3.846V7.50001Z" fill={theme?"#0C1013":"#FFFFFF"}/>
                </svg> 
              </button>
              <button form="" className={` w-[40px] flex justify-center items-center h-[40px]`} onClick={promptForLink}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.07248 9.813L5.01448 11.871C4.1705 12.715 3.69635 13.8597 3.69635 15.0532C3.69635 16.2468 4.1705 17.3915 5.01448 18.2355C5.85847 19.0795 7.00316 19.5536 8.19673 19.5536C9.39031 19.5536 10.535 19.0795 11.379 18.2355L14.121 15.492C14.6299 14.983 15.0093 14.3593 15.2274 13.6733C15.4454 12.9873 15.4957 12.259 15.374 11.5496C15.2524 10.8402 14.9623 10.1702 14.5281 9.59611C14.094 9.02197 13.5284 8.56035 12.879 8.25L12 9.129C11.9107 9.21838 11.8331 9.31867 11.769 9.4275C12.2708 9.57175 12.7262 9.84447 13.0903 10.2187C13.4544 10.5929 13.7145 11.0557 13.845 11.5612C13.9754 12.0668 13.9717 12.5976 13.8341 13.1013C13.6965 13.6049 13.4298 14.064 13.0605 14.433L10.32 17.175C9.75706 17.7379 8.99357 18.0542 8.19748 18.0542C7.40139 18.0542 6.6379 17.7379 6.07498 17.175C5.51206 16.6121 5.19581 15.8486 5.19581 15.0525C5.19581 14.2564 5.51206 13.4929 6.07498 12.93L7.26448 11.742C7.09618 11.1132 7.03134 10.4627 7.07248 9.813Z" fill={theme?"#0C1013":"#FFFFFF"}/>
                  <path d="M9.87901 7.00801C9.37007 7.51702 8.99066 8.1407 8.77263 8.82669C8.55459 9.51267 8.5043 10.241 8.62597 10.9504C8.74764 11.6599 9.03772 12.3298 9.47187 12.9039C9.90601 13.478 10.4715 13.9397 11.121 14.25L12.2835 13.086C11.7749 12.9496 11.3112 12.6817 10.939 12.3093C10.5667 11.9369 10.299 11.4731 10.1628 10.9644C10.0266 10.4558 10.0267 9.92028 10.163 9.41168C10.2994 8.90308 10.5672 8.43932 10.9395 8.06701L13.68 5.32501C14.2429 4.76208 15.0064 4.44584 15.8025 4.44584C16.5986 4.44584 17.3621 4.76208 17.925 5.32501C18.4879 5.88793 18.8042 6.65142 18.8042 7.44751C18.8042 8.2436 18.4879 9.00708 17.925 9.57001L16.7355 10.758C16.9035 11.388 16.968 12.0405 16.9275 12.6885L18.9855 10.6305C19.8295 9.78652 20.3036 8.64183 20.3036 7.44826C20.3036 6.25468 19.8295 5.10999 18.9855 4.26601C18.1415 3.42202 16.9968 2.94788 15.8033 2.94788C14.6097 2.94788 13.465 3.42202 12.621 4.26601L9.87901 7.00801Z" fill={theme?"#0C1013":"#FFFFFF"}/>
                </svg>
              </button>
              {/* <button className={` w-[40px] h-[40px]`} onClick={promptForImage}>
                Img
              </button> */}
              <button form="" className={` w-[40px] flex justify-center items-center h-[40px]`} onClick={removeLink}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6 13.4C10.7444 13.5926 10.8145 13.8308 10.7975 14.0709C10.7804 14.311 10.6773 14.5369 10.5071 14.7071C10.3369 14.8773 10.111 14.9804 9.87086 14.9975C9.63075 15.0146 9.39254 14.9444 9.19997 14.8C8.72166 14.3511 8.34044 13.8089 8.07984 13.2069C7.81924 12.605 7.68478 11.956 7.68478 11.3C7.68478 10.644 7.81924 9.99503 8.07984 9.39305C8.34044 8.79108 8.72166 8.2489 9.19997 7.8L12.7 4.2C13.6515 3.27751 14.9247 2.76163 16.25 2.76163C17.5752 2.76163 18.8485 3.27751 19.8 4.2C20.7225 5.1515 21.2383 6.42473 21.2383 7.75C21.2383 9.07527 20.7225 10.3485 19.8 11.3L18.3 12.8C18.3213 11.9818 18.1855 11.1671 17.9 10.4L18.4 9.9C18.934 9.31128 19.2298 8.54486 19.2298 7.75C19.2298 6.95514 18.934 6.18873 18.4 5.6C17.8112 5.06595 17.0448 4.77013 16.25 4.77013C15.4551 4.77013 14.6887 5.06595 14.1 5.6L10.6 9.2C10.3156 9.47086 10.0892 9.79665 9.93445 10.1576C9.77974 10.5186 9.69997 10.9073 9.69997 11.3C9.69997 11.6927 9.77974 12.0814 9.93445 12.4424C10.0892 12.8034 10.3156 13.1291 10.6 13.4ZM16.2 13.7C16.3733 12.8928 16.3355 12.0546 16.0903 11.2664C15.845 10.4781 15.4006 9.76637 14.8 9.2C14.6074 9.05557 14.3692 8.98545 14.1291 9.00252C13.889 9.01958 13.6631 9.12268 13.4929 9.2929C13.3227 9.46311 13.2196 9.689 13.2025 9.92911C13.1854 10.1692 13.2555 10.4074 13.4 10.6C13.6844 10.8709 13.9108 11.1967 14.0655 11.5576C14.2202 11.9186 14.3 12.3073 14.3 12.7C14.3 13.0927 14.2202 13.4814 14.0655 13.8424C13.9108 14.2034 13.6844 14.5291 13.4 14.8L9.89997 18.4C9.31124 18.934 8.54483 19.2299 7.74997 19.2299C6.95511 19.2299 6.1887 18.934 5.59997 18.4C5.06592 17.8113 4.7701 17.0449 4.7701 16.25C4.7701 15.4551 5.06592 14.6887 5.59997 14.1L6.09997 13.7C5.82204 12.8963 5.68667 12.0503 5.69997 11.2L4.19997 12.7C3.27748 13.6515 2.7616 14.9247 2.7616 16.25C2.7616 17.5753 3.27748 18.8485 4.19997 19.8C5.15147 20.7225 6.4247 21.2384 7.74997 21.2384C9.07524 21.2384 10.3485 20.7225 11.3 19.8L13.1 18C13.2528 17.0937 13.6119 16.2346 14.1493 15.4891C14.6868 14.7435 15.3884 14.1314 16.2 13.7ZM21.1 15.5L19 17.6L16.9 15.5L15.5 16.9L17.6 19L15.5 21.1L16.9 22.5L19 20.4L21.1 22.5L22.5 21.1L20.4 19L22.5 16.9L21.1 15.5Z" fill={theme?"#0C1013":"#FFFFFF"}/>
                </svg>
              </button>
              <input type="file" ref={fileInputRef} multiple accept="image/jpeg,image/png,image/gif,image/webp" onChange={handleImageUploade} style={{ display: 'none' }} />
              <button form="" className={` w-[40px] flex justify-center items-center h-[40px]`} onClick={() => fileInputRef.current.click()}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2131_56)">                  
                  <path d="M6.75299 13.5C7.34973 13.5 7.92202 13.2629 8.34398 12.841C8.76594 12.419 9.00299 11.8467 9.00299 11.25C9.00299 10.6533 8.76594 10.081 8.34398 9.65901C7.92202 9.23705 7.34973 9 6.75299 9C6.15625 9 5.58396 9.23705 5.162 9.65901C4.74004 10.081 4.50299 10.6533 4.50299 11.25C4.50299 11.8467 4.74004 12.419 5.162 12.841C5.58396 13.2629 6.15625 13.5 6.75299 13.5Z" fill={theme?"#0C1013":"#FFFFFF"}/>
                  <path d="M21.003 19.5C21.003 20.2956 20.6869 21.0587 20.1243 21.6213C19.5617 22.1839 18.7986 22.5 18.003 22.5H3.00299C2.20734 22.5 1.44428 22.1839 0.88167 21.6213C0.319061 21.0587 0.00299072 20.2956 0.00299072 19.5V7.5C0.00299033 6.70487 0.318649 5.94226 0.88061 5.37974C1.44257 4.81722 2.20486 4.5008 2.99999 4.5C2.99999 3.70435 3.31606 2.94129 3.87867 2.37868C4.44128 1.81607 5.20434 1.5 5.99999 1.5H21C21.7956 1.5 22.5587 1.81607 23.1213 2.37868C23.6839 2.94129 24 3.70435 24 4.5V16.5C24 17.2951 23.6843 18.0577 23.1224 18.6203C22.5604 19.1828 21.7981 19.4992 21.003 19.5ZM21 3H5.99999C5.60217 3 5.22064 3.15804 4.93933 3.43934C4.65803 3.72064 4.49999 4.10218 4.49999 4.5H18.003C18.7986 4.5 19.5617 4.81607 20.1243 5.37868C20.6869 5.94129 21.003 6.70435 21.003 7.5V18C21.4003 17.9992 21.7811 17.8408 22.0617 17.5596C22.3424 17.2784 22.5 16.8973 22.5 16.5V4.5C22.5 4.10218 22.342 3.72064 22.0607 3.43934C21.7793 3.15804 21.3978 3 21 3ZM3.00299 6C2.60517 6 2.22364 6.15804 1.94233 6.43934C1.66103 6.72064 1.50299 7.10218 1.50299 7.5V19.5L5.47199 15.969C5.59459 15.8468 5.75566 15.7709 5.9279 15.7539C6.10013 15.737 6.27293 15.7801 6.41699 15.876L10.407 18.5355L15.972 12.9705C16.0832 12.8592 16.2267 12.7856 16.382 12.7603C16.5373 12.735 16.6967 12.7592 16.8375 12.8295L19.503 15.75V7.5C19.503 7.10218 19.345 6.72064 19.0637 6.43934C18.7823 6.15804 18.4008 6 18.003 6H3.00299Z" fill={theme?"#0C1013":"#FFFFFF"}/>
                  </g>
                  <defs>
                  <clipPath id="clip0_2131_56">
                  <rect width="24" height="24" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
              </button>
              <button form="" onClick={() => toggleBlockTypes('header-six')} className={` w-[50px] h-[40px]`}>12px</button>
              <button form="" onClick={() => toggleBlockTypes('header-five')} className={` w-[50px] h-[40px]`}>14px</button>
              <button form="" onClick={() => toggleBlockTypes('header-four')} className={` w-[50px] h-[40px]`}>16px</button>
              <button form="" onClick={() => toggleBlockTypes('header-three')} className={` w-[50px] h-[40px]`}>18px</button>
              <button form="" onClick={() => toggleBlockTypes('header-two')} className={` w-[50px] h-[40px]`}>20px</button>
              <button form="" onClick={() => toggleBlockTypes('header-one')} className={` w-[50px] h-[40px]`}>24px</button>
              <button form="" className='w-[60px] h-[40px] text-[#0C1013] bg-sideBarTextLight'>{fontSize}px</button>
            </div>
            <div className={`w-full outline-none border overflow-hidden min-h-[200px] h-auto border-[#262E34] p-[15px] ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} rounded-b-[12px]`}>
              <Editor
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={setEditorState}
                blockRendererFn={blockRendererFn}
              />
            </div>
          </div>
          </div>
          <div className={` max-w-[1280px] w-full ${theme?'text-sideBarTextDark':'text-[#fff]'} mt-[15px] transition-all`}>
          <label htmlFor="conclusion" className='pl-[15px] flex gap-[5px] mb-[10px] items-center'>Conclusion <span className='text-[#FF8F00] text-[14px] '>(500)</span> <span className='text-[#FF3C00] text-[14px] '>(required)</span></label>
            <textarea
              type="text"
              maxLength="500"
              minLength="100"
              value={conclusion}
              id='conclusion'
              placeholder='Enter asset conclusion'
              onChange={(e) => setConclusion(e.target.value)}
              required
              className={`w-full outline-none border min-h-[150px] max-w- border-[#262E34] p-[15px] ${theme?'bg-sideBarLight':'bg-sideBarDark'} transition-all ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} rounded-[12px]`}
            ></textarea>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white" type='submit'>
            Отправить
          </button>
        </form>
        <div className='mt-[15px]'>
        <label htmlFor="subtitle" className='pl-[15px] text-textMode flex gap-[5px] mb-[10px] items-center'>Preview <span className='text-[#FF8F00] text-[14px] '>(click and watch demo)</span></label>
          <DemoCard pubDate={publishDate} title={title} subtitle={subtitle} categories={category} poster={croppedImage} main={getContentAsHTML()}/>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default AddArticlePage


