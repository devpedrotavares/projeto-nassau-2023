function OrderPair({item, orderProducts, setOrderProducts, key}) {
  
    return (
      <div className="order-product" key={key}>
              <p>{item.quantity}</p>
              <p>{item.productName}</p>
              <button onClick={() => setOrderProducts(orderProducts.filter((orderProduct) => orderProduct.id !== item.id))} className="add-delete-button">-</button>
          </div>
    );
}

export default OrderPair;