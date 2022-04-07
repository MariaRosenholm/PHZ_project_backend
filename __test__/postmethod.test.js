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
           { employeeid: Math.floor(Math.random() * 500),
            date: "2018-06-04",
            score: 9,
            feedback: "Best organization "
        }        
    
          const response =   await request(app).post("/api/npsdata").send(bodyData)
          expect(response.statusCode).toBe(200);
          expect(response._body.code).toBe(2);
         
       
      })

})
})