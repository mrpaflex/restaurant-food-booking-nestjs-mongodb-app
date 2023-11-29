import { Catagory } from "../enum/enums";

export class CreateResturantDTO{

    nameofrestuarant: string;

    ownername: string;
    
    description: string;
 
    email: string;

    phoneNumber: string;
    
    category: Catagory
  
    address: string;

    images?: object[]
}