const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
	category: {
		type: String,
	},
	tags: {
	  type: String
	},
	 // organisation info
	 admin: {
		adId: {
		  type: mongoose.Schema.Types.ObjectId,
		},
		username: {
		  type: String,
		},
		email: {
		  type: String,
		},
	  },
	
    comment: [
      {   
        name: {
          type: String,
        },
		email: {
			type: String,
		},
		message: {
			type: String,
		},
        appliedAt: {
          type: Date,
        },
      
      },
    ],
  },
  
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
