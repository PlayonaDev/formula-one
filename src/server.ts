import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({logger: true});

server.register(cors, {
    origin: "*",
})

const teams = [
    {id: 1, name: "Ferrari", base: "Italia"},
    {id: 2, name: "McLaren", base: "Working, United Kingdom"},
    {id: 3, name: "Red Bull Racing", base: "Milton Keynesm, United Kingdom"},
    {id: 4, name: "Mercedes", base: "New Orleand"}
]

const drivers = [
    {id: 1, name: "Lewis Hamilton", team: "Ferrari"},
    {id: 2, name: "Max Versatappen", team: "Red Bull Racing"},
    {id: 3, name: "Lando Norris", team: "McLaren"},
]

server.get("/teams", async(request, response)=>{
    response.type("application/json").code(200)

    return { teams };
});

server.get("/drivers", async(request, response)=>{
    response.type("application/json").code(200);
    
    return { drivers };
});

interface DriverParams{
    id: string
}

server.get<{Params: DriverParams}>("/drivers/:id", async(request, response)=>{
    const id = parseInt(request.params.id);
    const driver = drivers.find( d => d.id === id);

    if(!driver){
        response.type("application/json").code(404);
        return { message: "Driver Not Found"}
    }else{
        response.type("application/json").code(200);
        return { driver }
    }
})

server.listen({port: 3434}, ()=>{
    console.log("Server init");
});