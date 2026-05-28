"use server";
import { createAdminClient } from '@/config/appwrite';
import checkAuth from '@/app/actions/checkAuth';
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';

async function createRoom(previousState, formData) {
  const { databases, storage } = await createAdminClient();

  try {
    const { user } = await checkAuth();

    if (!user) {
      return { error: 'You must be logged in to create a room' };
    }
 
    let imageId;

    const image=formData.get('image');
     if (image && image.size > 0 && image.name!==undefined ){
        try{
const response = await storage.createFile("rooms",  ID.unique(), image);
imageId = response.$id;
        }catch(error){
          console.log('Failed to upload image', error);
          return { error: 'Failed to upload image' };
        }
     } else{
        console.log('No image provided or invalid image');
     }
    
   

    // Create room
    const newRoom = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      ID.unique(),{
        user_id: user.id,
        name: formData.get('name'),
         description: formData.get('description'),
        sqft: Number(formData.get('sqft')),
capacity: Number(formData.get('capacity')),
price_per_hour: Number(formData.get('price_per_hour')),
location: formData.get('location'),
address: formData.get('address'),
availability: formData.get('availability'),
amenities: formData.get('amenities'),
image: imageId 
      }
    
    );

    revalidatePath('/', 'layout');
    return { success: true };

  } catch (error) {
    console.log('Failed to create room', error);
    return { error: 'Failed to create room' };
  }
}

export default createRoom;