const NodeGeocoder = require('node-geocoder');
//const S3 = require('aws-sdk/clients/s3');
import { S3 } from 'aws-sdk';
import { Location } from '../resturant/schema/resturant.schema';
import * as dotenv from 'dotenv'
import { resolve } from 'path';
import { JwtService } from '@nestjs/jwt';
dotenv.config()

//import { ConfigService } from "@nestjs/config";

export default class APIFeatures {

    static async getRestaurantLocation(address){
        try {
            const options = {
                provider: process.env.GEOCODER_PROVIDER,
                httpAdapter: process.env.HTTPADAPTER,
                apiKey: process.env.GEOCODER_API_KEY,
                formatter: null
              };
            
             const geoCoder = NodeGeocoder(options);

             const loc = await geoCoder.geocode(address)

             const location: Location = {
                type: 'Point',
                coordinates: [loc[0].longitude, loc[0].latitude],
                formattedAddress: loc[0].formattedAddress,
                city: loc[0].city,
                state: loc[0].stateCode,
                zipcode: loc[0].zipcode,
                country: loc[0].countryCode
             };

             return location;
        
        } catch (error) {
            console.log(error)
        }
    }
//uploading image function

//    static async uploadimages(files){
//     return new Promise((resolve, reject)=>{
//         const s3 = new S3({
//             accessKeyId: process.env.AWS_ACCESS_ID,
//             secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
//         })

//         let images = []

//         files.forEach(async (file) => {
//             const splitFileName = file.originalname.split('.');
//           //  const random = Date.now()
//             const random = Math.round(Math.random() *10) 
//             console.log(random, splitFileName[0], splitFileName[1])

//             const newfileName= `${splitFileName[0]}_${random}.${splitFileName[1]}`

//             console.log(newfileName);

//            // images.push(newfileName)

//            //now upload the file or images to aws s3
//            const params = {
//             Bucket: `${process.env.AWS_BUCKET_NAME}/restaurants-photo`,
//             Key: newfileName,
//             Body: file.buffer
//            }

//          const uploadresponse = await s3.upload(params).promise();

//          images.push(uploadresponse);

//          console.log(images)

//          if (images.length === file.length) {
//             resolve(images)
//          }

//         });

//     })
//     }




}

export async function uploadImages(files) {
    const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
    });


    const uploadPromises = files.map(async (file) => {
        const splitFileName = file.originalname.split('.');
        const random = Math.round(Math.random() * 100);
        const newFileName = `${splitFileName[0]}_${random}.${splitFileName[1]}`;

        // console.log(random, splitFileName[0], splitFileName[1])
        // console.log(newFileName);

        const params = {
            Bucket: process.env.AWS_BUCKET_FOLDER_NAME,
            Key: newFileName,
            Body: file.buffer
        };

        try {
            const uploadResponse = await s3.upload(params).promise();
           return uploadResponse;
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            throw error; // Propagate the error to reject the Promise
        }
    });

    try {
        const images = await Promise.all(uploadPromises);
     //   console.log(images)
        return images;
    } catch (error) {
        console.error('Error uploading one or more files:', error);
        throw error; // Propagate the error to reject the Promise
    }
}


export async function deleteddimages(images){
    const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
    });
    const imagesKey = images.map((image)=>{
        return {
            Key: image.Key
        }
    })

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Delete: {
            Objects: imagesKey,
            Quiet: false
        }
    }

    return new Promise((resolve, reject)=>{
        s3.deleteObjects(params, (err, data)=>{
            if (err) {
               console.log(err)
               reject(false)
            }else{
                resolve(true)
            }
        })
    })
}

export async  function jwtassigntoken(userid: string, jwtService: JwtService, ):Promise<string>{
    const payload = {id: userid}

    const token = await jwtService.signAsync(payload)

    return token;

}
