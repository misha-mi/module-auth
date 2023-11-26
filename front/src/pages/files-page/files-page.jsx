import './files-page.sass';
import Title from '../../component/title/title';
import Button from '../../component/button/button';
import FilesItem from '../../component/files-item/files-item';
import { useEffect, useState } from 'react';
import getFiles from '../../service/getFiles';
import createFolder from '../../service/createFolder';
import Popup from '../../component/popup/popup';
import axios from 'axios';

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const [stack, setStack] = useState(['root']);
  const [path, setPath] = useState(['root']);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    getFiles('root')
      .then((res) => setFiles(res.data.files))
      .catch(console.log);
  }, []);

  const handlerOpenFolder = (parent, name) => {
    getFiles(parent)
      .then((res) => {
        setFiles(res.data.files);
        setStack((state) => [...state, parent]);
        setPath((state) => [...state, name]);
      })
      .catch(console.log);
  };

  const handlerBack = () => {
    if (stack[stack.length - 1] === 'root') return;
    getFiles(stack[stack.length - 2])
      .then((res) => {
        setFiles(res.data.files);
        setStack((state) => state.splice(0, state.length - 1));
        setPath((state) => state.splice(0, state.length - 1));
      })
      .catch(console.log);
  };

  const handlerCreateFolder = (name) => {
    createFolder({ name, parent: stack[stack.length - 1], type: 'folder' })
      .then((res) => setFiles((state) => [...state, res.data]))
      .catch(console.log);
  };

  const onPushFile = async () => {
    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('parent', stack[stack.length - 1]);
    const response = await axios.post('http://localhost:5000/auth-api/uploadFile', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent);
        const totalLength = progressEvent.event.lengthComputable
          ? progressEvent.event.total
          : progressEvent.event.target.getResponseHeader('content-length') ||
            progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
        console.log('total', totalLength);
        if (totalLength) {
          let progress = Math.round((progressEvent.loaded * 100) / totalLength);
          console.log(progress);
        }
      },
    });
  };

  return (
    <div className="filesPage">
      <div className="container">
        <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} onCreate={handlerCreateFolder} />
        <div className="filesPage__title">
          <Title title={'Файлы'} />
        </div>
        <div className="filesPage__buttons">
          <div className="filesPage_w100">
            <Button text={'Назад'} onClick={handlerBack} />
          </div>
          <div className="filesPage_w150">
            <Button text={'Создать папку'} onClick={() => setIsOpen(true)} />
          </div>
          <div className="filesPage_w150">
            <input type="file" onChange={(event) => setFile(event.target.files)} />
            <button onClick={onPushFile}>push</button>
          </div>
        </div>
        <div className="filesPage__path">{path.join('/')}</div>
        <div className="filesPage__wrapper">
          {files.map((item) => (
            <div key={item.id}>
              <FilesItem
                type={item.type}
                name={item.name}
                date={'20.06.2000'}
                id={item.id}
                openFolder={() => handlerOpenFolder(item.id, item.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilesPage;
