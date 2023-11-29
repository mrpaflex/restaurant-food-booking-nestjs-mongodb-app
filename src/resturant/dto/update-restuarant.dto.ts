import { PartialType } from "@nestjs/swagger";
import { CreateResturantDTO } from "./create-restuarant.dto";

export class UpdateRestaurantDTo extends PartialType(CreateResturantDTO) {}