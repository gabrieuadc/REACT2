import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from 'react';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

function Estoque(){


	const [desabilitar, setDesabilitar] = useState(true);
	const [project, setProject] = useState([]);
	const [categories, setCategories] = useState([])

	useEffect(() => {
		fetch('http://localhost:4000/estoque/',{
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

	function createPost(project){
		fetch('http://localhost:4000/estoque/',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(project)
		})
		.then((resp) => resp.json())
		.then((data) => {
			alert("Cadatrado com Sucesso")
			window.location.reload(true)
		})
		.catch((err) => console.log(err))
};

function deletePost(id){
	fetch(`http://localhost:4000/estoque/${id}`,{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then((resp) => resp.json())
	.then((data) => {
		setCategories(categories.filter((categorie)=> categorie.id !== id))
		alert("Deletado com Sucesso")
		window.location.reload(true)

	})
	.catch((err) => console.log(err))
};

function pathPost(id){
	fetch(`http://localhost:4000/estoque/${id}`,{
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

function submit(e) {
	e.preventDefault()
	createPost(project)
}

function desabilitar1(e) {
	setDesabilitar(false);
}

function desabilitar2(e) {
	setDesabilitar(true);
}

function handleChange(e){
	setProject({...project, [e.target.name] : e.target.value})
	console.log(project)
}

const styles3 = {
	color: "#E9573F",
	backgroundColor: "#000000",
  };

  const styles4 = {
	color: "#F6BB42",
	backgroundColor: "#000000",
  };

	return(
		<div>
			<h3>Cadastro de Estoque</h3><br></br>
				<Form onSubmit={submit}>
					<Row>
						<Col>
						<FloatingLabel label="Produto" className="mb-2">
						<Form.Control disabled={desabilitar} type="text" placeholder="Produto" name="prod" onChange={handleChange}/>
						</FloatingLabel>
						</Col>
						<Col>
						<FloatingLabel label="Unidade" className="mb-2">
						<Form.Control disabled={desabilitar} type="text" placeholder="Unidade" name="un" onChange={handleChange}/>
						</FloatingLabel>
						</Col>	
						<Col>
						<FloatingLabel label="Quantidade" className="mb-2">
						<Form.Control disabled={desabilitar} type="number" placeholder="Quantidade" name="qtd" onChange={handleChange}/>
						</FloatingLabel>
						</Col>
						<Col>
						<FloatingLabel label="Valor" className="mb-2">
						<Form.Control disabled={desabilitar} type="number" placeholder="Valor" name="value" onChange={handleChange}/>
						</FloatingLabel>
						</Col>
						<Col>
						<FloatingLabel label="Data" className="mb-2">
						<Form.Control disabled={desabilitar} type="date" placeholder="Data" name="date" onChange={handleChange}/>
						</FloatingLabel>
						</Col>				
						<Col sm="3">
						<Button variant="primary" onClick={()=> desabilitar1()}>Novo
						</Button>
						<Button variant="primary" onClick={()=> desabilitar2()}>Cancelar
						</Button>
						<Button variant="primary" type="submit">Gravar
						</Button>
						</Col>
					</Row>
					</Form>
					<br></br><br></br>

			<Table striped bordered hover variant="dark" >
			<thead>
			<tr>
				<th>Produto</th>
				<th>Unidade</th>
				<th>Quantidade</th>
				<th>Data</th>
				<th>Editar</th>
				<th>Deletar</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{categorie.prod}</p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{categorie.un}</p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{categorie.qtd}</p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{new Date (categorie.date).toLocaleDateString()}</p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p><button style={styles4} onClick={() => pathPost(categorie._id)}><BsFillPencilFill /></button></p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p><button style={styles3} onClick={() => deletePost(categorie._id)}><BsFillTrashFill/></button></p>})}</td>
				</tr>
			</tbody>
		</Table>
	  </div>
	);
}

export default Estoque;

		{/* <Form >
		<h2>Cadastro de Estoque</h2><br/>
		<Form.Group className="mb-3" >
		  <Form.Label >Produto</Form.Label>
		  <Form.Control type="text" />
		  <Form.Text className="text-muted">
			Nome do Produto.
		  </Form.Text>
		</Form.Group>

		<Form.Group className="mb-3" >
		  <Form.Label >Unidade</Form.Label>
		  <Form.Control type="text" />
		  <Form.Text className="text-muted">
			Unidade de medida.
		  </Form.Text>
		</Form.Group>

		<Form.Group className="mb-3" >
		  <Form.Label>Quantidade</Form.Label>
		  <Form.Control type="number" />
		  <Form.Text className="text-muted">
			Quantidade do produto.
		  </Form.Text>
		</Form.Group>

		<Form.Group className="mb-3">
		  <Form.Label>Valor</Form.Label>
		  <Form.Control type="number" />
		</Form.Group>
  
		<Form.Group className="mb-3">
		  <Form.Label>Data</Form.Label>
		  <Form.Control type="date" />
		</Form.Group>

		<Form.Group className="mb-3" controlId="formBasicCheckbox">
		  <Form.Check type="checkbox" label="Check" />
		</Form.Group>
		<Button variant="primary" type="submit">
		  Salvar
		</Button>
	  </Form> */}