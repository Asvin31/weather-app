export default function handler(req, res) {
    const { query: { woeid } } = req
    fetch("https://www.metaweather.com/api/location/" + woeid, {
        method: 'GET'
    }).then(function (response) {
        if (response.status == 200) {
            response.json().then(function (result) {
                res.status(200).json({ result })
                res.end()
            })
        }
        else {
            res.status(500);
            res.end()
        }
    })
}
