import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect, useRef} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsFillPencilFill, BsFillTrashFill, BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function Empregados(){


	const [id, setid]= useState("63e3fb9778dd725ec0472b1c");
	const [categories, setCategories] = useState([])
	const [empregado, setEmpregado] = useState([])
	const [project, setProject] = useState([]);
	const [desabilitar, setDesabilitar] = useState(true);
	const [desabilitarNew, setDesabilitarNew] = useState(false);
	const [desabilitarEdit, setDesabilitarEdit] = useState(false);


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

	function getByID(id){
		fetch(`http://localhost:4000/empregado/${id}`,{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((resp) => resp.json())
		.then((data) => {
			setEmpregado(data)
			console.log(empregado)
		})
		.catch((err) => console.log(err))
	}

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

function pathPost(id, empregado){
	fetch(`http://localhost:4000/service/${id}`,{
		method: 'PATH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(empregado)
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

	function handleChange15(e){
		setEmpregado({...empregado, [e.target.name] : e.target.value})
		console.log(empregado)
	}

	function handleChange12(e){
		setid(valor_antigo => valor_antigo+1)
	}

	function handleChange13(e){
		setid(valor_antigo => valor_antigo -1)
	}

	const styles3 = {
		display: "inline flow;",
	  };

	  const styles4 = {
		color: "#F6BB42",
		backgroundColor: "#000000",
	  };




	  const [buttonName1, setButtonName1] = useState('Novo');
	  const [isSelected1, setIsSelected1] = useState(false);

	  
	  const [buttonName, setButtonName] = useState('Editar');
	  const [isSelectedEdit, setIsSelectedEdit] = useState(false);

	  const handleReset = () => {
		setEmpregado({
		  name: '',
		  contact: '',
		  service: '',
		  salar: '',
		  adm:''
		});

		if(!isSelected1){
			setButtonName1('Cancelar')
			setIsSelected1(true)
			desabilitarNot();
			setDesabilitarEdit(true);
		}
		else{
			setButtonName1('Novo')
			setIsSelected1(false)
			desabilitarYes();
			setDesabilitarEdit(false);
		}

	  };

	  const handleClick = () => {
		if (!isSelectedEdit) {
		  setButtonName('Cancelar');
		  setIsSelectedEdit(true);
		  desabilitarNot();
		  setDesabilitarNew(true);
		}
		else{
			setButtonName('Editar');
			setIsSelectedEdit(false);
			desabilitarYes();
			setDesabilitarNew(false);
		}
	  }

	  const postorpath = () => {
		if(isSelectedEdit==true){
			pathPost(empregado);
		}
		else{
			createPost(empregado);
		}
	  };


	return(
		<div><p>
			<h3>Empregados</h3><br></br></p>

			<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" >
			<Tab eventKey="home" title="Cadastro empregado">
			<Form>
			<Button variant="primary"><BsArrowLeftSquareFill/>
			</Button>
			<Button variant="primary" onClick={()=>getByID("63e3fb9778dd725ec0472b1c")}><BsArrowRightSquareFill/>
			</Button>
			<input className="mb-2" type="number" value={id} />
			<br></br>
			<br></br>

				<FloatingLabel label="Nome">
				<Form.Control type="text" placeholder="Nome" name="name" value={empregado.name} onChange={handleChange15} disabled={desabilitar}/>
				</FloatingLabel>
				<br></br>

				<FloatingLabel label="Telefone" className="mb-3">
				<Form.Control type="number" placeholder="Telefone" name="contact" value={empregado.contact} onChange={handleChange15} disabled={desabilitar}/>
				</FloatingLabel>

				<FloatingLabel label="Servi??o" className="mb-3">
				<Form.Control type="text" placeholder="Servi??o" name="service" value={empregado.service} onChange={handleChange15} disabled={desabilitar}/>
				</FloatingLabel>

				<FloatingLabel label="Sal??rio" className="mb-3">
				<Form.Control type="number" placeholder="Sal??rio" name="salar" value={empregado.salar} onChange={handleChange15} disabled={desabilitar}/>
				</FloatingLabel>

				<FloatingLabel label="Data de admiss??o" className="mb-3">
				<Form.Control type="date" placeholder="Data de admiss??o" name="adm" disabled={desabilitar}/>
				</FloatingLabel>		
				{/* <Col sm="3">
				</Col> */}
				<br></br>
				<Button variant="primary" onClick={()=>handleReset()} disabled={desabilitarNew}>
				{buttonName1}
				</Button>
				<ToggleButton id="tbg-btn-1" value={1} onClick={handleClick} disabled={desabilitarEdit}>
				{buttonName}
				</ToggleButton>
				<Button variant="primary" onClick={()=>postorpath()} disabled={desabilitar}>Gravar</Button>
			</Form>		
			</Tab>

			<Tab eventKey="profile" title="Gest??o empregado">
			<br></br>
			<br></br>
			<Table striped bordered hover variant="dark" >
			<thead>
			<tr>
				<th>Nome</th>
				<th>Contato</th>
				<th>Servi??o</th>
				<th>Sal??rio</th>
				<th>Admiss??o</th>
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
				
			</Tab>

			</Tabs>
			<br></br><br></br><br></br>



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
				<FloatingLabel label="Servi??o" className="mb-2">
				<Form.Control disabled={desabilitar} type="text" placeholder="Servi??o" onChange={handleChange}/>
				</FloatingLabel>
				</Col>
				<Col>
				<FloatingLabel label="Sal??rio" className="mb-2">
				<Form.Control disabled={desabilitar} type="number" placeholder="Sal??rio" onChange={handleChange}/>
				</FloatingLabel>
				</Col>
				<Col>
				<FloatingLabel label="Data de admiss??o" className="mb-2">
				<Form.Control disabled={desabilitar} type="date" placeholder="Data de admiss??o" onChange={handleChange}/>
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

export default Empregados;

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
  <Form.Label >Servi??o</Form.Label>
  <Form.Control name ="service" type="text" onChange={handleChange}/>
  <Form.Text className="text-muted">
	Telefone de contato.
  </Form.Text>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Sal??rio</Form.Label>
  <Form.Control name ="value" type="number" onChange={handleChange}/>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Data de admiss??o</Form.Label>
  <Form.Control name ="date" type="date" onChange={handleChange} />
</Form.Group>

{/* <Form.Group className="mb-3">
  <Form.Label>Hor??rio</Form.Label>
  <Form.Control name ="date" type="time" />
</Form.Group> */}

// <Form.Group className="mb-3" controlId="formBasicCheckbox">
//   <Form.Check type="checkbox" label="Check" />
// </Form.Group>
// <Button variant="primary" type="submit">
//   Salvar
// </Button>
// </Form> */}
			{/* <ListGroup horizontal>
			<ListGroup.Item><input type="text" name="name" className="mb-2" placeholder="Nome"/></ListGroup.Item>
			<ListGroup.Item><input type="text" name="name" className="mb-2" placeholder="Telefone"/></ListGroup.Item>
			<ListGroup.Item><input type="text" name="name" className="mb-2" placeholder="Servi??o"/></ListGroup.Item>
			<ListGroup.Item><input type="text" name="name" className="mb-2" placeholder="Sal??rio"/></ListGroup.Item>
			<ListGroup.Item><input type="text" name="name" className="mb-2" placeholder="Data de admiss??o"/></ListGroup.Item>
			</ListGroup> */}