import Table from 'react-bootstrap/Table';
import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';


function Services1(){

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

	function handleChange1(e){
		let date1= (e.target.value+ "T00:00:00.000Z")
		setfilter(date1)
		let date2= new Date(e.target.value);
		let date3= new Date(date2.getFullYear(), date2.getUTCMonth(), date2.getUTCDate(), 20,10);
		setfilter2(date3.toISOString());
	}

	const [project, setProject] = useState([]);

	function createPost(project){
		fetch('http://localhost:4000/service/',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(project)
		})
		.then((resp) => resp.json())
		.then((data) => {
			alert("Cadatrado com Sucesso")
		})
		.catch((err) => console.log(err))
};

function submit(e) {
	e.preventDefault()
	createPost(project)
}

function handleChange(e){
	setProject({...project, [e.target.name] : e.target.value})
	console.log(project)
}


	return(
		<div style={styles2}>

		<Tabs defaultActiveKey="gestaoservice" id="uncontrolled-tab-example" className="mb-3" >
        <Tab eventKey="cadservice" title="Cadastro de serviço">
		<Form onSubmit={submit}>
		<h2>Agendamento de serviços</h2><br/>
		<Form.Group className="mb-3" >
		  <Form.Label >Cliente</Form.Label>
		  <Form.Control name ="name" type="text" onChange={handleChange}/>
		  <Form.Text className="text-muted">
			Nome completo.
		  </Form.Text>
		</Form.Group>

		<Form.Group className="mb-3" >
		  <Form.Label >Telefone</Form.Label>
		  <Form.Control name ="contact" type="number" onChange={handleChange}/>
		  <Form.Text className="text-muted">
			Telefone de contato.
		  </Form.Text>
		</Form.Group>

		<Form.Label >Serviço</Form.Label>
		<Form.Select aria-label="Default select example" name="service" type="text" onChange={handleChange}>
			<option>Clique e selecione uma opção</option>
			<option value="Cabelo">Cabelo</option>
			<option value="Barba">Barba</option>
			<option value="Cabelo/Barba">Cabelo/Barba</option>
		</Form.Select><br/>

		<Form.Group className="mb-3">
		  <Form.Label>Valor</Form.Label>
		  <Form.Control name ="value" type="number" onChange={handleChange}/>
		</Form.Group>
  
		<Form.Group className="mb-3">
		  <Form.Label>Data</Form.Label>
		  <Form.Control name ="date" type="datetime-local" onChange={handleChange} />
		</Form.Group>

		{/* <Form.Group className="mb-3">
		  <Form.Label>Horário</Form.Label>
		  <Form.Control name ="date" type="time" />
		</Form.Group> */}

		<Form.Group className="mb-3" controlId="formBasicCheckbox">
		  <Form.Check type="checkbox" label="Check" />
		</Form.Group>
		<Button variant="primary" type="submit">
		  Salvar
		</Button>
	  </Form>


		</Tab>
		<Tab eventKey="gestaoservice" title="Gestão de serviço">
		<Form>
		<h2>Agendamentos realizados</h2><br/>
		<Form.Group className="mb-3" controlId="formBasicEmail">
		  <Form.Label>Filtro de vigência</Form.Label>
		  <Form.Control name ="filter" type="date" placeholder="Insira a vigência desejada" onChange={handleChange1}/>
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

		</Tab>
		</Tabs>
	  </div>
	);
}
export default Services1;

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