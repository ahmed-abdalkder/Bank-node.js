import { v2 as cloudinary } from 'cloudinary';

 
  
    cloudinary.config({ 
        cloud_name: 'dkg1ugc6o', 
        api_key: '711141145386824', 
        api_secret: process.env.cloud_key ,
    });
    export default cloudinary