const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const svgImage = avatarPreview.querySelector('img');
const photoFileChooser = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

//Функция изменения изображения
const changeImage = (fileChooser, preview, svg) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        preview.style.background = 'transparent url('+reader.result +') left top no-repeat';
        preview.style.backgroundSize = 'cover';

        if (svg) {svg.style.opacity = '0'}
      });

      reader.readAsDataURL(file);
    }
  });
}

//Изменяем аватарку
changeImage(avatarFileChooser, avatarPreview, svgImage);

//Изменяем фото
changeImage(photoFileChooser, photoPreview);
