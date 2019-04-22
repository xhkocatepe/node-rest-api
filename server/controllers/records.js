/** record Model from 'records' Schema */
let RecordModel = require('../models/record');

/** to get records from client-side request  */
module.exports.get = (req, res, next) => {
  /** payload Property Mapping */
  var sStartDate = req.body.startDate;
  var sEndDate = req.body.endDate;
  var iMinCount = req.body.minCount;
  var iMaxCount = req.body.maxCount;

  /** aggreation with defined conditions  */
  RecordModel.aggregate([
    {
      $addFields: {
        dateString: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt"
          }
        }
      }
    },
    {
      $match: {
        dateString: {
          $gte: sStartDate,
          $lte: sEndDate
        }
      }
    },
    {
      $project: {
        _id: false,
        totalCount: {
          $sum: "$counts"
        },
        createdAt: true,
        key: true
      }
    },
    {
      $match: {
        totalCount: {
          $gte: iMinCount,
          $lte: iMaxCount
        }
      }
    },
  ]).then((records) => {
    /** response data which is prepared for the client-side 
     *  PS: it would be better to create 'response' success and error Object globally.
     *      it is used in various functions.
    */
    var response =
    {
      "code": 0,
      "msg": "Success",
      "records": records
    };

    res.json(response);
  }).catch((err) => {
    next(e)
  });
};