import {useState} from 'react';

function Modal({setOpenModal, handleAddOrder, products}) {
    const [orderPairs, setOrderPairs] = useState([]);

    const handleAddOrderPair = (orderPair) => {
        setOrderPairs([...orderPairs, orderPair]);
    }
    
    const handleDeleteOrderPair = (productId) => {
        setOrderPairs(orderPairs.filter((each) => each.productId !== productId));
    }

    return (
    <div className="card" id="order-pairs">
        <h1>Criação de pedido</h1>
  
        <div className="titulo">
          <h2>Quantidade</h2>
          <h2>Produto</h2>
        </div>

        <div className="products">
          {orderPairs.map((orderPair, index) => <OrderPair key={index} orderPair={orderPair} handleDeleteOrderPair={handleDeleteOrderPair} products={products}/>
          )}
        </div>

        <div className="products">
          <OrderPairInput products={products} handleAddOrderPair={handleAddOrderPair}/>
        </div>

        <button id='add-order-button' className="modal-button" onClick={() => handleAddOrder(orderPairs)}>Criar Pedido</button>
        <button className="cancel-button modal-button" onClick={() => setOpenModal(false)}>Cancelar</button>

      </div>
    );
}

function OrderPair({orderPair, handleDeleteOrderPair, key, products}) {

    const productName = products?.filter(product => product.id === parseInt(orderPair.productId))[0]?.name;

    return (
      <div className="product" key={key}>
              <p>{orderPair.quantity}</p>
              <p>{productName}</p>

              <button onClick={() => handleDeleteOrderPair(orderPair.productId)} className="add-delete-button">-</button>
          </div>
    );
}

function OrderPairInput({products, handleAddOrderPair}){
    const [quantity, setQuantity] = useState(0);
    const [productId, setProductId] = useState(products[0]?.id);

    return(
        <div>
            <input value={quantity} type="number" onChange={(e) => setQuantity(e.target.value)}/>

            <select className="order-input" onChange={(e) => setProductId(e.target.value)}>
              {products.map(products => (<option value={products.id}> {products.name} </option>))}
            </select>

            <button onClick={() => handleAddOrderPair({"quantity":quantity, "productId":productId})} className="add-delete-button">+</button>
        </div>
    );
}

export default Modal;