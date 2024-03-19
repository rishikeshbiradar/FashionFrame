import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function App() {

  // Default Products
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

  // Defining UseState Hooks
  const [products, setProducts] = useState(initialProducts);
  const [newProductImage, setNewProductImage] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductGender, setNewProductGender] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductColor, setNewProductColor] = useState('');
  const [newProductSize, setNewProductSize] = useState('');

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
      <div className="mb-4">
        <input
          type="text"
          value={newProductImage}
          onChange={(e) => setNewProductImage(e.target.value)}
          placeholder="Enter Image URL"
          className="border border-gray-400 p-2 rounded m-1"
        />
        <input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="Enter Product Name"
          className="border border-gray-400 p-2 rounded m-1 "
        />
        <input
          type="number"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
          placeholder="Enter Price"
          className="border border-gray-400 p-2 rounded m-1 mx-2"
        />
        <input
          type="text"
          value={newProductGender}
          onChange={(e) => setNewProductGender(e.target.value)}
          placeholder="Enter Gender"
          className="border border-gray-400 p-2 rounded m-1"
        />

        <input
          type="text"
          value={newProductColor}
          onChange={(e) => setNewProductColor(e.target.value)}
          placeholder="Enter Color"
          className="border border-gray-400 p-2 rounded m-1 mx-2"
        />
        <input
          type="text"
          value={newProductSize}
          onChange={(e) => setNewProductSize(e.target.value)}
          placeholder="Enter Size"
          className="border border-gray-400 p-2 rounded m-1"
        />

      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-3 rounded"
          onClick={addProduct}
        >
          Add Product
        </button>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-3 rounded" onClick={copyCode}>Copy Code</button>
          {copied && <span>Code copied!</span>}
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="products">
          {(provided) => (
            <div className='flex flex-row justify-center flex-wrap ' ref={provided.innerRef} {...provided.droppableProps}>
              {products.map((product, index) => (
                <Draggable key={product.id} draggableId={product.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex flex-col justify-between  bg-gray-200 px-8 py-8 m-5 rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                    >
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
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => deleteProduct(product.id)}
                        >
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
    </div>

  );
};

