import {useState} from 'react';

function ProductInput(props){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(0);

    return(
        <div className="product">
            <input className="product-input" value={name} onChange={(e) => setName(e.target.value)}/>
            <input className="product-input" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input className="product-input" type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
            <input className="product-input" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
            <button onClick={() => props.handleAdd({"name":name, "description":description, "price":price, "quantity":quantity})} className="add-delete-button">+</button>
        </div>
    );
}

export default ProductInput;