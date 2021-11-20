/* eslint-disable no-undef */
module.exports.User = {
  userid: '',
  password: '',
  email: '',
  name: '',
  address: '',
  join_date: '',
  level: '',
};

module.exports.Stock = {
  stock_key: '',
  product_id: '',
  stock: '',
  size: '',
};
module.exports.Product = {
  product_id: '',
  product_name: '',
  sub_product_name: '',
  price: '',
  product_desc: '',
  edit_date: '',
  upload_date: '',
  category_id: '',
};
module.exports.Order_product = {
  product_id: '',
  order_id: '',
  quantity: '',
};
module.exports.Order_info = {
  order_id: '',
  userid: '',
  phone_number: '',
  shipment_address: '',
  order_state: '',
  order_date: '',
  order_price: '',
};
module.exports.Auth_info = {
  id: '',
  user_id: '',
  expire_date: '',
  refrsh_token: '',
};
