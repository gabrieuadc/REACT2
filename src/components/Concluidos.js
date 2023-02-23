import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

function Concluidos(){

	const [categories, setCategories] = useState([])
	const [project, setProject] = useState([]);
	const [desabilitar, setDesabilitar] = useState(true);


	useEffect(() => {
		fetch('http://localhost:4000/empregado/',{
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
		fetch('http://localhost:4000/empregado/',{
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
	fetch(`http://localhost:4000/empregado/${id}`,{
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
		<div><p>
			<h3>Cadastro de Empregados</h3><br></br></p>
		<Form onSubmit={submit}>
			<Row>
				<Col>
				<FloatingLabel label="Nome" className="mb-2">
				<Form.Control disabled={desabilitar} type="text" placeholder="Nome" name="name" onChange={handleChange}/>
				</FloatingLabel>
				</Col>
				<Col>
				<FloatingLabel label="Telefone" className="mb-2">
				<Form.Control disabled={desabilitar} type="number" placeholder="Telefone" name="contact" onChange={handleChange}/>
				</FloatingLabel>
				</Col>	
				<Col>
				<FloatingLabel label="Serviço" className="mb-2">
				<Form.Control disabled={desabilitar} type="text" placeholder="Serviço" name="service" onChange={handleChange}/>
				</FloatingLabel>
				</Col>
				<Col>
				<FloatingLabel label="Salário" className="mb-2">
				<Form.Control disabled={desabilitar} type="number" placeholder="Salário" name="salar"onChange={handleChange}/>
				</FloatingLabel>
				</Col>
				<Col>
				<FloatingLabel label="Data de admissão" className="mb-2">
				<Form.Control disabled={desabilitar} type="date" placeholder="Data de admissão" name="adm" onChange={handleChange}/>
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
			<br></br><br></br><br></br>

			<Table striped bordered hover variant="dark" >
			<thead>
			<tr>
				<th>Nome</th>
				<th>Contato</th>
				<th>Serviço</th>
				<th>Salário</th>
				<th>Admissão</th>
				<th>Editar</th>
				<th>Deletar</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{categorie.name}</p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{categorie.contact}</p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{categorie.service}</p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{categorie.salar}</p>})}</td>
				{/* <td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{categorie.adm}</p>})}</td> */}
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{new Date (categorie.adm).toLocaleDateString()}</p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p><button style={styles4} onClick={() => pathPost(categorie._id)}><BsFillPencilFill /></button></p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p><button style={styles3} onClick={() => deletePost(categorie._id)}><BsFillTrashFill/></button></p>})}</td>
				</tr>
			</tbody>
		</Table>

			{/* <Form onSubmit={submit}>
			<Row>
				<Col>
				<FloatingLabel label="Nome" className="mb-2">
				<Form.Control disabled={desabilitar} type="text" placeholder="Nome" onChange={handleChange}/>
				</FloatingLabel>
				</Col>
				<Col>
				<FloatingLabel label="Telefone" className="mb-2">
				<Form.Control disabled={desabilitar} type="number" placeholder="Telefone" onChange={handleChange}/>
				</FloatingLabel>
				</Col>	
				<Col>
				<FloatingLabel label="Serviço" className="mb-2">
				<Form.Control disabled={desabilitar} type="text" placeholder="Serviço" onChange={handleChange}/>
				</FloatingLabel>
				</Col>
				<Col>
				<FloatingLabel label="Salário" className="mb-2">
				<Form.Control disabled={desabilitar} type="number" placeholder="Salário" onChange={handleChange}/>
				</FloatingLabel>
				</Col>
				<Col>
				<FloatingLabel label="Data de admissão" className="mb-2">
				<Form.Control disabled={desabilitar} type="date" placeholder="Data de admissão" onChange={handleChange}/>
				</FloatingLabel>
				</Col>				
				<Col sm="3">
				<Button variant="primary" type="submit" onClick={()=> desabilitar1()}>Editar
				</Button>
				<Button variant="primary" type="submit" onClick={()=> desabilitar2()}>Gravar
				</Button>
				<Button variant="primary" type="submit">Deletar
				</Button>
				</Col>
			</Row>
			</Form> */}
	  </div>

	);
}

export default Concluidos;

// const andStatus = categories.filter((andStatus, index, array) => andStatus.status == 0);
// console.log(andStatus.name);

// verificaStatusAndamento();

// function verificaStatusAndamento(categories){
// 	{categories.map( (categorieAndamento) => {if (categorieAndamento.status == 0) return categorieAndamento})}
// }
// fetch('http://localhost:4000/service/',{

{/* <Form onSubmit={submit}>
<h2>Cadastro de empregados</h2><br/>
<Form.Group className="mb-3" >
  <Form.Label >Nome</Form.Label>
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

<Form.Group className="mb-3" >
  <Form.Label >Serviço</Form.Label>
  <Form.Control name ="service" type="text" onChange={handleChange}/>
  <Form.Text className="text-muted">
	Telefone de contato.
  </Form.Text>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Salário</Form.Label>
  <Form.Control name ="value" type="number" onChange={handleChange}/>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Data de admissão</Form.Label>
  <Form.Control name ="date" type="date" onChange={handleChange} />
</Form.Group>

{/* <Form.Group className="mb-3">
  <Form.Label>Horário</Form.Label>
  <Form.Control name ="date" type="time" />
</Form.Group> */}

// <Form.Group className="mb-3" controlId="formBasicCheckbox">
//   <Form.Check type="checkbox" label="Check" />
// </Form.Group>
// <Button variant="primary" type="submit">
//   Salvar
// </Button>
// </Form> */}

<Col>
<FloatingLabel label="Nome" className="mb-3">
<Form.Control type="text" placeholder="Nome" />
</FloatingLabel>
</Col>

			{/* <ListGroup horizontal>
			<ListGroup.Item><input type="text" name="name" className="mb-2" placeholder="Nome"/></ListGroup.Item>
			<ListGroup.Item><input type="text" name="name" className="mb-2" placeholder="Telefone"/></ListGroup.Item>
			<ListGroup.Item><input type="text" name="name" className="mb-2" placeholder="Serviço"/></ListGroup.Item>
			<ListGroup.Item><input type="text" name="name" className="mb-2" placeholder="Salário"/></ListGroup.Item>
			<ListGroup.Item><input type="text" name="name" className="mb-2" placeholder="Data de admissão"/></ListGroup.Item>
			</ListGroup> */}