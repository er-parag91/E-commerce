const Product = require('../models/product');
const User = require('../models/user');
// const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.getProducts().then((products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })).catch(err => {
    console.log(err);
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product[0].title,
        path: '/products'
      });
    }).catch(err => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.getProducts().then((products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })).catch(err => {
    console.log(err);
  })
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then(products => {
      return products
    })
    .then((products) => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId).then(product => {
    return req.user.addToCart(product[0])
  }).then(result => {
    res.redirect('/cart');
  }).catch(err => {
    console.log(err);
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteCartItem(prodId)
  .then(() => {
    res.redirect('/cart');
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
    .then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
  .catch(err => {
    console.log(err)
  })
};

exports.postOrder = (req, res, next) => {
  req.user.createOrder()
    .then((result) => {
      res.redirect('/orders');
    })
    .catch(err => {
    console.log(err);
  })
}

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };