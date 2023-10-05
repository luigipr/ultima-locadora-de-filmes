import prisma from "../../src/database";
import { RENTAL_LIMITATIONS } from "services/rentals-service";

export async function createRental(userId: number) {
  const result = await prisma.rental.create({
    data: {
      userId,
      endDate: new Date(
        new Date().getDate() + RENTAL_LIMITATIONS.RENTAL_DAYS_LIMIT
      ),
    },
  })
  return {
    ...result,
    date: result.date.toISOString(),
    endDate: result.endDate.toISOString(),
  };
}

export async function movieRental(rentalId: number, movieId: number) {
  return await prisma.movie.update({
    data: { rentalId },
    where: { id: movieId }
  })
}

/*

function createDateWithOffsetDays(): Date {
  const currentDate = new Date();
  const targetDate = new Date(currentDate);
  targetDate.setDate(currentDate.getDate() + RENTAL_LIMITATIONS.RENTAL_DAYS_LIMIT);
  return targetDate;
}

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
} */