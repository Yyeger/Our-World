    const express = require('express');
    const path = require('path');
    
    const app = express();
    const port = process.env.PORT || 8080;
    
        app.use(express.static(__dirname));




    async function getIP() {
        let response1 =  await fetch('https://ipinfo.io?token=b61067be32e796', {method:"GET"});
        let jsonobjtemp1 =  await response1.json();
        console.log(jsonobjtemp1.ip);
        return jsonobjtemp1.country;
    }

    app.get('/ENG', function (req, res) {
        res.sendFile(path.join(__dirname, '/public/indexENG.html'));
    });

    app.get('/IT', function (req, res) {
        res.sendFile(path.join(__dirname, '/public/index.html'));
    });

    let country = getIP().then(country => console.log(country))

    app.get('/', function (req, res) {
        if (country == "ENG" ) {
            res.sendFile(path.join(__dirname, '/public/indexENG.html'));
        } else {
            res.sendFile(path.join(__dirname, '/public/index.html'));
        }
    });

    app.get('/:name', (req, res) => {
        switch(req.params.name) {
            case 'privacy':
                res.sendFile(path.join(__dirname + "/public/pages/privacy.html"));
                break;
            case 'terms':
                res.sendFile(path.join(__dirname + "/public/pages/terms.html"));
                break;
            default:
                res.sendFile(path.join(__dirname + "/public/pages/404.html"));
        }
    });

    app.listen(port);
    console.log('Server started at http://localhost:' + port);
