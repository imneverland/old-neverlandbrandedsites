module.exports = {
    "network": {
        "port": 5303, // The port to run NeverLand-Ninja on.
        "interface": "0.0.0.0"
    },
    "cde": {
        "enabled": true,
        "url": "https://neverland.ninja",
        "web": {
            "redirect": "https://neverlandyt.com",
            "instanceName": "NeverLand Ninja"
        },
        "api": {
            "uploadLimit": 65536,
            "token": "P8nUqxkJtFLEWh5Yt68AxLnjP4fLWmfrgZPdRr3NGqEZWtGMP", // Authentication token (Usually the one in NeverLand-Ninja/config)
            "generatedFileNameLength": 9,
        }
    }
}