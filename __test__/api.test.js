import request from "supertest"
import app from "../src/index.js"
import options from "../src/storage/databaseOptions.js"
import dotenv from "dotenv";

dotenv.config();
describe("/api/npsdata", () => {

  afterAll( async () => {
    console.log("... Test Ended");
    
});
  describe("when passed npsData to the endpoint /api/npsdata", () => {
    test("should save npsdata in the database", async ( ) =>  {
        expect(options).toBe(options);
        const bodyData = 
           {id: Math.floor(Math.random() * 500),
            date: "2018-06-04",
            score: 9,
            feedback: "Best organization "
        }        
    
          const response =   await request(app).post("/api/npsdata").send(bodyData)
          expect(response.statusCode).toBe(200);
          expect(response._body.code).toBe(2);
         
       
      })

})
describe("testing get endpoint /api/npsdata", () => {
  test("should retrieve list of npsdata in the database", async ( ) =>  {
      expect(options).toBe(options); 
        const response =   await request(app).get("/api/npsdata");
        expect(response.statusCode).toBe(200); 
    })

})
describe("testing get endpoint /api/npsdata/:startDate/:endDate", () => {
  test("should retrieve list of npsdata in the database with dates in between the startDate and endDate", async ( ) =>  {
      expect(options).toBe(options); 
        const response =   await request(app).get("/api/npsdata/2022-01-01/2022-12-01");
        expect(response.statusCode).toBe(200);
    })

})
})