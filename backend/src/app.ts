import express from "express";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import controller from "./6-controllers/vacationController";
import CONFIG from './config';

const server = express();

server.use(cors());
server.use(express.json())
server.use("/api", controller);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(CONFIG.PORT, () => {
    console.log(`listening on http://localhost:${CONFIG.PORT}`)
});