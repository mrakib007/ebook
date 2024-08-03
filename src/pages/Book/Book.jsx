import { useState, useRef, useEffect } from 'react';
import useDataFetching from '../../hooks/useDataFetching';
import Controls from '../controlpanel/Controls';
import Pagination from '../../components/Pagination';

const Book = () => {
  const { data: book } = useDataFetching({
    queryKey: 'books',
    endPoint: '/mastering-clean-code-a-comprehensive-guide',
  });

  const bookData = book?.ebookPages?.data.map((page) => ({
    id: page?.id,
    content: page?.htmlcontent,
  }));
  console.log(bookData);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = bookData ? Math.ceil(bookData.length / 2) : 0;

  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);

  const leftPageIndex = currentPage * 2;
  const rightPageIndex = leftPageIndex + 1;

  const extractAndLogText = (htmlString) => {
    const formattedHtml = htmlString
      .replace(/<\/(div|p|li|ul|ol|h1|h2|h3|h4|h5|h6)>/g, '</$1>\n')
      .replace(/<(div|p|li|ul|ol|h1|h2|h3|h4|h5|h6)>/g, '\n<$1>')
      .replace(/<br\s*\/?>/gi, '\n');

    const plainString = formattedHtml.replace(/<[^>]+>/g, '').trim();
    const lines = plainString.split('\n').filter((line) => line.trim() !== '');

    return lines;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    stopReading(); // this will stop reading when page is changed
  };

  const readAloud = () => {
    const leftPageText = leftContainerRef.current
      ? extractAndLogText(leftContainerRef.current.innerHTML)
      : [];
    const rightPageText = rightContainerRef.current
      ? extractAndLogText(rightContainerRef.current.innerHTML)
      : [];

    const linesToRead = [...leftPageText, ...rightPageText];

    linesToRead.forEach((line) => {
      const utterance = new SpeechSynthesisUtterance(line.trim());
      utterance.rate = 1; 
      utterance.pitch = 1; 
      window.speechSynthesis.speak(utterance);
    });
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="h-screen grid grid-rows-12 md:grid-rows-12">
      {/* 10 rows for big devices, 9 rows for md and lower devices */}
      <div className="row-span-9 md:row-span-10 bg-gray-200">
        <div className="h-full flex items-center justify-center">
          <div className="flex-1 pb-4 flex justify-center">
            {bookData && leftPageIndex < bookData.length && (
              <div
                className="bg-white p-4 shadow-md rounded-lg w-[600px] h-[790px] overflow-auto"
                ref={leftContainerRef}
                dangerouslySetInnerHTML={{ __html: bookData[leftPageIndex].content }}
              />
            )}
            {bookData && rightPageIndex < bookData.length && (
              <div
                className="bg-white p-4 shadow-md rounded-lg w-[595px] h-[790px] overflow-auto"
                ref={rightContainerRef}
                dangerouslySetInnerHTML={{ __html: bookData[rightPageIndex].content }}
              />
            )}
          </div>
        </div>
      </div>

      {/* 1 row for pagination */}
      <div className="row-span-1">
        <div className="h-full flex items-center justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>

      {/* Controls section */}
      <div className="row-span-2 md:row-span-1 bg-[#FFDFCD]">
        <div className="h-full flex items-center justify-center">
          <Controls />
          <button
            onClick={readAloud}
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Read Aloud
          </button>
          <button
            onClick={stopReading}
            className="ml-4 bg-red-500 text-white py-2 px-4 rounded"
          >
            Stop Reading
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
