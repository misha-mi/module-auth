import './files-item.sass';
import filePng from '../../image/file.png';
import folderPng from '../../image/folder.png';

const FilesItem = ({ type, name, date }) => {
  let icon;

  switch (type) {
    case 'file':
      icon = filePng;
      break;
    case 'folder':
      icon = folderPng;
      break;
    default:
      icon = '';
  }

  return (
    <div className="filesItem">
      <div className="filesItem__wrapper">
        <div className="filesItem__circle">
          <img src={icon} alt={type} className="filesItem__icon" />
        </div>
        <div className="filesItem__name">{name}</div>
      </div>
      <div className="filesItem__date">{date}</div>
    </div>
  );
};

export default FilesItem;
