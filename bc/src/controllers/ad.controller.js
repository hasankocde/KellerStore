"use strict";
const fs = require('fs');
const Ad = require("../models/ad.model");
const Message = require("../models/message.model");
const Favorite = require("../models/favorite.model");

const { Subcategory } = require('../models/category.model');

const { getCoordinatesByPLZ } = require('../helpers/zipcodeHelper');
const { haversineDistance } = require('../helpers/distanceHelper');

module.exports = {
  list: async (req, res) => {
    const data = await Ad.find({})
      .populate("ownerId")
      .populate({
        path: "categoryId",
        select: "categoryName"
      })
      .populate({
        path: "subcategoryId",
        select: "name"
      })
      .populate("addressId")
      .populate("soldUserId")
      .populate("visitedUser")
      .populate({
        path: "messages",
        populate: {
          path: "messages.senderId",
          select: "firstName lastName"
        }
      });
    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    try {
      if (req.files) {
        req.body.images = req.files.map(file => file.path);
      }
      req.body.ownerId = req.user._id;

      const subcategory = await Subcategory.findById(req.body.subcategoryId).populate('parentCategory');
      if (!subcategory) {
        return res.status(400).send({
          error: true,
          message: 'Invalid subcategory ID'
        });
      }

      if (req.body.isSold && req.body.isReserved) {
        return res.status(400).send({
          error: true,
          message: 'An ad cannot be both sold and reserved at the same time.'
        });
      }

      req.body.categoryId = subcategory.parentCategory._id;

      // PLZ'ye göre lokasyon bilgisini al
      if (req.body.PLZ) {
        const locationInfo = getCoordinatesByPLZ(req.body.PLZ);
        if (locationInfo && locationInfo.place) {
          req.body.location = locationInfo.place;
        }
      }

      const data = await Ad.create(req.body);
      res.status(201).send({
        error: false,
        data,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message
      });
    }
  },

  read: async (req, res) => {
    const data = await Ad.findOne({ _id: req.params.id })
      .populate("ownerId")
      .populate({
        path: "categoryId",
        select: "categoryName"
      })
      .populate({
        path: "subcategoryId",
        select: "name"
      })
      .populate("addressId")
      .populate("soldUserId")
      .populate("visitedUser")
      .populate({
        path: "messages",
        populate: {
          path: "messages.senderId",
          select: "firstName lastName"
        }
      });
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, ownerId: req.userId };
  
    const ad = await Ad.findOne(filters);
    if (!ad) {
      return res.status(404).send({
        error: true,
        message: 'Ad not found or you do not have permission to modify this ad.'
      });
    }
  
    if (req.body.isSold && req.body.isReserved) {
      return res.status(400).send({
        error: true,
        message: 'An ad cannot be both sold and reserved at the same time.'
      });
    }
  
    // console.log("İstek Gövdesi (req.body):", req.body);
    // console.log("Silinecek Resimler (req.body.removeImages):", req.body.removeImages);

    // Ensure req.body.removeImages is an array
    const removeImages = Array.isArray(req.body.removeImages) ? req.body.removeImages : [req.body.removeImages];

    // Resim silme işlemi
    if (removeImages && removeImages.length > 0) {
      console.log("Silinecek resimler:", removeImages);
      await Promise.all(removeImages.map(async (imageName) => {
        // imageName kullanarak resimleri buluyoruz
        const imagePath = ad.images.find(imgPath => imgPath.includes(imageName));
        
        if (imagePath) {
          console.log("Silinen resim:", imagePath);
          ad.images = ad.images.filter(img => img !== imagePath);
          await fs.promises.unlink(imagePath);
        }
      }));
    }
  
    // Yeni resimleri ekle
    if (req.files) {
      req.body.images = ad.images.concat(req.files.map(file => file.path));
    } else {
      req.body.images = ad.images; // Resimler güncellenmediyse mevcut resimleri koru
    }

    // console.log("Güncellenmiş Resimler (ad.images):", ad.images);

    if (req.body.isSold === false) {
      req.body.soldUserId = undefined;
      req.body.soldDate = undefined;
    }
    if (req.body.isReserved === false) {
      req.body.reservedUserId = undefined;
      req.body.reservedDate = undefined;
    }
  


    // PLZ'ye göre lokasyon bilgisini güncelle
    if (req.body.PLZ) {
      const locationInfo = getCoordinatesByPLZ(req.body.PLZ);
      if (locationInfo && locationInfo.place) {
        req.body.location = locationInfo.place;
      }
    }



    if ((req.body.isSold !== undefined && req.body.isSold !== ad.isSold) ||
      (req.body.isReserved !== undefined && req.body.isReserved !== ad.isReserved)) {
      if (!req.user.isAdmin && ad.ownerId.toString() !== req.user._id.toString()) {
        return res.status(403).send({
          error: true,
          message: 'You do not have permission to modify the sale or reservation status of this ad.'
        });
      }
  
      if (req.body.isReserved) {
        req.body.reservedUserId = req.body.reservedUserId;
        req.body.reservedDate = new Date();
      } else {
        req.body.reservedUserId = undefined;
        req.body.reservedDate = undefined;
      }
    }
  
    const updatedAd = await Ad.findOneAndUpdate(filters, req.body, {
      new: true,
      runValidators: true
    }).populate("ownerId categoryId addressId soldUserId visitedUser");
  
    if (!updatedAd) {
      return res.status(404).send({
        error: true,
        message: 'Failed to update the ad.'
      });
    }

    // Clear soldUserId and reservedUserId if isSold or isReserved is set to false
    if (req.body.isSold === false) {
      updatedAd.soldUserId = undefined;
      updatedAd.soldDate = undefined;
      await updatedAd.save();
    }
    if (req.body.isReserved === false) {
      updatedAd.reservedUserId = undefined;
      updatedAd.reservedDate = undefined;
      await updatedAd.save();
    }

    res.status(202).send({
      error: false,
      data: updatedAd
    });
  },

  delete: async (req, res) => {
    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, ownerId: req.user._id };
    const ad = await Ad.findOne(filters);
    if (ad && ad.images && ad.images.length > 0) {
      ad.images.forEach(image => {
        fs.unlink(image, (err) => {
          if (err) console.log(`Failed to delete image: ${err}`);
        });
      });
    }
    const data = await Ad.deleteOne(filters);
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },

  incrementVisitorCount: async (req, res) => {
    
    try {
      const ad = await Ad.findById(req.params.id);
      if (!ad) {
        console.log("Ad not found");
        return res.status(404).send({
          error: true,
          message: 'Ad not found'
        });
      }
     
      await ad.incrementVisitorCount(req.userId);
    
      res.status(200).send({
        error: false,
        data: ad
      });
    } catch (error) {
     
      res.status(500).send({
        error: true,
        message: 'Failed to increment visitor count'
      });
    }
  }


, 

listByRadius: async (req, res) => {
  const { PLZ, radius } = req.query;
  if (!PLZ || !radius) {
    return res.status(400).send({ error: true, message: 'PLZ and radius are required.' });
  }

  const userCoords = getCoordinatesByPLZ(PLZ);
  if (!userCoords) {
    return res.status(400).send({ error: true, message: 'Invalid PLZ.' });
  }

  console.log("User Coordinates:", userCoords);

  const allAds = await Ad.find({ isPublish: true })
    .populate("ownerId")
    .populate("categoryId")
    .populate("subcategoryId")
    .populate("addressId");

  const adsWithinRadius = allAds.filter(ad => {
    const adCoords = getCoordinatesByPLZ(ad.PLZ);
    // console.log("Ad Coordinates:", adCoords);
    if (adCoords) {
      const distance = haversineDistance(userCoords, adCoords);
      // console.log(`Distance between ${PLZ} and ${ad.PLZ}:`, distance);
      return distance <= radius;
    }
    return false;
  });

  res.status(200).send({ error: false, data: adsWithinRadius });
},

getLatestAds: async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const data = await Ad.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("ownerId categoryId subcategoryId addressId");
    res.status(200).send({ error: false, data });
  } catch (error) {
    console.error('Error in getLatestAds:', error);
    res.status(500).send({ error: true, message: 'Internal server error' });
  }
},


getPopularAds: async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const ads = await Ad.find({}).populate("ownerId categoryId subcategoryId addressId");
  const adsWithFavorites = await Promise.all(ads.map(async (ad) => {
    const favoriteCount = await Favorite.countDocuments({ adId: ad._id });
    return { ...ad.toObject(), favoriteCount };
  }));
  const sortedAds = adsWithFavorites.sort((a, b) => b.favoriteCount - a.favoriteCount).slice(0, limit);
  res.status(200).send({ error: false, data: sortedAds });
},

getMostViewedAds: async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const data = await Ad.find({})
      .sort({ 'visitedUser': -1 })  // Sort by the length of visitedUser array
      .limit(limit)
      .populate("ownerId categoryId subcategoryId addressId");
    
    // Sort the results manually based on visitedUser length
    const sortedData = data.sort((a, b) => b.visitedUser.length - a.visitedUser.length);
    
    res.status(200).send({ error: false, data: sortedData });
  } catch (error) {
    console.error('Error in getMostViewedAds:', error);
    res.status(500).send({ error: true, message: 'Internal server error' });
  }
},


search: async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.length < 3) {
      return res.status(400).send({
        error: true,
        message: 'Search query must be at least 3 characters long',
      });
    }

    const words = query.trim().split(' ').slice(0, 3);
    const searchRegex = new RegExp(words.join('|'), 'i');

    const ads = await Ad.find({
      $or: [
        { title: { $regex: searchRegex } },
        { content: { $regex: searchRegex } },
      ],
      isPublish: true,
    })
      .populate("ownerId")
      .populate({
        path: "categoryId",
        select: "categoryName"
      })
      .populate({
        path: "subcategoryId",
        select: "name"
      })
      .populate("addressId");

    res.status(200).send({
      error: false,
      data: ads,
    });
  } catch (error) {
    console.error('Error in search:', error);
    res.status(500).send({
      error: true,
      message: 'Internal server error',
    });
  }
}


};


