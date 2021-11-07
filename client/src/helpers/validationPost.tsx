export const validation = (input: any) => {
  const errors = {
    description: '',
    genre: '',
    date: '',
    petImage: '',
    type: '',
    state: '',
    ubication: '',
  };

  if (!input.description) {
    errors.description = 'La descripción es requerida';
  }
  if (!input.genre) {
    errors.genre = 'El género es requerido';
  }
  if (!input.date) {
    errors.date = 'La fecha es requerida';
  }
  if (!input.petImage) {
    errors.petImage = 'La imagen es requerida';
  }
  if (input.petImage && input.petImage.size > 1024 * 1024 * 3) {
    errors.petImage = 'La imagen debe tener como tamaño maximo 3MB';
  }
  if (input.petImage && input.petImage.type.split('/')[0] !== 'image') {
    errors.petImage = 'La imagen debe ser de tipo imagen';
  }
  console.log(input.petImage.type);
  if (
    input.petImage.type.split('/')[1] !== 'jpeg' &&
    input.petImage.type.split('/')[1] !== 'png' &&
    input.petImage.type.split('/')[1] !== 'jpg'
  ) {
    errors.petImage = 'La imagen debe ser de tipo jpg o png';
  }

  if (!input.type) {
    errors.type = 'El tipo es requerido';
  }
  if (!input.state) {
    errors.state = 'El estado es requerido';
  }
  if (!input.latitude && !input.longitude) {
    errors.ubication = 'La ubicación es requerida';
  }
  return errors;
};
