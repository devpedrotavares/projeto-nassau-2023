import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import Product from './Product';
import Modal from './Modal/Modal'
import "./products.css";

function OrdersPage({setPage}) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const API_URL = "http://localhost:8080/orders";
    
  async function doFetchOrders(){
      try{
        const response = await fetch(API_URL, {
          method: 'GET'
        })
        
        if(response.ok){
          const body = await response.json();

          if(body.items) {
            const convertedBody = body.map(element => {
              const newElement = element;
              newElement.items = JSON.parse(body.items)
              return newElement;
            });

            setOrders(convertedBody);
          }
        }

      } catch(error){
          alert("Um erro ocorreu...");
          console.log(error);
      }
    }

    async function doFetchProducts(){
      try{
        const response = await fetch("http://localhost:8080/products", {
          method: 'GET'
        })
        
        if(response.ok){
          const body = await response.json();
          setProducts(body);
        }

      } catch(error){
          alert("Um erro ocorreu...");
          console.log(error);
      }
    }

    useEffect(() => {
      doFetchOrders()
    }, []);

    useEffect(() => {
      doFetchProducts()
    }, []);

    async function handleDeleteOrder(id){
      try{
        const response = await fetch(API_URL + "/" + id, {
          method: 'DELETE'
        })

        if(response.ok){
          setOrders(orders.filter(order => order.id !== id));
        }
        else{
          alert("Não foi possível deletar...");
        }

      } catch(error){
          alert("Um erro ocorreu...");
          console.log(error);
      }
    }

    async function handleAddOrder(orderPairs){
        
        for (let index = 0; index < orderPairs.length; index++) {
          const orderPair = orderPairs[index];
          
          try{
            const response = await fetch("http://localhost:8080/products/" + orderPair.productId + "/" + orderPair.quantity, {
              method: 'PUT',
              headers: {
                "Content-Type": "application/json"
              }
            })

            if(response.ok) {
              setOpenModal(false);
            }
            else {
              alert("Não foi possível efetuar o pedido...");
              break;
            }

          }
          catch(error) {
            alert("Um erro ocorreu...");
            console.log(error);
            break;
          }
        }

        //POSTING the order (just has the items)

        try{
          const response = await fetch("http://localhost:8080/orders", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({items: JSON.stringify(orderPairs)})
          })

          if(response.ok) {
            const body = await response.json();

            if(body.items) {
              setOrders([...orders, {id:body.id, items:JSON.parse(body.items)}]);
            }
            
          }
          else {
            alert("Não foi possível adicionar o pedido...");
          }

        }
        catch(error) {
          alert("Um erro ocorreu...");
          console.log(error);
        }
    }

  return (
    <div>
      <div className="card" id="products">

      {!openModal ? 
        (
        <>
          <h1>Pedidos</h1>
            <div className="titulo">
              <h2>ID</h2>
              <h2>Itens</h2>
            </div>
            <div className="products">
              {orders.map((order, index) => <Order key={index} order={order} handleDeleteOrder={handleDeleteOrder} products={products}/>)}
            </div>

            <button onClick={() => setOpenModal(true)}>Criar Pedido</button>
          </>) : <Modal setOpenModal={setOpenModal} handleAddOrder={handleAddOrder} products={products}></Modal>
        }

      </div>

      <button onClick={() => setPage("MainPage")}>Voltar</button>
    </div>
    
  );
}

const Order = ({order, handleDeleteOrder, key, products}) => {

  console.log(products);

  function getProductName(id) {
    return products.filter(product => product.id === id)[0]?.name;
  }

  return (
    <div className="product" key={key}>
            <p>{order.id}</p>
            <select>
              {order.items.map(orderItem => (<option> {getProductName(parseInt(orderItem.productId))} </option>))}
            </select>
            <button onClick={() => handleDeleteOrder(order.id)} className="add-delete-button">-</button>
        </div>
  );
}

export default OrdersPage;