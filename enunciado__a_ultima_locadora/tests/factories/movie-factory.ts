import prisma from "../../src/database";
import {faker} from "@faker-js/faker"

export async function createMovie (adultsOnly = false) {
  return await prisma.movie.create({
    data: { 
        name: faker.commerce.productName(),
        adultsOnly,
    }
  })
}