import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Table from 'react-bootstrap/Table';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

function CustoProd(){

	const [cpp, setCpp] = useState("")

	const [categories, setCategories] = useState([])
	const [project, setProject] = useState([]);
	const [desabilitar, setDesabilitar] = useState(true);


	useEffect(() => {
		fetch('http://localhost:4000/custo/',{
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
		fetch('http://localhost:4000/custo/',{
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
	fetch(`http://localhost:4000/custo/${id}`,{
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
	fetch(`http://localhost:4000/custo/${id}`,{
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
		<div>
			<h2>Apuração de custo</h2><br></br><br></br>
			<Form onSubmit={submit}>
			<Row>
				<Col>
				<FloatingLabel label="Matéria prima direta" className="mb-2">
				<Form.Control disabled={desabilitar} type="number" placeholder="Matéria prima direta" name="mpd" onChange={handleChange}/>
				</FloatingLabel>
				</Col>
				<Col>
				<FloatingLabel label="Mão de obra direta" className="mb-2">
				<Form.Control disabled={desabilitar} type="number" placeholder="Mão de obra direta" name="mod" onChange={handleChange}/>
				</FloatingLabel>
				</Col>	
				<Col>
				<FloatingLabel label="CIF" className="mb-2">
				<Form.Control disabled={desabilitar} type="number" placeholder="CIF" name="cif" onChange={handleChange}/>
				</FloatingLabel>
				</Col>
				<Col>
				<FloatingLabel label="Custo de produção" className="mb-2">
				<Form.Control disabled={desabilitar} type="number" placeholder="Custo de produção" name="cpp"onChange={handleChange}/>
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
			<br></br><br></br><br></br>

			<Table striped bordered hover variant="dark" >
			<thead>
			<tr>
				<th>Matéria prima direta</th>
				<th>Mão de obra direta</th>
				<th>CIF</th>
				<th>Custo de produção</th>
				<th>Data</th>
				<th>Editar</th>
				<th>Deletar</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{categorie.mpd}</p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{categorie.mod}</p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{categorie.cif}</p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{categorie.cpp}</p>})}</td>
				{/* <td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{categorie.adm}</p>})}</td> */}
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p>{new Date (categorie.date).toLocaleDateString()}</p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p><button style={styles4} onClick={() => pathPost(categorie._id)}><BsFillPencilFill /></button></p>})}</td>
				<td>{categories.map( (categorie) => {if (new Date(categorie.date)) return <p><button style={styles3} onClick={() => deletePost(categorie._id)}><BsFillTrashFill/></button></p>})}</td>
				</tr>
			</tbody>
		</Table>
	  </div>
	);
}

export default CustoProd;