const express = require('express')
const Discord = require('discord.js');
const client = new Discord.Client();
var app = require('express')();
const cors = require("cors");
app.use(cors());
let cache = {
    spotify: {
        listening: false,
        title: "Title",
        artist: "Artist"
    },
    status: {
        general: {
            type: "offline",
            colour: "#747F8D"
        },
        custom: null,
        richPresence: []
    },
    avatar: "https://cdn.discordapp.com/avatars/823975872243040316/4242b4438dabbc9a9e4727b412d4e188.webp"
};

async function getStatus() {
    cache.status.richPresence = [];
    const user = await client.users.fetch("823975872243040316", { force: true });
    const stat = user.presence.status;
    if (stat == "invisible" || stat == "offline") {
        cache.status.general.colour = "#747F8D";
        cache.status.general.type = "offline";
    };
    if (stat == "online") {
        cache.status.general.colour = "#57F287";
        cache.status.general.type = "online";
    };
    if (stat == "idle") {
        cache.status.general.colour = "#FEE75C";
        cache.status.general.type = "idle";
    };
    if (stat == "dnd") {
        cache.status.general.colour = "#ED4245";
        cache.status.general.type = "dnd";
    };

    cache.avatar = user.displayAvatarURL({ size: 4096, dynamic: true });

    const spotifyFilter = user.presence.activities.filter(activity => activity.type == "LISTENING");
    const customStatusFilter = user.presence.activities.filter(activity => activity.type == "CUSTOM_STATUS");
    const otherStatus = user.presence.activities.filter(activity => activity.type !== "CUSTOM_STATUS" && activity.type !== "LISTENING");

    if (spotifyFilter.length == 0) cache.spotify.listening = false;
    else {
        cache.spotify.listening = true;
        cache.spotify.title = spotifyFilter[0].details;
        cache.spotify.artist = spotifyFilter[0].state;
    };
    if (customStatusFilter.length == 0) cache.status.custom = null;
    else {
        cache.status.custom = customStatusFilter[0].state;
    };

    otherStatus.forEach(status => {
        const obj = {
            name: status.name,
            topFieldDetails: status.details,
            topFieldState: status.state,
            timestamps: status.timestamps
        }

        cache.status.richPresence.push(obj);
    });
};

client.on("ready", function() {
    console.log(`${client.user.tag} is now ready. (${new Date().toUTCString()})`);
    getStatus();
    setInterval(getStatus, (1000 * 30));
});

app.get("/", function(req, res, next) {
    res.status(200).send({
        status: 200,
        response: {
            routes: {
                root: "/",
                internal: {
                    neverland: {
                        spotify: "/internal/neverland/spotify",
                        status: "/internal/neverland/status",
                        avatar: "/internal/neverland/avatar"
                    }
                }
            }
        }
    });
});

app.get("/internal/neverland/spotify", function(req, res, next) {
    res.status(200).send({ status: 200, response: cache.spotify });
});

app.get("/internal/neverland/status", function(req, res, next) {
    res.status(200).send({ status: 200, response: cache.status });
});

app.get("/internal/neverland/avatar", function(req, res, next) {
    res.status(200).send({ status: 200, response: cache.avatar });
});

app.listen(42012, function() {
    console.log("API is now listening on port 42012");
});

client.login("ODY3OTYyNzU1MDQ5NzE3ODIw.YPovTg.lrR4oLdQJpsmrTtpyWnPrAYuH38");
