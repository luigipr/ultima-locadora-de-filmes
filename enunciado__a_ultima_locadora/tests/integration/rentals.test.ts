import supertest from "supertest";
import { cleanDb } from "../utils";
import app from "../../src/app";
import prisma from "../../src/database";
import { createUser } from "../factories/user-factory";
import { movieRental, createRental } from "../factories/rentals-factory";
import { createMovie } from "../factories/movie-factory";
import { RentalFinishInput, RentalInput } from "protocols";

const api = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe("get Rentals Service Integration Tests", () => {
  describe("GET /rentals", () => {
    it("should return all rentals", async () => {
      const user = await createUser();
      const rental = await createRental(user.id);
      const { status, body } = await api.get("/rentals");
      expect(status).toBe(200);
      expect(body).toEqual([rental]);
    });
    it("should return 200 and empty array when no rentals", async () => {
      const { status, body } = await api.get("/rentals");

      expect(status).toBe(200);
      expect(body).toEqual([]);
    });
  });

  describe("GET rentals/id", () => {
    it("should return rental by rentalId", async () => {
        const user = await createUser();
        const rental = await createRental(user.id);
        const { status, body } = await api.get(`/rentals/${rental.id}`);
        expect(status).toBe(200);
        expect(body).toEqual(rental);
    })

    it("should return 400 when rentalId is not found", async() => {
      const { status: statusNaN} = await api.get(`/rentals/h`)
      expect(statusNaN).toBe(400)
    })

    it("should return 400 when rentalId is not found", async() => {
      const { status } = await api.get(`/rentals/99999`);
      expect(status).toBe(404)
    })
  })

  describe("POST /rentals", () => {
    it("should return 422 when body is invalid",async () => {
      const rental = {
        movieId: "abacate",
        userId: 4,
      }
      const {status} = await api.post(`/rentals`).send(rental);
      expect(status).toBe(422)
    })

    it("should return 201 with a valid body",async () => {
      const user = await createUser();
      const movie = await createMovie();
      const body: RentalInput = {
        userId: user.id,
        moviesId: [movie.id],
      }
      const {status} = await api.post('/rentals').send(body)
      expect(status).toBe(201)
    })

    it("should return 401 when a minor rents an adult movie", async () => {
      const user = await createUser(false);
      const movie = await createMovie(true);

      const body: RentalInput = {
        userId: user.id,
        moviesId: [movie.id],
      }
      const {status} = await api.post('/rentals').send(body)
      expect(status).toBe(401)
    })


  })

  describe("finish a rental", () => {
    it("should return 422 when data is missing", async() => {
      const {status} = await api.post('/rentals/finish').send({});
      expect(status).toBe(422)
    })

    it("should return 200 if the movie is returned",async () => {
      const user = await createUser();
      const movie = await createMovie();
      const {id: rentalId} = await createRental(user.id);
      await movieRental(rentalId, movie.id)
      const data: RentalFinishInput = {rentalId}

      const {status} = await api.post('/rentals/finish').send(data);
      expect(status).toBe(200)

    })
  })
});
