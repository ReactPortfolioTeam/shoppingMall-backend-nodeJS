/* eslint-disable no-undef */
module.exports = model = {
  User: {
    userid,
    password,
    email,
    name,
    address,
    join_date,
    level,
  },
  Stock: {
    stock_key,
    product_id,
    stock,
    size,
  },
  Product: {
    product_id,
    product_name,
    sub_product_name,
    price,
    product_desc,
    edit_date,
    upload_date,
    category_id,
  },
  Order_product: {
    product_id,
    order_id,
    quantity,
  },
  Order_info: {
    order_id,
    userid,
    phone_number,
    shipment_address,
    order_state,
    order_date,
    order_price,
  },
  Auth_info: {
    id,
    user_id,
    expire_date,
    refrsh_token,
  },
};
