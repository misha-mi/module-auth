import './files-page.sass';
import Title from '../../component/title/title';
import Button from '../../component/button/button';
import FilesItem from '../../component/files-item/files-item';
import { useEffect, useState } from 'react';
import getFiles from '../../service/getFiles';
import createFolder from '../../service/createFolder';
import Popup from '../../component/popup/popup';

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const [stack, setStack] = useState(['root']);
  const [path, setPath] = useState(['root']);
  const [isOpen, setIsOpen] = useState(false);

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
            <Button text={'Добавить файл'} />
          </div>
        </div>
        <div className="filesPage__path">{path.join('/')}</div>
        <div className="filesPage__wrapper">
          {files.map((item) => (
            <div key={item.id} onClick={() => handlerOpenFolder(item.id, item.name)}>
              <FilesItem type={item.type} name={item.name} date={'20.06.2000'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilesPage;
