import Table from 'react-bootstrap/Table';
import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";


function Andamento(){

	const [categories, setCategories] = useState([])

	const [filter, setfilter] = useState("");
	const [ filter2, setfilter2] = useState("");

	useEffect(() => {
	  fetch('http://localhost:4000/service/',{
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
	fetch(`http://localhost:4000/service/${id}`,{
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
	fetch(`http://localhost:4000/service/${id}`,{
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

	function handleChange(e){
		let date1= (e.target.value+ "T00:00:00.000Z")
		setfilter(date1)
		let date2= new Date(e.target.value);
		let date3= new Date(date2.getFullYear(), date2.getUTCMonth(), date2.getUTCDate(), 20,10);
		setfilter2(date3.toISOString());
	}


	return(
		<div style={styles2}>
		<Form>
		<h2>Agendamentos realizados</h2><br/>
		<Form.Group className="mb-3" controlId="formBasicEmail">
		  <Form.Label>Filtro de vigência</Form.Label>
		  <Form.Control name ="filter" type="date" placeholder="Insira a vigência desejada" onChange={handleChange}/>
		  <Form.Text className="text-muted">
			Mês e ano a ser filtrado os serviços.
		  </Form.Text>
		</Form.Group>
		</Form>
		<Table striped bordered hover variant="dark" >
		<thead>
		  <tr>
			<th>Nome do cliente</th>
			<th>Contato</th>
			<th>Serviço</th>
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
			<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p>{new Date (categorie.date).toLocaleDateString() + " " + new Date (categorie.date).toLocaleTimeString()}</p>})}</td>
			<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p><button style={styles4} onClick={() => pathPost(categorie._id)}><BsFillPencilFill /></button></p>})}</td>
			<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p><button style={styles3} onClick={() => deletePost(categorie._id)}><BsFillTrashFill/></button></p>})}</td>
			{/* <td><button style={styles4} ><BsFillPencilFill /></button></td>
			<td><button style={styles3} onClick={() => deletePost("63bb7cb94fd3fbd96093d855")}><BsFillTrashFill/></button></td> */}
		  </tr>
		</tbody>
	  </Table>
	  </div>
	);
}
export default Andamento;

{/* <td><p><BsFillPencilFill/></p></td>
<td><p><BsFillTrashFill/></p></td> */}

{/* <tr>
<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p>{categorie.name}</p>})}</td>
<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p>{categorie.contact}</p>})}</td>
<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p>{categorie.service}</p>})}</td>
<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p>{categorie.value}</p>})}</td>
<td>{categories.map( (categorie) => {if (new Date(categorie.date) >= (new Date(filter)) && new Date(categorie.date) <= (new Date(filter2))) return <p>{new Date (categorie.date).toLocaleDateString() + " " + new Date (categorie.date).toLocaleTimeString()}</p>})}</td>
<td><p><button style={styles4} href=""><BsFillPencilFill /></button></p></td>
<td><p><button style={styles3}><BsFillTrashFill/></button></p></td>
</tr> */}