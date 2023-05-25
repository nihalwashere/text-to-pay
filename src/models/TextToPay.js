const mongoose = require("mongoose");

const collection = "TextToPay";

const { Schema } = mongoose;

const { TextToPayFlow, TextToPayStatus } = require("../constants/TextToPay");
const { VariationSchema } = require("./common");

const TextToPaySchema = new Schema(
  {
    phone: {
      type: String
    },
    steps: {
      type: Array
    },
    demoType: {
      type: String
    },
    flow: {
      type: String,
      enum: Object.values(TextToPayFlow)
    },
    currentStep: {
      type: String
    },
    status: {
      type: String,
      enum: Object.values(TextToPayStatus)
    },
    quantity: {
      type: Number
    },
    selectedVariation: {
      type: VariationSchema,
      default: null
    }
  },
  { timestamps: true, collection }
);

const TextToPay = mongoose.model(collection, TextToPaySchema);

module.exports = TextToPay;
