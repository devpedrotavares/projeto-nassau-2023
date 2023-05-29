function Product(props) {

    return (
      <div className="product" key={props.key}>
              <p>{props.item.name}</p>
              <p>{props.item.description}</p>
              <p>{props.item.price}</p>
              <p>{props.item.quantity}</p>
              <button onClick={() => props.handleDelete(props.item.id)} className="add-delete-button">-</button>
          </div>
    );
}

export default Product;