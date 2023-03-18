const router = require('express').Router();
const stripe = require('stripe')(process.env.SECRET_KEY);
const checkAuth = require('../middleware/checkAuth');
const OrderModel = require('../model/order-model');

router.post('/checkout', checkAuth, async (req, res) => {
  const payload = {
    status: 200,
    payload: [],
    error: false,
  };

  if (req.user) {
    try {
      const { cart } = req.body;

      const user = req.user;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB', 'PK'],
        },
        customer_email: user.email,
        customer: user._id,
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 1500,
                currency: 'usd',
              },
              display_name: 'Estimate time to deliver',
              delivery_estimate: {
                minimum: {
                  unit: 'day',
                  value: 1,
                },
                maximum: {
                  unit: 'day',
                  value: 7,
                },
              },
            },
          },
        ],
        line_items: cart.map((el) => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: el.title,
                //   images: [el.img],
              },
              unit_amount: 1000,
            },
            quantity: 1,
          };
        }),
        success_url: `https://giftshop-mu.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'https://giftshop-mu.vercel.app/',
      });

      payload['payload'] = {
        url: session.url,
      };
    } catch (err) {
      console.log(err);

      payload['error'] = err.message;
    }
  } else {
    payload['payload'] = {
      text: 'You must login first',
    };
  }

  res.json(payload);
});

router.get('/success', checkAuth, async (req, res) => {
  const payload = {
    status: 200,
    payload: [],
    error: false,
  };

  const user = req.user;

  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  if (session.payment_status === 'paid') {
    const instance = new OrderModel({
      order: session.id,
      user: user._id,
    });
    const order = await instance.save();

    console.log(order);
    payload['payload'] = order;
  } else {
  }

  res.json(payload);
});

router.get('/orders', async (req, res) => {
  const payload = {
    status: 200,
    payload: [],
    error: false,
  };

  const orders = await OrderModel.find({});

  // const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  console.log(orders);
  payload['payload'] = orders;

  res.json(payload);
});

module.exports = router;
