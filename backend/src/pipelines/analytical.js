module.exports.AnalisysPipeline = (limit = 5) => [
  { $limit: limit },
  {
    $facet: {
      haveWater: [
        { $match: { haveWater: true } },
        { $group: { _id: null, count: { $sum: 1 } } }
      ],
      dontHaveWater: [
        { $match: { haveWater: false } },
        { $group: { _id: null, count: { $sum: 1 } } }
      ],
      satelliteAvg: [{ $group: { _id: null, avg: { $avg: '$satellite' } } }],
      orbitalPeriodAvg: [
        { $group: { _id: null, avg: { $avg: '$orbitalPeriod' } } }
      ]
    }
  },
  {
    $addFields: {
      haveWater: { $ifNull: [{ $first: '$haveWater.count' }, 0] },
      dontHaveWater: { $ifNull: [{ $first: '$dontHaveWater.count' }, 0] },
      satelliteAvg: { $ifNull: [{ $first: '$satelliteAvg.avg' }, 0] },
      orbitalPeriodAvg: { $ifNull: [{ $first: '$orbitalPeriodAvg.avg' }, 0] }
    }
  }
];
