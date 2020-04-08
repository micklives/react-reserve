import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await onGetRequest(req, res);
      break;
    case "DELETE":
      await onDeleteRequest(req, res);
      break;
    case "POST":
      await onPostRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const onGetRequest = async (req, res) => {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).json(product);
};

const onPostRequest = async (req, res) => {
  const { name, price, description, mediaUrl } = req.body;
  try {
    if (!name || !price || !description || !mediaUrl) {
      return res.status(422).send("Product missing one or more fields.");
    }
    const product = await new Product({
      name,
      price,
      description,
      mediaUrl,
    }).save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating product on the server"); // server errors
  }
};

const onDeleteRequest = async (req, res) => {
  const { _id } = req.query;
  await Product.findOneAndDelete({ _id });
  res.status(204).json({});
};
