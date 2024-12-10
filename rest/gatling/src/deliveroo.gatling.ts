import {http, HttpProtocolBuilder} from "@gatling.io/http";
import {constantUsersPerSec, scenario, simulation} from "@gatling.io/core";

export default simulation((setUp) => {
    const httpProtocol: HttpProtocolBuilder = http.baseUrl("http://localhost:3000")
        .acceptHeader("application/json")
        .contentTypeHeader("application/json");

    const scenarioGet = scenario("get users")
        .exec(http("Request get users").get("/user"));

    setUp(
        scenarioGet.injectOpen(constantUsersPerSec(20).during(15)),
    ).protocols(httpProtocol);
}); 