const CLOUD_NAME = 'dtqakexko';
const UPLOAD_PRESET = 'rikdcse5';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const uploadFileCloudinary = async (file: File, id: string) => {
    const formData = new FormData();

    const publicId = id;
    formData.append('file', file),
    formData.append('upload_preset', UPLOAD_PRESET),
    formData.append('public_id', publicId);

    try {
        const response = await fetch (CLOUDINARY_URL, {
            method: 'POST',
            body: 'formData',
        });

        const data = await response.json();
        console.log(data.secure_url);
    } catch (error) {
        console.error(error);
    }
};

export const getFileCloudinary = (id: string) => {
	return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/${id}`;
};