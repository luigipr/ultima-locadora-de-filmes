import prisma from "../../src/database";
//import { UserInput } from "../../src/repository";
import {faker} from "@faker-js/faker"
import { RENTAL_LIMITATIONS } from "services/rentals-service";

function createDateWithOffsetDays(): Date {
  const currentDate = new Date();
  const targetDate = new Date(currentDate);
  targetDate.setDate(currentDate.getDate() + RENTAL_LIMITATIONS.RENTAL_DAYS_LIMIT);
  return targetDate;
}

// export async function createRentalTest(userId: number) {
//   const result = await prisma.rental.create({
//     data: {
//       endDate: createDateWithOffsetDays(),
//       userId,
//     }
//   })
//   return {
//     ...result,
//     date: result.date.toISOString(),
//     endDate: result.endDate.toISOString(),
//   };
// }

// export async function movieRental (rentalId: number, movieId: number) {
//     return await prisma.movie.update({
//         data: {
//             rentalId,
//         },
//         where: {
//             id: movieId
//         }
//     })
// }


export async function createAndRentMovie(userId: number, movieId: number) {
  const endDate = createDateWithOffsetDays();
  
  const rental = await prisma.rental.create({
    data: {
      endDate,
      userId,
    }
  });

  await prisma.movie.update({
    data: {
      rentalId: rental.id,
    },
    where: {
      id: movieId,
    }
  });

  return {
    ...rental,
    date: rental.date.toISOString(),
    endDate: endDate.toISOString(),
  };
}