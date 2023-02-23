import Table from 'react-bootstrap/Table';
import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

function DespGestao(){

	const [categories, setCategories] = useState([])

	const [filter, setfilter] = useState("");
	const [ filter2, setfilter2] = useState("");

	useEffect(() => {
	  fetch('http://localhost:4000/despesa/',{
		  method: 'GET',
		  headers: {
			  'Content-Type': 'application/json',
		  },
	  })
	  .then((resp) => resp.json())
	  .then((data) => {
		  setCategories(data)
	  })
	  .catch((err) => console.log(err))
  }, []);

  function deletePost(id){
	fetch(`http://localhost:4000/despesa/${id}`,{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then((resp) => resp.json())
	.then((data) => {
		setCategories(categories.filter((categorie)=> categorie.id !== id))
		alert("Deletado com Sucesso")

	})
	.catch((err) => console.log(err))
};

function pathPost(id){
	fetch(`http://localhost:4000/despesa/${id}`,{
		method: 'PATH',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then((resp) => resp.json())
	.then((data) => {
		alert("Alterado com Sucesso")
	})
	.catch((err) => console.log(err))
};

	function handleChange(e){
		let date1= (e.target.value+ "-01T00:00:00.000Z")
		setfilter(date1)
		let date2= new Date(e.target.value);
		let date3= new Date(date2.getFullYear(), date2.getUTCMonth()+1, 0);
		setfilter2(date3.toISOString());
	}

	const styles2 = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	  };

	  const styles3 = {
		color: "#E9573F",
		backgroundColor: "#000000",
	  };

	  const styles4 = {
		color: "#F6BB42",
		backgroundColor: "#000000",
	  };



	return(
		<div style={styles2}>
		<Form>
		<Form.Group className="mb-3" controlId="formBasicEmail">
		  <Form.Label>Filtro de vigência</Form.Label>
		  <Form.Control name="filter" type="month" placeholder="Insira a vigência desejada" onChange={handleChange}/>
		  <Form.Text className="text-muted">
			Mês e ano a ser filtrado as despesas.
		  </Form.Text>
		</Form.Group>
		</Form>
		<Table striped bordered hover variant="dark" >
		<thead>
		  <tr>
			<th>Nome do Fornecedor</th>
			<th>Contato</th>
			<th>Despesas</th>
			<th>Valor</th>
			<th>Data</th>
			<th>Editar</th>
			<th>Deletar</th>
		  </tr>
		</thead>
		<tbody>
		  <tr>
		  	<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p>{categorie.name}</p>})}</td>
			<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p>{categorie.contact}</p>})}</td>
			<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p>{categorie.service}</p>})}</td>
			<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p>{categorie.value}</p>})}</td>
			<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p>{categorie.date.replace('T00:00:00.000Z', '')}</p>})}</td>
			<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p><button style={styles4} onClick={() => pathPost(categorie._id)}><BsFillPencilFill /></button></p>})}</td>
			<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p><button style={styles3} onClick={() => deletePost(categorie._id)}><BsFillTrashFill/></button></p>})}</td>
		  </tr>
		</tbody>
	  </Table>
	  </div>
	);
}

export default DespGestao;

	// function handleChange(e){
	// 	setfilter(e.target.value + "T00:00:00.000Z")
	// 	let date2= new Date(e.target.value);
	// 	let date3= new Date(date2.getFullYear(), date2.getUTCMonth()+1, 0);
	// 	setfilter2(date3.toISOString());
	// }