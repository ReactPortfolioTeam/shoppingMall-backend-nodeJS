const emptyError = require('../../util/emptyError');
const getModel = require('../../util/getModel');
const { findById, insertQuery } = require('../../util/sql');
const pool = require('../mysql');

exports.order = async (ctx) => {
  const apiModel = getModel(
    {
      userid: '',
      email: '',
      tel: '',
      address: '',
      detailedAddress: '',
      orderPrice: 0,
      products: [],
    },
    ctx,
  );
  // let errorMessage = [];
  // emptyError(apiModel, errorMessage);

  // if (errorMessage.length > 0) {
  //   ctx.status = 400;
  //   ctx.body = {
  //     msg: errorMessage,
  //   };
  // }

  const userId = getModel(
    {
      userid: '',
    },
    ctx,
  );
  const sql = findById(userId, 'user');
  let data, insertData, productInsertData;
  try {
    data = await pool.execute(sql);
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = {
      msg: '데이터베이스 오류',
    };
  }
  if (data[0].length > 0) {
    const OrderInfo = {
      userid: apiModel.userid,
      phone_number: apiModel.tel,
      shipment_address: apiModel.address + ' ' + apiModel.detailedAddress,
      order_state: 'pending',
      order_price: apiModel.orderPrice,
    };
    const sqlInsertOrderInfo = insertQuery(OrderInfo, 'order_info');
    try {
      insertData = await pool.execute(sqlInsertOrderInfo);
      console.log(insertData);
    } catch (error) {
      console.log(error);
      ctx.status = 400;
      ctx.body = {
        msg: '데이터베이스 오류',
      };
    }
    if (insertData[0].insertId !== undefined) {
      for (const product of apiModel.products) {
        const orderProduct = {
          product_id: product.product_id,
          order_id: insertData[0].insertId,
          quantity: product.quantity,
        };
        const sqlInsertOrderProduct = insertQuery(
          orderProduct,
          'order_product',
        );
        try {
          productInsertData = await pool.execute(sqlInsertOrderProduct);
        } catch (error) {
          console.log(error);
          ctx.status = 400;
          ctx.body = {
            msg: '데이터베이스 오류',
          };
        }
      }
      ctx.status = 200;
      ctx.body = {
        msg: '주문에 성공하였습니다.',
        orderId: insertData[0].insertId,
      };
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      msg: '일치하는 아이디가 없습니다.',
    };
  }
};

exports.orderConfirm = async (ctx) => {
  const orderConfirmModel = {
    userid: ctx.params.userid,
    order_id: ctx.params.orderid,
  };

  const sql_orderInfo = findById(orderConfirmModel, 'order_info');
  let data_orderInfo;

  const sql_orderProduct = findById(
    { order_id: orderConfirmModel.order_id },
    'order_product',
  );
  let data_orderProduct;
  try {
    data_orderInfo = await pool.execute(sql_orderInfo);
    data_orderProduct = await pool.execute(sql_orderProduct);
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      msg: error.sqlMessage,
    };
    return;
  }
  if (data_orderInfo[0] !== undefined && data_orderInfo[0].length > 0) {
    // console.log(data_orderInfo[0][0]);
    ctx.status = 200;
    ctx.body = {
      orderInfo: data_orderInfo[0][0],
      orderProduct: data_orderProduct[0],
    };
  } else {
    //찾을수 없는 경우 상태코드 확인
    ctx.status = 400;
    ctx.body = {
      msg: '존재하지 않는 주문 정보 입니다.',
    };
  }
};
