import { useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Upload, Download } from 'lucide-react';
import { Button } from './components/ui/button';
import opentoworkbanner from './assets/img/opentoworkbanner.png';
import domtoimage from 'dom-to-image';

function App() {
  const [file, setFile] = useState<string>();
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if there are any items in target files (avoid null)
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  const handleDownload = () => {
    const imageWrapper = imageWrapperRef;

    if (imageWrapper.current) {
      const width = imageWrapper.current.offsetWidth;
      const height = imageWrapper.current.offsetHeight;

      domtoimage.toPng(imageWrapper.current, {
        width: width,
        height: height,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'opentowork-image.png';
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Error capturing image:', error);
        });
    } else {
      console.error("Image wrapper element not found.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="custom-container">
        <div className='page-container'>
          <h1>
            Apply <span className='opentowork'>#OPENTOWORK</span> banner on any image.
          </h1>

          <div className='image-container'>
            {/* always behind everything (simply a placeholder) */}
            {!file && (
              <>
                <div className='upload-container'>
                  <Upload />
                  <h2>
                    Upload
                  </h2>
                </div>
              </>
            )}

            {/* image itself - middle in hierarchy */}
            <div className='image-wrapper' ref={imageWrapperRef}>
              <img src={file} alt="opentowork image" />
              {file && (
                <>
                  <img src={opentoworkbanner} alt="open to work banner" className='opentoworkbanneroverlay' />
                </>
              )}
            </div>

            {/* will always be on top of everything */}
            <input id='uploadInput' type='file' accept="image/*" className='cursor-wrapper' onChange={(e) => handleChange(e)}></input>
          </div>

          {file && (
            <>
              <Button onClick={handleDownload}>
                <Download />
                Download
              </Button>
            </>
          )}

          {/* bottom info: privacy policy & terms of service */}
          <div className='compliance'>
            <p>
              <a href="https://www.termsfeed.com/live/a477714c-ce02-418a-ac09-b7cd6b20aba1" target='_blank'>Terms and Conditions</a> · <a href="https://www.termsfeed.com/live/2c8f941d-633a-4f17-9db2-1fd971b768fb" target='_blank'>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
