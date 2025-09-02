const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema ({
     title : {
        type : String,
        required : true,
     },
     description : String,
     image : {
        type : String,
        default :"https://upload.wikimedia.org/wikipedia/commons/0/08/Rajgir_12_hills_panorama_%2831396985691%29.jpg",
                                                                                                                                                                             
        //default image
        set: (v) => v === "" ? "https://upload.wikimedia.org/wikipedia/commons/0/08/Rajgir_12_hills_panorama_%2831396985691%29.jpg"  : v,
     },
     price : Number,
     location : String,
     country : String,
     reviews : [
      {
         type : Schema.Types.ObjectId,
         ref : "Review",
      },
     ],
});
listingSchema.post("findOneAndDelete" , async (listing) => {
   if (listing) {
      await Review.deleteMany({_id : {$in: listing.reviews}});
   }
});
     
const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;