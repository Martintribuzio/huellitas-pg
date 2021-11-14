const mePaNetwork = require('express').Router();
var mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_MERCADOPAGO
});

mePaNetwork.post('/donate',(req , res) => {
	console.log("holas")
	try {
	console.log(req.body);
    let preference = {
		items: [
			{
				title: req.body.title,
				unit_price: Number(req.body.price),
                currency_id: 'ARS',
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:3000/home",
			"failure": "http://localhost:3000/home",
			"pending": "http://localhost:3000/home"
		},
		auto_return: "approved",
	};

    mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
	} catch (error) {
		console.log(error);
	}	
})


module.exports = mePaNetwork;