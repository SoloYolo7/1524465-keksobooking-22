const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const AVATAR_DEFAULT_URL = ['img/muffin-grey.svg'];

const Image = {
  WIDTH: '70',
  HEIGHT: '70',
}

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');

const createImage = () => {
  const imageElement = document.createElement('IMG');
  imageElement.width = Image.WIDTH;
  imageElement.height = Image.HEIGHT;
  return imageElement;
}

const uploadImage = (imageChooser, image) => {
  const file = imageChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      image.src = reader.result;
    });
  }
}

avatarChooser.addEventListener('change', () => {
  uploadImage(avatarChooser, avatarPreview);
});

photoChooser.addEventListener('change', () => {
  const image = createImage();
  uploadImage(photoChooser, image);
  photoPreview.append(image);
});

const clearAvatars = () => {
  avatarPreview.src = AVATAR_DEFAULT_URL;
  photoPreview.textContent = '';
};


export {
  clearAvatars
};
