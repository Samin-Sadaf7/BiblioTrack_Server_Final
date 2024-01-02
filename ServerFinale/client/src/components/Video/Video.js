import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Video = () => {
    const [file, setFile] = useState(null);
    const [videos, setVideos] = useState([]);
    const user = JSON.parse(localStorage.getItem("profile"));
    const handleUpload = (e) => {
        const formData = new FormData();
        console.log(file);
        formData.append('video', file);
        console.log(user?.result?._id);
        formData.append('userId', user?.result?._id);
        axios.post('http://localhost:4000/users/uploadVideo', formData)
            .then(res => {
                console.log(res);
                setFile(null);
            })
            .catch(err => console.log(err));
        window.location.reload();
    }

    const handleDelete = (videoFilename) => {
        axios.delete('http://localhost:4000/users/deleteVideo', { data: { filename: videoFilename , userId: user?.result?._id} })
            .then(res => {
                console.log(res);
                setVideos(prevVideos => prevVideos.filter(video => video !== videoFilename));
            })
            .catch(err => console.log(err));
        window.location.reload();
    }

    useEffect(() => {
        axios.get('http://localhost:4000/users/getVideos')
            .then(res => {
                if (res.data && res.data.length > 0) {
                    console.log(res.data);
                    setVideos(res.data.map(video => video));
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <input type="file" onChange={e => setFile(e.target.files[0])}/>
            <button onClick={handleUpload}>Upload</button>
            <br/>

            {videos.length > 0 ? (
                videos.map((video, index) => (
                    <div key={index}>
                        <video width="320" height="240" controls>
                            <source src={`http://localhost:4000/${video.videoFile}`} type="video/mp4" />
                        </video>
                       {(user?.result?._id == video?.userId) && <button onClick={() => handleDelete(video.videoFile)}>Delete</button>}
                    </div>
                ))
            ) : (
                <p>No videos to show</p>
            )}
        </div>
    );
}

export default Video;
