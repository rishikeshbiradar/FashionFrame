import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import logo from "./Assets/Logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  // Defining Default Products
  const initialProducts = [
    {
      id: uuidv4(),
      image: "https://images.pexels.com/photos/6310924/pexels-photo-6310924.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "jeshvi fashion Men Solid Casual Dark Blue, Green Shirt",
      gender: 'Men',
      price: 670,
      color: 'Dark Blue and Green',
      size: 'XL',
    },
    {
      id: uuidv4(),
      image: "https://images.pexels.com/photos/9286143/pexels-photo-9286143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      name: "MISS CLOTHING Women Kurta Dupatta Set",
      gender: 'Women',
      price: 690,
      color: 'White and Pink',
      size: 'L',
    },
  ];


  // Defining UseState Hooks For Tracking Inputs
  const [products, setProducts] = useState(initialProducts);
  const [newProductImage, setNewProductImage] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductGender, setNewProductGender] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductColor, setNewProductColor] = useState('');
  const [newProductSize, setNewProductSize] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Defining UseState Hooks For Tracking Inputs Validations
  const [isNameValid, setIsNameValid] = useState(false);
  const [isImageValid, setIsImageValid] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(false);


  // Function For Adding The Product
  const handleAddProduct = () => {

    // Input Validation
    if (!isNameValid || !isImageValid || !isPriceValid) {
      alert('Please fill out all required fields.'); 
      return;
    }

    addProduct({
      image: newProductImage,
      name: newProductName,
      price: newProductPrice,
      gender: newProductGender,
      color: newProductColor,
      size: newProductSize
    });

    setIsModalOpen(false); 
  };

  // Function For Opening The Input Model
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function For Closing The Input Model
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to Product Image Validation
  const validateImage = (value) => {
    setIsImageValid(!!value.trim());
  };

  // Function to Product Name Validation
  const validateName = (value) => {
    setIsNameValid(!!value.trim());
  };

  // Function to Product Price Validation
  const validatePrice = (value) => {
    setIsPriceValid(!!value.trim());
  };


  // Defining Draggeble Function To Move the Products To and Fro
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setProducts(items);
  };


  // Function For Adding Products
  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: uuidv4(),
        image: newProductImage || 'https://via.placeholder.com/150',
        name: newProductName,
        gender: newProductGender,
        price: parseFloat(newProductPrice),
        color: newProductColor,
        size: newProductSize,
      },
    ]);


    // Clearing The Input Fields After Adding The Product
    setNewProductImage('');
    setNewProductName('');
    setNewProductGender('');
    setNewProductPrice('');
    setNewProductColor('');
    setNewProductSize('')

  };


  // Function For Deleting The Product
  const deleteProduct = (id) => {
    const filteredProducts = products.filter((product) => product.id !== id);
    setProducts(filteredProducts);
  };


  // Function For Copying The Entire Code
  const codeToCopyRef = useRef(null);
  const [copied, setCopied] = useState(false);


  // Funtion For Formatting The HTML Code
  const formatHTML = (html) => {
    const tab = '  ';
    let formattedHTML = '';
    let indentLevel = 0;

    html.split(/>\s*</).forEach((element) => {
      if (element.match(/^\/\w/)) {
        indentLevel--;
      }

      formattedHTML += `${tab.repeat(indentLevel)}<${element}>\n`;

      if (element.match(/^<?\w[^>]*[^/]$/)) {
        indentLevel++;
      }
    });

    return formattedHTML.trim();
  };


  // Funtion For Copy Button
  const copyCode = () => {
    const codeToCopy = formatHTML(codeToCopyRef.current.innerHTML);
    navigator.clipboard.writeText(codeToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div ref={codeToCopyRef} className="container mx-auto">

      <div className="flex items-center justify-between">

        <div className="flex items-center">
          <img src={logo} alt="FashionFrame Logo" className="h-12 rounded-full mx-5" />
          <h1 className="text-black text-3xl md:text-xl lg:text-2xl xl:text-3xl font-bold font-serif py-2 my-3">FashionFrame</h1>
        </div>

        <div>
          <button
            className="bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4 m-3 rounded"
            onClick={() => {
              setIsModalOpen(true);
              setIsNameValid(false); // Reset validation on modal open
              setIsImageValid(false);
              setIsPriceValid(false);
            }}>
            Add Product
          </button>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-3 rounded" onClick={() => {
            copyCode();
            toast.success("Code copied!", {
              position: "bottom-right",
              autoClose: 2000
            });
          }}>Copy Code</button>

        </div>

      </div>


      <div>
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-2xl  leading-6 font-bold text-gray-900">Add Product</h3>
                      <div className="mt-2">
                        <div className="mb-4">
                          <div className="mb-2">
                            
                            <input required
                              type="text"
                              value={newProductImage}
                              onChange={(e) => {
                                setNewProductImage(e.target.value);
                                validateImage(e.target.value);
                              }}
                              placeholder="Enter Image URL"
                              className="border border-gray-400 p-2 rounded m-1 my-2 w-full"
                            />

                            <input required
                              type="text"
                              value={newProductName}
                              onChange={(e) => {
                                setNewProductName(e.target.value);
                                validateName(e.target.value);
                              }}
                              placeholder="Enter Product Name"
                              className="border border-gray-400 p-2 rounded m-1 my-2 w-full "
                            />
                            <input required
                              type="number"
                              value={newProductPrice}
                              onChange={(e) => {
                                setNewProductPrice(e.target.value);
                                validatePrice(e.target.value);
                              }}
                              placeholder="Enter Price"
                              className="border border-gray-400 p-2 rounded m-1 my-2 w-full"
                            />

                            <select
                              value={newProductGender}
                              onChange={(e) => setNewProductGender(e.target.value)}
                              className="border border-gray-400 p-2 rounded m-1 my-2 w-full "
                            >
                              <option value="">Select Gender</option>
                              <option value="Men">Men</option>
                              <option value="Women">Women</option>
                              <option value="Unisex">Unisex</option>
                            </select>

                            <input required
                              type="text"
                              value={newProductColor}
                              onChange={(e) => setNewProductColor(e.target.value)}
                              placeholder="Enter Color"
                              className="border border-gray-400 p-2 rounded m-1 my-2 w-full"
                            />

                            <select
                              value={newProductSize}
                              onChange={(e) => setNewProductSize(e.target.value)}
                              className="border border-gray-400 p-2 rounded m-1 my-2 w-full"
                            >
                              <option value="">Select Size</option>
                              <option value="S">S</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                              <option value="XXL">XXL</option>
                            </select>

                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleAddProduct}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Product
                  </button>
                  <button
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>

        <Droppable droppableId="products">
          {(provided) => (
            <div className='flex flex-row justify-center flex-wrap ' ref={provided.innerRef} {...provided.droppableProps}>
              {products.map((product, index) => (
                <Draggable key={product.id} draggableId={product.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex flex-col justify-between bg-gray-200 px-8 py-8 m-5 rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">

                      <div>
                        <img src={product.image} alt={product.name} className="w-60 h-60 object-contain" />
                      </div>

                      <div>
                        <div className="mb-2 font-extrabold text-xl md:text-lg lg:text-lg xl:text-xl">Name: {product.name}</div>
                        <div className="mb-2 font-bold text-xl md:text-base lg:text-lg xl:text-2xl">Price: {product.price.toFixed(0)}Rs</div>
                        <div className="mb-2 font-semibold text-xl md:text-base lg:text-4xl xl:text-xl">Gender: {product.gender}</div>
                        <div className="mb-2 font-semibold text-xl md:text-base lg:text-lg xl:text-xl">Color: {product.color}</div>
                        <div className="mb-2 font-semibold text-xl md:text-base lg:text-lg xl:text-xl">Size: {product.size}</div>
                      </div>

                      <div className="flex justify-end">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded" onClick={() => deleteProduct(product.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>

                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ToastContainer />
    </div>

  );
};

