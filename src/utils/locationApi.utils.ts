const NodeGeocoder = require('node-geocoder');
import { Location } from '../resturant/schema/resturant.schema';
import * as dotenv from 'dotenv'
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

}