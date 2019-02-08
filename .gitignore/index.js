const Discord = require("discord.js");
const client = new Discord.Client();
const tok = require("./token.json");

const fs = require("fs");

let prefix = "sc.";

function generate(file){
    return file[~~(file.length * Math.random())];
}

client.on("ready", () => {
	console.log("Ready!");
});

client.on("message", (message) => {
	if(message.content.startsWith(prefix + "creature")){
		fs.readdir("./creatures/", (err, data) => {
			if(err) throw err;

        	const randomNum = Math.floor(Math.random() * data.length);
        	const file = data.splice(randomNum, 1);
        	const fileName = "creatures/" + generate(file);

        	fs.readFile(fileName, "utf8", function(err, data){
        		if(err) throw err;

        		const splitData = data.split("\n");
        		message.channel.send(splitData);
    		});
		});
	}
});

client.login(tok.token);