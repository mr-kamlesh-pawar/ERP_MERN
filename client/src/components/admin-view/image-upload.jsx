import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

const ProductImageUpload = ({imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState, imageLoadingState}) => {

    const inputRef= useRef(null);

    function handleImageFileChange(event){
        console.log(event.target.files);
        const selectFile= event.target.files?.[0];
        if(selectFile){
            setImageFile(selectFile);
        }
    }

    function handleDragOver(event){
        event.preventDefault();

    }
    function handleDrop(event){
        event.preventDefault();
        const droppedFile= event.dataTransfer.files?.[0];
        if(droppedFile){
            setImageFile(droppedFile);
        }

    }

    function handleRemoveImage(){
      setImageFile(null);
      if(inputRef.current){
        inputRef.current.value = '';
      }
    }

    async function uploadImageToCloudinary() {
      setImageLoadingState(true);
      
      const data= new FormData();
      data.append('my_file', imageFile);
      const response= await axios.post('http://localhost:5000/api/admin/products/upload-image', data);

      console.log("data:", data);
      console.log("Response from Cloudinary: ", response);

      if (response?.data?.success) {
        const secureUrl = response.data?.data?.secure_url;
        if (secureUrl) {
          setUploadedImageUrl(secureUrl);
          setImageLoadingState(false);
        } else {
          console.error("Secure URL not found in the response.");
          setImageLoadingState(false);
        }
      } else {
        console.error("Image upload failed:", response?.data?.message || "Unknown error");
        setImageLoadingState(false);
      }
      
    }

    useEffect(()=>{
      if(imageFile!==null){
        uploadImageToCloudinary();
      }
    }, [imageFile]);


  return (
    <div className='w-full mx-auto  max-w-md mt-4'>
        <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4'>
        <Input id="image-upload"  type="file" className="hidden" ref={inputRef} onChange={handleImageFileChange}/>

        {
            !imageFile ?
            (<Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer">
                <UploadCloudIcon className='h-10 w-10 text-muted-foreground mb-2'/>
                <span> Drag & Drop or click to upload image</span>

                 </Label> )
            : 
            
              imageLoadingState ? ( <Skeleton className="h-10 bg-gray-100" /> ): (
            <div className='flex items-center justify-between'>
                
                    <div className='flex items-center'>
                        <FileIcon className='w-8 '/>
                    </div>
                    <p className='text-sm font-medium'>{imageFile.name}</p>

                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                      <XIcon className='w-4 h-4 text-white'/>
                      <span className='sr-only'>Remove File</span>
                       </Button>
                 </div> 
                 )
        }


      </div>
    </div>
  )
}

export default ProductImageUpload
