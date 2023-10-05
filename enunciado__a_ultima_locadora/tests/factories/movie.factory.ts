import prisma from "../../src/database";
//import { UserInput } from "../../src/repository";
import {faker} from "@faker-js/faker"
import { RENTAL_LIMITATIONS } from "services/rentals-service";

export async function createMovie (adultsOnly = false) {
  return await prisma.movie.create({
    data: { 
        name: faker.commerce.productName(),
        adultsOnly,
    }
  })
}