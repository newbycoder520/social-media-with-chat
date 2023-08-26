import React, {useState} from 'react'
import './index.css'
import ReactPlayer from 'react-player'

const VideoPost2 = () => {
    // for onChange event
    const [youtubeVideo, setYoutubeVideo] = useState('./assets/videoplaceholder.jpg');
    // for submit event
    const [youtubeURL, setYoutubeURL] = useState('./assets/videoplaceholder.jpg');
    // for error msg
    const [youtubeError, setYoutubeError] = useState('');
    const handleYoutubeChange = (e) => {
        setYoutubeVideo(e.target.value);
    }

    const handleYoutubeSubmit = (e) => {
        e.preventDefault();
        const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
        if (youtubeRegex.test(youtubeVideo)) {
            setYoutubeURL(youtubeVideo);
            setYoutubeError('');
        }
        else {
            setYoutubeError('Invalid youtube URL');
        }
    }

  return (
    <div className='wrapper'>
          <form className='form-group form'
              onSubmit={handleYoutubeSubmit}>
              <input type='text' className='form-control'
                  placeholder='Enter youtube URL' required
                  onChange={handleYoutubeChange}
              />
              <button type='submit' className='btn btn-success btn-md'>
                  UPLOAD
              </button>
          </form>
          {youtubeError&&<div className='error-msg'>{youtubeError}</div>}
          <div className='youtube-box'>
              
              <ReactPlayer url= {youtubeURL}
              className='video' light='./assets/videoplaceholder.jpg' controls/>
          </div>
    </div>
  )
}

export default VideoPost2
