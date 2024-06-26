const promocodeDA = require('./promocodeDA');
const { httpUtil } = require('../../utils');

exports.getAllPromocode = async ( req , res) => {
  let idProduct = req.query.idProduct
  console.log("req.query.idProduct",req.query.idProduct)
  if(idProduct && idProduct.length > 0){
      const data = await promocodeDA.getAllPromocodeByProductId(instanceOfSQLServer, idProduct);
      return res.json(httpUtil.getSuccess(data));
  }

  const data = await promocodeDA.getAllPromocode(instanceOfSQLServer);
  return res.json(httpUtil.getSuccess(data));
};

exports.addPromocode = async (req, res,) => {
  const { idProduct, name, discountInPercentage, isActive } = req.body;
  const [data] = await promocodeDA.checkIfPromocodeExist(instanceOfSQLServer, { name, idProduct, idPromocode: null });

  if (data && +data.isExist === 0) {
    await promocodeDA.addPromocode(instanceOfSQLServer, { idProduct, name, discountInPercentage, isActive });
    return res.json(httpUtil.getSuccess());
  }
  return res.json(httpUtil.getDuplicateRecord());
};

exports.updatePromocode = async (req, res) => {
  const {
    idPromocode, name, idProduct, discountInPercentage, isActive
  } = req.body;
  const [data] = await promocodeDA.checkIfPromocodeExist(instanceOfSQLServer, { name, idProduct, idPromocode });
  if (data && +data.isExist === 1) {
    await promocodeDA.updatePromocode(instanceOfSQLServer, {
      idProduct, name, discountInPercentage, idPromocode, isActive
    });
    return res.json(httpUtil.getSuccess([]));
  }
  return res.json(httpUtil.getBadRequest());
};

exports.deletePromocode = async (req, res,) => {
  const { idPromocode } = req.params;
  await promocodeDA.deletePromocode(instanceOfSQLServer, { idPromocode });
  return res.json(httpUtil.getSuccess(null,'Deleted Successfully'));
};