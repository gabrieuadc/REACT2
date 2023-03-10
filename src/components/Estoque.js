import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from 'react';
import { BsFillPencilFill, BsFillTrashFill, BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Estoque(){

	const styles3 = {
		color: "#E9573F",
		backgroundColor: "#000000",
	  };
	
	  const styles4 = {
		color: "#F6BB42",
		backgroundColor: "#000000",
	  };


	const [desabilitar, setDesabilitar] = useState(true);
	const [project, setProject] = useState([]);
	const [categories, setCategories] = useState([])
	const [desabilitarNew, setDesabilitarNew] = useState(false);
	const [desabilitarEdit, setDesabilitarEdit] = useState(false);


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

function desabilitarNot(e) {
	setDesabilitar(false);
}

function desabilitarYes(e) {
	setDesabilitar(true);
}

function handleChange(e){
	setProject({...project, [e.target.name] : e.target.value})
	console.log(project)
}

  const [buttonNew, setButtonNew] = useState('Novo');
  const [isSelectedNew, setIsSelectedNew] = useState(false);

  
  const [buttonEdit, setButtonEdit] = useState('Editar');
  const [isSelectedEdit, setIsSelectedEdit] = useState(false);

  const handleClick = () => {
	if (!isSelectedEdit) {
	  setButtonEdit('Cancelar');
	  setIsSelectedEdit(true);
	  desabilitarNot();
	  setDesabilitarNew(true);
	}
	else{
		setButtonEdit('Editar');
		setIsSelectedEdit(false);
		desabilitarYes();
		setDesabilitarNew(false);
	}
  }

  const handleReset = () => {
	if(!isSelectedNew){
		setButtonNew('Cancelar')
		setIsSelectedNew(true)
		desabilitarNot();
		setDesabilitarEdit(true);
	}
	else{
		setButtonNew('Novo')
		setIsSelectedNew(false)
		desabilitarYes();
		setDesabilitarEdit(false);
	}

  };

  const postorpath = () => {
	if(isSelectedEdit==true){
		pathPost(project);
	}
	else{
		createPost(project);
	}
  };


	return(
		<div>
		<h3>Estoque</h3><br></br>
		<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" >
			<Tab eventKey="home" title="Cadastro estoque">
			<Form>
			<Button variant="primary" ><BsArrowLeftSquareFill/>
				</Button>
				<Button variant="primary"><BsArrowRightSquareFill/>
				</Button>
				<input className="mb-2" type="number" value="13"/>
				<br></br>
				<br></br>
					<FloatingLabel label="Produto" className="mb-2">
					<Form.Control type="text" placeholder="Produto" name="prod" onChange={handleChange} disabled={desabilitar}/>
					</FloatingLabel>

					<FloatingLabel label="Unidade" className="mb-2">
					<Form.Control type="text" placeholder="Unidade" name="un" onChange={handleChange}disabled={desabilitar}/>
					</FloatingLabel>

					<FloatingLabel label="Quantidade" className="mb-2">
					<Form.Control type="number" placeholder="Quantidade" name="qtd" onChange={handleChange}disabled={desabilitar}/>
					</FloatingLabel>

					<FloatingLabel label="Valor" className="mb-2">
					<Form.Control type="number" placeholder="Valor" name="value" onChange={handleChange}disabled={desabilitar}/>
					</FloatingLabel>

					<FloatingLabel label="Data" className="mb-2">
					<Form.Control type="date" placeholder="Data" name="date" onChange={handleChange}disabled={desabilitar}/>
					</FloatingLabel>
					<br></br>
					<Button variant="primary" onClick={()=>handleReset()} disabled={desabilitarNew}>
						{buttonNew}
					</Button>
					<Button variant="primary" onClick={()=>handleClick()} disabled={desabilitarEdit}>
						{buttonEdit}
					</Button>
					<Button variant="primary" onClick={()=>postorpath()}>
						Gravar
					</Button>
					</Form>
			</Tab>

			<Tab eventKey="profile" title="Gestão estoque">
			<br></br>
			<br></br>
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
			</Tab>
		</Tabs>


			{/* <h3>Cadastro de Estoque</h3><br></br>
			<Button variant="primary" onClick={handleShow} >Novo
				</Button>
			<br></br> */}

			{/* <Modal show={show} onHide={handleClose} size="lg"centered>
				<Modal.Header closeButton>
				<Modal.Title>Estoque</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<Form>
					<Row>
						<Col>
						<FloatingLabel label="Produto" className="mb-2">
						<Form.Control type="text" placeholder="Produto" name="prod" onChange={handleChange}/>
						</FloatingLabel>
						</Col>
						<Col>
						<FloatingLabel label="Unidade" className="mb-2">
						<Form.Control type="text" placeholder="Unidade" name="un" onChange={handleChange}/>
						</FloatingLabel>
						</Col>	
						<Col>
						<FloatingLabel label="Quantidade" className="mb-2">
						<Form.Control type="number" placeholder="Quantidade" name="qtd" onChange={handleChange}/>
						</FloatingLabel>
						</Col>
						<Col>
						<FloatingLabel label="Valor" className="mb-2">
						<Form.Control type="number" placeholder="Valor" name="value" onChange={handleChange}/>
						</FloatingLabel>
						</Col>
						<Col>
						<FloatingLabel label="Data" className="mb-2">
						<Form.Control type="date" placeholder="Data" name="date" onChange={handleChange}/>
						</FloatingLabel>
						</Col>				
					</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={submit}>
					Save Changes
				</Button>
				</Modal.Footer>
      		</Modal> */}

		<br></br><br></br>
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