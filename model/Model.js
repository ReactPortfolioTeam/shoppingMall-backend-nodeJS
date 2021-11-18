export const User = {
  userid,
  password,
  email,
  name,
  address,
  join_date,
  level,
};

export const Stock = {
  stock_key,
  product_id,
  stock,
  size,
};
export const Product = {
  product_id,
  product_name,
  sub_product_name,
  price,
  product_desc,
  edit_date,
  upload_date,
  category_id,
};
export const Order_product = {
  product_id,
  order_id,
  quantity,
};

export const Order_info = {
  order_id,
  userid,
  phone_number,
  shipment_address,
  order_state,
  order_date,
  order_price,
};

export const Auth_info = {
  id,
  user_id,
  expire_date,
  refrsh_token,
};
