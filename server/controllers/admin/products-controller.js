const { imageUploadUtil } = require("../../helper/cloudinary");
const Product = require("../../models/Product");

//product image upload handler
const handleImageUpload = async (req, res) => {
  try {
    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Extract buffer and MIME type
    const fileBuffer = req.file.buffer;
    const mimeType = req.file.mimetype;

    // Upload the image to Cloudinary
    const result = await imageUploadUtil(fileBuffer, mimeType);

    // Respond with the uploaded image's details
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
     data: result
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
    });
  }
};

//for admin
//add new Product
//fetch all products
//edit a product
//delete a product

//add new Product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

const newlyCreatedProduct= new Product({
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
})

await newlyCreatedProduct.save();
res.status(200).json({
    success: true,
    message: "Product added successfully",
    data: newlyCreatedProduct
})


  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error adding product",
    });
  }
};

//fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listAllProducts= await Product.find({});

    res.status(200).json({
        success: true,
        message: "Products Fetch successfully",
        data: listAllProducts
    });



  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error fetchAllProducts",
    });
  }
};

//edit a product

const editProduct = async (req, res) => {
  try {

    const {id}= req.params;
    const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
      } = req.body;

      const findProduct= await Product.findById(id);

      if(!findProduct){
        return res.status(404).json({
            status: false,
            message: "Product not found",

        });
      }

      findProduct.title= title || findProduct.title;
      findProduct.description= description || findProduct.description;
      findProduct.category= category || findProduct.category;
      findProduct.brand= brand || findProduct.brand;
      findProduct.price= price || findProduct.price;
      findProduct.salePrice= salePrice || findProduct.salePrice;
      findProduct.totalStock= totalStock || findProduct.totalStock;
      findProduct.image= image || findProduct.image;

      await findProduct.save(); 
      res.status(200).json({
        status: true,
        message: "Product updated successfully",
        data: findProduct

      })




    


  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error adding product",
    });
  }
};

//delete a product

const deleteProduct = async (req, res) => {
  try {

    const {id}= req.params;

    const product= await Product.findByIdAndDelete(id);

    if(!product){
      return res.status(404).json({
          status: false,
          message: "Product not found",

      });
    }
    res.status(200).json({
        status: true,
        message: "Product deleted successfully",
    })



  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error adding product",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
