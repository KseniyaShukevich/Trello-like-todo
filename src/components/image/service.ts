import CONSTANTS from "../../utils/CONSTANTS";

const requestToCloudinary = async (formData: FormData): Promise<any> => {
  const url = `https://api.cloudinary.com/v1_1/${CONSTANTS.CLOUD_NAME}/image/upload`;
  const response = await fetch(url, {
      method: "POST",
      body: formData
    });

  return await response.json();
}

const uploadImage = async (file: File): Promise<any> => {
  const formData = new FormData();
  let data;

  if (file) {
    formData.append("file", file);
    formData.append("upload_preset", CONSTANTS.UPLOAD_PRESET);
    data = await requestToCloudinary(formData);
  }

  return data;
}

export default uploadImage;
