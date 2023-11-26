import './files-item.sass';
import filePng from '../../image/file.png';
import folderPng from '../../image/folder.png';
import Button from '../button/button';
import deleteFile from '../../service/deleteFile';

const FilesItem = ({ type, name, date, id, openFolder }) => {
  let icon;

  switch (type) {
    case 'file':
      icon = filePng;
      break;
    case 'folder':
      icon = folderPng;
      break;
    default:
      icon = filePng;
  }

  const handlerDownload = async (e, id, name) => {
    e.stopPropagation();
    const response = await fetch(`http://localhost:5000/auth-api/downloadFile/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 200) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const handlerDelete = async (id) => {
    await deleteFile(id).then(console.log).catch(console.log);
  };

  return (
    <div className="filesItem">
      <div
        className="filesItem__wrapper filesItem_grow"
        onClick={type === 'folder' ? openFolder : null}>
        <div className="filesItem__circle">
          <img src={icon} alt={type} className="filesItem__icon" />
        </div>
        <div className="filesItem__name">{name}</div>
      </div>
      <div className="filesItem__wrapper">
        <div className="filesItem__date">{date}</div>
        <div className="filesItem__buttons">
          {type !== 'folder' ? (
            <Button text={'Скачать'} onClick={(e) => handlerDownload(e, id, name)} />
          ) : null}
          <Button text={'Удалить'} onClick={() => handlerDelete(id)} />
        </div>
      </div>
    </div>
  );
};

export default FilesItem;
