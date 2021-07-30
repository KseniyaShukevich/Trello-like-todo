const requestToCloudinary = async (formData: FormData): Promise<any> => {
  const cloudName = 'dshffjhdkjj';
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(url, {
      method: "POST",
      body: formData
    });

  return await response.json();
}

const uploadImage = async (file: File) => {
  const formData = new FormData();
  let data;

  if (file) {
    const upload_preset = 'tr2sriht';
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    data = await requestToCloudinary(formData);
  }

  return data;
}

export default uploadImage;
