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
				title: 'donate',
				unit_price: Number(req.body.price),
                currency_id: 'ARS',
				quantity: 1,
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
			console.log(response);
			res.json({
				id: response.body.id,
				url: response.body.init_point
			});
		}).catch(function (error) {
			console.log(error);
		});
	} catch (error) {
		console.log(error);
	}	
})


module.exports = mePaNetwork;