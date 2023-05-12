const supertest = require("supertest");
const app = require("./app");
describe("GET /restaurants", () => {
  it("returns status code 200", async () => {
    const response = await supertest(app).get("/restaurants");
    expect(response.status).toBe(200);
  });

  it("returns an array of restaurants", async () => {
    const response = await supertest(app).get("/restaurants");
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("returns the correct number of restaurants", async () => {
    const response = await supertest(app).get("/restaurants");
    const count = await Restaurant.count();
    expect(response.body.length).toBe(count);
  });

  it("returns the correct restaurant data", async () => {
    const restaurant = await Restaurant.create({ name: "Test Restaurant" });
    const response = await supertest(app).get(`/restaurants/${restaurant.id}`);
    expect(response.body).toMatchObject({ id: restaurant.id, name: "Test Restaurant" });
  });
});

describe("POST /restaurants", () => {
  it("updates the restaurants array with the new value", async () => {
    const response = await supertest(app).post("/restaurants").send({ name: "New Restaurant" });
    const restaurants = await Restaurant.findAll();
    expect(restaurants.length).toBeGreaterThan(0);
    expect(response.body.name).toBe("New Restaurant");
    expect(restaurants.some(r => r.name === "New Restaurant")).toBe(true);
  });
});

describe("PUT /restaurants/:id", () => {
  it("updates the restaurant array with the provided value", async () => {
    const restaurant = await Restaurant.create({ name: "Test Restaurant" });
    const response = await supertest(app)
      .put(`/restaurants/${restaurant.id}`)
      .send({ name: "Updated Restaurant" });
    const updatedRestaurant = await Restaurant.findByPk(restaurant.id);
    expect(updatedRestaurant.name).toBe("Updated Restaurant");
    expect(response.body).toBe(1); // expect Restaurant.update() to return 1 row affected
  });
});

describe("DELETE /restaurants/:id", () => {
  it("deletes the restaurant with the provided id from the array", async () => {
    const restaurant = await Restaurant.create({ name: "Test Restaurant" });
    const response = await supertest(app).delete(`/restaurants/${restaurant.id}`);
    const deletedRestaurant = await Restaurant.findByPk(restaurant.id);
    expect(response.body).toBe(1); // expect Restaurant.destroy() to return 1 row affected
    expect(deletedRestaurant).toBeNull();
  });
});

