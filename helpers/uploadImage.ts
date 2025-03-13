import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '@/config/supabase';

/**
 * Uploads an image to Supabase storage and returns the URL
 *
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The URL of the uploaded image
 * @throws {Error} - If the upload fails
 */
export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    // Maximum file size (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      throw new Error('Image size must be less than 5MB');
    }

    // Generate a unique file name
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Upload to the "note-images" bucket
    const { data, error } = await supabase.storage
      .from('note-images')
      .upload(`public/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('note-images').getPublicUrl(`public/${fileName}`);

    return publicUrl;
  } catch (error) {
    // console.error('Error uploading image:', error);
    toast.error('Failed to upload image');
    throw error;
  }
};
