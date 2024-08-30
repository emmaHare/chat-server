//get all the libs we need from nodejs
const https=require("https");
const fs=require("fs");
const path=require("path");
const mariadb=require("mariadb");

//a connection pool->all the var for the connection
const pool=mariadb.createPool({
host: "127.0.0.1",
user: "wwroom",		
password: "emmahare_187#",
database: "wwroomdb",
});

//a function to connect to the db and get the data
async function getData(){
	//var for the connection
	let conn;
	try {
		//connect to db via the var from the pool
		conn=await pool.getConnection();
		//sql execute sql and save output
		const rows_from_messages=await conn.query("select * from messages;");
		//checks if data is in table
		if(rows_from_messages.length>0){
			//there is data in the table
			return rows_from_messages;
		}else{
			//no data in the table
			console.log("NO DATA");
			//and return null :)
			return [];
		}
	}catch(err){ 
		//the connection didnt work
		console.error("ERROR TO CONN: ", err.message, err);
		return [];
	}finally{
		//when everything was successful it will close the connection to the db
		if(conn) conn.release();
	}
}

//https server options
const options={
key: fs.readFileSync("key.pem"),
	 cert: fs.readFileSync("cert.pem")
};

//function to serve files to reduce code repetment
function serveFile(res, filePath, contentType){
	fs.readFile(filePath, (err, data) => {
			if(err){
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.end("500 Internal Server Error");
			return;
			}
			res.writeHead(200, {"Content-Type": contentType});
			res.end(data);
			});
}

//https server creation
const server = https.createServer(options, async (req, res) => {
		try {
		switch (req.url) {
		case "/":
		serveFile(res, path.join(__dirname, "index.html"), "text/html");
		break;
		case "/style.css":
		serveFile(res, path.join(__dirname, "style.css"), "text/css");
		break;
		case "/script.js":
		serveFile(res, path.join(__dirname, "script.js"), "application/javascript");
		break;
		case "/data":
		const data = await getData();
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(data));
		break;
		default:
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("404 Not Found");
		break;
		}
		} catch (err) {
			res.writeHead(500, { "Content-Type": "text/plain" });
			res.end("500 Internal Server Error");
		}
});

//starts server
server.listen(443, ()=>{
		console.log("HTTPS Server is running on https://localhost");
		});
