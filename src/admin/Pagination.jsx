import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';

const Pagination = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {theme} = useContext(AdminContext)
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 10;

    // Если текущая страница - первая
    if (currentPage < 5 && totalPages > 14) {
      for (let i = 1; i <= 5; i++) {
        pages.push(
          <button
            key={i}
            className={`w-[50px] h-[50px] ${
              currentPage === i ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarTextLight':'bg-[#151B1F]'}  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
            }`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
      if(currentPage > 0){
        pages.push(<span key="dots" className={`flex items-center justify-center border-2 w-[50px] h-[50px] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all  `} >...</span>);
      }
      for (let i = totalPages - 4; i <= totalPages; i++) {
        if (i > currentPage + 1) {
          pages.push(
            <button
              key={i}
              className={`w-[50px] h-[50px] ${
                currentPage === i ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarTextLight':'bg-[#151B1F]'}  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
              }`}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </button>
          );
        }
      }
    } 
    // Если текущая страница между 4 и 22
    else if (currentPage >= 5 && currentPage <= totalPages - 7 && totalPages > 14) {
      pages.push(
        <button
          key={1}
          className={`w-[50px] h-[50px] ${
            currentPage === 1 ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarTextLight':'bg-[#151B1F]'}  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
          }`}
          onClick={() => handlePageClick(1)}
        >
          1
        </button>
      );
      if (currentPage > 4) {
        pages.push(<span key="dots-left"  className={`flex items-center justify-center border-2 w-[50px] h-[50px] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all  `}>...</span>);
      }

      for (let i = currentPage - 2 ; i <= currentPage + 1; i++) {
        if (i > 2 && i < totalPages) {
          pages.push(
            <button
              key={i}
              className={`w-[50px] h-[50px] ${
                currentPage === i ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarTextLight':'bg-[#151B1F]'}  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
              }`}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </button>
          );
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push(<span key="dots" className={` border-2 flex items-center justify-center w-[50px] h-[50px] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all `}>...</span>);
      }
      

      for (let i = totalPages - 4; i <= totalPages; i++) {
        if (i > 5) {
          pages.push(
            <button
              key={i}
              className={`w-[50px] h-[50px] ${
                currentPage === i ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarTextLight':'bg-[#151B1F]'}  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
              }`}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </button>
          );
        }
      }
    } 
    // dfhvogfvouygwefouv
    else if (currentPage > totalPages - 7 && currentPage < totalPages - 2 && totalPages > 14) {
      for (let i = 1; i <= 5; i++) {
        pages.push(
          <button
            key={i}
            className={`w-[50px] h-[50px] ${
              currentPage === i ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarTextLight':'bg-[#151B1F]'}  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
            }`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }

      if (currentPage > 4) {
        pages.push(<span key="dots-left" className={` w-[50px] flex items-center justify-center h-[50px] border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all `}>...</span>);
      }

      for (let i = currentPage - 2 ; i <= currentPage + 1; i++) {
        if (i > currentPage - 3 && i < totalPages - 1) {
          pages.push(
            <button
              key={i}
              className={`w-[50px] h-[50px] ${
                currentPage === i ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarTextLight':'bg-[#151B1F]'}  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
              }`}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </button>
          );
        }
      }

      if (currentPage <= totalPages - 2) {
        pages.push(<span key="dots" className={`w-[50px] h-[50px] flex items-center justify-center border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all  `}>...</span>);
      }
          pages.push(
            <button
              key={totalPages}
              className={`w-[50px] h-[50px] ${
                currentPage === totalPages ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarTextLight':'bg-[#151B1F]'}  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
              }`}
              onClick={() => handlePageClick(totalPages)}
            >
              {totalPages}
            </button>
          );
    } 
    // Если текущая страница - последняя
    else if (currentPage <= totalPages && currentPage > totalPages - 3 && totalPages > 14 ) {
      for (let i = 1; i <= 5; i++) {
        pages.push(
          <button
            key={i}
            className={`w-[50px] h-[50px] ${
              currentPage === i ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarTextLight':'bg-[#151B1F]'}  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
            }`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
      if (totalPages > 4) {
        pages.push(<span key="dots-left" className={`w-[50px] h-[50px] flex items-center justify-center border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all `}>...</span>);
      }
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`w-[50px] h-[50px] ${
              currentPage === i ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarTextLight':'bg-[#151B1F]'}  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
            }`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`w-[50px] h-[50px] ${
              currentPage === i ? ` border-2 border-[#262E34] ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarTextLight':'bg-[#151B1F]'}  transition-all` : ` border-2 ${theme?'text-sideBarTextDark':'text-white'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} border-[#262E34] transition-all ${theme?'hover:bg-sideBarLight':'hover:bg-[#151B1F]'} `
            }`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex w-auto items-center h-[78px] mt-2 gap-1 ">
      <button disabled={currentPage == 1} onClick={()=>handlePageClick(1)} className={`w-[127px] text-[#88919D] h-[50px] ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'}   ${currentPage == 1?"cursor-not-allowed":""}`}>
        First
      </button>
      {renderPageNumbers()}
      <button disabled={currentPage == totalPages} onClick={()=>handlePageClick(totalPages)} className={` w-[127px] text-[#88919D] h-[50px]  ${theme?'text-sideBarTextDark':'text-sideBarTextLight'} transition-all ${theme?'bg-sideBarLight':'bg-[#262E34]'} ${currentPage == totalPages?"cursor-not-allowed":""}`}>
        Last
      </button>
      <div>
        <p className='text-[#88919D]'>Total: <span className='text-textMode'>200</span></p>
      </div>
    </div>
  );
};


export default Pagination